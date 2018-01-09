/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

import Loader from '../../../arcs/runtime/loader.js';
import particle from '../../../arcs/runtime/particle.js';
import DomParticle from '../../../arcs/runtime/dom-particle.js';

export default class BrowserLoader extends Loader {
  constructor(urlMap) {
    super();
    this._urlMap = urlMap;
    // TODO: Update all callers to pass a valid base URL to avoid the use of
    //       location here. `new URL(base)` should be valid.
    //this._base = new URL(base || '', global.location).href;
  }
  _resolve(path) {
    //return new URL(path, this._base).href;
    let url = this._urlMap[path];
    if (!url && path) {
      // TODO(sjmiles): inefficient!
      let macro = Object.keys(this._urlMap).sort((a,b) => b.length - a.length).find(k => path.slice(0, k.length) == k);
      if (macro) {
        url = this._urlMap[macro] + path.slice(macro.length);
      }
    }
    url = url || path;
    //console.log(`browser-cdn-loader: resolve(${path}) = ${url}`);
    return url;
  }
  loadResource(name) {
    return this._loadURL(this._resolve(name));
  }
  requireParticle(fileName) {
    let path = this._resolve(fileName);
    // inject path to this particle into the UrlMap,
    // allows "foo.js" particle to invoke `importScripts(resolver('foo/othermodule.js'))`
    this.mapParticleUrl(path);
    let result = [];
    self.defineParticle = function(particleWrapper) {
      result.push(particleWrapper);
    };
    importScripts(path);
    delete self.defineParticle;
    return this.unwrapParticle(result[0]);
  }
  mapParticleUrl(path) {
    let parts = path.split('/');
    let suffix = parts.pop();
    let folder = parts.join('/');
    let name = suffix.split('.').shift();
    this._urlMap[name] = folder;
  }
  unwrapParticle(particleWrapper) {
    // TODO(sjmiles): regarding `resolver`:
    //  _resolve method allows particles to request remapping of assets paths
    //  for use in DOM
    let resolver = this._resolve.bind(this);
    return particleWrapper({particle, Particle: particle.Particle, DomParticle, resolver});
  }
};
