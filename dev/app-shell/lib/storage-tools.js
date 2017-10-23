/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

((scope) => {

const pre = [`%cStorageTools`, `background: #280680; color: white; padding: 1px 6px 2px 7px; border-radius: 6px;`];
const log = console.log.bind(console, ...pre);
const warn = console.warn.bind(console, ...pre);

StorageTools = {
  async init(arc, config, loader) {
    let storage = this.storage = new ArcMetadataStorage({arc});
    let shared = this.shared = new SharedArcs({arc});
    // Create an amkey=id if it doesn't already exist.
    // TODO: support multiple arcs.
    // TODO: we should probably associate the manifest path with the stored ID.
    let amkey = new URL(document.location.href).searchParams.get('amkey');
    if (!amkey) {
      // Initialize storage
      amkey = await storage.init();
      Arcs.utils.setUrlParam('amkey', amkey);
    }
    this._amkey = amkey;
    // Initial sync
    this.syncStorage();
    // TODO(sjmiles): experimental, store creator
    storage.store('creator', {user: config.user});
    // Store the manifest file path for the Arc to test out metadata storage
    storage.store('manifest', {url: new URL(config.manifestPath, location.href).href});
    // setup arcs View
    await this.createArcsView(config, loader);
  },
  get initialized() {
    return this._amkey !== undefined;
  },
  syncStorage() {
    if (this.initialized) {
      //if (!config.nosync) {
      // If sync is enabled, sync views after a new plan was incorporated to the Arc
      this.storage.sync({key: this._amkey});
    }
  },
  syncAcceptedSteps(steps) {
    if (this.initialized) {
      this.storage.store("accepted_steps", steps);
    }
  },
  syncSteps() {
    if (this.initialized) {
      log('syncSteps', `arcs/${this._amkey}/metadata/accepted_steps`);
      db.child(`arcs/${this._amkey}/metadata/accepted_steps`).on('value', snap => {
        let steps = snap.val();
        log('accepted_steps changed', steps);
        SharingTools.newAcceptedSteps(steps);
      });
    }
  },
  syncDescription(callback) {
    if (this.initialized) {
      db.child(`arcs/${this._amkey}/metadata/description`).on('value', snap => {
        let description = snap.val();
        if (description) {
          callback(description.computed, description.user_generated);
        }
      });
    }
  },
  saveComputedDescription(description) {
    if (this.initialized) {
      db.child(`arcs/${this._amkey}/metadata/description/computed`).set(description);
    }
  },
  saveUserGeneratedDescription(description) {
    if (this.initialized) {
      db.child(`arcs/${this._amkey}/metadata/description/user_generated`).set(description);
    }
  },
  makeDescriptionWatcher(callback) {
    return {
      callback,
      watch: function(amkeys) {
        if (this._watchedDescriptions) {
          this._watchedDescriptions.forEach(r => r.off());
        }
        this._watchedDescriptions = [];

        if (amkeys) {
          amkeys.forEach(amkey => {
            this._watchedDescriptions.push(
              db.child(`arcs/${amkey}/metadata/description`).on('value', r => {
                let description = r.val();

                this.callback(amkey, description || { computed: '(untitled)' });
              })
            );
          });
        }
      }
    };
  },
  async saveSharedState(shared) {
    let user = UserTools.currentUser;
    if (!user || !this.initialized) {
      warn("attempt to save shared state without selected user failed");
      return;
    }
    let node = UserTools.userDb(user).child(`shared/${this._amkey}`);
    if (shared) {
      await node.set({when: Date.now()});
    } else {
      await node.remove();
    }
  },
  saveProfileState(profile) {
    let user = UserTools.currentUser;
    if (!user || !this.initialized) {
      warn("attempt to save profile arc without selected user failed");
      return;
    }
    let node = UserTools.userDb(user).child(`profile/${this._amkey}`);
    if (profile) {
      node.set({when: Date.now()});
    } else {
      node.remove();
    }
  },
  _userDataForCurrentUser() {
    return UserTools.findUser(UserTools.currentUser);
  },
  loadSharedState() {
    let userData = this._userDataForCurrentUser();
    return !!Object.keys(userData && userData.shared || {}).includes(this._amkey);
  },
  loadProfileState() {
    let userData = this._userDataForCurrentUser();
    return !!Object.keys(userData && userData.profile || {}).includes(this._amkey);
  },
  async createArcsView(config, loader) {
    let manifest = await Arcs.Manifest.load(`${config.root}/app-shell/artifacts/arc-types.manifest`, loader);
    let arcSchema = manifest.findSchemaByName('ArcMetadata');
    this.arcsView = arc.createView(arcSchema.type.viewOf(), 'ArcMetadata', arc.generateID(), ['#arcmetadata','#nosync']);
    this.arcsView.on('change', change => {
      log('arcsView change detected', change);
    }, {});
    //this.arcsView = arc.context.newView(arcSchema.type.viewOf(), 'ArcMetadata', arc.generateID(), ['#arcmetadata']);
  },
  async updateArcsView() {
    if (this.arcsView) {
      let icons= ['settings','movie','new_releases','high_quality','room_service','casino','child_care','spa','kitchen'];
      let arcs = (await db.child(`arcs`).once('value')).val();
      let keys = Object.keys(arcs).filter(k => arcs[k].users && arcs[k].users[UserTools.currentUser]);
      arcs = keys.map(k => {
        let description = arcs[k].metadata.description;
        return {
          description: description && (description.user_generated || description.computed) || k,
          icon: icons[Math.floor(Math.random()*icons.length)],
          key: k,
          href: `${location.origin}${location.pathname}?amkey=${k}`
        };
      });
      log('updateArcsView: arcs', arcs);
      let av = this.arcsView;
      av.toList().forEach(arc => {
        av.remove(arc.id);
      });
      arcs.forEach(a => {
        av.store({id: arc.generateID(), rawData: a});
      });
    }
  }
};

scope.StorageTools = StorageTools;

})(this);