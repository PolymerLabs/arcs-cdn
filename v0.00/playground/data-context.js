/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

let highlight = 'padding: 3px 4px; background: #444; color: #bada55; font-weight: bold;';

window.prepareDataContext = (db, arc) => {
  // TODO(sjmiles): scope violation
  let loader = arc._loader;
  // load entities
  let entities = {};
  db.entities.forEach(name => {
    entities[name] = loader.loadEntity(name);
    console.log(`created Entity: %c${name}`, highlight);
  });
  // create views
  // TODO(sjmiles): empirically, views must exist before committing Entities
  Object.keys(db.views).forEach(k => {
    arc.createView(entities[db.views[k]].type, k);
    console.log(`created View: %c${k}`, `${highlight} color: #ff8080;`);
  });
  // commit entities
  Object.keys(db.model).forEach(k => {
    let entity = entities[k];
    arc.commit(db.model[k].map(p => new entity(p)));
    console.log(`committed Entity: %c${k}`, `${highlight} color: #ffff80;`);
  });
};