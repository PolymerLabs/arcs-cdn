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

const pre = [`%cSharingTools`, `background: #005b4f; color: white; padding: 1px 6px 2px 7px; border-radius: 6px;`];
const log = console.log.bind(console, ...pre);

/*
  Sharing Strategy

  `watchSharedArcs` creates a series of `on` watchers on friend's shared arcs, owned profile arcs, and view
  meta-data. `on` watchers are persistent and asynchronous. There is always at least one reply to
  an `on` call (to guarantee no data changes are lost), and then subsequent replies can happen at any time.
  All references that recieve `on` calls are tracked, and are turned `off` at the next invocation
  of `watchSharedArcs` (called when context changes).

  When `watchSharedArcs` change events occur, app shell planning is invalidated. Similarly, if arc `steps`
  are changed, app shell planning is invalidated.

  App shell invalidation is cleared by re-planning after a debouncing interval.
*/

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
      log(`_watchFriendsArc: adding ${friend.name}'s arc to watch list, amkey=`, amkey);
      watches.push({
        key: amkey,
        user: UserTools.currentUser,
        owner: name,
        isProfile: name === UserTools.currentUser,
        inFriendProfile: Boolean((friend.profile || {})[amkey])
      });
    });
  },
  _watchProfileArcs(user, watches) {
    if (user.profile) {
      Object.keys(user.profile).forEach(key => {
        log(`_watchProfileArcs: adding ${user.name}'s profile arc to watch list, amkey=`, key);
        watches.push({
          key,
          user: UserTools.currentUser,
          owner: UserTools.currentUser,
          isProfile: true,
          inFriendProfile: false
        });
      });
    }
  },
  addAcceptedStep(plan, generations) {
    let step = this._createOriginatingStep(plan, generations);
    log("addAcceptedStep", step);
    this._steps = this._steps || [];
    this._steps.push(step);
    this._appliedSteps[step.hash] = true;
    StorageTools.syncAcceptedSteps(this._steps);
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
      let step = this._createOriginatingStep(suggestion.plan, plans.generations);
      if (!step) {
        console.warn(...pre, "can't find first generation of", plan, "in", plans.generations);
        return;
      }
      // TODO: Allow re-applying same step unless its on the root slot.
      // Will make sense once verbs, etc. work and different slots, etc.
      // resolve differently.
      if (!this._appliedSteps[step.hash]) {
        let matchingStep = this._steps.find(s => s.hash == step.hash && s.mappedViews == step.mappedViews);
        if (matchingStep) {
          log("Auto applying step: ", matchingStep, suggestion);
          this._appliedSteps[matchingStep.hash] = true;
          this._shell.applySuggestion(suggestion.plan);
        } else {
          let nearMiss = this._steps.find(s => s.hash == step.hash);
          if (nearMiss) log("Almost auto-applied step: ", nearMiss, suggestion);
        }
      }
    });
  },
  _createOriginatingStep(plan, generations) {
    let firstGeneration = this._findFirstGeneration(plan, generations);
    if (firstGeneration) {
      // Really, we should only store the string and upon loading normalize it
      // again and create a new hash. But really, really we should probably
      // do something smarter than literal matching anyway...

      // Find all mapped views to be remembered.
      // Store as string, as we'll only use it to find exact matches later. (String is easier to compare)
      let mappedViews =
        plan.views.filter(v => v.fate == "map" && v.id.substr(0, 7) == "shared:").map(v => v.id).sort().toString();

      return {
        recipe: firstGeneration.result.toString(),
        hash: firstGeneration.hash,
        mappedViews
      };
    }
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
