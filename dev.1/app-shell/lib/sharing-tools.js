(function() {

const pre = [`%cSharingTools`, `background: #005b4f; color: white; padding: 1px 6px 2px 7px; border-radius: 6px;`];
const log = console.log.bind(console, ...pre);

SharingTools = {
  init(shell) {
    this._shell = shell;
    this._steps = [];
    this._appliedSteps = {};
  },
  loadSharedArcs(userName, tools) {
    let user = tools.findUser(userName);
    if (user) {
      // Pull in all of the views from all public Arcs and add them to
      // the current context.
      // TODO: remove unshared / unfriended views
      let names = user.friends.split(',');
      //console.log(`%cusers's friends are`, shareLog, names);
      //console.log(...fmt(`users's friends are`, names));
      log(`${userName}'s friends: `, names);
      names.forEach(name => {
        let user = tools.findUser(name);
        if (user && user.shared) {
          Object.keys(user.shared).forEach(amkey => {
            // TODO(sjmiles): why can `user.shared[amkey].shared` be false?
            if (user.shared[amkey].shared) {
              log('import view into the context from amkey=', amkey);
              //this.syncSharedViews(amkey);
              StorageTools.syncSharedViews({
                key: amkey,
                isProfile: false,
                inFriendProfile: Boolean((user.profile || {})[amkey])
              });
            }
          });
        }
      });
      // Also sync the user's profile views.
      if (user.profile) {
        Object.keys(user.profile).forEach(key => {
          StorageTools.syncSharedViews({key, isProfile: true, inFriendProfile: false});
        });
      }
    }
  },
  addAcceptedStep(plan, generations) {
    let step = this._findOriginatingStep(plan, generations);
    log("accepting step", step);
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
      this._steps = steps;
      this.applyAcceptedSteps();
    }
    await this._shell.findSuggestions();
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

window.SharingTools = SharingTools;

})();
