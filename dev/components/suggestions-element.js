/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

let template = Object.assign(document.createElement('template'), {innerHTML: `
<style>
  :host {
    display: block;
    max-height: 500px;
    overflow-y: auto;
    background-color: white;
    padding: 0 6px;
  }
  suggest {
    display: block;
    box-shadow: 0px 1px 5px 0px rgba(102,102,102,0.21);
    background-color: white;
    color: #666666;
    /*margin: 6px;*/
    padding: 4px;
    margin-bottom: 8px;
    cursor: pointer;
  }
  suggest:hover {
    background-color: rgba(86,255,86,0.25);
    box-shadow: 0px 3px 11px 0px rgba(102,102,102,0.41);
    padding-top: 2px;
    margin-bottom: 10px;
    color: black;
  }
</style>

<div></div>

`.trim()});

class SuggestionsElement extends HTMLElement {
  connectedCallback() {
    if (!this._mounted) {
      this._mounted = true;
      this._root = this.attachShadow({mode: 'open'});
      this._root.appendChild(document.importNode(template.content, true));
      this.container = this._root.querySelector('div');
    }
  }

  async addSuggestion({plan, description, rank, hash}, index) {
    let model = {
      index,
      innerHTML: await description.getRecipeSuggestion(),
      onclick: () => {
        //this.toast.open = false;
        // TODO(sjmiles): wait for toast animation to avoid jank
        setTimeout(()=>this._choose(plan), 80);
      }
    };
    let suggest = Object.assign(document.createElement("suggest"), model);
    suggest.setAttribute("hash", hash);
    suggest.onmouseover = () => {
      document.dispatchEvent(new CustomEvent("plan-hover", {detail: {hash, selected: true}}));
    }
    suggest.onmouseout = () => {
      document.dispatchEvent(new CustomEvent("plan-hover", {detail: {hash, selected: false}}));
    }
    this.container.insertBefore(suggest, this.container.firstElementChild);
  }

  add(suggestions) {
    suggestions.forEach((suggestion, i) => this.addSuggestion(suggestion, i));
  }

  set suggestions(suggestions) {
    if (this._suggestions !== suggestions) {
      this._suggestions = suggestions;
      this.container.textContent = "";
      suggestions && this.add(suggestions);
    }
  }

  _choose(plan) {
    this.container.textContent = "";
    this.dispatchEvent(new CustomEvent("plan-selected", {
      detail: { plan }
    }));
  }

}

customElements.define('suggestions-element', SuggestionsElement);
