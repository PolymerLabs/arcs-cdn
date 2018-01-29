// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

"use strict";

defineParticle(({DomParticle, resolver}) => {

  let host = `show-tiles`;

  const template = `
<style>
  [${host}] {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: black;
    color: whitesmoke;
  }
  [${host}] > [card] {
    /*line-height: 0;*/
    margin: 8px;
    width: calc(50% - 24px);
  }
  @media (min-width: 720px) {
    [${host}] > [card] {
      width: calc(33% - 24px);
    }
  }
  @media (min-width: 1200px) {
    [${host}] > [card] {
      width: calc(25% - 24px);
    }
  }
</style>

<template items>
  <div card>
    <div slotid="action" subid="{{id}}"></div>
    <div slotid="item" subid="{{id}}" key="{{id}}" on-click="_onSelect"></div>
  </div>
</template>

<div ${host}>{{items}}</div>
    `.trim();

  return class extends DomParticle {
    get template() {
      return template;
    }
    _shouldRender(props) {
      return Boolean(props.items);
    }
    _render({items}) {
      //console.log('');
      return {
        items: {
          $template: 'items',
          models: items.sort((a,b) => a.name > b.name ? 1 : a.name === b.name ? 0 : -1).map(item => {
            return {
              id: item.id
            };
          })
        }
      };
    }
    _onSelect(e) {
      let item = this._props.items.find(i => i.id === e.data.key);
      this._views.get('selected').set(item);
    }
  };
});