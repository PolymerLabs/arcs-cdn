// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

/**
 * Reduce the deeply nested structure of url=>entities-of-many-types to a
 * flatter, combined form of type=>entities.
 */
function flatten(entities) {
  return Object.entries(entities).reduce( (accumulator, [key, value]) => {
    value.forEach(entry => {
      // TODO(smalls) need to dedup in here as well
      let type = entry['@type'];
      accumulator[type] ? accumulator[type].push(entry) : accumulator[type] = [entry];
    });
    return accumulator;
  }, new Object());
}
