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


function pierceShadows(selectors) {
  return browser.execute(function(selectors) {
    return pierceShadows(selectors);
  }, selectors);
}
function pierceShadowsSingle(selectors) {
  return browser.execute(function(selectors) {
    return pierceShadowsSingle(selectors);
  }, selectors);
}

/**
 * Search the list of elements, return the one that matches the textQuery.
 * (return an error if there are multiple matches, null if there are none).
 * The return format should be an object with the format:
 *   {id: <element-id>, text: <found text>}
 */
function searchElementsForText(elements, textQuery) {
  let textToId = elements
    .map(value => {
      return {
        id: value.ELEMENT, text: browser.elementIdText(value.ELEMENT).value
      };
    });
  assert.ok(textToId.length>0, textToId);
  assert.equal(textToId.length, elements.length);

  let matches = textToId.reduce((accumulator, currentValue) => {
    let found = currentValue.text.startsWith(textQuery) ? currentValue : null;
    if (accumulator && found) {
      throw Error(`found two matches ${accumulator}, ${found}`);
    } else if (accumulator) {
      return accumulator;
    }

    return found;
  }, null);

  return matches;
}

/** wait for the dancing dots to stop. */
function waitForStillness() {
  var element = pierceShadowsSingle(['arc-footer', 'x-toast[app-footer]', 'dancing-dots']);

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

function acceptSuggestionMatchingText(footerPath, textSubstring) {
  waitForStillness();

  let suggestionsRoot = pierceShadowsSingle(footerPath.concat(['suggestions-element']));
  let suggestionsDiv = pierceShadowsSingle(footerPath.concat(['suggestions-element', 'div']));
  let allSuggestions = browser.elementIdElements(
      suggestionsDiv.value.ELEMENT, 'suggest');
  let desiredSuggestion = searchElementsForText(allSuggestions.value, textSubstring);
  assert.ok(desiredSuggestion);
  browser.elementIdClick(desiredSuggestion.id);
}

/**
 * Click in the main arcs app. In order:
 * - use slotName (often root) and shadowSelectors to pierce through to the
 *   particle
 * - selectors is used within that context to find all matches
 * - if there are more than 1 matches from that, and textQuery is specified,
 *   return the matches with textQuery as a substring
 */
function clickInSlot(slotName, selectors, textQuery) {
  if (!selectors) selectors = [];
  let realSelectors = ['arc-host', `div[slotid="${slotName}"]`].concat(selectors);


  browser.waitUntil(() => {
    console.log('realSelectors', realSelectors);
    let pierced = pierceShadows(realSelectors);
    console.log('pierced', pierced);
    assert.ok(pierced);
    if (!pierced.value || pierced.value.length==0) {
      return false;
    }

    console.log(`searching amongst ${pierced.value} for ${textQuery}`);
    let selected;
    if (textQuery) {
      selected = searchElementsForText(pierced.value, textQuery).id;
    } else {
      if (1 == pierced.value.length) {
        selected = pierced.value[0].ELEMENT;
      } else {
        throw Error(`found multiple matches for ${realSelectors}: ${pierced.value}`);
      }
    }

    if (selected) {
      browser.elementIdClick(selected);
      return true;
    } else {
      return false;
    }
  }, 5000,
  `couldn't find anything to click with selectors ${realSelectors} textQuery ${textQuery}`
  );
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
    assert.ok(pierceShadowsSingle(footerPath.slice(0, 1)).value);
    assert.ok(pierceShadowsSingle(footerPath).value);

    // wait for the dancing dots to stop
    waitForStillness();

    let magnifier = pierceShadowsSingle(footerPath.concat(['div[search]', 'i']));
    browser.elementIdClick(magnifier.value.ELEMENT);

    acceptSuggestionMatchingText(footerPath, 'Find restaurants');
    clickInSlot('root', ['div.item', 'div.title'], 'Tacolicious');
    

    // to drop into debug mode with a REPL; also a handy way to see the state
    // at the end of the test.
    browser.debug();
  });
});
