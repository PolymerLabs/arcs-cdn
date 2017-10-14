/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

(function(scope) {

  //const storeLog = `background: #c43e00; color: white; padding: 1px 6px 2px 7px; border-radius: 6px;`;
  const pre = [`%cMetadataStorage`, `background: #c43e00; color: white; padding: 1px 6px 2px 7px; border-radius: 6px;`];
  const log = console.log.bind(console, ...pre);
  const assert = console.assert.bind(console, ...pre);
  const warn = console.warn.bind(console, ...pre);

  // Firebase doesn't like undefined properties in objects. Converting
  // to JSON will filter out undefined properties.
  let removeUndefined = function (o) {
    return JSON.parse(JSON.stringify(o));
  }

  // Class that pulls in shared Arcs into the current Arc context.
  class SharedArcs {
    constructor({arc}) {
      this._arc = arc;
      this._watchedViews = new Set();
      this._watchedArcs = {};  // key => [{node, views}]
    }
    // [{key, owner, isProfile, inFriendProfile}], notifier
    // `notifier` is called every time a `watch` executes
    watchAll(arcSpecs, notifier) {
      arcSpecs.forEach(vs => this.watchArc(vs, notifier));
    }
    unwatchAll() {
      Object.keys(this._watchedArcs).forEach(key => {
        this.unwatchArc(key);
      });
      console.assert(!this._watchedArcs.length);
      this._watchedViews = new Set();
    }
    // Syncs all of the views in the given shared Arc amkey to the local context.
    watchArc({key, user, owner, isProfile, inFriendProfile}, notifier) {
      log(`watching enabled for arcs/${key}/views`);
      let node = db.child(`arcs/${key}/views`);
      var watchedArc = {node, views: []};
      // TODO(noelutz): do we need to keep track of multiple keys if the same
      // Arc is imported twice (e.g., both as friend and profile Arc)?
      if (this._watchedArcs[key]) {
        this._watchedArcs[key].push(watchedArc);  
      } else {
        this._watchedArcs[key] = [watchedArc];
      }
      node.on('value', viewSnaps => {
        log(`watch triggered for arcs/${key}/views`);
        viewSnaps.forEach(snap => {
          let viewData = this._watchView(snap, key, user, owner, isProfile, inFriendProfile);
          if (viewData) {
            watchedArc.views.push(viewData);
          }
        });
        notifier && notifier();
      });
    }
    // Stop watching a single shared Arc. Notifier is called we stopped listening to
    // views from the given Arc.
    unwatchArc(key, notifier) {
      this._watchedArcs[key].forEach(a => {
        a.node.off();
        a.views.forEach(viewData => {
          viewData.node.off();
          this._watchedViews.delete(viewData.id);
        });
      });
      delete this._watchedArcs[key];
      // TODO(noelutz): this doesn't quite do the right thing because
      // the view still exists in the context.
      notifier && notifier();
    }
    _watchView(snapshot, key, user, owner, isProfile, inFriendProfile) {
      // get view `metadata`
      let metadata = snapshot.child('metadata').val();
      // construct type object
      let type = new Arcs.Type(metadata.type.tag, metadata.type.data);
      // construct id
      let viewId = this._getContextViewId(type, metadata.tags, key, isProfile);
      // only watch each viewId once
      if (this._watchedViews.has(viewId)) {
        return;
      }
      //log(`starting watch on view id: ${viewId}`);
      this._watchedViews.add(viewId);
      // calculate description
      let viewDescription = this._getViewDescription(metadata.name, metadata.tags, user, owner);
      // find or create a view in the arc context
      let localView = this._getContextView(type, metadata.name, viewId, metadata.tags, viewDescription);
      // get view `values`
      let remoteView = snapshot.child('values').ref;
      if (localView.type.isView) {
        // One-way syncing. Whenever a new entity is added / removed in the remote
        // view it should get reflected in the context.
        remoteView.on('child_added', function (data) {
          localView.store(data.val());
        });
        remoteView.on('child_removed', function (data) {
          localView.remove(data.val().id);
        });
      } else if (localView.type.isEntity || localView.type.isVariable) {
        remoteView.on('value', snapshot => {
          if (snapshot.val()) {
            localView.set(snapshot.val());
          } else {
            localView.clear();
          }
        });  
      }
      return {id: viewId, node: remoteView};
    }
    // Creates or returns a context view for the given params.
    _getContextView(type, name, viewId, tags, description) {
      let view = this._arc.context.findViewById(viewId);
      if (view) {
        return view;
      }
      view = this._arc.context.newView(type, name, viewId, tags);
      if (!view.description && description) {
        view.description = description;
      }
      return view;
    }
    // Returns the context view id for the given params.
    _getContextViewId(type, tags, amkey, isProfile) {
      return ''
        + `shared:${isProfile ? `PROFILE/` : `AMKEY${amkey}/`}`
        + `${type.toString().replace(' ', '-')}/`
        + ((tags && [...tags].length) ? `${[...tags].sort().join('-').replace(/#/g, '')}/` : '')
        ;
    }
    _getViewDescription(name, tags, user, owner) {
      let noun = (user == owner) ? 'my' : `<b>${owner}'s</b>`;
      if (tags && tags.length) {
        return `${noun} ${tags[0].substring(1)}`;
      }
      if (name) {
        return `${noun} ${name}`;
      }
    }
  }

  // Class that knows how to synchronize all of the views + metadata in an Arc.
  class ArcMetadataStorage {
    // Creates a new storage instance for the given arc. The arc is required.
    constructor({ arc }) {
      this._arc = arc;
      this._remoteRef = null;
      this._syncedViews = new Set();
      log("arc storage intialized");
    }

    _getViewId(view, tags) {
      let viewid = view.type.toString().replace(/ /g, '-').replace(/[\[\]]/g, '!');
      if (tags && [...tags].length) {
        viewid += '-' + [...tags][0].replace(/#/g, '');
      }
      return viewid;
    }

    // Synchronize a local view with a remote view.
    _syncView(localView, remoteView) {
      let remoteIds = new Set();

      // One-time sync from remote => local.
      remoteView.once('value').then(snapshot => {
        snapshot.forEach(function (e) {
          localView.store(e.val());
          remoteIds.add(e.val().id);
        });
      }).then(() => {
        // One-time sync from local => remote.
        localView.toList().forEach(e => {
          // Only store IDs that aren't already present remotely.
          if (!remoteIds.has(e.id)) {
            remoteView.push(removeUndefined(e));
          }
        });
      }).then(() => {
        let arcId = this._arc.id;

        // Apply local changes to remote view.
        // TODO: support modifications too.
        localView.on('change', change => {
          if (change.add) {
            change.add.forEach(a => {
              // Only store changes that were made locally.
              if (a.id.startsWith(arcId)) {
                remoteView.push(removeUndefined(a));
              }
            });
          } else if (change.remove) {
            change.remove.forEach(r => {
              remoteView.orderByChild('id').equalTo(r.id).once('value', snapshot => {
                snapshot.forEach(data => {
                  remoteView.child(data.key).remove();
                });
              });
            });
          } else {
            console.warn(...pre, 'Unsupported change:', change);
          }
        }, {});

        // Apply remote changes to local view.
        remoteView.on('child_added', data => {
          if (!data.val().id.startsWith(arcId)) {
            localView.store(data.val());
          }
        });
        remoteView.on('child_removed', data => {
          // Note: element will only be removed and 'remove' event will only be
          // fired iff the ID is present in the view.
          localView.remove(data.val().id);
        });
      });
    }

    // Synchronize a local variable with a remote variable.
    _syncVariable(localView, remoteView) {
      var arcId = this._arc.id;
      var initialLoad = true;
      remoteView.on('value', snapshot => {
        if (snapshot.val() && !snapshot.val().id.startsWith(arcId)) {
          localView.set(snapshot.val());
        } else if (!snapshot.val()) {
          localView.clear();
        }
        if (initialLoad) {
          // Once the first load is complete sync starts listening to
          // local changes and applying those to the remove view.
          initialLoad = false;
          localView.on('change', change => {
            if (change.data && change.data.id.startsWith(arcId)) {
              remoteView.set(removeUndefined(change.data));
            } else if (change.data === undefined) {
              remoteView.remove();
            }
          }, {});
        }
      });
    }

    // Call initialize if you don't yet have an amkey. The method
    // will return a promise that contains an amkey.
    init() {
      // This is the first time we see this Arc. Create the basic Arc metadata
      // in Firebase.
      let ref = db.child('arcs').push();
      return ref.set(this._arc.serialize()).then(value => {
        return ref.key;
      });
    }

    // Sync the Arc metadata with a backend. Whenever this method is called
    // we look for new views that may need to be synced.
    //
    // The key must be specified. We clear all of the local views in the given
    // Arc and replace their contents with whatever was stored remotely.
    //
    // Note: views that are created after sync is called will not be synchronized.
    // You have to call sync again whenever new views are added to the Arc.
    // TODO: change arc.js to fire an event when a new view is added to an Arc.
    sync({key}) {
      console.assert(key);
      this._remoteRef = db.child('arcs/' + key);
      // Arc is loading or recently changed. We need to synchronize the views.
      // First we synchronize all of the local views with their remote copies.
      //
      // Currently, only one tag per view is supported. If a view has multiple
      // tags then one will be picked (at random). Views that have a tag will
      // only be synced with other views that have tags.
      this._arc._viewTags.forEach((tags, localView) => {
        // Local views that are tagged #nosync are not synced with their remote
        // counterpart. Even if they exist remotely.
        if (tags && tags.has('#nosync')) {
          return;
        }
        let viewId = this._getViewId(localView, tags);
        // Make sure we only synchronize each view at most once.
        if (this._syncedViews.has(viewId)) {
          return;
        }
        this._syncedViews.add(viewId);
        let remoteViewMeta = this._remoteRef.child('views/' + viewId);
        remoteViewMeta.child('metadata').update(removeUndefined({
          type: localView.type,
          name: localView.name,
          tags: [...tags],  // removeUndefined doesn't support sets.
        }));
        let remoteView = remoteViewMeta.child('values');

        if (localView.type.isView) {
          this._syncView(localView, remoteView);
        }
        if (localView.type.isEntity) {
          this._syncVariable(localView, remoteView);
        }
      });
    }

    // Returns the storage key.
    // PRE: sync() was called and returned a key.
    get key() {
      return this._remoteRef.key;
    }

    // Stores arbitrary metadata associated with that arc. The key here
    // is the key associated with the metadata value. It must be set and
    // must be a string. Value must be a dict. If the key exists its data
    // will be overwritten. If value is undefined then the key will be
    // deleted.
    store(key, value) {
      console.assert(key);
      let ref = this._remoteRef.child('metadata/' + key);
      if (value) {
        ref.set(value);
      } else {
        ref.delete();
      }
    }

    // Listen to store events. Calling store on an instance of the storage
    // class will not trigger any storage event on that instance (i.e.,
    // an instance doesn’t get events for storage operations it performed).
    // The callback is expected to be of the form: function(key, value).
    on(callback) {
      var metadataRef = this._remoteRef.child('metadata');
      metadataRef.on('child_added', function (data) {
        callback(data.key, data.val());
      });
      metadataRef.on('child_changed', function (data) {
        callback(data.key, data.val());
      });
      metadataRef.on('child_removed', function (data) {
        callback(data.key, undefined);
      });
    }
  }

  scope.SharedArcs = SharedArcs;
  scope.ArcMetadataStorage = ArcMetadataStorage;

})(this);
