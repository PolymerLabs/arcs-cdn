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
    position: sticky;
    top: 64px;
    height: 0;
    transform: translate3d(0, 100vh, 0);
    transition: all 200ms ease-out;
    box-sizing: border-box;
  }
  [${host}] [detail-panel][open] {
    transform: translate3d(0, 0, 0);
  }
  [${host}] [abs-panel] {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: calc(100vh - 64px);
    border-radius: 16px;
    padding: 0 16px;
    box-sizing: border-box;
    background-color: white;
    box-shadow: 0px 0px 6px 2px rgba(252,252,252,0.65);
    overflow-y: auto;
  }
  [${host}] button {
    background-color: transparent;
    border: none;
  }
</style>
<div ${host}>
  <!-- CSS tricks: zero-height position:sticky panel can autosize horizontally while not scrolling and not
       pushing siblings out of position. Contained absolute panel can have vertical size without affecting
       outer flow. -->
  <div detail-panel open$="{{open}}">
    <div abs-panel>
      <div style="padding: 8px; text-align: right;"><button on-click="_onBack">X</button></div>
      <div slotid="detail"></div>
    </div>
  </div>
  <div master-panel style="{{master}}">
    <div slotid="master"></div>
  </div>
</div>
    `.trim();

  return class extends DomParticle {
    get template() {
      return template;
    }
    _render({selected}, {back}) {
      let hasSelection = selected && (selected.name || selected.id);
      return {
        open: Boolean(hasSelection && !back)
      };
    }
    _onBack() {
      // trigger animation
      this._setState({back: true});
      // wait for animation to complete
      setTimeout(() => {
        // remove selection
        this._views.get('selected').clear();
        this._setState({back: false});
      }, 400);
    }
  };

});
