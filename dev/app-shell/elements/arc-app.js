/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import ArcsUtils from "../lib/arcs-utils.js";

const template = Object.assign(document.createElement('template'), {innerHTML:
`<style>
  arc-app, [arc-app] {
    display: block;
  }
  app-main {
    display: block;
    overflow: hidden;
  }
  app-tools {
    display: none;
  }
  toolbar {
    display: block;
    height: 40px;
  }
  .material-icons, toolbar i {
    font-family: 'Material Icons';
    font-size: 24px;
    font-style: normal;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
  }
  app-toolbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 40px;
    display: flex;
    align-items: center;
    white-space: nowrap;
    padding-left: 12px;
    box-sizing: border-box;
    background-color: whitesmoke;
    z-index: 1000;
    transform: translate(0,0,0); /* makes it a layer so other layers scroll underneath, is there a better way? */
  }
  app-toolbar > *, app-toolbar > [buttons] > * {
    padding-right: 12px;
  }
  app-toolbar > [arc-title] {
    flex: 1;
    min-height: 0.6em;
    padding-top: 0.1em;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  app-toolbar > select {
    padding: 2px 0;
    margin-right: 8px;
    width: 96px;
  }
  [arc-app][launcher] app-toolbar > [buttons] {
    display: none;
  }
  app-toolbar > [buttons] {
    display: none;
    white-space: nowrap;
    align-items: center;
    padding-right: 0;
  }
  footer {
    display: block;
    height: 40px;
  }
  arc-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: white;
  }
  [hidden] {
    display: none;
  }
  [illuminate] [particle-host] {
    border: 1px solid #ea80fc;
    border-top: 18px solid #ea80fc;
    position: relative;
    border-radius: 8px 8px 0 0;
  }
  [illuminate] [particle-host]::before {
    content: attr(particle-host);
    position: absolute;
    top: -16px;
    left: 4px;
    font-size: 12px;
    font-family: monospace;
  }
  /* wider-than-mobile */
  @media (min-width: 500px) {
    [expanded] app-main, [expanded] app-toolbar, [expanded] arc-footer {
      margin: 0;
      width: 424px;
      max-width: 424px;
    }
    [expanded] app-tools {
      display: block;
      position: fixed;
      left: 424px;
      right: 0;
      top: 0;
      bottom: 0;
      overflow: auto;
      border-left: 1px solid silver;
    }
  }
</style>

<app-main>
  <!--<arc-auth on-auth="_onAuth"></arc-auth>-->
  <arc-config rootpath="{{cdnPath}}" on-config="_onConfig"></arc-config>
  <persistent-arc key="{{suggestKey}}" on-key="_onKey" metadata="{{metadata}}" on-metadata="_onMetadata"></persistent-arc>
  <persistent-users on-users="_onUsers"></persistent-users>
  <persistent-user id="{{userId}}" user="{{user}}" key="{{key}}" on-user="_onUser"></persistent-user>
  <persistent-manifests manifests="{{manifests}}" on-manifests="_onManifests" exclusions="{{exclusions}}" on-exclusions="_onExclusions"></persistent-manifests>
  <persistent-handles arc="{{arc}}" key="{{key}}"></persistent-handles>
  <remote-profile-handles arc="{{arc}}" user="{{user}}" on-friends="_onFriends"></remote-profile-handles>
  <remote-shared-handles arc="{{arc}}" user="{{user}}" friends="{{friends}}"></remote-shared-handles>
  <remote-friends-profiles-handles arc="{{arc}}" friends="{{friends}}" user="{{user}}"></remote-friends-profiles-handles>
  <arc-handle arc="{{arc}}" data="{{arcsHandleData}}" options="{{arcsHandleOptions}}" on-handle="_onArcsHandle"></arc-handle>
  <arc-handle arc="{{arc}}" data="{{identityHandleData}}" options="{{identityHandleOptions}}" on-handle="_onIdentityHandle"></arc-handle>
  <arc-handle arc="{{arc}}" data="{{identitiesHandleData}}" options="{{identitiesHandleOptions}}" on-handle="_onIdentitiesHandle"></arc-handle>
  <arc-handle arc="{{arc}}" data="{{friendsAvatarData}}" options="{{friendsAvatarHandleOptions}}"></arc-handle>
  <arc-steps plans="{{plans}}" plan="{{plan}}" steps="{{steps}}" step="{{step}}" on-step="_onStep" on-steps="_onSteps"></arc-steps>
  <!-- only for launcher -->
  <remote-visited-arcs user="{{launcherUser}}" arcs="{{visitedArcs}}" on-arcs="_onVisitedArcs"></remote-visited-arcs>
  <!-- toolbar is here only to reserve space in the static flow, the app-toolbar is position-fixed -->
  <toolbar>
    <app-toolbar>
      <i style="color: #9c27b0;" title="Arcs" on-click="_onNavClick">donut_small</i>
      <span arc-title style%="{{titleStatic}}" on-click="_onStartEditingTitle" unsafe-html="{{description}}"></span>
      <select on-change="_onUserSelected">{{usersOptions}}</select>
      <template users-options>
        <option value="{{value}}" selected="{{selected}}">{{user}}</option>
      </template>
      <div buttons style%="{{toolbarButtonsStyle}}">
        <toggle-button title="Arc Contains Profile Data" state="{{profileState}}" on-state="_onProfileState" icons="person_outline person"></toggle-button>
        <toggle-button title="Share this Arc" state="{{sharedState}}" on-state="_onSharedState" icons="link supervisor_account"></toggle-button>
        <toggle-button title="Cast" on-state="_onCastState" icons="cast cast_connected"></toggle-button>
        <i on-click="_onNewArcClick">note_add</i>
      </div>
    </app-toolbar>
  </toolbar>
  <arc-host config="{{hostConfig}}" manifests="{{manifests}}" exclusions="{{exclusions}}" plans="{{plans}}" plan="{{plan}}" on-arc="_onArc" on-plans="_onPlans" on-applied="_onApplied">
    <div slotid="toproot"></div>
    <div slotid="root"></div>
  </arc-host>
  <footer hidden="{{hideFooter}}">
    <arc-footer dots="{{dots}}" hidden="{{hideFooter}}" on-suggest="_onSuggest" on-search="_onMakeSuggestions">
      <div slotid="suggestions"></div>
    </arc-footer>
  </footer>
</app-main>
<app-tools>
  <simple-tabs>
    <div tab="Manifests">
      <local-data manifest="{{manifest}}" on-update-manifest="_onUpdateManifest" on-promote-manifest="_onPromoteManifest"></local-data>
      <manifest-data manifests="{{manifests}}" exclusions="{{exclusions}}" on-exclusions="_onExclusions"></manifest-data>
    </div>
    <div tab="Arc Explorer">
      <arc-explorer user="{{user}}"></arc-explorer>
    </div>
    <div tab="App State">
      <data-explorer style="font-size: 0.6em;" object="{{appState}}"></data-explorer>
    </div>
  </simple-tabs>
</app-tools>`
});

