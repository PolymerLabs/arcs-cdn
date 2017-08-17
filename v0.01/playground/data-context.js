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

window.prepareDataContext = (db, arc, manifest) => {
  // create views
  // TODO(sjmiles): empirically, views must exist before committing Entities (?)
  db.views && Object.keys(db.views).forEach(k => {
    let entity = manifest.findSchemaByName(db.views[k]).entityClass();
    arc.createView(entity.type, k);
    console.log(`created View: %c${k}`, `${highlight} color: #ff8080;`);
  });
  // commit entities
  db.model && Object.keys(db.model).forEach(k => {
    let entity = manifest.findSchemaByName(k).entityClass();
    arc.commit(db.model[k].map(p => new entity(p)));
    console.log(`committed Entity: %c${k}`, `${highlight} color: #ffff80;`);
  });
};