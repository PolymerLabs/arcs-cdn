/*
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

class RemoteProfileHandles extends XenBase {
  static get observedAttributes() { return ['arc', 'user']; }
  _getInitialState() {
    let group = new WatchGroup();
    group.db = db;
    return {
      group
    };
  }
  _update(props, state, lastProps) {
    if (props.user && props.user !== lastProps.user) {
      state.user = props.user;
    }
    if (props.arc && state.user) {
      state.user = null;
      state.group.watches = this._watchProfileHandles(props.user, props.arc, state.friends);
    }
  }
  _watchProfileHandles(user, arc, friends) {
    let profiles = Arcs.utils.getUserProfileKeys(user);
    return profiles.map(key => {
      return {
        // TODO(sjmiles): path is technically not firebase specific
        // TODO(wkorman): Rename `views` to `handles` below on the next database rebuild.
        path: `arcs/${key}/views`,
        // TODO(sjmiles): firebase knowledge here
        handler: snapshot => this._remoteHandlesChanged(arc, friends, snapshot.key, snapshot.val())
      }
    });
  }
  _remoteHandlesChanged(arc, friends, key, remotes) {
    if (remotes) {
      // TODO(sjmiles): these are remote-data-describing-a-handle ... cow needs a name
      RemoteProfileHandles.log(`READING handles`, remotes);
      Object.keys(remotes).forEach(async key => {
        // TODO(sjmiles): `key` used to mean `amkey`, at some point I accidentally started sending _handle_ keys
        // but nothing broke ... I assume this was not injurious because these data are remote and not persistent
        let handle = await Arcs.utils.createOrUpdateHandle(arc, remotes[key], 'PROFILE');
        RemoteProfileHandles.log('created/updated handle', handle.id);
        this._synthesizeFriendsHandle(friends, handle);
        //this._fire('handle', {handle});
      });
    }
  }
  // TODO(sjmiles): special handling for `friends` handle, should this be factored out?
  _synthesizeFriendsHandle(friends, handle) {
    // TODO(sjmiles): `friends` is only captured once, assumption is that this handle is immortal
    if (!friends && handle.id == 'PROFILE_!Person!_friends') {
      this._state.friends = handle;
      handle.on('change', this._friendsHandleChanged.bind(this, handle), this);
      this._friendsHandleChanged(handle);
    }
  }
  async _friendsHandleChanged(handle) {
    let data = await Arcs.utils.getHandleData(handle);
    RemoteProfileHandles.log('FRIENDS handle changed:', data);
    this._fire('friends', data);
  }
}
RemoteProfileHandles.log = XenBase.logFactory('RemotePHs', '#003c8f');
customElements.define('remote-profile-handles', RemoteProfileHandles);
