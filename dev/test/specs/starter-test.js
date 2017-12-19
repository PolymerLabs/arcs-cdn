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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/** wait for the dancing dots to stop. */
async function waitForStillness() {
  let dotsStopped = false;
  for (let i=0; i < 10; i++) {
    var result = await browser.execute(function() {
      let dots = pierceShadows(['arc-footer', 'x-toast[app-footer]', 'dancing-dots']);
      return dots.getAttribute('animate');
    });

    if (result.value==null) {
      dotsStopped = true;
      break;
    }

    await sleep(1000);
  }

  if (!dotsStopped) {
    throw 'the dancing dots never stopped';
  }
}

/** Load the selenium utils into the current page. */
function loadSeleniumUtils(cdnBranch) {
  var result = browser.execute(function(cdnBranch) {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `${cdnBranch}/test/selenium-utils.js`;
    document.getElementsByTagName('head')[0].appendChild(script);
  }, cdnBranch);
}

describe('test a new arc', function() {
  it('creates an arc', async function() {
    // TODO(smalls) should this create a user on the fly?

    // TODO(smalls) need to spin up a server for this
    let cdnBranch = 'http://localhost:8000/arcs-cdn/dev';

    browser.url(`${cdnBranch}/apps/web/?user=-L-YGQo_7f3izwPg6RBn`);
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

    // init our test harness, wait for the dancing dots to stop
    loadSeleniumUtils(cdnBranch);
    await waitForStillness();

    // console.log('XXX result', result);
    // result.click();
    // browser.click(result);

    // var glassResult = browser.execute(function() {
    //   return document.querySelectorAll('arc-footer')[0].shadowRoot.querySelectorAll('x-toast[app-footer]')[0].querySelectorAll('div[search] i');
    // });
    // glassResult.click();

//    browser.shadowDomElement(
//        ['arc-app', 'app-main', 'footer', 'arc-footer', 'x-toast'])
//  .click()

    // note: to drop into debug mode with a REPL
    await browser.debug();
  });
});
