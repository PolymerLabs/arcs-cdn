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

const castLog = `background: #f57f17; color: white; padding: 1px 6px 2px 7px; border-radius: 6px;`;
const log = console.log.bind(console, '%cCastTools', castLog);

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