/*
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

var assert = chai.assert;

afterEach(function() {
  target.innerHTML = '';
});

describe('SeleniumUtils', function() {
  describe('#pierceShadows', function() {
    it('should cross a simple shadow boundary', function() {
      target.innerHTML = `
        <div outer>
        </div>`;
      let outer = target.querySelectorAll('div[outer]');
      assert.equal(outer.length, 1);
      let shadow = outer[0].attachShadow({mode: 'open'});
      shadow.innerHTML = `
        <div inner>
          <p goal>goal</p>
        </div>`;

      let result;

      result = _pierceShadows(target,
        ['div[outer]', 'div[inner]', 'p[goal]']);
      assert.equal(result.textContent, 'goal');

      result = _pierceShadows(target,
        ['div[outer]', 'p[goal]']);
      assert.equal(result.textContent, 'goal');
    });
    it('should cross several shadow boundaries', function() {
      target.innerHTML = `
        <div outer>
        </div>`;
      let outer = target.querySelectorAll('div[outer]');
      assert.equal(outer.length, 1);
      let firstShadow = outer[0].attachShadow({mode: 'open'});
      firstShadow.innerHTML = `
        <div firstInner>
        </div>`;
      let secondShadow = firstShadow.children[0].attachShadow({mode: 'open'});
      secondShadow.innerHTML = `
        <div secondInner>
          <p goal>goal</p>
        </div>`;

      let result;

      result = _pierceShadows(target,
        ['div[outer]', 'div[firstInner]', 'div[secondInner]', 'p[goal]']);
      assert.equal(result.textContent, 'goal');

      result = _pierceShadows(target,
        ['div[outer]', 'div[firstInner]', 'p[goal]']);
      assert.equal(result.textContent, 'goal');
    });
    it('should navigate a more complex tree', function() {
      target.innerHTML = `
        <div outer>
          <div badBranch>
            <div deeper>
            </div>
          </div>
        </div>`;
      let outer = target.querySelectorAll('div[outer]');
      assert.equal(outer.length, 1);
      let firstShadow = outer[0].attachShadow({mode: 'open'});
      firstShadow.innerHTML = `
        <div firstInner>
        </div>`;
      let secondShadow = firstShadow.children[0].attachShadow({mode: 'open'});
      secondShadow.innerHTML = `
        <div secondInner>
          <p goal>goal</p>
          <div offshoot>
          </div>
        </div>`;

      let result;

      result = _pierceShadows(target,
        ['div[outer]', 'div[firstInner]', 'div[secondInner]', 'p[goal]']);
      assert.equal(result.textContent, 'goal');

      result = _pierceShadows(target,
        ['div[outer]', 'div[firstInner]', 'p[goal]']);
      assert.equal(result.textContent, 'goal');
    });
  });
});
