/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

class ArcsUtils {
  static createArc({id, urlMap, slotComposer, context, loader}) {
    // worker paths are relative to worker location, remap urls from there to here
    let remap = ArcsUtils._expandUrls(urlMap);
    let pecFactory = ArcsUtils._createPecWorker.bind(null, urlMap[`worker-entry-cdn.js`], remap);
    return new Arcs.Arc({id, pecFactory, slotComposer, context, loader});
  }
  static _expandUrls(urlMap) {
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
  }
  static _createPecWorker(path, map, id) {
    let channel = new MessageChannel();
    let worker = new Worker(URL.createObjectURL(new Blob([`importScripts("${path}");`])));
    worker.postMessage({id: `${id}:inner`, base: map}, [channel.port1]);
    return channel.port2;
  }
  static createUrlMap(cdnRoot) {
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
  }
  static async makePlans(arc, timeout) {
    let generations = [];
    let planner = new Arcs.Planner();
    planner.init(arc);
    let plans = await planner.suggest(timeout || 5000, generations);
    plans.generations = generations;
    return plans;
  }
  static async parseManifest(fileName, content, loader) {
    return await Arcs.Manifest.parse(content,
      {id: null, fileName, loader, registry: null, position: {line: 1, column: 0}});
  }
  static setUrlParam(name, value) {
    let url = new URL(document.location.href);
    url.searchParams.set(name, value);
    window.history.replaceState({}, "", decodeURIComponent(url.href));
  }
  // TODO: move this randomId to the backend.
  static randomId() {
    return Date.now().toString(36).substr(2) + Math.random().toString(36).substr(2);
  }
  static randomName() {
    const adjectives = ["adamant", "adroit", "amatory", "animistic", "antic", "arcadian", "baleful", "bellicose", "bilious", "boorish", "calamitous", "caustic", "cerulean", "comely", "concomitant", "contumacious", "corpulent", "crapulous", "defamatory", "didactic", "dilatory", "dowdy", "efficacious", "effulgent", "egregious", "endemic", "equanimous", "fastidious", "feckless", "friable", "fulsome", "garrulous", "guileless", "gustatory", "heuristic", "histrionic", "hubristic", "incendiary", "insidious", "insolent", "intransigent", "inveterate", "invidious", "irksome", "jejune", "jocular", "judicious", "lachrymose", "limpid", "loquacious", "luminous", "mannered", "mendacious", "meretricious", "minatory", "mordant", "munificent", "nefarious", "noxious", "obtuse", "parsimonious", "pendulous", "pernicious", "pervasive", "petulant", "platitudinous", "precipitate", "propitious", "puckish", "querulous", "quiescent", "rebarbative", "recalcitrant", "redolent", "rhadamanthine", "risible", "ruminative", "sagacious", "salubrious", "sartorial", "sclerotic", "serpentine", "spasmodic", "strident", "taciturn", "tenacious", "tremulous", "trenchant", "turbulent", "turgid", "ubiquitous", "uxorious", "verdant", "voluble", "voracious", "wheedling", "withering", "zealous"];
    const nouns = ["ninja", "chair", "pancake", "statue", "unicorn", "rainbows", "laser", "senor", "bunny", "captain", "nibblets", "cupcake", "carrot", "gnomes", "glitter", "potato", "salad", "marjoram", "curtains", "beets", "toiletries", "exorcism", "stick figures", "mermaid eggs", "sea barnacles", "dragons", "jellybeans", "snakes", "dolls", "bushes", "cookies", "apples", "ice cream", "ukulele", "kazoo", "banjo", "opera singer", "circus", "trampoline", "carousel", "carnival", "locomotive", "hot air balloon", "praying mantis", "animator", "artisan", "artist", "colorist", "inker", "coppersmith", "director", "designer", "flatter", "stylist", "leadman", "limner", "make-up artist", "model", "musician", "penciller", "producer", "stenographer", "set decorator", "silversmith", "teacher", "auto mechanic", "beader", "bobbin boy", "clerk of the chapel", "filling station attendant", "foreman", "maintenance engineering", "mechanic", "miller", "moldmaker", "panel beater", "patternmaker", "plant operator", "plumber", "sawfiler", "shop foreman", "soaper", "stationary engineer", "wheelwright", "woodworkers"];
    let rl = list => list[Math.floor(Math.random()*list.length)];
    return `${rl(adjectives)}-${rl(nouns)}`.replace(/ /g, '-');
  }
  static async describeArc(arc) {
    const combinedSuggestion = await new Arcs.Description(arc).getArcDescription();
    return combinedSuggestion || '';
  }
  static removeUndefined(object) {
    return JSON.parse(JSON.stringify(object));
  }
  static async createOrUpdateHandle(arc, remoteHandle, idPrefix) {
    let {metadata, values} = remoteHandle;
    // construct type object
    let type = ArcsUtils.typeFromMetaType(metadata.type);
    // construct id
    let id = ArcsUtils.getContextHandleId(type, metadata.tags, idPrefix);
    // find or create a handle in the arc context
    let handle = await ArcsUtils._requireHandle(arc, type, metadata.name, id, metadata.tags);
    await ArcsUtils.setHandleData(handle, values);
    return handle;
  }
  // Returns the context handle id for the given params.
  static getContextHandleId(type, tags, prefix) {
    return ''
      + (prefix ? `${prefix}_` : '')
      + (`${type.toString().replace(' ', '-')}_`).replace(/[\[\]]/g, '!')
      + ((tags && [...tags].length) ? `${[...tags].sort().join('-').replace(/#/g, '')}` : '')
      ;
  }
  static _getHandleDescription(name, tags, user, owner) {
      let noun = (user === owner) ? 'my' : `<b>${owner}'s</b>`;
      if (tags && tags.length) {
        return `${noun} ${tags[0].substring(1)}`;
      }
      if (name) {
        return `${noun} ${name}`;
      }
  }
  static async _requireHandle(arc, type, name, id, tags) {
    let handle = arc.context.findViewById(id);
    if (!handle) {
      handle = await arc.context.newView(type, name, id, tags);
      ArcsUtils.log('synthesized handle', id, tags);
    }
    return handle;
  }
  static metaTypeFromType(type) {
    return JSON.stringify(type ? type.toLiteral() : null);
  }
  static typeFromMetaType(metaType) {
    return Arcs.Type.fromLiteral(JSON.parse(metaType));
  }
  static async getHandleData(handle) {
    return handle.toList ? await handle.toList() : {id: handle.id, rawData: handle._stored && handle._stored.rawData || {}};
  }
  static async setHandleData(handle, data) {
    await this.clearHandle(handle);
    this.addHandleData(handle, data);
  }
  static async clearHandle(handle) {
    if (handle.toList) {
      let entities = await handle.toList();
      entities.forEach(e => handle.remove(e.id));
    } else {
      // TODO(sjmiles): necessary? correct semantics?
      handle.clear();
    }
  }
  static addHandleData(handle, data) {
    if (handle.toList) {
      data && Object.values(data).forEach(e => handle.store(e));
    } else {
      handle.set(data);
    }
  }
  static getUserProfileKeys(user) {
    return ArcsUtils.intersectArcKeys(user.arcs, user.profiles);
  }
  static getUserShareKeys(user) {
    return ArcsUtils.intersectArcKeys(user.arcs, user.shares);
  }
  static intersectArcKeys(arcs, other) {
    // TODO(sjmiles): database has no referential integrity, so
    // `user.[profiles|shares]` may contain dead keys (aka keys not in `arcs`).
    // The corrected set is the intersection of `user.arcs` and `user.[profiles|shares]`.
    return arcs && other ? Object.keys(arcs).filter(key => Boolean(other[key])) : [];
  }
};
ArcsUtils.log = XenBase.logFactory('ArcsUtils', '#4a148c');
// TODO(wkorman): Remove the below window installation once app-shell.html is
// fully converted to ES Modules.
window.ArcsUtils = ArcsUtils;

export default ArcsUtils;
