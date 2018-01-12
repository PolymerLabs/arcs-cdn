import XenTemplate from "./xen-template.js";
import XenState from "./xen-state.js";
import XenElement from "./xen-element.js";
import XenBase from "./xen-base.js";

// TODO(sjmiles): for backward-compatibility only
window.Xen = XenTemplate;
window.XenState = XenState;
window.XenElement = XenElement;
window.XenBase = XenBase;

export default {
  XenState,
  XenTemplate,
  XenElement,
  XenBase
};
