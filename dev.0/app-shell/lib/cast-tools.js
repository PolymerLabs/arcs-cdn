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

const pre = Arcs.utils.prettyLogPrefix('CastTools', '#f57f17');
const log = console.log.bind(console, ...pre);

let CastTools = {
  async init() {
    UrlCaster.set(location.href.replace('app', 'chromecast'));
    log(`casting enabled`);
  },
  cast() {
    UrlCast.cast();
    log(`casting`);
  }
};

this.CastTools = CastTools;

})();
