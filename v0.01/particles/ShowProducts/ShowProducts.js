// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

"use strict";

var host = `[show-products]`;

//var productStyles = '';
//importScripts('../../../particles/shared/product-templates.js');

defineParticle(({DomParticle, resolver}) => {

  let styles = `
<style>
  ${host} {
    padding: 16px;
    background-color: white;
  }
  ${host} > [head] {
    display: flex;
    align-items: center;
    padding: 8px 0;
    color: #aaaaaa;
    font-weight: bold;
  }
  ${host} > x-list [item] {
    padding: 4px 8px;
    background-color: white;
    border-bottom: 1px solid #eeeeee;
  }
  ${host} > x-list [item]:last-child {
    border: none;
  }
  ${host} [interleaved] {
    font-size: 0.7em;
  }
</style>
  `;

  var productStyles = `
<style>
  ${host} > x-list [row] {
    display: flex;
    align-items: center;
  }
  ${host} > x-list [col0] {
    flex: 1;
    overflow: hidden;
    line-height: 115%;
  }
  ${host} > x-list [col0] > * {
    /*
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    */
  }
  ${host} > x-list [col1] {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 148px;
    height: 128px;
    box-sizing: border-box;
    text-align: center;
    background-size: contain;
  }
  ${host} > x-list [col1] > img {
    max-width: 128px;
    max-height: 96px;
  }
  ${host} > x-list [name] {
    font-size: 0.95em;
  }
  ${host} > x-list [category] {
    font-size: 0.7em;
    color: #cccccc;
  }
  ${host} > x-list [price] {
    color: #333333;
  }
  ${host} > x-list [seller] {
    font-size: 0.8em;
    color: #cccccc;
  }
</style>
  `;

  let productTemplate = `
<template>
  <div item>
    <div row>
      <div col0>
        <div name title="{{name}}">{{name}}</div>
        <div category>{{category}}</div>
        <div price>{{price}}</div>
        <div seller>{{seller}}</div>
        <div slotid$="{{itemSlotId}}"></div>
      </div>
      <div col1>
        <img src="{{image}}">
      </div>
    </div>
  </div>
</template>
  `;

  let template = `
${styles}
${productStyles}
<div show-products>
  <div head>
    <span>Your shortlist</span>
  </div>

  <div slotid="preamble"></div>

  <x-list items="{{items}}">${productTemplate}</x-list>
  <interleaved-list>
    <div slotid="annotation"></div>
  </interleaved-list>
  <interleaved-list>
    <div slotid="annotation2"></div>
  </interleaved-list>
  <interleaved-list>
    <div slotid="annotation3"></div>
  </interleaved-list>

  <div slotid="action"></div>

  <div slotid="postamble"></div>
</div>
    `.trim();

  return class extends DomParticle {
    get template() {
      return template;
    }
    _willReceiveProps(props) {
      this._setState({
        // TODO(sjmiles): rawData provides POJO access, but shortcuts schema-enforcing getters
        items: props.list.map(({rawData}, i) => {
          let item = Object.assign({}, rawData);
          item.itemSlotId = `item-${i}`;
          item.image = resolver && resolver(item.image);
          return item;
        })
      });
    }
    _shouldRender(props, state) {
      return Boolean(state.items && state.items.length);
    }
    _render(props, state) {
      return {
        items: state.items
      };
    }
  };

});
