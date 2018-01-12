import "../components/xen/xen.js";
import "../components/toggle-button.js";
import "../components/simple-tabs.js";
import "../components/suggestion-element.js";
import "./elements/arc-store.js";

document.body.appendChild(Object.assign(document.createElement('link'), {
  rel: 'import',
  href: `${shellPath}/app-shell.html`
}));
