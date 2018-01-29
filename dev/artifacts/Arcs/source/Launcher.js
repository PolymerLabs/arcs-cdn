// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

'use strict';

defineParticle(({ DomParticle }) => {

  const host = 'arcs-list';

  const html = (strings, ...values) =>
    (strings[0] + values.map((v, i) => v + strings[i + 1]).join('')).trim();

  const info = console.log.bind(
    console.log,
    '%cLauncher',
    `background: #008081; color: white; padding: 1px 6px 2px 7px; border-radius: 6px;`
  );

  const style = html`
<style>
  [${host}] a {
    color: inherit;
    text-decoration: none;
  }
  [${host}] i {
    font-size: 48px;
  }
  [${host}] .material-icons {
    font-family: 'Material Icons';
    font-style: normal;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
    vertical-align: middle;
    cursor: pointer;
    font-size: 24px;
    padding-right: 4px;
  }
  [${host}] [arc-chip] {
    display: flex;
    flex-direction: column;
    padding: 16px;
    margin: 4px;
    font-size: 18px;
    color: whitesmoke;
    border-radius: 9px;
    min-height: 56px;
  }
</style>
`;

  let template = html`

${style}

<div ${host}>
  <div style="display: flex;">
    <div style="flex: 1;">{{columnA}}</div>
    <div style="flex: 1;">{{columnB}}</div>
  </div>
</div>

<template column>
  <a arc-chip style="{{backStyle}}" href="{{href}}" target="_blank">
    <div description title="{{description}}" unsafe-html="{{blurb}}"></div>
    <div style="flex: 1;"></div>
    <div style="margin-top: 32px;"><i class="material-icons">account_circle</i><i class="material-icons">account_circle</i><i class="material-icons">account_circle</i><i class="material-icons">account_circle</i></div>
  </a>
</template>
`;

  return class extends DomParticle {
    get template() {
      return template;
    }
    _willReceiveProps({arcs}) {
      const collation = this._collateItems(arcs);
      this._setState(collation);
    }
    _shouldRender(props, state) {
      return Boolean(state.items);
    }
    _render(props, {items, profileItems}) {
      const all = items.concat(profileItems);
      const pivot = (all.length + 1) >> 1;
      const columns = [all.slice(0, pivot), all.slice(pivot)];
      return {
        columnA: {
          $template: 'column',
          models: columns[0],
        },
        columnB: {
          $template: 'column',
          models: columns[1],
        }
      };
    }
    _collateItems(arcs) {
      let result = {
        items: [],
        profileItems: []
      };
      arcs.forEach((a, i) => {
        // each item goes in either the `items` or `profileItems` list
        let list = a.profile ? result.profileItems : result.items;
        // massage the description
        let blurb =
          a.description.length > 70
            ? a.description.slice(0, 70) + '...'
            : a.description;
        // populate the selected list
        list.push({
          arcId: a.id,
          // Don't allow deleting the 'New Arc' arc.
          disallowDelete: i == 0,
          href: a.href,
          blurb,
          description: a.description,
          icon: a.icon,
          iconStyle: {
            color: a.color || 'gray'
          },
          backStyle: {
            backgroundColor: a.color || 'gray'
          }
        });
      });
      return result;
    }
  };
});
