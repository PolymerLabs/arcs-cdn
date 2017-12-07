// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

var assert = chai.assert;

afterEach(function() {
  target.innerHTML = '';
});

describe('ChromeExtensionDataProcessing', function() {
  describe('#flatten()', function() {
    it('should flatten & combine single datatype', function() {
      let sample = {
        'http://my/great/site': [
          {'@type': 'TypeA', name: 'TypeA_MGS'}
        ],
        'http://my/terrible/site': [
          {'@type': 'TypeA', name: 'TypeA_MTS'}
        ]
      };
      let expected = {
        'TypeA': [
          {'@type': 'TypeA', name: 'TypeA_MGS'},
          {'@type': 'TypeA', name: 'TypeA_MTS'}
        ]
      };

      let result = flatten(sample);
      assert.deepEqual(result, expected);
    });
    it('should flatten & combine datatypes', function() {
      let sample = {
        'http://my/great/site': [
          {'@type': 'TypeA', name: 'TypeA_MGS'},
          {'@type': 'TypeB', name: 'TypeB_MGS'}
        ],
        'http://my/terrible/site': [
          {'@type': 'TypeA', name: 'TypeA_MTS'},
          {'@type': 'TypeB', name: 'TypeB_MTS'}
        ]
      };
      let expected = {
        'TypeA': [
          {'@type': 'TypeA', name: 'TypeA_MGS'},
          {'@type': 'TypeA', name: 'TypeA_MTS'}
        ],
        'TypeB': [
          {'@type': 'TypeB', name: 'TypeB_MGS'},
          {'@type': 'TypeB', name: 'TypeB_MTS'}
        ]
      };

      let result = flatten(sample);
      assert.deepEqual(result, expected);
    });
  });
});

