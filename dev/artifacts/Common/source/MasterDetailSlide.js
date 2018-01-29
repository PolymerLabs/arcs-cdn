// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

"use strict";

defineParticle(({DomParticle}) => {

  let host = `master-detail`;

  let template = `
<style>
  [${host}] {
    position: relative;
  }
  [${host}] [detail-panel] {
    position: fixed;
    top: 40px;
    right: 0;
    bottom: 72px;
    left: 0;
    overflow: auto;
    opacity: 0;
    border-radius: 16px;
    padding: 0 16px;
    transform: translate3d(0, 1000px, 0);
    transition: all 300ms ease-out;
    box-sizing: border-box;
    background-color: white;
  }
  [${host}] button {
    background-color: transparent;
    border: none;
  }
</style>
<div ${host}>
  <div style="{{master}}">
    <div slotid="master"></div>
  </div>
  <div detail-panel style="{{detail}}">
    <div style="padding: 8px; text-align: right;"><button on-click="_onBack">X</button></div>
    <div slotid="detail"></div>
  </div>
</div>
    `.trim();

  return class extends DomParticle {
    get template() {
      return template;
    }
    _render({selected}) {
      let hasSelection = selected && (selected.name || selected.id);
      return {
        detail: hasSelection ? 'transform: translate3d(0,0,0); opacity: 1;' : ''
      };
    }
    _onBack() {
      this._views.get('selected').clear();
    }
  };

});
