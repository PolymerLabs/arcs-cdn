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
async function waitForStillness() {
  let dotsStopped = false;
  for (let i=0; i < 10; i++) {
    var element = await queryElements(['arc-footer', 'x-toast[app-footer]', 'dancing-dots']);
    var result = await browser.elementIdAttribute(element.value.ELEMENT, 'animate');

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

    // TODO(smalls) need to spin up a server for this
    let cdnBranch = 'http://localhost:8000/arcs-cdn/dev';

    // TODO(smalls) should we create a user on the fly?
    browser.url(`${cdnBranch}/apps/web/?user=-L-YGQo_7f3izwPg6RBn`);

    assert.equal('Arcs', browser.getTitle());
    await browser.debug();

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
    await waitForStillness();

    let magnifier = await queryElements(footerPath.concat(['div[search]', 'i']));
    browser.elementIdClick(magnifier.value.ELEMENT);

    let suggestionsRoot = await queryElements(footerPath.concat(['suggestions-element']));
    let suggestionsDiv = await queryElements(footerPath.concat(['suggestions-element', 'div']));
    let allSuggestions = await browser.elementIdElements(
        suggestionsDiv.value.ELEMENT, 'suggest');
    let allSuggestionIds = allSuggestions
      .value
      .map(value => {
        return {
          id: value.ELEMENT, textLater: browser.elementIdText(value.ELEMENT)
        };
      });/*.reduce((accumulator, currentValue) => {
        accumulator[currentValue.text] = currentValue.id;
        return accumulator }, new Object()
      );*/
    await Promise.all(allSuggestionIds.map(suggestion => suggestion.textLater));
    allSuggestionIds = allSuggestionIds.map(suggestion => {
      return {id: suggestion.id, text: suggestion.textLater}
    });
    console.log(allSuggestionIds);
    assert.ok(allSuggestionIds.length>0, allSuggestionIds);
    console.log(allSuggestionIds);
    let findSfRestaurant = allSuggestionIds.reduce((accumulator, currentValue) => {
        if (accumulator) {
          return accumulator;
        }
        return currentValue.text.startsWith('Find re') ? currentValue : null
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
    await browser.debug();
  });
});
