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
  async init(arc, config) {
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
  saveSharedState(shared) {
    let user = UserTools.currentUser;
    if (!user || !this.initialized) {
      warn("attempt to save shared state without selected user failed");
      return;
    }
    let node = UserTools.userDb(user).child(`shared/${this._amkey}`);
    if (shared) {
      node.set({when: Date.now()});
    } else {
      node.remove();
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
    let user = UserTools.currentUser;
    if (!user) return null;

    let userData = UserTools.findUser(user);
    if (!userData) return null;

    return userData;
  },
  loadSharedState() {
    let userData = this._userDataForCurrentUser();
    return !!Object.keys(userData && userData.shared || {}).includes(this._amkey);
  },
  loadProfileState() {
    let userData = this._userDataForCurrentUser();
    return !!Object.keys(userData && userData.profile || {}).includes(this._amkey);
  }
};

scope.StorageTools = StorageTools;

})(this);