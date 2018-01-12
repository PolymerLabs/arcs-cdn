/*
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

// Components.
import "../components/xen/xen.js";
import "../components/toggle-button.js";
import "../components/arc-tools/explorer-hotkey.js";
import "../components/arc-tools/local-data.js";
import "../components/arc-tools/manifest-data.js";
import "../components/arc-tools/shell-particles.js";
import "../components/simple-tabs.js";
import "../components/suggestion-element.js";

// Elements.
import "./elements/arc-footer.js";
import "./elements/arc-handle.js";
import "./elements/arc-steps.js";
import "./elements/arc-store.js";
import "./elements/persistent-arc.js";
import "./elements/persistent-handles.js";
import "./elements/persistent-manifests.js";
import "./elements/persistent-user.js";
import "./elements/persistent-users.js";
import "./elements/remote-friends-profile-handles.js";
import "./elements/remote-profile-handles.js";
import "./elements/remote-shared-handles.js";
import "./elements/remote-visited-arcs.js";
// TODO(wkorman): Nothing uses a watch-group element. Should we just rely
// on classes that need to instantiate this to import directly and remove here?
import "./elements/watch-group.js";

document.body.appendChild(Object.assign(document.createElement('link'), {
  rel: 'import',
  href: `${shellPath}/app-shell.html`
}));
