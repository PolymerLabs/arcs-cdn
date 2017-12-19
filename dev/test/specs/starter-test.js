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

function queryElements(selectors) {
  return browser.execute(function(selectors) {
    return pierceShadows(selectors);
  }, selectors);
}

/** wait for the dancing dots to stop. */
function waitForStillness() {
  var element = queryElements(['arc-footer', 'x-toast[app-footer]', 'dancing-dots']);

  browser.waitUntil(() => {
    var result = browser.elementIdAttribute(element.value.ELEMENT, 'animate');
    return null==result.value;
  }, 5000, `the dancing dots can't stop won't stop`);
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
  it('creates an arc', function() {

    // TODO(smalls) need to spin up a server for this
    let cdnBranch = 'http://localhost:8000/arcs-cdn/dev';

    // TODO(smalls) should we create a user on the fly?
    browser.url(`${cdnBranch}/apps/web/?user=-L-YGQo_7f3izwPg6RBn`);

    assert.equal('Arcs', browser.getTitle());

    // create a new arc, switch to that tab (toggling back to the first tab to
    // reset the webdriver window state).
    browser.waitForVisible('div[title="New Arc"]');
    browser.click('div[title="New Arc"]');
    browser.switchTab(browser.windowHandles().value[0]);
    browser.switchTab(browser.windowHandles().value[1]);

    // wait for the page to load a bit, init the test harness for this page
    browser.waitForVisible('<app-main>');
    browser.waitForVisible('<footer>');
    loadSeleniumUtils(cdnBranch);

    // check out some basic structure relative to the app footer
    let footerPath = ['arc-footer', 'x-toast[app-footer]'];
    assert.ok(queryElements(footerPath.slice(0, 1)).value);
    assert.ok(queryElements(footerPath).value);

    // wait for the dancing dots to stop
    waitForStillness();

    let magnifier = queryElements(footerPath.concat(['div[search]', 'i']));
    browser.elementIdClick(magnifier.value.ELEMENT);

    let suggestionsRoot = queryElements(footerPath.concat(['suggestions-element']));
    let suggestionsDiv = queryElements(footerPath.concat(['suggestions-element', 'div']));
    let allSuggestions = browser.elementIdElements(
        suggestionsDiv.value.ELEMENT, 'suggest');
    let allSuggestionIds = allSuggestions
      .value
      .map(value => {
        return {
          id: value.ELEMENT, textLater: browser.elementIdText(value.ELEMENT).value
        };
      });
    console.log('allSuggestionIds', allSuggestionIds);
    assert.ok(allSuggestionIds.length>0, allSuggestionIds);
    let findSfRestaurant = allSuggestionIds.reduce((accumulator, currentValue) => {
      if (accumulator) {
        return accumulator;
      }
      return currentValue.text.startsWith('Find restaurants') ? currentValue : null
    }, null);
    console.log(findSfRestaurant);
    assert.ok(findSfRestaurant);
    browser.elementIdClick(findRestaurants.id);
    

    //console.log('magnifier', magnifier);
    //magnifier.click();
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
    browser.debug();
  });
});
