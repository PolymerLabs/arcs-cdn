ManifestTools = {
  async loadManifest(config, loader) {
    let {manifestPath, soloPath} = config;
    let path, content;
    if (soloPath) {
      content = await loader.loadResource(soloPath);
      path = soloPath;
    } else {
      var {manifests, remotes, exclusions} = await this._fetchManifestList();
      if (manifestPath) {
        manifests.push(manifestPath);
      }
      content = manifests.map(u => `import '${u}'`).join('\n');
      path = './arcs.manifest';
    }
    let folder = path.split('/').slice(0, -1).join('/') || '.';
    let manifest = await Arcs.utils.parseManifest(`${folder}/`, content, loader);
    return {manifest, manifests, remotes, exclusions};
  },
  async _fetchManifestList() {
    // TODO(sjmiles): using the global `db` that is currently leaking out
    // of metadata-storage.html
    let snapshot = await db.ref('manifests').once('value');
    let remotes = [];
    // TODO(sjmiles): convert sparse array (snapshot.val()) to dense array, return false to iterate all `s`
    snapshot.forEach(s => {remotes.push(s.val())});
    let exclusions = this.readExclusions();
    let manifests = remotes.filter(m => exclusions.indexOf(m) < 0);
    return {manifests, remotes, exclusions};
  },
  readExclusions() {
    try {
      return JSON.parse(localStorage.getItem('exclusions') || '[]');
    } catch(x) {
      console.warn(x);
      return [];
    }
  },
  writeExclusions(exclusions) {
    localStorage.setItem('exclusions', JSON.stringify(exclusions));
  },
  async publishManifest(config) {
    let path = config.manifestPath || config.soloPath;
    if (path) {
      path = new URL(path, location.href).href;
      let snapshot = await db.ref('manifests').once('value');
      let remotes = snapshot.val();
      if (remotes.indexOf(path) < 0) {
        remotes.push(path);
        db.ref('manifests').set(remotes);
      }
      // update ui
      //this._setState({manifests: remotes, localManifest: ''});
      // remove config paths
      config.manifestPath = config.soloPath = '';
      // update location bar
      this.configToLocation(config);
      // return new set
      return remotes;
    }
  },
  configToLocation(config) {
    let url = new URL(document.location.href);
    let bool_param = (p, n, v) => Boolean(v) ? p.set(n, v) : p.delete(n);
    bool_param(url.searchParams, 'manifest', config.manifestPath);
    bool_param(url.searchParams, 'solo', config.soloPath);
    window.history.replaceState({}, "", url.href);
  },
  updateManifestConfig(config, path) {
    if (config.soloPath) {
      config.soloPath = path;
      config.manifestPath = '';
    } else {
      config.soloPath = '';
      config.manifestPath = path;
    }
    this.configToLocation();
  }
};