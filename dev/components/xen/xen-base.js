class XenBase extends XenState(XenElement) {
  get template() {
    // TODO(sjmiles): null check module?
    return this.constructor.module.querySelector('template');
  }
  get host() {
    return this.shadowRoot || this.attachShadow({mode: `open`});
  }
  _doMount() {
    this._stamp();
    this._invalidate();
  }
  _stamp() {
    let template = this.template;
    if (template) {
      this._dom = Xen.stamp(this.template).events(this).appendTo(this.host);
    }
  }
  _update(props, state) {
    let model = this._render(props, state);
    if (this._dom) {
      if (Array.isArray(model)) {
        model = model.reduce((sum, value) => Object.assign(sum, value), Object.create(null));
      }
      this._dom.set(model);
    }
  }
  _render(props, state) {
  }
}
XenBase.logFactory = (preamble, color, log='log') => console[log].bind(console, `%c${preamble}`, `background: ${color}; color: white; padding: 1px 6px 2px 7px; border-radius: 6px;`);
XenBase.log = XenBase.logFactory('XenBase', '#673AB7');