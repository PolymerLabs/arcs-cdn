// ad-hoc (for now) utilities
let utils = {
  createUrlMap: cdnRoot => {
    return {
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
  suggest: (arc, suggestinator, suggestions, recipes) => {
    if (recipes) {
      suggestinator._getSuggestions = () => recipes.map(info => utils.buildRecipe(info));
      suggestinator
        .suggestinate(arc)
        .then(plans => plans.forEach(suggestions.add, suggestions))
        ;
    }
  }
};

// global module (for now)
window.utils = utils;