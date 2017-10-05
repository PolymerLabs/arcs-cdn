/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

(() => {

this.ManifestTools = {
  async loadManifest(config, loader, manifests) {
    let {manifestPath, soloPath} = config;
    let path, content;
    if (soloPath) {
      content = await loader.loadResource(soloPath);
      path = soloPath;
    } else {
      if (manifestPath) {
        manifests.push(manifestPath);
      }
      content = manifests.map(u => `import '${u}'`).join('\n');
      path = './arcs.manifest';
    }
    let folder = path.split('/').slice(0, -1).join('/') || '.';
    let manifest;
    try {
      manifest = await Arcs.utils.parseManifest(`${folder}/`, content, loader);
    } catch(x) {
      console.warn(x);
      manifest = Arcs.utils.parseManifest(`${folder}/`, '', loader);
    }
    return manifest;
  },
  async _fetchManifestList() {
    // TODO(sjmiles): using the global `db` that is currently leaking out
    // of metadata-storage.html
    let snapshot = await db.child('manifests').once('value');
    let remotes = [];
    // TODO(sjmiles): convert sparse array (snapshot.val()) to dense array, return false to iterate all `s`
    snapshot.forEach(s => {remotes.push(s.val())});
    let exclusions = this._readExclusions();
    let manifests = remotes.filter(m => exclusions.indexOf(m) < 0);
    manifests.remotes = remotes;
    manifests.exlusions = exclusions;
    return manifests;
  },
  _readExclusions() {
    try {
      return JSON.parse(localStorage.getItem('exclusions') || '[]');
    } catch(x) {
      console.warn(x);
      return [];
    }
  },
  _writeExclusions(exclusions) {
    localStorage.setItem('exclusions', JSON.stringify(exclusions));
  },
  updateManifestConfig(config, path) {
    if (config.soloPath) {
      config.soloPath = path;
      config.manifestPath = '';
    } else {
      config.soloPath = '';
      config.manifestPath = path;
    }
    this.configToLocation(config);
  },
  async publishManifest(config) {
    let path = config.manifestPath || config.soloPath;
    if (path) {
      path = new URL(path, location.href).href;
      let node = db.child('manifests');
      let snapshot = await node.once('value');
      let remotes = snapshot.val();
      if (!remotes || remotes.indexOf(path) < 0) {
        if (!remotes) {
          remotes = [path];
        } else {
          remotes.push(path);
        }
        node.set(remotes);
      }
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
    window.history.replaceState({}, "", decodeURIComponent(url.href));
  }
};

})();
