StorageTools = {
  async init(arc, config) {
    let storage = new ArcMetadataStorage({arc});
    // Create an amkey=id if it doesn't already exist.
    // TODO: support multiple arcs.
    // TODO: we should probably associate the manifest path with the stored ID.
    let amkey = new URL(document.location.href).searchParams.get('amkey');
    if (!amkey) {
      // Initialize storage and wait for the new remote Arc metadata entry
      // to be created.
      await storage.init().then(k => {
        amkey = k;
        this.setUrlParam('amkey', amkey);
      });
      storage.store('creator', {user: config.user});
    }
    this._amkey = amkey;
    // syncing
    if (!config.nosync) {
      // If sync is enabled, sync views after a new plan was incorporated to the Arc
      this.syncStorage = () => storage.sync({key: amkey});
    }
    // Initial sync
    this.syncStorage();
    // Store the manifest file path for the Arc to test out metadata storage
    storage.store('manifest', {url: new URL(config.manifestPath, location.href).href});
    this.syncSharedViews = ({key}) => storage.syncSharedViews({key});
    // Storing and reloading steps (keeping too storage specific stuff local)
    this.syncAcceptedSteps = () => storage.store("accepted_steps", this._steps);
    storage.on((key, value) => key === "accepted_steps" && this.newAcceptedSteps(value));
  },
  setUrlParam(name, value) {
    let url = new URL(document.location.href);
    url.searchParams.set(name, value);
    window.history.replaceState({}, "", url.href);
  },
  syncStorage() {
  },
  syncSharedViews() {
  },
  syncAcceptedSteps() {
  },
  newAcceptedSteps(value) {
  }
};