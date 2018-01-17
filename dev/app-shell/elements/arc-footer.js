/*
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import "../../components/dancing-dots.js";
import "../../components/x-toast.js";
import XenBase from "../../components/xen/xen-base.js";

const template = Object.assign(document.createElement('template'), {innerHTML:
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
      <input value="{{searchText}}" on-input="_onSearchChange" on-blur="_onSearchDone">
      <i class="material-icons" on-click="_onSearchClick">search</i>
    </div>
    <slot></slot>
  </x-toast>`
});

class ArcFooter extends XenBase {
  static get observedAttributes() { return ['suggestions', 'dots', 'open', 'search']; }
  get template() { return template; }
  _didMount() {
    // TODO(sjmiles): this is a hack, repair asap. App should receive this event and
    // communicate the new state to footer.
    document.addEventListener('plan-choose', e => this._onPlanSelected(e, e.detail));
  }
  _render(props, state) {
    return {
      dotsDisabled: props.dots == 'disabled',
      dotsActive: props.dots == 'active',
      searchText: state.search || '',
      toastOpen: state.open == undefined ? true : state.open,
      suggestions: this._filterPlans(props.suggestions, state.search)
    };
  }
  _onPlanSelected(e, suggestion) {
    this._fire('suggest', suggestion);
    this._doBackendSearch(null);
    this._setState({open: false});
  }
  _onSearchClick(e) {
    this._updateSearchState('*');
  }
  _onSearchChange(e) {
    let search = e.target.value;
    if (!search || search == '*' || search[search.length - 1] == ' ') {
      this._doBackendSearch(search);
    } else {
      this._updateSearchState(search);
    }
  }
  _onSearchDone(e) {
    this._doBackendSearch(e.target.value);
  }
  _prepareSearchTermForBackendSearch(search) {
    if (search) {
      search = search.trim();
      if (search && search !== '*') {
        return search.toLowerCase();
      }
    }
    return null;
  }
  _doBackendSearch(search) {
    this._fire('search', {search: this._prepareSearchTermForBackendSearch(search)});  // triggers planner
    this._updateSearchState(search);
  }
  _updateSearchState(search) {
    this._setState({search, open: true});
  }
  _filterPlans(plans, term) {
    if (!plans) {
      return [];
    }
    if (!term) {
      // empty string = show suggestions matching current slots, i.e.
      // suggestions furthering current flow, but not those just appending
      // TODO(seefeld): Also add suggestions based on in-arc handles?
      return plans.filter(p => p.plan.slots && !p.plan.slots.find(s => s.name == 'root'));
    } else if (term === '*' || term.length <= 2) {
      return plans;
    } else {
      let terms = term.trim().toLowerCase().match(/\b(\w+)\b/g);
      return plans.filter(p => {
        let desc = p.descriptionText.toLowerCase();
        let searchPhrase = p.plan.search ? p.plan.search.phrase : '';
        // TODO: don't match words like "and" etc.
        // TODO: highlight the matching terms in the description in suggestion UI
        return terms.some(t => (desc.indexOf(t) >= 0) || (searchPhrase.indexOf(t) >= 0));
      });
    }
  }
}
ArcFooter.log = XenBase.logFactory('ArcFooter', '#673AB7');
customElements.define('arc-footer', ArcFooter);
