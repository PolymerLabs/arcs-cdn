
SharingTools = {
  pre: [`%csharing`, `background: #ba000d; color: white; padding: 1px 6px 2px 7px; border-radius: 6px;`],
  async init() {},
  loadSharedArcs(userName, tools) {
    let user = tools.findUser(userName);
    if (user) {
      // Pull in all of the views from all public Arcs and add them to
      // the current context.
      // TODO: remove unshared / unfriended views
      let names = user.friends.split(',');
      //console.log(`%cusers's friends are`, shareLog, names);
      //console.log(...fmt(`users's friends are`, names));
      console.log(...this.pre, `${userName}'s friends: `, names);
      names.forEach(name => {
        let user = tools.findUser(name);
        if (user && user.shared) {
          Object.keys(user.shared).forEach(amkey => {
            // TODO(sjmiles): why can `user.shared[amkey].shared` be false?
            if (user.shared[amkey].shared) {
              console.log('%cimport view into the context from amkey=', shareLog, amkey);
              this.syncSharedViews(amkey);
            }
          });
        }
      });
    }
  },
  syncSharedViews(key) {
  }
};