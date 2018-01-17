/*
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import "../data-explorer.js";
import XenBase from "../xen/xen-base.js";

const template = Object.assign(document.createElement('template'), {innerHTML:
  `<style>
    arc-explorer > [banner] {
      padding: 6px 4px;
      background-color: whitesmoke;
      margin-bottom: 8px;
      border-top: 1px dotted silver;
    }
  </style>
  <!--
  <div banner>Profile Arcs</div>
  <div>{{profileArcs}}</div>
  <div banner>Shared Arcs</div>
  <div>{{sharedArcs}}</div>
  -->
  <div banner>Profile Handles</div>
  <div style="padding: 8px;">{{profiles}}</div>
  <br>
  <!--
  <div banner>Danger Zone</div>
  <div style="padding:8px;"><button on-click="_onPrivatize">Global Privatize (remove all shares)</button></div>
  <hr>
  -->
  <!--
  <button on-click="dumpDb">Dump Database</button>
  <data-explorer style="font-size: 0.6em;" object="{{data}}"></data-explorer>
  -->`
});

const templateArc = Object.assign(document.createElement('template'), {innerHTML:
  `<arc-item key="{{key}}" data="{{data}}"></arc-item><br>`
});

const templateProfile = Object.assign(document.createElement('template'), {innerHTML:
  `<div style="margin-bottom: 8px;">
    <span>{{name}}</span>
    <a href="{{href}}" target="_blank"><i class="material-icons" style="font-size: 0.8em; vertical-align: middle;">open_in_new</i></a>
  </div>
  <data-explorer style="font-size: 0.6em;" object="{{data}}"></data-explorer>
  <br>`
});

class ArcExplorer extends XenBase {
  static get observedAttributes() { return ['user']; }
  get template() { return template; }
  get host() {
    return this;
  }
  _wouldChangeProp() {
    return true;
  }
  _willReceiveProps(props, state) {
    this._setState({profiles: null, shared: null});
    if (props.user) {
      this._queryProfileArcs(props.user.profiles);
      this._querySharedArcs(props.user.shared);
    }
  }
  _queryProfileArcs(profiles) {
    // get a map of async function invocations,
    // when all functions complete, update state
    Promise.all(this._arcPromises(profiles)).then(profiles => this._setState({profiles}));
  }
  _querySharedArcs(shared) {
    Promise.all(this._arcPromises(shared)).then(shared => this._setState({shared}));
  }
  _arcPromises(keys) {
    // creates a map of async function invocations
    return Object.keys(keys || 0).map(async key => {
      return {
        key: key,
        data: (await db.child(`arcs/${key}`).once('value')).val()
      };
    });
  }
  _render(props, state) {
    let list = (template, models) => { return {template,models}; };
    let arc_t = templateArc;
    let profile_t = templateProfile;
    return {
      profileArcs: list(arc_t, state.profiles),
      sharedArcs: list(arc_t, state.shared),
      data: state.data,
      profiles: list(profile_t, this._renderProfiles(state.profiles))
    };
  }
  _renderProfiles(profiles) {
    let result = [];
    profiles && profiles.forEach(({key, data}) => {
      let href = `${location.origin}/${location.pathname}?amkey=${key}`;
      let handles = data.views;
      Object.keys(handles || {}).forEach(name => {
        let {metadata: {tags}, values} = handles[name];
        if (values) {
          values = values.length ? values.map(v => v.rawData) : values.rawData;
        }
        let data = {
          tags: tags ? tags.join(',') : '',
          values
        };
        /*
        if (data.metadata) {
          data.metadata.type = '<redacted>';
        }
        */
        result.push({name, data, href});
      });
    });
    return result;
  }
  dumpDb() {
    db.child('arcs').once('value').then(s => {
      this._setState({data: s.val()});
    });
  }
  _onPrivatize(e) {
    UserTools.privatize();
  }
}
customElements.define("arc-explorer", ArcExplorer);
