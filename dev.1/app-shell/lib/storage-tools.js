(() => {

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
    // syncing
    //if (!config.nosync) {
      // If sync is enabled, sync views after a new plan was incorporated to the Arc
      this.syncStorage = () => storage.sync({key: amkey});
      //this._syncSharedViews = ({key, isProfile, isFriendProfile}) => shared.sync({key, isProfile, isFriendProfile});
    //}
    // Initial sync
    this.syncStorage();
    // TODO(sjmiles): experimental, store creator
    storage.store('creator', {user: config.user});
    // Store the manifest file path for the Arc to test out metadata storage
    storage.store('manifest', {url: new URL(config.manifestPath, location.href).href});
    // Storing and reloading steps (keeping too storage specific stuff local)
    this.syncAcceptedSteps = steps => storage.store("accepted_steps", steps);
  },
  // dummy functions in case sharing is disabled
  syncStorage() {
  },
  //syncSharedViews() {
  //},
  syncAcceptedSteps(steps) {
  },
  syncSteps() {
    log('watching', `arcs/${this._amkey}/metadata/accepted_steps`);
    let node = db.child(`arcs/${this._amkey}/metadata/accepted_steps`);
    node.on('value', snap => {
      let steps = snap.val();
      log('accepted_steps changed', steps);
      SharingTools.newAcceptedSteps(steps);
    });
  },
  saveSharedState(shared) {
    let user = UserTools.currentUser;
    if (!user || !this._amkey) {
      warn("attempt to save shared state without selected user failed");
      return;
    }
    UserTools.userDb(user).child(`shared/${this._amkey}`).set({
      shared,
      when: Date.now()
    });
  },
  saveProfileState(profile) {
    let user = UserTools.currentUser;
    if (!user || !this._amkey) {
      warn("attempt to save shared state without selected user failed");
      return;
    }
    let node = UserTools.userDb(user).child(`profile/${this._amkey}`);
    if (profile) {
      node.set({when: Date.now()});
    } else {
      node.remove();
    }
  }
};

this.StorageTools = StorageTools;

})();