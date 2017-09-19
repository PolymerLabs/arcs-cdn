// ad-hoc (for now) utilities
let utils = {
  createArc: ({id, urlMap, slotComposer, context}) => {
    // worker paths are relative to worker location, remap urls from there to here
    let remap = Arcs.utils._expandUrls(urlMap);
    // Configure worker factory
    let pecFactory = Arcs.utils._createPecWorker.bind(null, urlMap[`worker-entry-cdn.js`], remap);
    // create an arc
    return new Arcs.Arc({id, pecFactory, slotComposer, context});
  },
  _expandUrls: urlMap => {
    let remap = {};
    Object.keys(urlMap).forEach(k => {
      let path = urlMap[k];
      if (path[0] === '/') {
        path = `${location.origin}${path}`;
      } else if (path.indexOf('//') < 0) {
        let root = location.href.split('/').slice(0, -1).join('/');
        //console.log(`expanding relative path [${path}] to [${root}/${path}]`);
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
      'worker-entry-cdn.js': `${cdnRoot}/worker-entry-cdn.js`
    };
  },
  collapseRecipes: manifest => {
    let collapse = (recipes, manifest) => {
      recipes = recipes.concat(manifest._recipes);
      return manifest._imports.reduce((recipes, m) => collapse(recipes, m), recipes);
    };
    manifest._recipes = collapse([], manifest);
  },
  async makePlans(arc, timeout) {
    let generations = [];
    let planner = new Arcs.Planner();
    planner.init(arc);
    let plans = await planner.suggest(timeout || 5000, generations);
    return {plans, generations};
  }
};

// global module (for now)
window.Arcs.utils = utils;