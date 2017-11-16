/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

(function(scope) {

const userLog = `background: #20AA20; color: white; padding: 1px 6px 2px 7px; border-radius: 6px;`;
const log = console.log.bind(console, '%cUserTools', userLog);

UserTools = {
  async init(config, arc, loader) {
    this.usersDb = db.child('users');
    let users = await this.loadUsers();
    //
    if (config.user && !this.findUser(config.user)) {
      if (config.user === 'null' || !this.createUser(config.user)) {
        config.user = '';
      }
    }
    // Set the current user to the first user if it's not set.
    if (!config.user || config.user === '') {
      config.user = users[0].name;
    }
    //
    let manifest = await Arcs.Manifest.load(`${config.root}/app-shell/artifacts/user-types.manifest`, loader);
    let personSchema = manifest.findSchemaByName('Person');
    //
    // view in arc suitable for `use`, `?`
    //
    //let identities = arc.createView(personSchema.type.viewOf(), 'Identities', arc.generateID(), ['#identities']);
    //
    // view in arc manifest for `map`, `copy`, `?`
    //
    let identities = manifest.newView(personSchema.type.viewOf(), 'Identities', arc.generateID(), ['#identities']);
    users.forEach(u => {
      identities.store({id:arc.generateID(), rawData: u});
    });
    //
    let identity = manifest.newView(personSchema.type, 'Identity', arc.generateID(), ['#identity']);
    //identity.set({id: arc.generateID(), rawData: users[0]});
    //
    //arc.context.imports.push(manifest);
    //
    this.identities = identities;
    this.identity = identity;
    this.identityManifest = manifest;
    //
    return users;
  },
  async loadUsers() {
    this.users = await this.usersDb.once('value').then(snap => snap.val());
    log(`users`, this.users);
    return this.users;
  },
  findUser(name) {
   return this.users.find(u => u.name == name);
  },
  userDb(name) {
    let key = this.users.findIndex(u => u.name === name);
    if (key > -1) {
      return this.usersDb.child(key);
    }
  },
  get currentUser() {
    return this.userName;
  },
  set currentUser(name) {
    this.userName = name;
    let user = this.findUser(name);
    if (user) {
      localStorage.setItem('currentUser', name);
      this.identity.set({id: arc.generateID(), rawData: user});
    }
  },
  async privatize() {
    if (confirm("Privatize removes sharing information that cannot be retrieved. Privatize anyway?")) {
      log('privatizing...');
      let promises = [];
      let usersSnap = await this.usersDb.once('value');
      usersSnap.forEach(snap => {
        let user = snap.val();
        log(user);
        let shared = snap.ref.child('shared');
        promises.push(shared.remove());
        let profile = snap.ref.child('profile');
        promises.push(profile.remove());
      });
      await Promise.all(promises);
      this.users = (await this.usersDb.once('value')).val();
      log(`privatize: users`, this.users);
    }
  },
  async createUser(name) {
    if (name && name !== '(none)' && confirm(`Create new user "${name}"?`)) {
      if (this.findUser(name)) {
        log(`createUser: user ${name} already exists`);
      } else {
        this.users.push({
          name: name,
          friends: ''
        });
        await this.userDataChanged();
        this.users = (await this.usersDb.once('value')).val();
        log(`createUser: users`, this.users);
      }
      return true;
    }
  },
  async userDataChanged() {
    await this.usersDb.set(this.users);
  },
  /**
   * "Who is Looking at this Arc" tracking
   *
   * `enableTracking` turns on tracking at some interval (e.g. 30s), can be called multiple times.
   *  Each invocation will force an update.
   *  `_updateTracking` creates a timestamp entry in FB for currentUser and amkey at
   *  `/arcs/<amkey>/<currentUser>` using Firebase server clock.
   *  Then each user is checked for a timestamp (for this amkey) that is not older than
   *  some interval (e.g. 60s), and the `UserTools.users` records `active` field is set accordingly
   *  Lastly, the `identities` view (which is synthesized from `UserTools.users`) is recreated,
   *  triggering updates in any particles that use `identities`.
   */
  enableTracking() {
    let period = 30; // seconds
    clearInterval(this._trackingInterval);
    this._trackingInterval = setInterval(this._updateTracking.bind(this), period*1000);
    this._updateTracking();
  },
  async _updateTracking() {
    let user = UserTools.currentUser;
    let amkey = StorageTools._amkey;
    let self = this;
    if (user && amkey) {
      let tdb = db.child(`arcs/${amkey}/users`);
      tdb.child(`${user}`).set(firebase.database.ServerValue.TIMESTAMP);
      this._lastTimestamp = (await tdb.child(`${user}`).once('value')).val();
      //log('usage timestamp:', this._lastTimestamp);
      let changed = false;
      let users = (await tdb.once('value')).val();
      this.users.forEach(user => {
        let record = this.findUser(user.name);
        let active = false;
        let stamp = users[user.name];
        if (stamp) {
          //log(`${user} t = `, this._lastTimestamp - users[user]);
          active = (self._lastTimestamp - stamp) < 60*1000;
        }
        if (record.active !== active) {
          record.active = active;
          changed = true;
        }
      });
      if (changed) {
        self._updateIdentities();
      }
    }
  },
  _updateIdentities() {
    let ids = this.identities;
    ids.toList().forEach(identity => {
      ids.remove(identity.id);
    });
    this.users.forEach(u => {
      ids.store({id: arc.generateID(), rawData: u});
    });
  }
};

scope.UserTools = UserTools;

})(this);