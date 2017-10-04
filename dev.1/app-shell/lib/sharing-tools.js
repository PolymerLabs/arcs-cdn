(function(scope) {

const pre = [`%cSharingTools`, `background: #005b4f; color: white; padding: 1px 6px 2px 7px; border-radius: 6px;`];
const log = console.log.bind(console, ...pre);

SharingTools = {
  init(shell) {
    this._shell = shell;
    this._appliedSteps = {};
  },
  watchSharedArcs() {
    StorageTools.shared.unwatchAll();
    let user = UserTools.findUser(UserTools.currentUser);
    if (user) {
      let watches = [];
      // Pull in all of the views from all public Arcs and add them to
      // the current context.
      // TODO: remove unshared / unfriended views
      this._watchFriendsArcs(user, watches);
      // Also sync the user's profile views.
      this._watchProfileArcs(user, watches);
      // Setup the watches
      log(`watchSharedArcs `, watches);
      StorageTools.shared.watchAll(watches, () => this._shell.viewsChanged());
    }
  },
  _watchFriendsArcs(user, watches) {
    let names = (user.friends || '').split(',');
    log(`_watchFriendsArcs: ${user.name}'s friends: `, names);
    names.forEach(name => {
      let friend = UserTools.findUser(name);
      if (friend && friend.shared) {
        this._watchFriendsArc(friend, watches);
      }
    });
  },
  _watchFriendsArc(friend, watches) {
    Object.keys(friend.shared).forEach(amkey => {
      // TODO(sjmiles): why can `user.shared[amkey].shared` be false?
      if (friend.shared[amkey].shared) {
        log('_watchFriendsArc: adding view to watch from amkey=', amkey);
        watches.push({
          key: amkey,
          isProfile: false,
          isFriendProfile: Boolean((friend.profile || {})[amkey])
        });
      }
    });
  },
  _watchProfileArcs(user, watches) {
    if (user.profile) {
      Object.keys(user.profile).forEach(key => {
          log(`_watchProfileArcs: adding view to watch for ${user.name}:`, key);
          watches.push({key, isProfile: true, isFriendProfile: false});
        }
      );
    }
  },
  addAcceptedStep(plan, generations) {
    let step = this._findOriginatingStep(plan, generations);
    log("addAcceptedStep", step);
    this._steps = this._steps || [];
    this._steps.push(step);
    this._appliedSteps[step.hash] = true;
    StorageTools.syncAcceptedSteps(this._steps);
  },
  _findOriginatingStep(plan, generations) {
    let first_generation = this._findFirstGeneration(plan, generations);
    if (first_generation) {
      // Really, we should only store the string and upon loading normalize it
      // again and create a new hash. But really, really we should probably
      // do something smarter than literal matching anyway...
      return {
        recipe: first_generation.result.toString(),
        hash: first_generation.hash
      };
    }
  },
  async newAcceptedSteps(steps) {
    // Assume same length means we just get our own latest state
    if (steps && (!this._steps || steps.length !== this._steps.length)) {
      log('newAcceptedSteps', steps);
      this._steps = steps;
      this.applyAcceptedSteps();
    }
    this._shell.stepsChanged();
  },
  applyAcceptedSteps(plans) {
    if (!this._steps || !plans) return;
    if (!this._appliedSteps) this._appliedSteps = {};
    plans.forEach(suggestion => {
      let first_generation = this._findFirstGeneration(suggestion.plan, plans.generations);
      if (!first_generation) {
        console.warn(...pre, "can't find first generation of", plan, "in", plans.generations);
        return;
      }
      // TODO: Allow re-applying same step unless its on the root slot.
      // Will make sense once verbs, etc. work and different slots, etc.
      // resolve differently.
      if (!this._appliedSteps[first_generation.hash]) {
        let matching_step = this._steps.find(step => step.hash == first_generation.hash);
        if (matching_step) {
          log("Auto applying: ", matching_step, suggestion);
          this._appliedSteps[matching_step.hash] = true;
          this._shell.applySuggestion(suggestion.plan);
        } else {
          console.warn(...pre, "applyAcceptedSteps: failed to match plan hash", this._steps);
        }
      }
    });
  },
  _findFirstGeneration(plan, generations) {
    let last_generation;
    // Search generations in reverse order for the accepted plan
    generations.reverse().find(
      generation => last_generation = generation.find(member => member.result == plan)
    );
    if (!last_generation) {
      log("no originating generation found for", plan);
      return null;
    }
    // Walk derivation tree up to root. All paths will lead to the same root,
    // hence we can always take the first branch.
    let first_generation = last_generation;
    while (first_generation.derivation[0].parent) {
      first_generation = first_generation.derivation[0].parent;
    }
    return first_generation;
  }
};

scope.SharingTools = SharingTools;

})(this);
