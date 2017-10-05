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
      if (!this.createUser(config.user)) {
        config.user = '';
      }
    }
    //
    this.id = () => arc.generateID();
    //
    let manifest = await Arcs.Manifest.load(`${config.root}/app-shell/types.manifest`, loader);
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
      identities.store({id: this.id(), rawData: u});
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
    localStorage.setItem('currentUser', name);
    let user = this.findUser(name);
    if (!user) {
      user = this.users[0];
    }
    this.identity.set({id: this.id(), rawData: user});
  },
  async privatize() {
    if (confirm("Privatize removes sharing information that cannot be retrieved. Privatize anyway?")) {
      log('privatizing...');
      let usersSnap = await this.usersDb.once('value');
      let promises = [];
      usersSnap.forEach(snap => {
        let user = snap.val();
        console.log(user);
        let shared = snap.ref.child('shared');
        promises.push(shared.remove());
        let profile = snap.ref.child('profile');
        promises.push(profile.remove());
      });
      /*
      usersSnap.forEach(snap => promises.push(snap.ref.child('shared').remove()));
      usersSnap.forEach(snap => promises.push(snap.ref.child('profile').remove()));
      */
      await Promise.all(promises);
      this.users = (await this.usersDb.once('value')).val();
      log(`privatize: users`, this.users);
    }
  },
  async createUser(name) {
    if (name && confirm(`Create new user "${name}"?`)) {
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
  }
};

scope.UserTools = UserTools;

})(this);