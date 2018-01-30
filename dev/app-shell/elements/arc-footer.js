/*
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import ArcsUtils from "../lib/arcs-utils.js";
import Xen from '../../components/xen/xen.js';
import "../../components/dancing-dots.js";
import "../../components/x-toast.js";

const template = Xen.Template.createTemplate(
  `<style>
    :host {
      display: block;
    }
    x-toast {
      background-color: white;
    }
    i {
      font-family: 'Material Icons';
      font-size: 24px;
      font-style: normal;
      -webkit-font-feature-settings: 'liga';
      -webkit-font-smoothing: antialiased;
      vertical-align: middle;
      cursor: pointer;
    }
    [search] {
      display: flex;
      align-items: center;
      padding: 4px;
      border-bottom: 1px dotted silver;
    }
    [search] input {
      flex: 1;
      padding: 7px;
      border: none;
      outline: none;
    }
  </style>
  <x-toast app-footer open="{{toastOpen}}" suggestion-container>
    <dancing-dots slot="toast-header" disabled="{{dotsDisabled}}" active="{{dotsActive}}"></dancing-dots>
    <div search>
      <input value="{{searchText}}" on-input="_onSearchChange" on-blur="_onSearchCommit">
      <i class="material-icons" on-click="_onSearchClick">search</i>
    </div>
    <slot></slot>
  </x-toast>`
);

class ArcFooter extends Xen.Base {
  static get observedAttributes() { return ['dots', 'open', 'search']; }
  get template() { return template; }
  _didMount() {
    // TODO(sjmiles): this is a hack, repair asap. App should receive this event and
    // communicate the new state to footer.
    document.addEventListener('plan-choose', e => this._onPlanSelected(e, e.detail));
  }
  _willReceiveProps(props, state) {
    // TODO(seefeld):
    //  This is a hack to open the footer only if the actual contents of the suggestions changed.
    //  Should happen upstream instead.
    if (!state.open && this.innerHTML !== state.oldInnerHTML) {
      this._setState({open: true, oldInnerHTML: this.innerHTML});
    }
  }
  _render(props, state) {
    return {
      dotsDisabled: props.dots == 'disabled',
      dotsActive: props.dots == 'active',
      searchText: state.search || '',
      toastOpen: state.open == undefined ? true : state.open
    };
  }
  _onPlanSelected(e, suggestion) {
    this._fire('suggest', suggestion);
    this._commitSearch('');
    this._setState({open: false});
  }
  // three user actions can affect search
  // 1: clicking the search icon (sets search to '*')
  _onSearchClick() {
    this._commitSearch('*');
  }
  // 2. typing in the search box (w/debouncing)
  _onSearchChange(e) {
    // TODO(sjmiles): backend search is too slow to do while typing, disable this code
    // unless and until there is a fast option (i.e. text search on existing suggestions)
    /*
    const search = e.target.value;
    // throttle re-planning until typing has stopped
    let delay = 500;
    // unless one of these is true
    //if (!search || search == '*' || search[search.length - 1] == ' ') {
    //  delay = 1;
    //}
    this._searchDebounce = ArcsUtils.debounce(this._searchDebounce, () => this._commitSearch(search), delay);
    */
  }
  // 3. committing the search input (blurring)
  _onSearchCommit(e) {
    this._commitSearch(e.target.value);
  }
  _commitSearch(search) {
    search = search || '';
    this._setState({search, open: true});
    this._fire('search', {search});
  }
}
ArcFooter.log = Xen.Base.logFactory('ArcFooter', '#673AB7');
customElements.define('arc-footer', ArcFooter);
