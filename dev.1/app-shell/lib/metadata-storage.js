(function() {

  let version = typeof Arcs === 'undefined' || !Arcs.version ? '/' : Arcs.version.replace(/\./g, '_');

  let firebaseConfig = {
    apiKey: "AIzaSyBme42moeI-2k8WgXh-6YK_wYyjEXo4Oz8",
    authDomain: "arcs-storage.firebaseapp.com",
    databaseURL: "https://arcs-storage.firebaseio.com",
    projectId: "arcs-storage",
    storageBucket: "arcs-storage.appspot.com",
    messagingSenderId: "779656349412"
  };

  let db = firebase.initializeApp(firebaseConfig, 'arcs-storage').database().ref(version);

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
    constructor({ arc }) {
      this._arc = arc;
      this._syncedViews = new Set();
    }

    // Creates or returns a context view for the given params.
    _getContextView(type, name, viewId, tags) {
      let views = this._arc.context.findViewById(viewId);
      console.assert(!views || views.length == 1 || views.length == 0);
      if (views && views.length) {
        return views[0];
      }
      return this._arc.context.newView(type, name, viewId, tags);
    }

    // Returns the context view id for the given params.
    _getContextViewId(type, tags, amkey, isProfile) {
      let viewid = 'shared:';
      if (isProfile) {
        viewid += 'PROFILE/';
      } else {
        viewid += `AMKEY${amkey}/`;
      }
      viewid += type.toString().replace(' ', '-') + '/';
      if (tags && [...tags].length) {
        viewid += [...tags].sort().join('-').replace(/#/g, '') + '/';
      }
      return viewid;
    }

    // Syncs all of the views in the given shared Arc amkey to the local context.
    sync({ key, isProfile, inFriendProfile }) {
      log(`watching enabled for arcs/${key}/views`);
      let arc = db.child('arcs/' + key);
      arc.child('views').on('value', remoteViews => {
        log(`watch triggered for arcs/${key}/views`);
        remoteViews.forEach(remoteViewMeta => {
          let metadata = remoteViewMeta.child('metadata').val();
          let type = new Arcs.Type(metadata.type.tag, metadata.type.data);
          let viewId = this._getContextViewId(type, metadata.tags, key, isProfile);
          if (this._syncedViews.has(viewId)) {
            console.warn(...pre, `View id already synced in Arc: ${viewId}`);
            return;
          }
          this._syncedViews.add(viewId);
          let localView = this._getContextView(type, metadata.name, viewId, metadata.tags);
          let remoteView = remoteViewMeta.child('values');
          if (localView.type.isView) {
            // One-way syncing. Whenever a new entity is added / removed in the remote
            // view it should get reflected in the context.
            remoteView.on('child_added', function (data) {
              localView.store(data.val());
            });
            remoteView.on('child_removed', function (data) {
              localView.remove(data.val().id);
            });
          } else if (localView.type.isVariable) {
            console.warn(...pre, 'Shared Variable syncing not implemented');
          }
        });
      });
    }
  }
  window.SharedArcs = SharedArcs;

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
      let viewid = view.type.toString().replace(' ', '-');
      if (tags && [...tags].length) {
        viewid += '-' + [...tags][0].replace(/#/g, '');
      }
      return viewid;
    }

    // Synchronize a local view with a remote view.
    _syncView(localView, remoteView) {
      let remoteIds = new Set();

      // One-time sync from remote => local.
      // TODO: simplify the code here. on('child_added') will be called for
      // every element that is already there. No need to do once('value').
      remoteView.once('value').then(function (snapshot) {
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
        localView.on('change', (change) => {
          if (change.add) {
            change.add.forEach((a) => {
              // Only store changes that were made locally.
              if (a.id.startsWith(arcId)) {
                remoteView.push(removeUndefined(a));
              }
            });
          } else if (change.remove) {
            change.remove.forEach((r) => {
              remoteView.orderByChild('id').equalTo(r.id).on("value", function (snapshot) {
                snapshot.forEach(function (data) {
                  removeView.child(data.key()).remove();
                });
              });
            });
          } else {
            console.warn(...pre, 'Unsupported change:', change);
          }
        }, {});

        // Apply remote changes to local view.
        remoteView.on('child_added', function (data) {
          if (data.val().id.startsWith(arcId)) {
            log('Skip remote entity because it was created in this Arc', data.val(), arcId);
            return;
          }
          localView.store(data.val());
        });
        remoteView.on('child_removed', function (data) {
          // Note: element will only be removed and 'remove' event will only be
          // fired iff the ID is present in the view.
          localView.remove(data.val().id);
        });
      });
    }

    // Synchronize a local variable with a remote variable.
    _syncVariable(localView, remoteView) {
      console.warn(...pre, 'Variable syncing not supported');
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
        if (localView.type.isVariable) {
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

  window.db = db;
  window.ArcMetadataStorage = ArcMetadataStorage;
})();
