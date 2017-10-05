// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

'use strict';

const InnerPec = require('../../../arcs/runtime/inner-PEC.js');
const Loader = require('./browser-cdn-loader.js');

//const workerLog = `background: #ba000d; color: white; padding: 1px 6px 2px 8px; border-radius: 6px;`;
const pre = [`%cworker-entry(point)`, `background: #12005e; color: white; padding: 1px 6px 2px 7px; border-radius: 6px;`];

self.onmessage = function(e) {
  self.onmessage = null;
  let {id, base} = e.data;
  console.log(...pre, 'starting worker', id);
  new InnerPec(e.ports[0], id, new Loader(base));
};
