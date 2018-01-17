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
  [${host}] .material-icons {
    font-family: 'Material Icons';
    font-style: normal;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
    vertical-align: middle;
    cursor: pointer;
  }
  [${host}] [banner] {
    font-size: 24px;
    background-color: #ffe082;
    padding: 32px 16px 8px 16px;
  }
  [${host}] [arc-item] {
    display: inline-block;
    width: 96px;
    margin: 8px;
    color: inherit;
    /*text-decoration: none;*/
    text-align: center;
  }
  [${host}] [arc-item] [description] {
    font-size: 0.8em;
    height: 92px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  [${host}] [arc-list-item] {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    border-bottom: 1px solid silver;
  }
  [${host}] a {
    color: inherit;
    text-decoration: none;
  }
  [${host}] [icon] {
    padding: 8px;
  }
  [${host}] [delete] {
    visibility: hidden;
    color: darkred;
    font-weight: bold;
    cursor: pointer;
  }
  [${host}] [arc-item]:hover [delete], [${host}] [arc-list-item]:hover [delete] {
    visibility: initial;
  }
  [${host}] i {
    font-size: 48px;
  }
</style>
`;

  let template = html`

${style}

<div ${host}>
  <div banner style="background-color: #ffe082;">Quick Hits</div>
  <div>{{arcs}}</div>
  <div banner style="background-color: #90caf9;">Profile</div>
  <div>{{profiles}}</div>
  <div banner style="background-color: #ffe082;">More</div>
  <div>{{tail}}</div>
</div>

<template arc>
  <div arc-item>
    <div icon style%="{{iconStyle}}">
      <span delete style="visibility: hidden;">x</span>
      <a href="{{href}}" target="_blank"><i class="material-icons">{{icon}}</i><a>
      <span delete hidden="{{disallowDelete}}" on-click="_onDelete" key="{{arcId}}">x</span>
    </div>
    <a href="{{href}}" target="_blank"><div description title="{{description}}" unsafe-html="{{blurb}}"></div></a>
  </div>
</template>

<template arc-list-item>
  <div arc-list-item>
    <span description title="{{description}}" style="flex: 1;"><a href="{{href}}" target="_blank" unsafe-html="{{description}}"></a></span>
    <span delete hidden="{{disallowDelete}}" on-click="_onDelete" key="{{arcId}}" style="padding: 0 8px">x</span>
    <div icon style%="{{iconStyle}}">
      <a href="{{href}}" target="_blank"><i class="material-icons">{{icon}}</i><a>
    </div>
  </div>
</template>
  `;

  return class extends DomParticle {
    get template() {
      return template;
    }
    _willReceiveProps(props) {
      let items = [],
        profileItems = [];
      props.arcs.forEach((a, i) => {
        // each item goes in either the `items` or `profileItems` list
        let list = a.profile ? profileItems : items;
        let blurb =
          a.description.length > 70
            ? a.description.slice(0, 70) + '...'
            : a.description;
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
          }
        });
      });
      this._setState({ items, profileItems });
    }
    _shouldRender(props, state) {
      return Boolean(state.items);
    }
    _render(props, state) {
      return {
        arcs: {
          $template: 'arc',
          models: state.items
        },
        profiles: {
          $template: 'arc',
          models: state.profileItems
        },
        tail: {
          $template: 'arc-list-item',
          models: state.items.slice(1)
        }
      };
    }
    _onDelete(e) {
      const arcId = e.data.key;
      const arc = this._props.arcs.find(a => a.id === arcId);
      if (!arc) {
        info(`Couldn't find arc to delete [arcId=${arcId}].`);
        return;
      }
      info(`Removing arc [arcId=${arcId}].`);
      this._views.get('arcs').remove(arc);
    }
  };
});
