const userLog = `background: #20AA20; color: white; padding: 1px 6px 2px 8px; border-radius: 6px;`;

/*
let users = [
  {
    name: "Melchior",
    friends: "Caspar",
    foods: "Frankincense",
    avatar: "user (1).jpg"
  },
  {
    name: "Caspar",
    friends: "Melchior,Balthazar",
    foods: "Myrrh,Frankincense",
    avatar: "user (2).jpg"
  },
  {
    name: "Balthazar",
    friends: "Melchior",
    foods: "Gold",
    avatar: "user (3).jpg"
  }
];
*/

UserTools = {
  async init(arc, loader) {
    let users = await db.child('users').once('value').then(snap => snap.val());
    //
    this.id = () => arc.generateID();
    //
    let manifest = await Arcs.Manifest.load('./types.manifest', loader);
    let personSchema = manifest.findSchemaByName('Person');
    //console.log(`%cpersonSchema`, userLog, personSchema);
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
    arc.context.imports.push(manifest);
    //console.log(`%arc.context`, userLog, arc.context);
    //
    this.userName = localStorage.getItem('currentUser') || '';
    this.users = users;
    this.identities = identities;
    this.identity = identity;
    //
    return users;
  },
  findUser(name) {
   return this.users.find(u => u.name == name);
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
    /*
    let identities = arc.context.findViewsByType(personSchema.type, {tags: ['#identity']});
    identities.forEach(ident => {
      let p = new Person({
        name: user
      });
      p.id = arc.generateID();
      console.log(p);
      //ident.set(p);
      //v.set({id: arc.generateID(), rawData: p.dataClone()});
    });
    */
    /*
    // TODO: fix this somehow. This is super ugly right now.
    let personSchema = arc.context.findSchemaByName('Person');
    if (personSchema) {
      arc.context.findViewsByType(personSchema.type, {tags: ['#identity']}).forEach(v => {
        let Person = personSchema.entityClass();
        let p = new Person({name: user});
        v.set({id: arc.generateID(), rawData: p.dataClone()});
      });
    }
    this._updateSharedStateIcon();
    if (this._users && this._currentUser && this._users[this._currentUser]) {
      this._updateCurrentUsersData(this._users[this._currentUser]);
    }
    this._loadSharedArcs();
    this._setState({user, users: this._users});
    */
  }
};