/*
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

let assert = require('assert');

describe('Test a new arc', function() {
  it('Create an arc', function() {
    browser.url('https://polymerlabs.github.io/arcs-cdn/dev/apps/web/');
    // note: to drop into debug mode with a REPL
    // browser.debug()
    assert.equal('Arcs', browser.getTitle());
  });
});
