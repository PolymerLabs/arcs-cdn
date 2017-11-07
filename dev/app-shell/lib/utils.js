/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

// ad-hoc (for now) utilities
let utils = {
  createArc: ({id, urlMap, slotComposer, context, loader}) => {
    // worker paths are relative to worker location, remap urls from there to here
    let remap = Arcs.utils._expandUrls(urlMap);
    // Configure worker factory
    let pecFactory = Arcs.utils._createPecWorker.bind(null, urlMap[`worker-entry-cdn.js`], remap);
    // create an arc
    return new Arcs.Arc({id, pecFactory, slotComposer, context, loader});
  },
  _expandUrls: urlMap => {
    let remap = {};
    Object.keys(urlMap).forEach(k => {
      let path = urlMap[k];
      if (path[0] === '/') {
        path = `${location.origin}${path}`;
      } else if (path.indexOf('//') < 0) {
        let root = location.origin + location.pathname.split('/').slice(0, -1).join('/');
        path = `${root}/${path}`;
      }
      remap[k] = path;
    });
    return remap;
  },
  _createPecWorker: (path, map, id) => {
    let channel = new MessageChannel();
    //let worker = new Worker(path);
    let worker = new Worker(URL.createObjectURL(new Blob([`importScripts("${path}");`])));
    worker.postMessage({id: `${id}:inner`, base: map}, [channel.port1]);
    return channel.port2;
  },
  createUrlMap: cdnRoot => {
    return {
      // TODO(sjmiles): mapping root and dot-root allows browser-cdn-loader to replace right-hand
      // side with fully-qualified URL when loading from worker context
      '/': '/',
      './': './',
      'assets': `${cdnRoot}/assets`,
      'https://$cdn': `${cdnRoot}`,
      // TODO(sjmiles): map must always contain (explicitly, no prefixing) a mapping for `worker-entry-cdn.js`
      'worker-entry-cdn.js': `${cdnRoot}/lib/worker-entry-cdn.js`
    };
  },
  async makePlans(arc, timeout) {
    let generations = [];
    let planner = new Arcs.Planner();
    planner.init(arc);
    let plans = await planner.suggest(timeout || 5000, generations);
    plans.generations = generations;
    return plans;
  },
  async parseManifest(fileName, content, loader) {
    return await Arcs.Manifest.parse(content, {
      id: null,
      fileName,
      loader,
      registry: null,
      position: {line: 1, column: 0}
    });
  },
  // TODO: move this randomId to the backend.
  randomId() {
    return Date.now().toString(36).substr(2) + Math.random().toString(36).substr(2);
  },
  setUrlParam(name, value) {
    let url = new URL(document.location.href);
    url.searchParams.set(name, value);
    window.history.replaceState({}, "", decodeURIComponent(url.href));
  },
  prettyLogPrefix(moduleName, backgroundColor) {
    return [`%c${moduleName}`, `background: ${backgroundColor}; color: white; padding: 1px 6px 2px 7px; border-radius: 6px;`];
  }
};

// global module (for now)
window.Arcs.utils = utils;
