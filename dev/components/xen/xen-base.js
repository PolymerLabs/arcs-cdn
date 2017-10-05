class XenBase extends XenState(XenElement) {
  get template() {
    // TODO(sjmiles): null check module and template
    return this.constructor.module.querySelector('template');
  }
  _doMount() {
    this._stamp();
  }
  _stamp() {
    this._dom = Xen.stamp(this.template).events(this).appendTo(this);
  }
  _update(props, state) {
    this._dom.set(this._render(props, state));
  }
}
