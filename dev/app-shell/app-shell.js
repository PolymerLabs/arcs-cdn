import XenTemplate from "../components/xen/xen-template.js";
import XenState from "../components/xen/xen-state.js";
import XenElement from "../components/xen/xen-element.js";
import XenBase from "../components/xen/xen-base.js";

window.Xen = XenTemplate;
window.XenState = XenState;
window.XenElement = XenElement;
window.XenBase = XenBase;

document.body.appendChild(Object.assign(document.createElement('link'), {
  rel: 'import',
  href: `${shellPath}/app-shell.html`
}));
