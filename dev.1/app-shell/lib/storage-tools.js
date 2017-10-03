(function(scope) {

const pre = [`%cStorageTools`, `background: #280680; color: white; padding: 1px 6px 2px 7px; border-radius: 6px;`];
const log = console.log.bind(console, ...pre);

StorageTools = {
  async init(arc, config) {
    let storage = new ArcMetadataStorage({arc});
    let shared = new SharedArcs(this);
    // Create an amkey=id if it doesn't already exist.
    // TODO: support multiple arcs.
    // TODO: we should probably associate the manifest path with the stored ID.
    let amkey = new URL(document.location.href).searchParams.get('amkey');
    if (!amkey) {
      // Initialize storage
      amkey = await storage.init();
      this.setUrlParam('amkey', amkey);
    }
    this._amkey = amkey;
    // syncing
    //if (!config.nosync) {
      // If sync is enabled, sync views after a new plan was incorporated to the Arc
      this.syncStorage = () => storage.sync({key: amkey});
      this._syncSharedViews = ({key, isProfile}) => shared.sync({key, isProfile});
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
  syncSteps() {
    log('watching', `arcs/${this._amkey}/metadata/accepted_steps`);
    let node = db.child(`arcs/${this._amkey}/metadata/accepted_steps`);
    node.on('value', snap => {
      let steps = snap.val();
      log('accepted_steps changed', steps);
      SharingTools.newAcceptedSteps(steps);
    });
  },
  setUrlParam(name, value) {
    let url = new URL(document.location.href);
    url.searchParams.set(name, value);
    window.history.replaceState({}, "", decodeURIComponent(url.href));
  },
  syncStorage() {
  },
  syncSharedViews() {
  },
  syncAcceptedSteps(steps) {
  },
  saveSharedState(shared) {
    let user = UserTools.currentUser;
    if (!user || !this._amkey) {
      console.warn("attempt to save shared state without selected user failed");
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
      console.warn("attempt to save shared state without selected user failed");
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

scope.StorageTools = StorageTools;

})(this);