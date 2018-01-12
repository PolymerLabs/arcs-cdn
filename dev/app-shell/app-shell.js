import Xen from "../components/xen/xen.js";
import TB from "../components/toggle-button.js";
import ST from "../components/simple-tabs.js";
import "../components/suggestion-element.js";

document.body.appendChild(Object.assign(document.createElement('link'), {
  rel: 'import',
  href: `${shellPath}/app-shell.html`
}));