class ArcApp extends XenBase {
  get host() {
    // TODO(sjmiles): override shadow-root generation so that
    // old-timey systems (e.g. TradingView widgets) can find
    // various bits in `document` when used in Particles.
    // Note that using light-dom exposes style-leakage concerns.
    return this;
  }
  get template() {
    return template;
  }
  _getInitialState() {
    let cdnPath = window.shellPath;
    //let cdnPath = ArcApp.module.URL.split('/').slice(0, -3).join('/');
    let typesPath = `${cdnPath}/app-shell/artifacts`;
    return {
      cdnPath,
      arcsHandleOptions: {
        schemas: `${typesPath}/arc-types.manifest`,
        type: '[ArcMetadata]',
        name: 'ArcMetadata',
        tags: ['#arcmetadata']
      },
      identityHandleOptions: {
        schemas: `${typesPath}/identity-types.manifest`,
        type: 'Person',
        name: 'User',
        tags: ['#user']
      },
      identitiesHandleOptions: {
        schemas: `${typesPath}/identity-types.manifest`,
        type: '[Person]',
        name: 'Identities',
        tags: ['#identities']
      },
      friendsAvatarHandleOptions: {
        schemas: `${typesPath}/identity-types.manifest`,
        type: '[Avatar]',
        name: 'FRIENDS_PROFILE_avatar',
        id: 'FRIENDS_PROFILE_avatar',
        tags: ['#friends_avatar'],
        asContext: true
      },
      friendsAvatarData: {},
      auth: true
    }
  }
  _didMount() {
    this.setAttribute('arc-app', '');
    this._initHotKeys();
    this._initGeolocation();
  }
  _update(props, state, lastProps, lastState) {
    // for debugging
    window.app = this;
    window.state = state;
    window.arc = state.arc;
    window.user = state.user;
    window.users = state.users;
    state.appState = state;
    //
    if (state.arc && state.user && (state.user !== lastState.user || !state.identityHandleData
        || state.geoCoords !== lastState.geoCoords)) {
      state.identityHandleData = this._synthesizeIdentityHandleData(
          state.arc, state.user, state.geoCoords);
    }
    if (state.users && (state.users !== lastState.users || !state.identitiesHandleData)) {
      state.identitiesHandleData = this._sythesizeIdentitiesHandleData(state.users);
    }
    if (!state.plan && state.plans && state.plans.length && (state.config.launcher || state.config.profiler)) {
      state.plan = state.plans[0].plan;
    }
    if (state.user) {
      state.userId = state.user.id;
      ArcsUtils.setUrlParam('user', state.userId);
    }
    if (state.key) {
      ArcsUtils.setUrlParam('arc', state.key);
    }
    if (state.newSteps) {
      this._updateMetadata({steps: state.newSteps});
      state.newSteps = null;
    }
    super._update(props, state);
  }
  _render(props, state) {
    // only persistent-arc ever gets '*', which it converts into a real key;
    // state.key is blank in the interim
    state.suggestKey = state.key;
    if (state.key === '*') {
      state.key = '';
    }
    // show toolbar buttons if not launcher
    state.toolbarButtonsStyle = !state.config || state.config.launcher ? '' : 'display: flex;';
    // unpack arc metadata for rendering
    if (state.metadata) {
      state.description = state.metadata.description;
      state.steps = state.metadata.steps;
    }
    // unpack user for rendering
    if (state.user) {
      state.userName = state.user.name;
    }
    if (state.config && state.key && state.user) {
      // modifying config only matters before initializing arc-host
      let isProfile = state.user.profiles && state.user.profiles[state.key];
      if (isProfile && !state.arc) {
        ArcApp.log('is a profile Arc, setting soloPath to "profile.manifest"');
        state.config.soloPath = 'profile.manifest';
      }
      let isShared = state.user.shares && state.user.shares[state.key];
      // unpack button states
      state.profileState = isProfile ? 1 : 0;
      state.sharedState = isShared ? 1 : 0;
    }
    // enable remote-visited-arcs if running as launcher
    if (state.config && state.config.launcher) {
      state.launcherUser = state.user;
    }
    // do not send config data to arc-host before `user` is ready
    state.hostConfig = state.user ? state.config : null;
    // populate user select
    state.usersOptions = {
      $template: 'users-options',
      models: this._renderUserOptionModels(state.users, state.user)
    };
    state.hideFooter = state.config && state.config.launcher;
    state.dots = state.plans == null ? 'active' : '';
    // must have `auth` before doing anything else
    return state.auth ? state : null;
  }
  _didRender(props, state) {
    // toggles boolean attribute `expanded` on `this`
    Xen.setBoolAttribute(this, 'expanded', Boolean(state.arcsToolsVisible));
    if (state.config) {
      localStorage.setItem('0-3-arcs-dev-tools', state.arcsToolsVisible ? 'open' : 'closed');
    }
    Xen.setBoolAttribute(this, 'illuminate', Boolean(state.illuminateParticles));
  }
  _renderUserOptionModels(users, user) {
    let models = [
      {user: '(none)'},
      {user: '* New User'}
    ];
    if (users) {
      let selectedId = user ? user.id : '';
      models = models.concat(Object.keys(users).map(id => {
        return {
          value: id,
          user: users[id].name,
          selected: id == selectedId
        }
      }));
    }
    return models;
  }
  _synthesizeIdentityHandleData(arc, user, geoCoords) {
    return {
      id: user.id,
      name: user.name,
      location: geoCoords ? {
        latitude: geoCoords.latitude,
        longitude: geoCoords.longitude
      } : null
    };
  }
  _sythesizeIdentitiesHandleData(users) {
    return Object.keys(users).map(id => {
      return {
        id: id,
        name: users[id].name
      };
    });
  }
  /*
  _hasHandles(state) {
    return Boolean(state.arcsHandle && state.identityHandle && state.identitiesHandle);
  }
  */
  _setIfDirty(object) {
    let dirty = null;
    for (let property in object) {
      let value = object[property];
      if (this._state[property] !== value) {
        if (!dirty) {
          dirty = {};
        }
        dirty[property] = value;
      }
    }
    if (dirty) {
      this._setState(dirty);
      return true;
    }
  }
  _initHotKeys() {
    addEventListener('keydown', e => {
      if (e.ctrlKey && !{input:1, textArea:1}[e.target.localName] && this.hotkey(e.key, e)) {
        e.preventDefault();
      }
    });
  }
  hotkey(key, e) {
    switch(key) {
      case 'i':
        this._onToggleIlluminate(e);
        break;
      default:
        return false;
    }
    return true;
  }
  _onConfig(e, config) {
    let user = null;
    let userId = config.user;
    let key = config.key || '';
    if (!config.key) {
      config.key = 'launcher';
    }
    if (config.key === 'launcher') {
      config.soloPath = /*config.soloPath ||*/ 'launcher.manifest';
      config.launcher = true;
      key = '';
    }
    if (config.key === 'profile') {
      config.soloPath = 'profile.manifest';
      config.profiler = true;
      key = '*';
    }
    if (userId === 'new') {
      userId = null;
      user = this._newUserPrompt();
      ArcApp.log('new user', user);
    }
    //config.suggestionsNode = this.querySelector('suggestions-element');
    this._setState({config, key, userId, user, arcsToolsVisible: config.arcsToolsVisible});
  }
  _onToggleIlluminate() {
    this._setState({illuminateParticles: !this._state.illuminateParticles});
  }
  _onNavClick() {
    this._setState({arcsToolsVisible: !this._state.arcsToolsVisible});
  }
  _onAuth(e, auth) {
    this._setState({auth});
  }
  _onUsers(e, users) {
    this._setIfDirty({users});
  }
  _onUserSelected(e) {
    let user, userId;
    switch (e.currentTarget.selectedIndex) {
      case 0:
        break;
      case 1:
        this._onNewUser(e);
        return;
      default:
        userId = e.currentTarget.value
        break;
    }
    ArcApp.log('switching user', user, userId);
    this._setState({user, userId});
  }
  _onNewUser(e) {
    let url = `?arc=profile&user=new`;
    open(url, '_blank');
  }
  _newUserPrompt() {
    // returns String 'null' (sheesh) on cancel
    let name = prompt('User name?', 'User');
    if (name !== "null") {
      return {name};
    }
  }
  _onUser(e, user, props, state) {
    // TODO(sjmiles): in the new user flow, stale `user` record can be received after the
    // app sets state.user.name but before persistent-user constructs the new user.
    // This is fixed here by careful examination of the state data.
    // Other ways of fixing: (1) examine the timing issues, make sure we are doing the right things, (2) stop
    // multiplexing `user` object to request user-creation.
    if ((state.user && state.user.name && !state.user.id) || user) {
      // reference testing, remember to treat `user` as immutable
      if (this._setIfDirty({user})) {
        if (user) {
          localStorage.setItem('0-3-currentUser', user.id);
        }
      }
    }
  }
  _onVisitedArcs(e, visited) {
    ArcApp.log('_onVisitedArcs: ', visited);
    let user = this._state.user;
    if (user) {
      let data = Object.keys(visited).map(key => {
        let {metadata, profile} = visited[key];
        let href = `${location.origin}${location.pathname}?arc=${key}&user=${user.id}`;
        if (metadata.externalManifest) href += `&manifest=${metadata.externalManifest}`;
        return {
          key: key,
          description: metadata.description || key.slice(1),
          icon: metadata.icon || 'broken_image',
          color: metadata.color || 'gray',
          href: href,
          profile: profile
        };
      });
      /*
      // prepend New User item
      data.unshift({
        key: '*',
        blurb: 'New User',
        description: 'New User',
        icon: 'new_releases',
        color: 'gray',
        href: `?arc=profile&user=new`
      });
      */
      // prepend New Arc item
      data.unshift({
        key: '*',
        blurb: 'New Arc',
        description: 'New Arc',
        icon: 'star',
        color: 'black',
        href: `?arc=*&user=${user.id}`
      });
      this._setState({arcsHandleData: data});
    }
  }
  _onFriends(e, friends) {
    this._setIfDirty({friends});
  }
  _onNewArcClick(e) {
    open(`${location.origin}${location.pathname}`, `_blank`);
  }
  _onKey(e, key) {
    this._setState({key});
  }
  _onArc(e, arc) {
    this._setState({arc});
    if (arc && this._state.config.profiler) {
      this._modifyProfileState(true);
    }
  }
  async _onArcsHandle(e, arcsHandle) {
    this._installSyntheticHandle('arcsHandle', arcsHandle);
    let visitedArcs = await ArcsUtils.getHandleData(arcsHandle);
    this._setState({visitedArcs});
    ArcApp.log('visitedArcs: ', visitedArcs);
  }
  _onIdentityHandle(e, identityHandle) {
    this._installSyntheticHandle('identityHandle', identityHandle);
  }
  _onIdentitiesHandle(e, identitiesHandle) {
    this._installSyntheticHandle('identitiesHandle', identitiesHandle);
  }
  _installSyntheticHandle(name, handle) {
    ArcApp.log(name, handle);
    let state = {
      plans: null
    };
    state[name] = handle;
    this._setState(state);
  }
  _onMetadata(e, metadata) {
    this._setIfDirty({metadata});
  }
  _onProfileState(e, profileState) {
    ArcApp.log('profile state changed', profileState);
    this._modifyProfileState(profileState);
  }
  _modifyProfileState(profileState) {
    let {user, key} = this._state;
    if (user && key) {
      user.profiles = user.profiles || Object.create(null);
      if (Boolean(user.profiles[key]) !== Boolean(profileState)) {
        if (profileState) {
          user.profiles[key] = true;
        } else {
          delete user.profiles[key];
        }
        ArcApp.log('mutating user object (onProfileState)', user);
        // `state.user` is considered immutable, need a copy
        this._setState({user: Object.assign(Object.create(null), user)});
      }
    }
  }
  _onSharedState(e, sharedState) {
    ArcApp.log('shared state changed', sharedState);
    let {user, key} = this._state;
    if (user) {
      user.shares = user.shares || Object.create(null);
      if (sharedState) {
        user.shares[key] = true;
      } else {
        delete user.shares[key];
      }
      ArcApp.log('mutating user object (onSharedState)', user);
      // `state.user` is considered immutable, need a copy
      this._setState({user: Object.assign(Object.create(null), user)});
    }
  }
  _onSteps(e, steps) {
    this._setState({newSteps: steps})
  }
  _onPlans(e, plans) {
    if (this._setIfDirty({plans})) {
      if (plans) {
        this._fire('generations', plans.generations, document);
      }
    }
  }
  _onStep(e, step) {
    this._setState({plan: step.plan});
  }
  _onSuggest(e, suggestion) {
    this._setState({plan: suggestion.plan});
  }
  _onMakeSuggestions(e) {
    let search = e.detail.search;
    if (state.arc._search != search) {
      state.arc._search = search;
      this._setState({plans: null});
    }
  }
  async _onApplied(e, plan, props, state) {
    let description = await ArcsUtils.describeArc(state.arc);
    if (!description && !state.description) {
      description = ArcsUtils.randomName();
    }
    if (description && description !== state.description) {
      this._updateMetadata({description});
      this._setState({description});
    }
    // must re-plan
    this._setState({plans: null});
  }
  _updateMetadata(data) {
    let {metadata} = this._state;
    if (metadata && data) {
      // `metadata` is considered immutable downstream (have to make a new reference or it's not considered changed)
      metadata = Object.assign(Object.assign(Object.create(null), metadata), data);
      // set new object to state
      this._setState({metadata});
    }
  }
  _onUpdateManifest(e, manifestPath) {
    ArcApp.log(`onUpdateManifest: [${manifestPath}]`);
    this._setState({manifestPath});
  }
  _onPromoteManifest(e) {
    let state = this._state;
    //ArcApp.log(`onPromoteManifest: [${state.manifestPath}]`);
    if (state.manifestPath) {
      let manifests = (state.manifests || []).concat([state.manifestPath]);
      ArcApp.log(`onPromoteManifest: [${manifests}]`);
      this._setState({manifestPath: '', manifests: manifests.slice()})
    }
  }
  _onManifests(e, manifests) {
    this._setIfDirty({manifests});
  }
  _onExclusions(e, exclusions) {
    this._setIfDirty({exclusions});
  }
  _initGeolocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(position => {
        this._setState({geoCoords: position.coords});
      });
    }
  }
}
ArcApp.log = XenBase.logFactory('ArcApp', '#bb4d00');
customElements.define('arc-app', ArcApp);
