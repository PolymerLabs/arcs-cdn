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
      '/$cdn': `${cdnRoot}`,
      // TODO(sjmiles): map must always contain (explicitly, no prefixing) a mapping for `worker-entry-cdn.js`
      'worker-entry-cdn.js': `${cdnRoot}/worker-entry-cdn.js`
    };
  },
  prepareDataContext: (db, arc, manifest) => {
    if (!db) return;
    let highlight = 'padding: 3px 4px; background: #444; color: #bada55; font-weight: bold;';
    // create views
    // TODO(sjmiles): empirically, views must exist before committing Entities (?)
    db.views && db.views.forEach(info => {
      let entity = manifest.findSchemaByName(info.type).entityClass();
      let view = arc.createView(entity.type.viewOf(), info.name);
      console.log(`created View: %c${info.name||'anon'}::${info.type}`, `${highlight} color: #ff8080;`);
      // commit entities
      if (info.model) {
        info.model.forEach((r, i) => {
          let instance = new entity(r);
          // TODO(sjmiles): this is not the right way to establish an id
          instance.id = 1000 + i;
          view.store(instance);
        });
        console.log(`committed Entities: %c${info.model.length}`, `${highlight} color: #ffff80;`);
      }
    });
  },
  suggest: (arc, ui) => {
    let makeSuggestions = async () => {
      let planner = new Arcs.Planner();
      planner.init(arc);
      let generations = [];
      ui.add(await planner.suggest(5000, generations));
      document.dispatchEvent(new CustomEvent('generations', {detail: generations}));
    }
    ui.addEventListener('plan-selected', e => {
      arc.instantiate(e.detail);
      makeSuggestions();
    });
    makeSuggestions();
  }
};

// global module (for now)
window.Arcs.utils = utils;