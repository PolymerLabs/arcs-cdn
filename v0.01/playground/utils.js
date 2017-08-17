// ad-hoc (for now) utilities
let utils = {
  createUrlMap: cdnRoot => {
    return {
      // matching `/` and `./` gives the remapper a chance to fully qualify otherwise local paths for use in worker
      '/': '/',
      './': './',
      '../entities': `${cdnRoot}/entities`,
      '../particles': `${cdnRoot}/particles`,
      'assets': `${cdnRoot}/assets`,
      '../assets': `${cdnRoot}/assets`,
      'worker-entry-cdn.js': `${cdnRoot}/worker-entry-cdn.js`
    };
  },
  buildRecipe: info => {
    let rb = new Arcs.RecipeBuilder();
    info.particles.forEach(pi => {
      let p = rb.addParticle(pi.name);
      if (pi.constrain) {
        Object.keys(pi.constrain).forEach(k => p.connectConstraint(k, pi.constrain[k]));
      }
    });
    let recipe = rb.build();
    recipe.name = info.name;
    return recipe;
  },
  suggest: async (arc, ui, planner, recipes) => {
    planner.init(arc, {
      arc,
      recipes
    });
    let suggestions = await planner.suggest(500);
    suggestions.forEach((suggestion, i) => {
      ui.add(suggestion, i);
    });
  }
};

// global module (for now)
window.utils = utils;