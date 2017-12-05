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
    // TODO(smalls) should this create a user on the fly?
    browser.url('https://polymerlabs.github.io/arcs-cdn/dev/apps/web/?user=-L-YGQo_7f3izwPg6RBn');
    assert.equal('Arcs', browser.getTitle());

    // create a new arc, switch to that tab (toggling back to the first tab to
    // reset the webdriver window state).
    browser.waitForVisible('div[title="New Arc"]');
    browser.click('div[title="New Arc"]');
    browser.switchTab(browser.windowHandles().value[0]);
    browser.switchTab(browser.windowHandles().value[1]);

    // check out our structure - these are working
    browser.waitForVisible('<app-main>');
    browser.waitForVisible('<footer>');

    // note: to drop into debug mode with a REPL
    browser.debug()
  });
});
