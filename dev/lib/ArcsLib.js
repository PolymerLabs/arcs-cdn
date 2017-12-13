/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 36);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = assert;
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

function assert(test, message) {
  if (!test) {
    throw new Error(message);
  }
};


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__connection_constraint_js__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__particle_js__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__search_js__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__slot_js__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__view_js__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__util_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__digest_web_js__ = __webpack_require__(54);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt











class Recipe {
  constructor() {
    this._particles = [];
    this._views = [];
    this._slots = [];

    // TODO: Recipes should be collections of records that are tagged
    // with a type. Strategies should register the record types they
    // can handle. ConnectionConstraints should be a different record
    // type to particles/views.
    this._connectionConstraints = [];

    // TODO: Change to array, if needed for search strings of merged recipes.
    this._search = null;
  }

  newConnectionConstraint(from, fromConnection, to, toConnection) {
    this._connectionConstraints.push(new __WEBPACK_IMPORTED_MODULE_2__connection_constraint_js__["a" /* default */](from, fromConnection, to, toConnection));
  }

  removeConstraint(constraint) {
    var idx = this._connectionConstraints.indexOf(constraint);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(idx >= 0);
    this._connectionConstraints.splice(idx, 1);
  }

  clearConnectionConstraints() {
    this._connectionConstraints = [];
  }

  newParticle(name) {
    var particle = new __WEBPACK_IMPORTED_MODULE_3__particle_js__["a" /* default */](this, name);
    this._particles.push(particle);
    return particle;
  }

  newView() {
    var view = new __WEBPACK_IMPORTED_MODULE_6__view_js__["a" /* default */](this);
    this._views.push(view);
    return view;
  }

  newSlot(name) {
    var slot = new __WEBPACK_IMPORTED_MODULE_5__slot_js__["a" /* default */](this, name);
    this._slots.push(slot);
    return slot;
  }

  isResolved() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(Object.isFrozen(this), 'Recipe must be normalized to be resolved.');
    return this._connectionConstraints.length == 0
        && (this._search === null || this._search.isResolved())
        && this._views.every(view => view.isResolved())
        && this._particles.every(particle => particle.isResolved())
        && this._slots.every(slot => slot.isResolved())
        && this.viewConnections.every(connection => connection.isResolved())
        && this.slotConnections.every(connection => connection.isResolved());
  }

  _findDuplicateView() {
    let seenViews = new Set();
    return this._views.find(view => {
      if (view.id) {
        if (seenViews.has(view.id)) {
          return view;
        }
        seenViews.add(view.id);
      }
    });
  }

  _isValid() {
    return !this._findDuplicateView() && this._views.every(view => view._isValid())
        && this._particles.every(particle => particle._isValid())
        && this._slots.every(slot => slot._isValid())
        && this.viewConnections.every(connection => connection._isValid())
        && this.slotConnections.every(connection => connection._isValid())
        && (!this.search || this.search.isValid());
  }

  get localName() { return this._localName; }
  set localName(name) { this._localName = name; }
  get particles() { return this._particles; } // Particle*
  set particles(particles) { this._particles = particles; }
  get views() { return this._views; } // View*
  set views(views) { this._views = views; }
  get slots() { return this._slots; } // Slot*
  set slots(slots) { this._slots = slots; }
  get connectionConstraints() { return this._connectionConstraints; }
  get search() { return this._search; }
  set search(search) {
    this._search = search;
  }
  setSearchPhrase(phrase) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!this._search, 'Cannot override search phrase');
    if (phrase) {
      this._search = new __WEBPACK_IMPORTED_MODULE_4__search_js__["a" /* default */](phrase);
    }
  }

  get slotConnections() {  // SlotConnection*
    var slotConnections = [];
    this._particles.forEach(particle => {
      slotConnections.push(...Object.values(particle.consumedSlotConnections));
    });
    return slotConnections;
  }

  get viewConnections() {
    var viewConnections = [];
    this._particles.forEach(particle => {
      viewConnections.push(...Object.values(particle.connections));
      viewConnections.push(...particle._unnamedConnections);
    });
    return viewConnections;
  }

  isEmpty() {
    return this.particles.length == 0 &&
           this.views.length == 0 &&
           this.slots.length == 0 &&
           this._connectionConstraints.length == 0;
  }

  findView(id) {
    for (var view of this.views) {
      if (view.id == id)
        return view;
    }
  }

  findSlot(id) {
    for (var slot of this.slots) {
      if (slot.id == id)
        return slot;
    }
  }

  async digest() {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__digest_web_js__["a" /* default */])(this.toString());
  }

  normalize() {
    if (Object.isFrozen(this)) {
      return;
    }
    if (!this._isValid()) {
      var duplicateView = this._findDuplicateView();
      if (duplicateView)
        console.log(`Has Duplicate View ${duplicateView.id}`);

      let checkForInvalid = (name, list, f) => {
        var invalids = list.filter(item => !item._isValid());
        if (invalids.length > 0)
          console.log(`Has Invalid ${name} ${invalids.map(f)}`)
      }
      checkForInvalid('Views', this._views, view => view.id);
      checkForInvalid('Particles', this._particles, particle => particle.name);
      checkForInvalid('Slots', this._slots, slot => slot.name);
      checkForInvalid('ViewConnections', this.viewConnections, viewConnection => `${viewConnection.particle.name}::${viewConnection.name}`);
      checkForInvalid('SlotConnections', this.slotConnections, slotConnection => slotConnection.name);
      return false;
    }
    // Get views and particles ready to sort connections.
    for (let particle of this._particles) {
      particle._startNormalize();
    }
    for (let view of this._views) {
      view._startNormalize();
    }
    for (let slot of this._slots) {
      slot._startNormalize();
    }

    // Sort and normalize view connections.
    let connections = this.viewConnections;
    for (let connection of connections) {
      connection._normalize();
    }
    connections.sort(__WEBPACK_IMPORTED_MODULE_7__util_js__["a" /* default */].compareComparables);

    // Sort and normalize slot connections.
    let slotConnections = this.slotConnections;
    for (let slotConnection of slotConnections) {
      slotConnection._normalize();
    }
    slotConnections.sort(__WEBPACK_IMPORTED_MODULE_7__util_js__["a" /* default */].compareComparables);

    if (this.search) {
      this.search._normalize();
    }

    // Finish normalizing particles and views with sorted connections.
    for (let particle of this._particles) {
      particle._finishNormalize();
    }
    for (let view of this._views) {
      view._finishNormalize();
    }
    for (let slot of this._slots) {
      slot._finishNormalize();
    }

    let seenViews = new Set();
    let seenParticles = new Set();
    let particles = [];
    let views = [];
    for (let connection of connections) {
      if (!seenParticles.has(connection.particle)) {
        particles.push(connection.particle);
        seenParticles.add(connection.particle);
      }
      if (connection.view && !seenViews.has(connection.view)) {
        views.push(connection.view);
        seenViews.add(connection.view);
      }
    }

    let orphanedViews = this._views.filter(view => !seenViews.has(view));
    orphanedViews.sort(__WEBPACK_IMPORTED_MODULE_7__util_js__["a" /* default */].compareComparables);
    views.push(...orphanedViews);

    let orphanedParticles = this._particles.filter(particle => !seenParticles.has(particle));
    orphanedParticles.sort(__WEBPACK_IMPORTED_MODULE_7__util_js__["a" /* default */].compareComparables);
    particles.push(...orphanedParticles);

    // TODO: redo slots as above.
    let seenSlots = new Set();
    let slots = [];
    for (let slotConnection of slotConnections) {
      if (slotConnection.targetSlot && !seenSlots.has(slotConnection.targetSlot)) {
        slots.push(slotConnection.targetSlot);
        seenSlots.add(slotConnection.targetSlot);
      }
      Object.values(slotConnection.providedSlots).forEach(ps => {
        if (!seenSlots.has(ps)) {
          slots.push(ps);
          seenSlots.add(ps);
        }
      })
    }

    // Put particles and views in their final ordering.
    this._particles = particles;
    this._views = views;
    this._slots = slots;
    this._connectionConstraints.sort(__WEBPACK_IMPORTED_MODULE_7__util_js__["a" /* default */].compareComparables);

    Object.freeze(this._particles);
    Object.freeze(this._views);
    Object.freeze(this._slots);
    Object.freeze(this._connectionConstraints);
    Object.freeze(this);

    return true;
  }

  clone(cloneMap) {
    // for now, just copy everything

    var recipe = new Recipe();

    if (cloneMap == undefined)
      cloneMap = new Map();

    this._copyInto(recipe, cloneMap);

    // TODO: figure out a better approach than stashing the cloneMap permanently
    // on the recipe
    recipe._cloneMap = cloneMap;

    return recipe;
  }

  mergeInto(recipe) {
    var cloneMap = new Map();
    var numViews = recipe._views.length;
    var numParticles = recipe._particles.length;
    var numSlots = recipe._slots.length;
    this._copyInto(recipe, cloneMap);
    return {
      views: recipe._views.slice(numViews),
      particles: recipe._particles.slice(numParticles),
      slots: recipe._slots.slice(numSlots)
    };
  }

  _copyInto(recipe, cloneMap) {
    function cloneTheThing(object) {
      var clonedObject = object._copyInto(recipe, cloneMap);
      cloneMap.set(object, clonedObject);
    }

    this._views.forEach(cloneTheThing);
    this._particles.forEach(cloneTheThing);
    this._slots.forEach(cloneTheThing);
    this._connectionConstraints.forEach(cloneTheThing);
    if (this.search) {
      this.search._copyInto(recipe);
    }
  }

  updateToClone(dict) {
    var result = {};
    Object.keys(dict).forEach(key => result[key] = this._cloneMap.get(dict[key]));
    return result;
  }

  static over(results, walker, strategy) {
    return __WEBPACK_IMPORTED_MODULE_1__strategizer_strategizer_js__["b" /* Strategizer */].over(results, walker, strategy);
  }

  _makeLocalNameMap() {
    let names = new Set();
    for (let particle of this.particles) {
      names.add(particle.localName);
    }
    for (let view of this.views) {
      names.add(view.localName);
    }
    for (let slot of this.slots) {
      names.add(slot.localName);
    }

    let nameMap = new Map();
    let i = 0;
    for (let particle of this.particles) {
      let localName = particle.localName;
      if (!localName) {
        do {
          localName = `particle${i++}`;
        } while (names.has(localName));
      }
      nameMap.set(particle, localName);
    }

    i = 0;
    for (let view of this.views) {
      let localName = view.localName;
      if (!localName) {
        do {
          localName = `view${i++}`;
        } while (names.has(localName));
      }
      nameMap.set(view, localName);
    }

    i = 0;
    for (let slot of this.slots) {
      let localName = slot.localName;
      if (!localName) {
        do {
          localName = `slot${i++}`;
        } while (names.has(localName));
      }
      nameMap.set(slot, localName);
    }

    return nameMap;
  }

  // TODO: Add a normalize() which strips local names and puts and nested
  //       lists into a normal ordering.

  toString(options) {
    let nameMap = this._makeLocalNameMap();
    let result = [];
    // TODO: figure out where recipe names come from
    result.push(`recipe`);
    if (this.search) {
      result.push(this.search.toString(options).replace(/^|(\n)/g, '$1  '));
    }
    for (let constraint of this._connectionConstraints) {
      let constraintStr = constraint.toString().replace(/^|(\n)/g, '$1  ');
      if (options && options.showUnresolved) {
        constraintStr = constraintStr.concat(' # unresolved connection-constraint');
      }
      result.push(constraintStr);
    }
    for (let view of this.views) {
      result.push(view.toString(nameMap, options).replace(/^|(\n)/g, '$1  '));
    }
    for (let slot of this.slots) {
      let slotString = slot.toString(nameMap, options);
      if (slotString) {
        result.push(slotString.replace(/^|(\n)/g, '$1  '));
      }
    }
    for (let particle of this.particles) {
      result.push(particle.toString(nameMap, options).replace(/^|(\n)/g, '$1  '));
    }
    return result.join('\n');
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Recipe);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt



class Strategizer {
  constructor(strategies, evaluators, {maxPopulation, generationSize, discardSize}) {
    this._strategies = strategies;
    this._evaluators = evaluators;
    this._generation = 0;
    this._internalPopulation = [];
    this._population = [];
    this._generated = [];
    this._terminal = [];
    this._options = {
      maxPopulation,
      generationSize,
      discardSize,
    };
    this.populationHash = new Map();
  }
  // Latest generation number.
  get generation() {
    return this._generation;
  }
  // All individuals in the current population.
  get population() {
    return this._population;
  }
  // Individuals of the latest generation.
  get generated() {
    return this._generated;
  }
  // Individuals that were discarded in the latest generation.
  get discarded() {
    return this._discarded;
    // TODO: Do we need this?
  }
  // Individuals from the previous generation that were not decended from in the
  // current generation.
  get terminal() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(this._terminal);
    return this._terminal;
  }
  async generate() {
    // Generate
    let generation = this.generation + 1;
    let individualsPerStrategy = Math.floor(this._options.generationSize / this._strategies.length);
    let generated = await Promise.all(this._strategies.map(strategy => {
      return strategy.generate(this, individualsPerStrategy);
    }));

    var record = {};
    record.generation = generation;
    record.sizeOfLastGeneration = this.generated.length;
    record.outputSizesOfStrategies = {};
    for (var i = 0; i < this._strategies.length; i++) {
      record.outputSizesOfStrategies[this._strategies[i].constructor.name] = generated[i].results.length;
    }

    generated = generated.map(({results}) => results);
    generated = [].concat(...generated);

    // TODO: get rid of this additional asynchrony
    generated = await Promise.all(generated.map(async result => {
      if (result.hash) result.hash = await result.hash;
      return result;
    }));

    record.rawGenerated = generated.length;
    record.nullDerivations = 0;
    record.invalidDerivations = 0;
    record.duplicateDerivations = 0;
    record.nullDerivationsByStrategy = {};
    record.duplicateDerivationsByStrategy = {};
    record.invalidDerivationsByStrategy = {};

    generated = generated.filter(result => {
      if (result.hash) {
        var existingResult = this.populationHash.get(result.hash);
        var strategy = result.derivation[0].strategy.constructor.name;
        if (existingResult) {
          if (result.derivation[0].parent == existingResult) {
            record.nullDerivations += 1;
            if (record.nullDerivationsByStrategy[strategy] == undefined)
              record.nullDerivationsByStrategy[strategy] = 0;
            record.nullDerivationsByStrategy[strategy]++;
          } else if (existingResult.derivation.map(a => a.parent).indexOf(result.derivation[0].parent) != -1) {
            record.duplicateDerivations += 1;
            if (record.duplicateDerivationsByStrategy[strategy] == undefined)
              record.duplicateDerivationsByStrategy[strategy] = 0;
            record.duplicateDerivationsByStrategy[strategy]++;
          } else {
            this.populationHash.get(result.hash).derivation.push(result.derivation[0]);
          }
          return false;
        }
        this.populationHash.set(result.hash, result);
      }
      if (result.valid === false) {
        record.invalidDerivations++;
        record.invalidDerivationsByStrategy[strategy] = (record.duplicateDerivationsByStrategy[strategy] || 0) + 1;
        return false;
      }
      return true;
    });

    let terminal = new Map();
    for (let candidate of this.generated) {
      terminal.set(candidate.result, candidate);
    }
    for (let result of generated) {
      for (let {parent} of result.derivation) {
        if (parent && terminal.has(parent.result)) {
          terminal.delete(parent.result);
        }
      }
    }
    terminal = [...terminal.values()];

    record.totalGenerated = generated.length;

    generated.sort((a,b) => {
      if (a.score > b.score)
        return -1;
      if (a.score < b.score)
        return 1;
      return 0;
    });

    // Evalute
    let evaluations = await Promise.all(this._evaluators.map(strategy => {
      return strategy.evaluate(this, generated);
    }));
    let fitness = Strategizer._mergeEvaluations(evaluations, generated);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(fitness.length == generated.length);


    // Merge + Discard
    let discarded = [];
    let newGeneration = [];

    for (let i = 0; i < fitness.length; i++) {
      newGeneration.push({
        fitness: fitness[i],
        individual: generated[i],
      });
    }

    while (this._internalPopulation.length > (this._options.maxPopulation - this._options.discardSize)) {
      discarded.push(this._internalPopulation.pop().individual);
    }

    newGeneration.sort((x, y) => y.fitness - x.fitness);

    for (let i = 0; i < newGeneration.length && i < this._options.discardSize; i++) {
      if (i < this._options.discardSize) {
        this._internalPopulation.push(newGeneration[i]);
      } else {
        discarded.push(newGeneration[i].individual);
      }
    }

    // TODO: Instead of push+sort, merge `internalPopulation` with `generated`.
    this._internalPopulation.sort((x, y) => y.fitness - x.fitness);

    for (let strategy of this._strategies) {
      strategy.discard(discarded);
    }

    // Publish
    this._terminal = terminal;
    this._generation = generation;
    this._generated = generated;
    this._population = this._internalPopulation.map(x => x.individual);

    return record;
  }

  static _mergeEvaluations(evaluations, generated) {
    let n = generated.length;
    let mergedEvaluations = [];
    for (let i = 0; i < n; i++) {
      let merged = NaN;
      for (let evaluation of evaluations) {
        let fitness = evaluation[i];
        if (isNaN(fitness)) {
          continue;
        }
        if (isNaN(merged)) {
          merged = fitness;
        } else {
          // TODO: how should evaluations be combined?
          merged = (merged * i + fitness) / (i + 1);
        }
      }
      if (isNaN(merged)) {
        // TODO: What should happen when there was no evaluation?
        merged = 0.5;
      }
      mergedEvaluations.push(merged);
    }
    return mergedEvaluations;
  }

  static over(results, walker, strategy) {
    walker.onStrategy(strategy);
    results.forEach(result => {
      walker.onResult(result);
      walker.onResultDone();
    });
    walker.onStrategyDone();
    return walker.descendants;
  }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = Strategizer;


class Walker {
  constructor() {
    this.descendants = [];
  }

  onStrategy(strategy) {
    this.currentStrategy = strategy;
  }

  onResult(result) {
    this.currentResult = result;
  }

  createDescendant(result, score, hash, valid) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(this.currentResult, "no current result");
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(this.currentStrategy, "no current strategy");
    if (this.currentResult.score)
      score += this.currentResult.score;
    this.descendants.push({
      result,
      score,
      derivation: [{parent: this.currentResult, strategy: this.currentStrategy}],
      hash,
      valid,
    });
  }

  onResultDone() {
    this.currentResult = undefined;
  }

  onStrategyDone() {
    this.currentStrategy = undefined;
  }
}

Strategizer.Walker = Walker;

// TODO: Doc call convention, incl strategies are stateful.
class Strategy {
  async activate(strategizer) {
    // Returns estimated ability to generate/evaluate.
    // TODO: What do these numbers mean? Some sort of indication of the accuracy of the
    // generated individuals and evaluations.
    return {generate: 0, evaluate: 0};
  }
  getResults(strategizer) {
    return strategizer.generated;
  }
  async generate(strategizer, n) {
    return [];
  }
  discard(individuals) {
  }
  async evaluate(strategizer, individuals) {
    return individuals.map(() => NaN);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Strategy;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__walker_base_js__ = __webpack_require__(61);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt




class Walker extends __WEBPACK_IMPORTED_MODULE_1__walker_base_js__["a" /* default */] {
  onResult(result) {
    super.onResult(result);
    var recipe = result.result;
    var updateList = [];

    // update phase - walk through recipe and call onRecipe,
    // onView, etc.

    if (this.onRecipe) {
      var result = this.onRecipe(recipe, result);
      if (!this.isEmptyResult(result))
        updateList.push({continuation: result});
    }
    for (var particle of recipe.particles) {
      if (this.onParticle) {
        var result = this.onParticle(recipe, particle);
        if (!this.isEmptyResult(result))
          updateList.push({continuation: result, context: particle});
      }
    }
    for (var viewConnection of recipe.viewConnections) {
      if (this.onViewConnection) {
        var result = this.onViewConnection(recipe, viewConnection);
        if (!this.isEmptyResult(result))
          updateList.push({continuation: result, context: viewConnection});
      }
    }
    for (var view of recipe.views) {
      if (this.onView) {
        var result = this.onView(recipe, view);
        if (!this.isEmptyResult(result))
          updateList.push({continuation: result, context: view});
      }
    }
    for (var slotConnection of recipe.slotConnections) {
      if (this.onSlotConnection) {
        var result = this.onSlotConnection(recipe, slotConnection);
        if (!this.isEmptyResult(result))
          updateList.push({continuation: result, context: slotConnection});
      }
    }
    for (var slot of recipe.slots) {
      if (this.onSlot) {
        var result = this.onSlot(recipe, slot);
        if (!this.isEmptyResult(result))
          updateList.push({continuation: result, context: slot});
      }
    }

    this._runUpdateList(recipe, updateList);
  }
}

Walker.Permuted = __WEBPACK_IMPORTED_MODULE_1__walker_base_js__["a" /* default */].Permuted;
Walker.Independent = __WEBPACK_IMPORTED_MODULE_1__walker_base_js__["a" /* default */].Independent;

/* harmony default export */ __webpack_exports__["a"] = (Walker);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shape_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__schema_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__type_variable_js__ = __webpack_require__(80);
// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt




let nextVariableId = 0;

function addType(name, arg) {
  var lowerName = name[0].toLowerCase() + name.substring(1);
  Object.defineProperty(Type, `new${name}`, {
    value: function() {
      return new Type(name, arguments[0]);
    }});
  var upperArg = arg ? arg[0].toUpperCase() + arg.substring(1) : '';
  Object.defineProperty(Type.prototype, `${lowerName}${upperArg}`, {
    get: function() {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(this[`is${name}`], `{${this.tag}, ${this.data}} is not of type ${name}`);
      return this.data;
    }});
  Object.defineProperty(Type.prototype, `is${name}`, {
    get: function() {
      return this.tag == name;
    }});
}

class Type {
  constructor(tag, data) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(typeof tag == 'string');
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(data);
    if (tag == 'Entity') {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(data instanceof __WEBPACK_IMPORTED_MODULE_2__schema_js__["a" /* default */]);
    }
    if (tag == 'SetView') {
      if (!(data instanceof Type) && data.tag && data.data) {
        data = new Type(data.tag, data.data);
      }
    }
    this.tag = tag;
    this.data = data;
  }

  static newView(type) {
    console.warn('Type.newView is deprecated. Please use Type.newSetView instead');
    return Type.newSetView(type);
  }

  get isView() {
    console.warn('Type.isView is deprecated. Please use Type.isSetView instead');
    return this.isSetView;
  }

  get viewType() {
    console.warn('Type.viewType is deprecated. Please use Type.setViewType isntead');
    return this.setViewType;
  }

  viewOf() {
    console.warn('Type.viewOf is deprecated. Please use Type.setViewOf instead');
    return this.setViewOf();
  }

  get manifestReferenceName() {
    console.warn('Type.manifestReferenceName is deprecated. Please use Type.manifestReference instead');
    return this.manifestReference;
  }

  get variableReferenceName() {
    console.warn('Type.variableReferenceName is deprecated. Please use Type.variableReference instead');
    return this.variableReference;
  }

  get variableVariable() {
    console.warn('Type.variableVariable is deprecated. Please use Type.variable instead');
    return this.variable;
  }

  // Replaces variableReference types with variable types .
  assignVariableIds(variableMap) {
    if (this.isVariableReference) {
      var name = this.data;
      let sharedVariable = variableMap.get(name);
      if (sharedVariable == undefined) {
        let id = nextVariableId++;
        sharedVariable = new __WEBPACK_IMPORTED_MODULE_3__type_variable_js__["a" /* default */](name, id);
        variableMap.set(name, sharedVariable);
      }
      return Type.newVariable(sharedVariable);
    }

    if (this.isSetView) {
      return this.primitiveType().assignVariableIds(variableMap).setViewOf();
    }

    if (this.isInterface) {
      var shape = this.interfaceShape.clone();
      shape._typeVars.map(({object, field}) => object[field] = object[field].assignVariableIds(variableMap));
      return Type.newInterface(shape);
    }

    return this;
  }

  // Replaces manifestReference types with resolved schemas.
  resolveReferences(resolve) {
    if (this.isManifestReference) {
      let resolved = resolve(this.data);
      if (resolved.schema) {
        return Type.newEntity(resolved.schema);
      } else if (resolved.shape) {
        return Type.newInterface(resolved.shape);
      } else {
        throw new Error('Expected {shape} or {schema}')
      }
    }

    if (this.isSetView) {
      return this.primitiveType().resolveReferences(resolve).setViewOf();
    }

    return this;
  }

  equals(type) {
    if (this.tag !== type.tag)
      return false;
    if (this.tag == 'Entity') {
      // TODO: Remove this hack that allows the old resolver to match
      //       types by schema name.
      return this.data.name == type.data.name;
    }
    if (this.isSetView) {
      return this.data.equals(type.data);
    }

    if (this.isInterface)
      return this.data.equals(type.data);
    // TODO: this doesn't always work with the way the parser keeps kind
    // information around
    return JSON.stringify(this.data) == JSON.stringify(type.data);
  }

  get isValid() {
    return !this.variableReference;
  }

  primitiveType() {
    var type = this.setViewType;
    return new Type(type.tag, type.data);
  }

  resolvedType() {
    if (this.isTypeVariable && this.data.isResolved)
      return this.data.resolution.resolvedType();

    return this;
  }

  toLiteral() {
    if (this.data.toLiteral)
      return {tag: this.tag, data: this.data.toLiteral()};
    return this;
  }

  static _deliteralizer(tag) {
    switch (tag) {
      case 'Interface':
        return __WEBPACK_IMPORTED_MODULE_1__shape_js__["a" /* default */].fromLiteral;
      case 'Entity':
        return __WEBPACK_IMPORTED_MODULE_2__schema_js__["a" /* default */].fromLiteral;
      case 'SetView':
        return Type.fromLiteral;
      default:
        return a => a;
    }
  }

  static fromLiteral(literal) {
    return new Type(literal.tag, Type._deliteralizer(literal.tag)(literal.data));
  }

  setViewOf() {
    return Type.newSetView(this);
  }

  hasProperty(property) {
    if (property(this))
      return true;
    if (this.isSetView)
      return this.setViewType.hasProperty(property);
    return false;
  }

  toString() {
    if (this.isSetView)
      return `[${this.primitiveType().toString()}]`;
    if (this.isEntity)
      return this.entitySchema.name;
    if (this.isInterface)
      return 'Interface'
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])('Add support to serializing type:', this);
  }

  toPrettyString() {
    if (this.isRelation)
      return JSON.stringify(this.data);
    if (this.isSetView) {
      return `${this.primitiveType().toPrettyString()} List`;
    }
    if (this.isVariable)
      return `[${this.variableName}]`;
    if (this.isVariableReference)
      return `[${this.variableReferenceName}]`;
    if (this.isEntity)
      // Spit MyTypeFOO to My Type FOO
      return this.entitySchema.name.replace(/([^A-Z])([A-Z])/g, "$1 $2").replace(/([A-Z][^A-Z])/g, " $1").trim();
    if (this.isManifestReference)
      return this.manifestReferenceName;
    if (this.isInterface)
      return this.interfaceShape.toPrettyString();
  }
}

addType('ManifestReference');
addType('Entity', 'schema');
addType('VariableReference');
addType('Variable');
addType('SetView', 'type');
addType('Relation', 'entities');
addType('Interface', 'shape');

/* harmony default export */ __webpack_exports__["a"] = (Type);






/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt


function compareNulls(o1, o2) {
  if (o1 == o2) return 0;
  if (o1 == null) return -1;
  return 1;
}
function compareStrings(s1, s2) {
  if (s1 == null || s2 == null) return compareNulls(s1, s2);
  return s1.localeCompare(s2);
}
function compareNumbers(n1, n2) {
  if (n1 == null || n2 == null) return compareNulls(n1, n2);
  return n1 - n2;
}
function compareBools(b1, b2) {
  if (b1 == null || b2 == null) return compareNulls(b1, b2);
  return b1 - b2;
}
function compareArrays(a1, a2, compare) {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(a1 != null);
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(a2 != null);
  if (a1.length != a2.length) return compareNumbers(a1.length, a2.length);
  for (let i = 0; i < a1.length; i++) {
    let result;
    if ((result = compare(a1[i], a2[i])) != 0) return result;
  }
  return 0;
}
function compareObjects(o1, o2, compare) {
  let keys = Object.keys(o1);
  let result;
  if ((result = compareNumbers(keys.length, Object.keys(o2).length)) != 0) return result;
  for (let key of keys) {
    if ((result = compare(o1[key], o2[key])) != 0) return result;
  }
  return 0;
}
function compareComparables(o1, o2) {
  if (o1 == null || o2 == null) return compareNulls(o1, o2);
  return o1._compareTo(o2);
}

/* harmony default export */ __webpack_exports__["a"] = ({
  compareNulls,
  compareStrings,
  compareNumbers,
  compareBools,
  compareArrays,
  compareObjects,
  compareComparables,
});


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__ = __webpack_require__(0);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt




class Shape {
  constructor(recipe, particles, views, vcs) {
    this.recipe = recipe;
    this.particles = particles;
    this.views = views;
    this.reverse = new Map();
    for (var p in particles)
      this.reverse.set(particles[p], p);
    this.reverseViews = new Map();
    for (var v in views)
      this.reverse.set(views[v], v);
    for (var vc in vcs)
      this.reverse.set(vcs[vc], vc);
  }
}

class RecipeUtil {
  static makeShape(particles, views, map, recipe) {
    recipe = recipe || new __WEBPACK_IMPORTED_MODULE_0__recipe_js__["a" /* default */]();
    var pMap = {};
    var vMap = {};
    var vcMap = {};
    particles.forEach(particle => pMap[particle] = recipe.newParticle(particle));
    views.forEach(view => vMap[view] = recipe.newView());
    Object.keys(map).forEach(key => {
      Object.keys(map[key]).forEach(name => {
        let view = map[key][name];
        pMap[key].addConnectionName(name).connectToView(vMap[view]);
        vcMap[key + ':' + name] = pMap[key].connections[name];
      });
    });
    return new Shape(recipe, pMap, vMap, vcMap);
  }

  static recipeToShape(recipe) {
    let particles = {};
    var id = 0;
    recipe.particles.forEach(particle => particles[particle.name] = particle);
    let views = {};
    recipe.views.forEach(view => views['v' + id++] = view);
    let vcs = {};
    recipe.viewConnections.forEach(vc => vcs[vc.particle.name + ':' + vc.name] = vc);
    return new Shape(recipe, particles, views, vcs);
  }

  static find(recipe, shape) {

    function _buildNewVCMatches(recipe, shapeVC, match, outputList) {
      let {forward, reverse, score} = match;
      var matchFound = false;
      for (var recipeVC of recipe.viewConnections) {
        // TODO are there situations where multiiple viewConnections should
        // be allowed to point to the same one in the recipe?
        if (reverse.has(recipeVC))
          continue;

        // TODO support unnamed shape particles.
        if (recipeVC.particle.name != shapeVC.particle.name)
          continue;

        if (shapeVC.name && shapeVC.name != recipeVC.name)
          continue;

        // recipeVC is a candidate for shapeVC. shapeVC references a
        // particle, so recipeVC must reference the matching particle,
        // or a particle that isn't yet mapped from shape.
        if (reverse.has(recipeVC.particle)) {
          if (reverse.get(recipeVC.particle) != shapeVC.particle)
            continue;
        } else if (forward.has(shapeVC.particle)) {
          // we've already mapped the particle referenced by shapeVC
          // and it doesn't match recipeVC's particle as recipeVC's
          // particle isn't mapped
          continue;
        }

        // shapeVC doesn't necessarily reference a view, but if it does
        // then recipeVC needs to reference the matching view, or one
        // that isn't yet mapped, or no view yet.
        if (shapeVC.view && recipeVC.view) {
          if (reverse.has(recipeVC.view)) {
            if (reverse.get(recipeVC.view) != shapeVC.view)
              continue;
          } else if (forward.has(shapeVC.view) && forward.get(shapeVC.view) !== null) {
            continue;
          }
        }

        // clone forward and reverse mappings and establish new components.
        var newMatch = {forward: new Map(forward), reverse: new Map(reverse), score};
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(!newMatch.forward.has(shapeVC.particle) || newMatch.forward.get(shapeVC.particle) == recipeVC.particle);
        newMatch.forward.set(shapeVC.particle, recipeVC.particle);
        newMatch.reverse.set(recipeVC.particle, shapeVC.particle);
        if (shapeVC.view) {
          if (!recipeVC.view) {
            if (!newMatch.forward.has(shapeVC.view)) {
              newMatch.forward.set(shapeVC.view, null);
              newMatch.score -= 2;
            }
          } else {
            newMatch.forward.set(shapeVC.view, recipeVC.view);
            newMatch.reverse.set(recipeVC.view, shapeVC.view);
          }
        }
        newMatch.forward.set(shapeVC, recipeVC);
        newMatch.reverse.set(recipeVC, shapeVC);
        outputList.push(newMatch);
        matchFound = true;
      }
      if (matchFound == false) {
        var newMatches = [];
        _buildNewParticleMatches(recipe, shapeVC.particle, match, newMatches);
        newMatches.forEach(newMatch => {
          if (shapeVC.view && !newMatch.forward.has(shapeVC.view)) {
            newMatch.forward.set(shapeVC.view, null);
            newMatch.score -= 2;
          }
          newMatch.forward.set(shapeVC, null);
          newMatch.score -= 1;
          outputList.push(newMatch);
        });
      }
    }

    function _buildNewParticleMatches(recipe, shapeParticle, match, newMatches) {
      let {forward, reverse, score} = match;
      var matchFound = false;
      for (var recipeParticle of recipe.particles) {
        if (reverse.has(recipeParticle))
          continue;

        if (recipeParticle.name != shapeParticle.name)
          continue;
        var newMatch = {forward: new Map(forward), reverse: new Map(reverse), score};
        newMatch.forward.set(shapeParticle, recipeParticle);
        newMatch.reverse.set(recipeParticle, shapeParticle);
        newMatches.push(newMatch);
        matchFound = true;
      }
      if (matchFound == false) {
        var newMatch = {forward: new Map(), reverse: new Map(), score: 0};
        forward.forEach((value, key) => newMatch.forward.set(key, value));
        reverse.forEach((value, key) => newMatch.reverse.set(key, value));
        if (!newMatch.forward.has(shapeParticle)) {
          newMatch.forward.set(shapeParticle, null);
          newMatch.score = match.score - 1;
        }
        newMatches.push(newMatch);
      }
    }

    function _assignViewsToEmptyPosition(match, emptyViews, nullViews) {
      if (emptyViews.length == 1) {
        var matches = [];
        let {forward, reverse, score} = match;
        for (var nullView of nullViews) {
          var newMatch = {forward: new Map(forward), reverse: new Map(reverse), score: score + 1};
          newMatch.forward.set(nullView, emptyViews[0]);
          newMatch.reverse.set(emptyViews[0], nullView);
          matches.push(newMatch);
        }
        return matches;
      }
      var thisView = emptyViews.pop();
      var matches = _assignViewsToEmptyPosition(match, emptyViews, nullViews);
      var newMatches = [];
      for (var match of matches) {
        var nullViews = Object.values(shape.views).filter(view => match.forward.get(view) == null);
        if (nullViews.length > 0)
          newMatches = newMatches.concat(_assignViewsToEmptyPosition(match, [thisView], nullViews));
        else
          newMatches.concat(match);
      }
      return newMatches;
    }

    // Particles and Views are initially stored by a forward map from
    // shape component to recipe component.
    // View connections, particles and views are also stored by a reverse map
    // from recipe component to shape component.

    // Start with a single, empty match
    var matches = [{forward: new Map(), reverse: new Map(), score: 0}];
    for (var shapeVC of shape.recipe.viewConnections) {
      var newMatches = [];
      for (var match of matches) {
        // collect matching view connections into a new matches list
        _buildNewVCMatches(recipe, shapeVC, match, newMatches);
      }
      matches = newMatches;
    }

    for (var shapeParticle of shape.recipe.particles) {
      if (Object.keys(shapeParticle.connections).length > 0)
        continue;
      if (shapeParticle.unnamedConnections.length > 0)
        continue;
      var newMatches = [];
      for (var match of matches)
        _buildNewParticleMatches(recipe, shapeParticle, match, newMatches);
      matches = newMatches;
    }

    var emptyViews = recipe.views.filter(view => view.connections.length == 0);

    if (emptyViews.length > 0) {
      var newMatches = [];
      for (var match of matches) {
        var nullViews = Object.values(shape.views).filter(view => match.forward.get(view) == null);
        if (nullViews.length > 0)
          newMatches = newMatches.concat(_assignViewsToEmptyPosition(match, emptyViews, nullViews));
        else
          newMatches.concat(match);
      }
      matches = newMatches;
    }

    return matches.map(({forward, score}) => {
      var match = {};
      forward.forEach((value, key) => match[shape.reverse.get(key)] = value);
      return {match, score};
    });
  }

  static directionCounts(view) {
    var counts = {'in': 0, 'out': 0, 'inout': 0, 'unknown': 0}
    for (var connection of view.connections) {
      var direction = connection.direction;
      if (counts[direction] == undefined)
        direction = 'unknown';
      counts[direction]++;
    }
    counts.in += counts.inout;
    counts.out += counts.inout;
    return counts;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (RecipeUtil);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__type_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__entity_js__ = __webpack_require__(11);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */



class Schema {
  constructor(model) {
    this._model = model;
    this.name = model.name;
    this.parents = (model.parents || []).map(parent => new Schema(parent));
    this._normative = {};
    this._optional = {};

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(model.sections, `${JSON.stringify(model)} should have sections`);
    for (var section of model.sections) {
      var into = section.sectionType == 'normative' ? this._normative : this._optional;
      for (var field in section.fields) {
        // TODO normalize field types here?
        into[field] = section.fields[field];
      }
    }
  }

  toLiteral() {
    return this._model;
  }

  static fromLiteral(data) {
    return new Schema(data);
  }

  equals(otherSchema) {
    return this.toLiteral() == otherSchema.toLiteral();
  }

  get type() {
    return __WEBPACK_IMPORTED_MODULE_1__type_js__["a" /* default */].newEntity(this);
  }

  get normative() {
    var normative = {};
    for (var parent of this.parents)
      Object.assign(normative, parent.normative);
    Object.assign(normative, this._normative);
    return normative;
  }

  get optional() {
    var optional = {};
    for (var parent of this.parents)
      Object.assign(optional, parent.optional);
    Object.assign(optional, this._optional);
    return optional;
  }

  entityClass() {
    let schema = this;
    const className = this.name;
    var properties = Object.keys(this.normative).concat(Object.keys(this.optional));
    var classJunk = ['toJSON', 'prototype', 'toString', 'inspect'];

    var clazz = class extends __WEBPACK_IMPORTED_MODULE_2__entity_js__["a" /* default */] {
      constructor(data, userIDComponent) {
        var p = new Proxy(data, {
          get: (target, name) => {
            if (classJunk.includes(name))
              return undefined;
            if (name.constructor == Symbol)
              return undefined;
            if (!properties.includes(name))
              throw new Error(`Can't access field ${name} not in schema ${className}`);
            return target[name];
          },
          set: (target, name, value) => {
            if (!properties.includes(name)) {
              throw new Error(`Can't write field ${name} not in schema ${className}`);
            }
            target[name] = value;
            return true;
          }
        });
        super(userIDComponent);
        this.rawData = p;
      }

      dataClone() {
        var clone = {};
        properties.forEach(prop => clone[prop] = this.rawData[prop]);
        return clone;
      }

      static get key() {
        return {
          tag: 'entity',
          schema: schema.toLiteral(),
        };
      }
    }

    Object.defineProperty(clazz, 'type', {value: this.type});
    Object.defineProperty(clazz, 'name', {value: this.name});
    for (let property in this.normative) {
      // TODO: type checking, make a distinction between normative
      // and optional properties.
      // TODO: add query / getter functions for user properties
      Object.defineProperty(clazz.prototype, property, {
        get: function() {
          return this.rawData[property];
        },
        set: function(v) {
          this.rawData[property] = v;
        }
      });
    }
    for (let property in this.optional) {
      Object.defineProperty(clazz.prototype, property, {
        get: function() {
          return this.rawData[property];
        },
        set: function(v) {
          this.rawData[property] = v;
        }
      });
    }
    return clazz;
  }

  toString() {
    let results = [];
    results.push(`schema ${this.name}`.concat(this.parent ? ` extends ${this.parent.name}` : ''));

    let propertiesToString = (properties, keyword) => {
      if (Object.keys(properties).length > 0) {
        results.push(`  ${keyword}`);
        Object.keys(properties).forEach(name => {
          let schemaType = Array.isArray(properties[name]) && properties[name].length > 1 ? `(${properties[name].join(' or ')})` : properties[name];
          results.push(`    ${schemaType} ${name}`);
        });
      }
    }

    propertiesToString(this.normative, 'normative');
    propertiesToString(this.optional, 'optional');
    return results.join('\n');
  }

  toManifestString() {
    return this.toString();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Schema);





/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_fs_web_js__ = __webpack_require__(21);
/*
  Copyright 2015 Google Inc. All Rights Reserved.
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/



var events = [];
if (typeof document == 'object') {
  var pid = 42;
  var now = function() {
    var t = performance.now();
    return t;
  }
} else {
  var pid = process.pid;
  var now = function() {
    var t = process.hrtime();
    return t[0] * 1000000 + t[1] / 1000;
  }
}

var flowId = 0;

function parseInfo(info) {
  if (!info)
    return {};
  if (typeof info == 'function')
    return parseInfo(info());
  if (info.toTraceInfo)
    return parseInfo(info.toTraceInfo());
  return info;
}

let module = {exports: {}};
/* harmony default export */ __webpack_exports__["a"] = (module.exports);
module.exports.enabled = false;
module.exports.enable = function() {
  module.exports.enabled = true;
  init();
};

// TODO: Add back support for options.
//module.exports.options = options;
//var enabled = Boolean(options.traceFile);

function init() {
  var result = {
    wait: function(f) {
      if (f instanceof Function) {
        return f();
      }
      return f;
    },
    resume: function() {
      return this;
    },
    start: function() {
      return this;
    },
    end: function() {
      return this;
    },
    step: function() {
      return this;
    },
    endWrap: function(fn) {
      return fn;
    },
  };
  module.exports.wrap = function(info, fn) {
    return fn;
  };
  module.exports.start = function(info, fn) {
    return result;
  };
  module.exports.async = function(info, fn) {
    return result;
  };
  module.exports.flow = function(info, fn) {
    return result;
  };
  module.exports.dump = function() {
  };

  if (!module.exports.enabled) {
    return;
  }

  module.exports.wrap = function(info, fn) {
    return function() {
      var t = module.exports.start(info);
      try {
        return fn.apply(this, arguments);
      } finally {
        t.end();
      }
    };
  };
  module.exports.start = function(info) {
    info = parseInfo(info);
    let args = info.args || {};
    let begin = now();
    return {
      end: function(endInfo) {
        if (endInfo && endInfo.args) {
          Object.assign(args, endInfo.args);
        }
        var end = now();
        events.push({
          ph: 'X',
          ts: begin,
          dur: end - begin,
          cat: info.cat,
          name: info.name,
          args: args,
        });
      },
    };
  };
  // TODO: perhaps this should just be the only API, it acts the same as
  //       start() when there is no call to wait/resume().
  module.exports.async = function(info) {
    let trace = module.exports.start(info);
    let flow;
    let baseInfo = {cat: info.cat, name: info.name + ' (async)'};
    let n = 0;
    return {
      async wait(v) {
        let result;
        if (v instanceof Promise) {
          result = f;
        } else {
          result = v();
        }
        if (!flow) {
          flow = module.exports.flow(baseInfo).start();
        }
        trace.end();
        trace = null;
        return result;
      },
      resume(info) {
        if (info) {
          Object.assign(info, baseInfo);
        } else {
          info = baseInfo;
        }
        trace = module.exports.start(info);
        flow.step(baseInfo);
      },
      end(endInfo) {
        if (flow) {
          flow.end();
        }
        trace.end(endInfo);
      },
    };
  };
  module.exports.flow = function(info) {
    info = parseInfo(info);
    var id = flowId++;
    var started = false;
    return {
      start: function() {
        var begin = now();
        started = true;
        events.push({
          ph: 's',
          ts: begin,
          cat: info.cat,
          name: info.name,
          args: info.args,
          id: id,
        });
        return this;
      },
      end: function(endInfo) {
        if (!started) return;
        var end = now();
        endInfo = parseInfo(endInfo);
        events.push({
          ph: 'f',
          bp: 'e', // binding point is enclosing slice.
          ts: end,
          cat: info.cat,
          name: info.name,
          args: endInfo && endInfo.args,
          id: id,
        });
        return this;
      },
      step: function(stepInfo) {
        if (!started) return;
        var step = now();
        stepInfo = parseInfo(stepInfo);
        events.push({
          ph: 't',
          ts: step,
          cat: info.cat,
          name: info.name,
          args: stepInfo && stepInfo.args,
          id: id,
        });
        return this;
      },
    };
  };
  module.exports.save = function() {
    events.forEach(function(event) {
      event.pid = pid;
      event.tid = 0;
      if (!event.args) {
        delete event.args;
      }
      if (!event.cat) {
        event.cat = '';
      }
    });
    return {traceEvents: events};
  };
  module.exports.dump = function() {
    __WEBPACK_IMPORTED_MODULE_0__platform_fs_web_js__["a" /* default */].writeFileSync(options.traceFile, module.exports.save());
  };
  module.exports.download = function() {
    let a = document.createElement('a');
    a.download = 'trace.json';
    a.href = 'data:text/plain;base64,' + btoa(JSON.stringify(module.exports.save()));
    a.click();
  };
}

init();

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(20)))

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__type_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shape_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__ = __webpack_require__(0);
  /**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */





class ConnectionSpec {
  constructor(rawData, typeVarMap) {
    this.rawData = rawData;
    this.direction = rawData.direction;
    this.name = rawData.name;
    this.type = rawData.type.assignVariableIds(typeVarMap);
    this.isOptional = rawData.isOptional;
  }

  get isInput() {
    // TODO: we probably don't really want host to be here.
    return this.direction == "in" || this.direction == "inout" || this.direction == "host";
  }

  get isOutput() {
    return this.direction == "out" || this.direction == "inout";
  }
}

class SlotSpec {
  constructor(slotModel) {
    this.name = slotModel.name;
    this.isRequired = slotModel.isRequired;
    this.isSet = slotModel.isSet;
    this.formFactor = slotModel.formFactor;
    this.providedSlots = [];
    slotModel.providedSlots.forEach(ps => {
      this.providedSlots.push(new ProvidedSlotSpec(ps.name, ps.isSet, ps.formFactor, ps.views));
    });
  }
}

class ProvidedSlotSpec {
  constructor(name, isSet, formFactor, views) {
    this.name = name;
    this.isSet = isSet;
    this.formFactor = formFactor;
    this.views = views;
  }
}

class ParticleSpec {
  constructor(model, resolveSchema) {
    this._model = model;
    this.name = model.name;
    this.verbs = model.verbs;
    var typeVarMap = new Map();
    this.connections = model.args.map(a => new ConnectionSpec(a, typeVarMap));
    this.connectionMap = new Map();
    this.connections.forEach(a => this.connectionMap.set(a.name, a));
    this.inputs = this.connections.filter(a => a.isInput);
    this.outputs = this.connections.filter(a => a.isOutput);
    this.transient = model.transient;

    // initialize descriptions patterns.
    model.description = model.description || {};
    this.validateDescription(model.description);
    this.pattern = model.description["pattern"];
    this.connections.forEach(connectionSpec => {
      connectionSpec.pattern = model.description[connectionSpec.name];
    });

    this.implFile = model.implFile;
    this.affordance = model.affordance;
    this.slots = new Map();
    if (model.slots)
      model.slots.forEach(s => this.slots.set(s.name, new SlotSpec(s)));
    // Verify provided slots use valid view connection names.
    this.slots.forEach(slot => {
      slot.providedSlots.forEach(ps => {
        ps.views.forEach(v => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__["a" /* default */])(this.connectionMap.has(v), "Cannot provide slot for nonexistent view constraint ", v));
      });
    });
  }

  isInput(param) {
    for (let input of this.inputs) if (input.name == param) return true;
  }

  isOutput(param) {
    for (let outputs of this.outputs) if (outputs.name == param) return true;
  }

  getSlotSpec(slotName) {
    return this.slots.get(slotName);
  }

  get primaryVerb() {
    if (this.verbs.length > 0) {
      return this.verbs[0];
    }
  }

  matchAffordance(affordance) {
    return this.slots.size <= 0 || this.affordance.includes(affordance);
  }

  toLiteral() {
    let {args, name, verbs, transient, description, implFile, affordance, slots} = this._model;
    args = args.map(a => {
      let {type, direction, name} = a;
      type = type.toLiteral();
      return {type, direction, name};
    });
    return {args, name, verbs, transient, description, implFile, affordance, slots};
  }

  static fromLiteral(literal) {
    literal.args.forEach(a => a.type = __WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* default */].fromLiteral(a.type));
    return new ParticleSpec(literal);
  }

  validateDescription(description) {
    Object.keys(description || []).forEach(d => {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__["a" /* default */])(['kind', 'location', 'pattern'].includes(d) || this.connectionMap.has(d), `Unexpected description for ${d}`);
    });
  }

  toInterface() {
    return __WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* default */].newInterface(this._toShape());
  }

  _toShape() {
    const views = this._model.args;
    // TODO: wat do?
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__["a" /* default */])(!this.slots.length, 'please implement slots toShape');
    const slots = [];
    return new __WEBPACK_IMPORTED_MODULE_1__shape_js__["a" /* default */](views, slots);
  }

  toString() {
    let results = [];
    results.push(`particle ${this.name} in '${this.implFile}'`);
    let connRes = this.connections.map(cs => `${cs.direction} ${cs.type.toString()}${cs.isOptional ? '?' : ''} ${cs.name}`);
    results.push(`  ${this.primaryVerb}(${connRes.join(', ')})`);
    this.affordance.filter(a => a != 'mock').forEach(a => results.push(`  affordance ${a}`));
    // TODO: support form factors
    this.slots.forEach(s => {
    results.push(`  ${s.isRequired ? 'must ' : ''}consume ${s.isSet ? 'set of ' : ''}${s.name}`);
      s.providedSlots.forEach(ps => {
        results.push(`    provide ${ps.isSet ? 'set of ' : ''}${ps.name}`)
        // TODO: support form factors
        ps.views.forEach(psv => results.push(`      view ${psv}`))
      });
    });
    // Description
    if (!!this.pattern) {
      results.push(`  description \`${this.pattern}\``);
      this.connections.forEach(cs => {
        if (!!cs.pattern) {
          results.push(`    ${cs.name} \`${cs.pattern}\``);
        }
      });
    }
    return results.join('\n');
  }

  toManifestString() {
    return this.toString();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (ParticleSpec);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__build_manifest_parser_js__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__build_manifest_parser_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__build_manifest_parser_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__particle_spec_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__schema_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__recipe_search_js__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shape_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__type_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__recipe_util_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__storage_provider_factory_js__ = __webpack_require__(31);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */












class Manifest {
  constructor() {
    this._recipes = [];
    this._imports = [];
    // TODO: These should be lists, possibly with a separate flattened map.
    this._particles = {};
    this._schemas = {};
    this._views = [];
    this._shapes = [];
    this._viewTags = new Map();
    this._fileName = null;
    this._nextLocalID = 0;
    this._id = null;
    this._storageProviderFactory = new __WEBPACK_IMPORTED_MODULE_9__storage_provider_factory_js__["a" /* default */](this);
  }
  get id() {
    return this._id;
  }
  get recipes() {
    return [...new Set(this._findAll(manifest => manifest._recipes))];
  }
  get particles() {
    return [...new Set(this._findAll(manifest => Object.values(manifest._particles)))];
  }
  get imports() {
    return this._imports;
  }
  get schemas() {
    return this._schemas;
  }
  get fileName() {
    return this._fileName;
  }
  get views() {
    return this._views;
  }

  get shapes() {
    return this._shapes;
  }

  // TODO: newParticle, Schema, etc.
  // TODO: simplify() / isValid().
  newView(type, name, id, tags) {
    let view = this._storageProviderFactory.construct(id, type, 'in-memory');
    view.name = name;
    this._views.push(view);
    this._viewTags.set(view, tags ? tags : []);
    return view;
  }
  _find(manifestFinder) {
    let result = manifestFinder(this);
    if (!result) {
      for (let importedManifest of this._imports) {
        result = importedManifest._find(manifestFinder);
        if (result) {
          break;
        }
      }
    }
    return result;
  }
  *_findAll(manifestFinder) {
    yield* manifestFinder(this);
    for (let importedManifest of this._imports) {
      yield* importedManifest._findAll(manifestFinder);
    }
  }
  findSchemaByName(name) {
    return this._find(manifest => manifest._schemas[name]);
  }
  findParticleByName(name) {
    return this._find(manifest => manifest._particles[name]);
  }
  findParticlesByVerb(verb) {
    return [...this._findAll(manifest => Object.values(manifest._particles).filter(particle => particle.primaryVerb == verb))];
  }
  findViewByName(name) {
    return this._find(manifest => manifest._views.find(view => view.name == name));
  }
  findViewById(id) {
    return this._find(manifest => manifest._views.find(view => view.id == id));
  }
  findViewsByType(type, options) {
    var tags = options && options.tags ? options.tags : [];
    return [...this._findAll(manifest => manifest._views.filter(view => view.type.equals(type) && tags.filter(tag => !manifest._viewTags.get(view).includes(tag)).length == 0))];
  }
  findShapeByName(name) {
    return this._find(manifest => manifest._shapes.find(shape => shape.name == name));
  }
  generateID() {
    return `${this.id}:${this._nextLocalID++}`;
  }
  static async load(fileName, loader, options) {
    options = options || {};
    let {registry, id} = options;
    if (registry && registry[fileName]) {
      return registry[fileName];
    }
    let content = await loader.loadResource(fileName);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(content !== undefined, `${fileName} unable to be loaded by Manifest parser`);
    let manifest = await Manifest.parse(content, {
      id,
      fileName,
      loader,
      registry,
      position: {line: 1, column: 0}
    });
    if (manifest && registry) {
      registry[fileName] = manifest;
    }
    return manifest;
  }
  static async parse(content, options) {
    options = options || {};
    let {id, fileName, position, loader, registry} = options;
    registry = registry || {};
    position = position || {line: 1, column: 0};
    id = `manifest:${fileName}:`;

    function processError(e) {
      if (!e.location) {
        return e;
      }
      let lines = content.split('\n');
      let line = lines[e.location.start.line - 1];
      let span = 1;
      if (e.location.end.line == e.location.start.line) {
        span = e.location.end.column - e.location.start.column;
      } else {
        span = line.length - e.location.start.column;
      }
      span = Math.max(1, span);
      let highlight = '';
      for (let i = 0; i < e.location.start.column - 1; i++) {
        highlight += ' ';
      }
      for (let i = 0; i < span; i++) {
        highlight += '^';
      }
      let message = `Parse error in '${fileName}' line ${e.location.start.line}.
${e.message}
  ${line}
  ${highlight}`;
      return new Error(message);
    }

    let items = [];
    try{
      items = __WEBPACK_IMPORTED_MODULE_1__build_manifest_parser_js___default.a.parse(content);
    } catch (e) {
      throw processError(e);
    }
    let manifest = new Manifest();
    manifest._fileName = fileName;
    manifest._id = id;

    for (let item of items.filter(item => item.kind == 'import')) {
      let path = loader.path(manifest.fileName);
      let target = loader.join(path, item.path);
      manifest._imports.push(await Manifest.load(target, loader, {registry}));
    }

    try {
      for (let item of items.filter(item => item.kind == 'schema')) {
        this._processSchema(manifest, item);
      }
      for (let item of items.filter(item => item.kind == 'shape')) {
        this._processShape(manifest, item);
      }
      for (let item of items.filter(item => item.kind == 'particle')) {
        this._processParticle(manifest, item, loader);
      }
      for (let item of items.filter(item => item.kind == 'view')) {
        await this._processView(manifest, item, loader);
      }
      for (let item of items.filter(item => item.kind == 'recipe')) {
        this._processRecipe(manifest, item);
      }
    } catch (e) {
      throw processError(e);
    }
    return manifest;
  }
  static _processSchema(manifest, schemaItem) {
    manifest._schemas[schemaItem.name] = new __WEBPACK_IMPORTED_MODULE_4__schema_js__["a" /* default */]({
      name: schemaItem.name,
      parents: schemaItem.parents.map(parent => {
        let result = manifest.findSchemaByName(parent);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(result);
        return result.toLiteral();
      }),
      sections: schemaItem.sections.map(section => {
        let fields = {};
        for (let field of section.fields) {
          fields[field.name] = field.type;
        }
        return {
          sectionType: section.sectionType,
          fields,
        };
      }),
    });
  }
  static _processParticle(manifest, particleItem, loader) {
    // TODO: we should require both of these and update failing tests...
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(particleItem.implFile == null || particleItem.args !== null, "no valid body defined for this particle");
    if (!particleItem.args) {
      particleItem.args = [];
    }
    // TODO: loader should not be optional.
    if (particleItem.implFile && loader) {
      particleItem.implFile = loader.join(manifest.fileName, particleItem.implFile);
    }

    for (let arg of particleItem.args) {
      arg.type = Manifest._processType(arg.type);
      arg.type = arg.type.resolveReferences(name => manifest.resolveReference(name));
    }

    let particleSpec = new __WEBPACK_IMPORTED_MODULE_3__particle_spec_js__["a" /* default */](particleItem);
    manifest._particles[particleItem.name] = particleSpec;
  }
  // TODO: Move this to a generic pass over the AST and merge with resolveReference.
  static _processType(typeItem) {
    switch (typeItem.kind) {
      case 'variable-type':
        return __WEBPACK_IMPORTED_MODULE_7__type_js__["a" /* default */].newVariableReference(typeItem.name);
      case 'reference-type':
        return __WEBPACK_IMPORTED_MODULE_7__type_js__["a" /* default */].newManifestReference(typeItem.name);
      case 'list-type':
        return __WEBPACK_IMPORTED_MODULE_7__type_js__["a" /* default */].newSetView(Manifest._processType(typeItem.type));
      default:
        throw `Unexpected type item of kind '${typeItem.kind}'`;
    }
  }
  static _processShape(manifest, shapeItem) {
    for (let arg of shapeItem.interface.args) {
      arg.type = Manifest._processType(arg.type);
      arg.type = arg.type.resolveReferences(name => manifest.resolveReference(name));
    }
    let views = shapeItem.interface.args;
    let slots = [];
    for (let slotItem of shapeItem.slots) {
      slots.push({
        direction: 'consume',
        name: slotItem.name,
      });
      for (let providedSlotItem of slotItem.providedSlots) {
        slots.push({
          direction: 'provide',
          name: providedSlotItem.name,
        })
      }
    }
    // TODO: move shape to recipe/ and add shape builder?
    let shape = new __WEBPACK_IMPORTED_MODULE_6__shape_js__["a" /* default */](views, slots);
    shape.name = shapeItem.name;
    manifest._shapes.push(shape);
  }
  static _processRecipe(manifest, recipeItem) {
    let recipe = manifest._newRecipe(recipeItem.name);
    let items = {
      views: recipeItem.items.filter(item => item.kind == 'view'),
      byView: new Map(),
      particles: recipeItem.items.filter(item => item.kind == 'particle'),
      byParticle: new Map(),
      slots: recipeItem.items.filter(item => item.kind == 'slot'),
      bySlot: new Map(),
      byName: new Map(),
      connections: recipeItem.items.filter(item => item.kind == 'connection'),
      search: recipeItem.items.find(item => item.kind == 'search')
    };

    for (let connection of items.connections) {
      var fromParticle = manifest.findParticleByName(connection.from.particle);
      var toParticle = manifest.findParticleByName(connection.to.particle);
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(fromParticle, `could not find particle ${fromParticle}`);
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(toParticle, `could not find particle ${toParticle}`);
      recipe.newConnectionConstraint(fromParticle, connection.from.param,
                                     toParticle, connection.to.param);
    }

    if (items.search) {
      recipe.search = new __WEBPACK_IMPORTED_MODULE_5__recipe_search_js__["a" /* default */](items.search.phrase, items.search.tokens);
    }

    for (let item of items.views) {
      let view = recipe.newView();
      let ref = item.ref || {tags: []};
      if (ref.id) {
        view.id = ref.id;
      } else if (ref.name) {
        let targetView = manifest.findViewByName(ref.name);
        // TODO: Error handling.
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(targetView, `Could not find view ${ref.name}`);
        view.mapToView(targetView);
      }
      view.tags = ref.tags;
      if (item.name) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!items.byName.has(item.name));
        view.localName = item.name;
        items.byName.set(item.name, {item: item, view: view});
      }
      view.fate = item.fate;
      items.byView.set(view, item);
    }

    for (let item of items.slots) {
      let slot = recipe.newSlot();
      if (item.id) {
        slot.id = item.id;
      }
      if (item.name) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!items.byName.has(item.name), `Duplicate slot local name ${item.name}`);
        slot.localName = item.name;
        items.byName.set(item.name, slot);
      }
      items.bySlot.set(slot, item);
    }

    // TODO: disambiguate.
    let particlesByName = {};
    for (let item of items.particles) {
      let particle = recipe.newParticle(item.ref.name);
      particle.tags = item.ref.tags;
      particle.verbs = item.ref.verbs;
      if (item.ref.name) {
        var spec = manifest.findParticleByName(item.ref.name);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(spec, `could not find particle ${item.ref.name}`);
        particle.spec = spec;
        particlesByName[item.ref.name] = particle;
      }
      if (item.name) {
        // TODO: errors.
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!items.byName.has(item.name));
        particle.localName = item.name;
        items.byName.set(item.name, {item: item, particle: particle});
      }
      items.byParticle.set(particle, item);

      for (let slotConnectionItem of item.slotConnections) {
        let slotConn = particle.consumedSlotConnections[slotConnectionItem.param];
        if (!slotConn) {
          slotConn = particle.addSlotConnection(slotConnectionItem.param);
        }
        if (slotConnectionItem.name) {
          slotConnectionItem.providedSlots.forEach(ps => {
            let providedSlot = slotConn.providedSlots[ps.param];
            if (providedSlot) {
              items.byName.set(ps.name, providedSlot);
              items.bySlot.set(providedSlot, ps);
            } else
              providedSlot = items.byName.get(ps.name);
            if (!providedSlot) {
              providedSlot = recipe.newSlot(ps.param);
              providedSlot.localName = ps.name;
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!items.byName.has(ps.name));
              items.byName.set(ps.name, providedSlot);
              items.bySlot.set(providedSlot, ps);
            }
            if (!slotConn.providedSlots[ps.param]) {
              slotConn.providedSlots[ps.param] = providedSlot;
            }
          });
        }
      }
    }

    for (let [particle, item] of items.byParticle) {
      for (let connectionItem of item.connections) {
        let connection;
        if (connectionItem.param == '*') {
          connection = particle.addUnnamedConnection();
        } else {
          connection = particle.connections[connectionItem.param];
          if (!connection) {
            connection = particle.addConnectionName(connectionItem.param);
          }
          // TODO: else, merge tags? merge directions?
        }
        connection.tags = connectionItem.target ? connectionItem.target.tags : [];
        let direction = {'->': 'out', '<-': 'in', '=': 'inout'}[connectionItem.dir];
        if (connection.direction) {
          if (connection.direction != direction && direction != 'inout') {
            let error = new Error(`'${connectionItem.dir}' not compatible with '${connection.direction}' param of '${particle.name}'`);
            error.location = connectionItem.location;
            throw error;
          }
        } else {
          if (connectionItem.param != '*') {
            let error = new Error(`param '${connectionItem.param}' is not defined by '${particle.name}'`);
            error.location = connectionItem.location;
            throw error;
          }
          connection.direction = direction;
        }

        let targetView;
        let targetParticle;

        if (connectionItem.target && connectionItem.target.name) {
          let entry = items.byName.get(connectionItem.target.name);
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(entry, `could not find ${connectionItem.target.name}`);
          if (entry.item.kind == 'view') {
            targetView = entry.view;
          } else if (entry.item.kind == 'particle') {
            targetParticle = entry.particle;
          } else {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(false, `did not expect ${entry.item.kind}`);
          }
        }

        // Handle implicit view connections in the form `param = SomeParticle`
        if (connectionItem.target && connectionItem.target.particle) {
          let particle = manifest.findParticleByName(connectionItem.target.particle);
          if (!particle) {
            let error = new Error(`Could not find particle '${connectionItem.target.particle}'`);
            error.location = connectionItem.target.location;
            throw error;
          }
          // TODO: Better ID.
          let id = `${manifest._id}immediate${particle.name}`
          // TODO: Mark as immediate.
          targetView = recipe.newView();
          targetView.fate = 'map';
          targetView.mapToView(manifest.newView(connection.type, null, id, []));
        }

        if (targetParticle) {
          let targetConnection;
          if (connectionItem.target.param) {
            targetConnection = targetParticle.connections[connectionItem.target.param];
            if (!targetConnection) {
              targetConnection = targetParticle.addConnectionName(connectionItem.target.param);
              // TODO: direction?
            }
          } else {
            targetConnection = targetParticle.addUnnamedConnection();
            // TODO: direction?
          }

          targetView = targetConnection.view;
          if (!targetView) {
            // TODO: tags?
            targetView = recipe.newView();
            targetConnection.connectToView(targetView)
          }
        }

        if (targetView) {
          connection.connectToView(targetView);
        }
      }

      for (let slotConnectionItem of item.slotConnections) {
        let targetSlot = items.byName.get(slotConnectionItem.name);
        if (targetSlot) {
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(items.bySlot.has(targetSlot));
          if (!targetSlot.name) {
            targetSlot.name = slotConnectionItem.param;
          }
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(targetSlot.name == slotConnectionItem.param,
                 `Target slot name ${targetSlot.name} doesn't match slot connection name ${slotConnectionItem.param}`);
        } else {
          targetSlot = recipe.newSlot(slotConnectionItem.param);
          targetSlot.localName = slotConnectionItem.name;
          items.byName.set(slotConnectionItem.name, targetSlot);
          items.bySlot.set(targetSlot, slotConnectionItem);
        }
        particle.consumedSlotConnections[slotConnectionItem.param].connectToSlot(targetSlot);
      }
    }
  }
  resolveReference(name) {
    let schema = this.findSchemaByName(name);
    if (schema) {
      return {schema};
    }
    let shape = this.findShapeByName(name);
    if (shape) {
      return {shape};
    }
    throw new Error(`Schema or Shape '${name}' was not declared or imported`);
  }
  static async _processView(manifest, item, loader) {
    let name = item.name;
    let id = item.id;
    let type = Manifest._processType(item.type);
    if (id == null) {
      id = `${manifest._id}view${manifest._views.length}`
    }
    let tags = item.tags;
    if (tags == null)
      tags = [];

    type = type.resolveReferences(name => manifest.resolveReference(name));

    let view = manifest.newView(type, name, id, tags);
    view.source = item.source;
    view.description = item.description;
    // TODO: How to set the version?
    // view.version = item.version;
    let source = loader.join(manifest.fileName, item.source);
    // TODO: json5?
    let json = await loader.loadResource(source);
    let entities = JSON.parse(json);
    for (let entity of entities) {
      let id = entity.$id || manifest.generateID();
      delete entity.$id;
      if (type.isSetView) {
        view.store({
          id,
          rawData: entity,
        });
      } else {
        view.set({
          id,
          rawData: entity,
        })
      }
    }
  }
  _newRecipe(name) {
    // TODO: use name
    let recipe = new __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__["a" /* default */]();
    this._recipes.push(recipe);
    return recipe;
  }

  toString(options) {
    // TODO: sort?
    options = options || {};
    let results = [];

    this._imports.forEach(i => {
      if (options.recursive) {
        results.push(`# import '${i.fileName}'`);
        let importStr = i.toString(options);
        results.push(`${i.toString(options)}`);
      } else {
        results.push(`import '${i.fileName}'`);
      }
    });

    Object.values(this._schemas).forEach(s => {
      results.push(s.toString());
    });

    Object.values(this._particles).forEach(p => {
      results.push(p.toString());
    });

    this._recipes.forEach(r => {
      results.push(r.toString(options));
    });

    let views = [...this.views].sort(__WEBPACK_IMPORTED_MODULE_8__recipe_util_js__["a" /* default */].compareComparables);
    views.forEach(v => {
      results.push(v.toString(this._viewTags.get(v)));
    });

    return results.join('\n');
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Manifest);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__symbols_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__type_js__ = __webpack_require__(4);
// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt






class Entity {
  constructor(userIDComponent) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!userIDComponent || userIDComponent.indexOf(':') == -1, "user IDs must not contain the ':' character")
    this[__WEBPACK_IMPORTED_MODULE_1__symbols_js__["a" /* default */].identifier] = undefined;
    this._userIDComponent = userIDComponent;
  }
  get data() {
    return undefined;
  }

  getUserID() {
    return this._userIDComponent;
  }

  isIdentified() {
    return this[__WEBPACK_IMPORTED_MODULE_1__symbols_js__["a" /* default */].identifier] !== undefined;
  }
  identify(identifier) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!this.isIdentified());
    this[__WEBPACK_IMPORTED_MODULE_1__symbols_js__["a" /* default */].identifier] = identifier;
    let components = identifier.split(':');
    if (components[components.length - 2] == 'uid')
      this._userIDComponent = components[components.length - 1];
  }
  createIdentity(components) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!this.isIdentified());
    if (this._userIDComponent)
      var id = `${components.base}:uid:${this._userIDComponent}`;
    else
      var id = `${components.base}:${components.component()}`;
    this[__WEBPACK_IMPORTED_MODULE_1__symbols_js__["a" /* default */].identifier] = id;
  }
  toLiteral() {
    return this.rawData;
  }

  get debugString() {
    return JSON.stringify(this.rawData);
  }

  static get type() {
    // TODO: should the entity's key just be its type?
    // Should it just be called type in that case?
    return __WEBPACK_IMPORTED_MODULE_2__type_js__["a" /* default */].newEntity(this.key.schema);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Entity);


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt


/* harmony default export */ __webpack_exports__["a"] = ({identifier: Symbol('id')});


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__type_js__ = __webpack_require__(4);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */





class Description {
  constructor(arc) {
    this._arc = arc;
    this._recipe = arc._activeRecipe;

    this.onRecipeUpdate();
  }

  onRecipeUpdate() {
    this._particleDescriptions = this._recipe.particles.map(particle => { return {_particle: particle, _connections: {} }; });

    this.setRelevance(this._relevance);
  }

  setRelevance(relevance) {
    this._relevance = relevance;
    if (this._relevance) {
      this._particleDescriptions.forEach(pDesc => {
        pDesc._rank = this._relevance.calcParticleRelevance(pDesc._particle);
      });
    }
  }

  async _updateDescriptionHandles() {
    for (let pDesc of this._particleDescriptions) {
      let particle = pDesc._particle;
      let descByName = await this._getPatternByNameFromDescriptionHandle(particle) || {};
      let pattern = descByName["_pattern_"] || particle.spec.pattern;
      if (pattern) {
        pDesc.pattern = pattern;
      }

      pDesc._connections = {};
      Object.values(particle.connections).forEach(viewConn => {
        let specConn = particle.spec.connectionMap.get(viewConn.name);
        let pattern = descByName[viewConn.name] || specConn.pattern;
        if (pattern) {
          let viewDescription = {pattern: pattern, _viewConn: viewConn, _view: this._arc.findViewById(viewConn.view.id)};
          pDesc._connections[viewConn.name] = viewDescription;
        }
      });
    };
  }

  async _getPatternByNameFromDescriptionHandle(particle) {
    let descriptionConn = particle.connections["descriptions"];
    if (descriptionConn && descriptionConn.view && descriptionConn.view.id) {
      let descView = this._arc.findViewById(descriptionConn.view.id);
      if (descView) {
        let descList = await descView.toList();
        let descByName = {};
        descList.forEach(d => descByName[d.rawData.key] = d.rawData.value);
        return descByName;
      }
    }
  }

  async getRecipeSuggestion(particles) {
    await this._updateDescriptionHandles();  // This is needed to get updates in description handle.

    // Choose particles that render UI, sort them by rank and generate suggestions.
    let particlesSet = new Set(particles || this._particleDescriptions.map(pDesc => pDesc._particle));
    let selectedDescriptions = this._particleDescriptions
      .filter(desc => { return particlesSet.has(desc._particle) && desc._particle.spec.slots.size > 0 && !!desc.pattern; })
      .sort(Description.sort);

    let options = { seenViews: new Set(), seenParticles: new Set() };
    let suggestions = [];
    for (let particle of selectedDescriptions) {
      if (!options.seenParticles.has(particle._particle)) {
        suggestions.push(await this.patternToSuggestion(particle.pattern, particle, options));
      }
    }

    if (suggestions.length == 0) {
      // Return recipe name by default.
      return this._recipe.name;
    }

    return this._capitalizeAndPunctuate(this._joinStringsToSentence(suggestions));
  }

  _joinStringsToSentence(strings) {
    let count = strings.length;
    // Combine descriptions into a sentence:
    // "A."
    // "A and b."
    // "A, b, ..., and z." (Oxford comma ftw)
    let delim = ['', '', ' and ', ', and '][count > 2 ? 3 : count];
    return strings.slice(0, -1).join(", ") + delim + strings.pop();
  }

  _capitalizeAndPunctuate(sentence) {
    // "Capitalize, punctuate."
    return sentence[0].toUpperCase() + sentence.slice(1) + '.';
  }

  async getViewDescription(recipeView) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(recipeView.connections.length > 0, 'view has no connections?');

    await this._updateDescriptionHandles();  // This is needed to get updates in description handle.

    let viewConnection = this._selectViewConnection(recipeView) || recipeView.connections[0];
    let view = this._arc.findViewById(recipeView.id);
    return this._formatDescription(viewConnection, view, { seenViews: new Set(), excludeValues: true });
  }

  async patternToSuggestion(pattern, particleDescription, options) {
    this._tokens = this._initTokens(pattern, particleDescription._particle);
    return (await Promise.all(this._tokens.map(async token => await this.tokenToString(token, options)))).join("");
  }

  _initTokens(pattern, particle) {
    pattern = pattern.replace(/</g, '&lt;');
    let results = [];
    while (pattern.length  > 0) {
      let tokens = pattern.match(/\${[a-zA-Z0-9::~\.\[\]_]+}/g);
      if (tokens) {
        var firstToken = pattern.match(/\${[a-zA-Z0-9::~\.\[\]_]+}/g)[0];
        var tokenIndex = pattern.indexOf(firstToken);
      } else {
        var firstToken = "";
        var tokenIndex = pattern.length;
      }
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(tokenIndex >= 0);
      let nextToken = pattern.substring(0, tokenIndex);
      if (nextToken.length > 0)
        results.push({text: nextToken});
      if (firstToken.length > 0) {
        let valueTokens = pattern.match(/\$\{([a-zA-Z]+)(?:\.([_a-zA-Z]+))?\}/);
        let handleName = valueTokens[1];
        let extra = valueTokens.length == 3 ? valueTokens[2] : undefined;
        let valueToken;
        let viewConn = particle.connections[handleName];
        if (viewConn) {  // view connection
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(viewConn.view && viewConn.view.id, 'Missing id???');
          valueToken = {viewName: handleName, extra, _viewConn: viewConn, _view: this._arc.findViewById(viewConn.view.id)};
        } else {  // slot connection
          let providedSlotConn = particle.consumedSlotConnections[handleName].providedSlots[extra];
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(providedSlotConn, `Could not find handle ${handleName}`);
          valueToken = {slotName: handleName, _providedSlotConn: providedSlotConn};
        }
        results.push(valueToken);
      }
      pattern = pattern.substring(tokenIndex + firstToken.length);
    }
    return results;
  }

  async tokenToString(token, options) {
    if (token.text) {
      return token.text;
    }
    if (token.viewName) {
      return this._viewTokenToString(token, options);
    } else  if (token.slotName) {
      return this._slotTokenToString(token, options);
    }
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(false, `no view or slot name (${JSON.stringify(token)})`);
  }

  async _viewTokenToString(token, options) {
    switch (token.extra) {
      case "_type_":
        return token._viewConn.type.toPrettyString().toLowerCase();
      case "_values_":
        return this._formatViewValue(token._view);
      case "_name_": {
        return (await this._formatDescription(token._viewConn, token._view, options)).toString();
      }
      case undefined:
        // full view description
        let descriptionToken = (await this._formatDescription(token._viewConn, token._view, options)) || {};
        let viewValue = await this._formatViewValue(token._view);
        if (!descriptionToken.pattern) {
          // For singleton view, if there is no real description (the type was used), use the plain value for description.
          if (viewValue && !token._view.type.isSetView && !options.excludeValues) {
            return viewValue;
          }
        }

        if (viewValue && !options.excludeValues && !options.seenViews.has(token._view.id)) {
          options.seenViews.add(token._view.id);
          return `${descriptionToken.toString()} (${viewValue})`;
        }
        return descriptionToken.toString();
      default:  // property
        return this._propertyTokenToString(token._view, token.extra.split('.'));
      }
  }

  async _slotTokenToString(token, options) {
    let results = (await Promise.all(token._providedSlotConn.consumeConnections.map(async consumeConn => {
      let particle = consumeConn.particle;
      let particleDescription = this._particleDescriptions.find(desc => desc._particle == particle);
      options.seenParticles.add(particle);
      return this.patternToSuggestion(particle.spec.pattern, particleDescription, options);
    }))).filter(str => !!str);

    return this._joinStringsToSentence(results);
  }

  async _propertyTokenToString(view, properties) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!view.type.isSetView, `Cannot return property ${properties.join(",")} for set-view`);
    // Use singleton value's property (eg. "09/15" for person's birthday)
    let viewVar = await view.get();
    if (viewVar) {
      let value = viewVar.rawData;
      properties.forEach(p => {
        if (value) {
          value = value[p];
        }
      });
      if (value) {
        return `<b>${value}</b>`;
      }
    }
  }

  async _formatViewValue(view) {
    if (!view) {
      return;
    }
    if (view.type.isSetView) {
      let viewList = await view.toList();
      if (viewList && viewList.length > 0) {
        if (viewList[0].rawData.name) {
          if (viewList.length > 2) {
            // TODO: configurable view display format.
            return `<b>${viewList[0].rawData.name}</b> plus <b>${viewList.length-1}</b> other items`;
          }
          return viewList.map(v => `<b>${v.rawData.name}</b>`).join(", ");
        } else {
          return `<b>${viewList.length}</b> items`;
        }
      }
    } else {
      let viewVar = await view.get();
      if (viewVar && viewVar.rawData.name) {
        return `<b>${viewVar.rawData.name}</b>`;  // TODO: use type's Entity instead
      }
    }
  }

  async _formatDescription(viewConnection, view, options) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(viewConnection.view.id == view.id, `Mismatching view IDs ${viewConnection.view.id} and ${view.id}`);

    let chosenConnection = viewConnection;
    // For "out" connection, use its own description
    // For "in" connection, use description of the highest ranked out connection with description.
    if (!chosenConnection.spec.isOutput) {
      let otherConnection = this._selectViewConnection(viewConnection.view);
      if (otherConnection) {
        chosenConnection = otherConnection;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(chosenConnection.view.id == view.id, `Non matching views`);
      }
    }

    let chosenParticleDescription = this._particleDescriptions.find(desc => desc._particle == chosenConnection.particle);
    let viewDescription = chosenParticleDescription ? chosenParticleDescription._connections[chosenConnection.name] : null;
    // Add description to result array.
    if (viewDescription) {
      // Add the connection spec's description pattern.
      return DescriptionToken.fromPatternDescription(await this.patternToSuggestion(viewDescription.pattern, chosenParticleDescription, options));
    } else if (view && view.description) {
      // Use the view description available in the arc.
      return view.description;
    } else {
      return DescriptionToken.fromTypeDescription(viewConnection.type.toPrettyString().toLowerCase());
    }
  }

  _selectViewConnection(recipeView) {
    let possibleConnections = recipeView.connections.filter(connection => {
      // Choose connections with patterns (manifest-based or dynamic).
      let connectionSpec = connection.spec;
      let particleDescription = this._particleDescriptions.find(desc => desc._particle == connection.particle);
      return !!connectionSpec.pattern || !!particleDescription._connections[connection.name];
    });

    possibleConnections.sort((c1, c2) => {
      let isOutput1 = c1.spec.isOutput;
      let isOutput2 = c2.spec.isOutput;
      if (isOutput1 != isOutput2) {
        // Prefer output connections
        return isOutput1 ? -1 : 1;
      }

      let d1 = this._particleDescriptions.find(desc => desc._particle == c1.particle);
      let d2 = this._particleDescriptions.find(desc => desc._particle == c2.particle);
      // Sort by particle's rank in descending order.
      return d2._rank - d1._rank;
    });

    if (possibleConnections.length > 0) {
      return possibleConnections[0];
    }
  }

  static sort(p1, p2) {
    // Root slot comes first.
    let hasRoot1 = [...p1._particle.spec.slots.keys()].indexOf("root") >= 0;
    let hasRoot2 = [...p2._particle.spec.slots.keys()].indexOf("root") >= 0;
    if (hasRoot1 != hasRoot2) {
      return hasRoot1 ? -1 : 1;
    }

    // Sort by rank
    if (p1._rank != p2._rank) {
      return p1._rank != p2._rank;
    }

    // Sort by number of singleton slots.
    let p1Slots = 0, p2Slots = 0;
    p1._particle.spec.slots.forEach((slotSpec) => { if (!slotSpec.isSet) ++p1Slots; });
    p2._particle.spec.slots.forEach((slotSpec) => { if (!slotSpec.isSet) ++p2Slots; });
    return p2Slots - p1Slots;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Description;


class DescriptionToken {
  constructor(pattern, type) {
    this._pattern = pattern;
    this._type = type;
  }
  get pattern() { return this._pattern; }
  get type() { return this._type; }
  toString() {
    return this._pattern || this._type;
  }
  static fromPatternDescription(patternDescription) {
    return new DescriptionToken(patternDescription);
  }
  static fromTypeDescription(typeDescription) {
    return new DescriptionToken(null, typeDescription);
  }
}


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tracelib_trace_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scheduler_js__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__recipe_util_js__ = __webpack_require__(5);
// @
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt







class InMemoryKey {
  constructor(key) {
    var parts = key.split("://");
    this.protocol = parts[0];
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(this.protocol == 'in-memory');
    this.location = parts[1];
  }
  toString() {
    return this.protocol + '://' + this.location;
  }
}

class InMemoryStorage {
  constructor(arc) {
      this._arc = arc;
      this._memoryMap = {};
      this.localIDBase = 0;
  }

  construct(id, type, keyFragment) {
    var key = new InMemoryKey(keyFragment);
    if (key.location == undefined)
      key.location = 'in-memory-' + this.localIDBase++;
    var provider = InMemoryStorageProvider.newProvider(type, this._arc, undefined, id);
    if (this._memoryMap[key.toString()] !== undefined)
      return null;
    this._memoryMap[key.toString()] = provider;
    return provider;
  }

  connect(id, type, key) {
    if (this._memoryMap[key] == undefined)
      return null;
    // TODO assert types match?
    return this._memoryMap[key];
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = InMemoryStorage;


class InMemoryStorageProvider {
  constructor(type, arc, name, id) {
    var trace = __WEBPACK_IMPORTED_MODULE_1__tracelib_trace_js__["a" /* default */].start({cat: 'view', name: 'InMemoryStorageProvider::constructor', args: {type: type.key, name: name}});
    this._type = type;
    this._arc = arc;
    this._listeners = new Map();
    this.name = name;
    this._version = 0;
    this.id = id || this._arc.generateID();
    this.source = null;
    trace.end();
  }

  generateID() {
    return this._arc.generateID();
  }

  generateIDComponents() {
    return this._arc.generateIDComponents();
  }

  get type() {
    return this._type;
  }
  // TODO: add 'once' which returns a promise.
  on(kind,  callback, target) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(target !== undefined, "must provide a target to register a view event handler");
    let listeners = this._listeners.get(kind) || new Map();
    listeners.set(callback, {version: -Infinity, target});
    this._listeners.set(kind, listeners);
  }

  _fire(kind, details) {
    var listenerMap = this._listeners.get(kind);
    if (!listenerMap || listenerMap.size == 0)
      return;

    var callTrace = __WEBPACK_IMPORTED_MODULE_1__tracelib_trace_js__["a" /* default */].start({cat: 'view', name: 'InMemoryStorageProvider::_fire', args: {kind, type: this._type.key,
        name: this.name, listeners: listenerMap.size}});

    // TODO: wire up a target (particle)
    let eventRecords = [];

    for (let [callback, registration] of listenerMap.entries()) {
      let target = registration.target;
      eventRecords.push({target, callback, kind, details});
    }

    __WEBPACK_IMPORTED_MODULE_2__scheduler_js__["a" /* default */].enqueue(this, eventRecords);

    callTrace.end();
  }

  _compareTo(other) {
    let cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_3__recipe_util_js__["a" /* default */].compareStrings(this.name, other.name)) != 0) return cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_3__recipe_util_js__["a" /* default */].compareNumbers(this._version, other._version)) != 0) return cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_3__recipe_util_js__["a" /* default */].compareStrings(this.source, other.source)) != 0) return cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_3__recipe_util_js__["a" /* default */].compareStrings(this.id, other.id)) != 0) return cmp;
    return 0;
  }

  toString(viewTags) {
    let results = [];
    let viewStr = [];
    viewStr.push(`view`);
    if (this.name) {
      viewStr.push(`${this.name}`);
    }
    viewStr.push(`of ${this.type.toString()}`);
    if (this.id) {
      viewStr.push(`'${this.id}'`);
    }
    if (viewTags && viewTags.length) {
      viewStr.push(`${[...viewTags].join(' ')}`);
    }
    if (this.source) {
      viewStr.push(`in '${this.source}'`);
    }
    results.push(viewStr.join(' '));
    if (this.description)
      results.push(`  description \`${this.description}\``)
    return results.join('\n');
  }

  static newProvider(type, arc, name, id) {
    if (type.isSetView)
      return new InMemoryCollection(type, arc, name, id);
    return new InMemoryVariable(type, arc, name, id);
  }
}

class InMemoryCollection extends InMemoryStorageProvider {
  constructor(type, arc, name, id) {
    super(type, arc, name, id);
    this._items = new Map();
  }

  clone() {
    var view = new InMemoryCollection(this._type, this._arc, this.name, this.id);
    view.cloneFrom(this);
    return view;
  }

  cloneFrom(view) {
    this.name = view.name;
    this.source = view.source;
    this._items = new Map(view._items);
    this._version = view._version;
    this.description = view.description;
  }

  async get(id) {
    return this._items.get(id);
  }
  traceInfo() {
    return {items: this._items.size};
  }
  // HACK: replace this with some kind of iterator thing?
  async toList() {
    return [...this._items.values()];
  }

  async store(entity) {
    var trace = __WEBPACK_IMPORTED_MODULE_1__tracelib_trace_js__["a" /* default */].start({cat: "view", name: "InMemoryCollection::store", args: {name: this.name}});
    var entityWasPresent = this._items.has(entity.id);

    this._items.set(entity.id, entity);
    this._version++;
    if (!entityWasPresent)
      this._fire('change', {add: [entity], version: this._version});
    trace.end({args: {entity}});
  }

  async remove(id) {
    var trace = __WEBPACK_IMPORTED_MODULE_1__tracelib_trace_js__["a" /* default */].start({cat: "view", name: "InMemoryCollection::remove", args: {name: this.name}});
    if (!this._items.has(id)) {
      return;
    }
    let entity = this._items.get(id);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(this._items.delete(id));
    this._version++;
    this._fire('change', {remove: [entity], version: this._version});
    trace.end({args: {entity}});
  }

  // TODO: Something about iterators??
  // TODO: Something about changing order?

  extractEntities(set) {
    this._items.forEach(a => set.add(a));
  }

  serialize(list) {
    list.push({
      id: this.id,
      sort: 'view',
      type: this.type.toLiteral(),
      name: this.name,
      values: this.toList().map(a => a.id),
      version: this._version
    });
  }

  serializeMappingRecord(list) {
    list.push({
      id: this.id,
      sort: 'view',
      type: this.type.toLiteral(),
      name: this.name,
      version: this._version,
      arc: this._arc.id
    })
  }
}

class InMemoryVariable extends InMemoryStorageProvider {
  constructor(type, arc, name, id) {
    super(type, arc, name, id);
    this._stored = null;
  }

  clone() {
    var variable = new InMemoryVariable(this._type, this._arc, this.name, this.id);
    variable.cloneFrom(this);
    return variable;
  }

  cloneFrom(variable) {
    this._stored = variable._stored;
    this._version = variable._version;
  }

  traceInfo() {
    return {stored: this._stored !== null};
  }

  async get() {
    return this._stored;
  }

  async set(entity) {
    this._stored = entity;
    this._version++;
    this._fire('change', {data: this._stored, version: this._version});
  }

  async clear() {
    this.set(undefined);
  }

  extractEntities(set) {
    if (!this._stored) {
      return;
    }
    set.add(this._stored);
  }

  serialize(list) {
    if (this._stored == undefined)
      return;
    list.push({
      id: this.id,
      sort: 'variable',
      type: this.type.toLiteral(),
      name: this.name,
      value: this._stored.id,
      version: this._version
    });
  }

  serializeMappingRecord(list) {
    list.push({
      id: this.id,
      sort: 'variable',
      type: this.type.toLiteral(),
      name: this.name,
      version: this._version,
      arc: this._arc.id
    })
  }
}


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_fs_web_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__platform_vm_web_js__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fetch_web_js__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__particle_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dom_particle_js__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__converters_jsonldToManifest_js__ = __webpack_require__(38);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
 









function schemaLocationFor(name) {
  return `../entities/${name}.schema`;
}

class Loader {
  path(fileName) {
    let path = fileName.replace(/[\/][^\/]+$/, '/')
    return path;
  }

  join(prefix, path) {
    if (/^https?:\/\//.test(path))
      return path;
    prefix = this.path(prefix);
    return prefix + path;
  }

  loadResource(file) {
    if (/^https?:\/\//.test(file))
      return this._loadURL(file);
    return this._loadFile(file);
  }

  _loadFile(file) {
    return new Promise((resolve, reject) => {
      __WEBPACK_IMPORTED_MODULE_0__platform_fs_web_js__["a" /* default */].readFile(file, (err, data) => {
        if (err)
          reject(err);
        else
          resolve(data.toString('utf-8'));
      });
    });
  }

  _loadURL(url) {
    if (/\/\/schema.org\//.test(url)) {
      if (url.endsWith('/Thing')) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__fetch_web_js__["a" /* default */])("https://schema.org/Product.jsonld").then(res => res.text()).then(data => __WEBPACK_IMPORTED_MODULE_6__converters_jsonldToManifest_js__["a" /* default */].convert(data, {'@id': 'schema:Thing'}));
      }
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__fetch_web_js__["a" /* default */])(url + ".jsonld").then(res => res.text()).then(data => __WEBPACK_IMPORTED_MODULE_6__converters_jsonldToManifest_js__["a" /* default */].convert(data));
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__fetch_web_js__["a" /* default */])(url).then(res => res.text());
  }

  async loadParticleClass(spec) {
    let clazz = await this.requireParticle(spec.implFile);
    clazz.spec = spec;
    return clazz;
  }

  async requireParticle(fileName) {
    let src = await this.loadResource(fileName);
    // Note. This is not real isolation.
    let script = new __WEBPACK_IMPORTED_MODULE_1__platform_vm_web_js__["a" /* default */].Script(src, {filename: fileName, displayErrors: true});
    let result = [];
    let self = {
      defineParticle(particleWrapper) {
        result.push(particleWrapper);
      },
      console,
      importScripts: s => null //console.log(`(skipping browser-space import for [${s}])`)
    };
    script.runInNewContext(self, {filename: fileName, displayErrors: true});
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__platform_assert_web_js__["a" /* default */])(result.length > 0 && typeof result[0] == 'function', `Error while instantiating particle implementation from ${fileName}`);
    return this.unwrapParticle(result[0]);
  }

  unwrapParticle(particleWrapper) {
    return particleWrapper({particle: __WEBPACK_IMPORTED_MODULE_4__particle_js__["a" /* default */], Particle: __WEBPACK_IMPORTED_MODULE_4__particle_js__["a" /* default */].Particle, DomParticle: __WEBPACK_IMPORTED_MODULE_5__dom_particle_js__["a" /* default */]});
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Loader);


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__runtime_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__particle_spec_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tracelib_trace_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__schema_js__ = __webpack_require__(7);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */








const DEBUGGING = false;

/** @class Particle
 * A basic particle. For particles that provide UI, you may like to
 * instead use DOMParticle.
 */
class Particle {
  constructor(capabilities) {
    this.spec = this.constructor.spec;
    if (this.spec.inputs.length == 0)
      this.extraData = true;
    this.relevances = [];
    this._idle = Promise.resolve();
    this._idleResolver = null;
    this._busy = 0;
    this.slotHandlers = [];
    this.stateHandlers = new Map();
    this.states = new Map();
    this._slotByName = new Map();
    this.capabilities = capabilities || {};
    this.hostedSlotBySlotId = new Map();
  }

  /** @method setViews(views)
   * This method is invoked with a handle for each view this particle
   * is registered to interact with, once those views are ready for
   * interaction. Override the method to register for events from
   * the views.
   *
   * Views is a map from view names to view handles.
   */
  setViews(views) {

  }

  constructInnerArc() {
    if (!this.capabilities.constructInnerArc)
      throw new Error("This particle is not allowed to construct inner arcs");
    return this.capabilities.constructInnerArc(this);
  }

  get busy() {
    return this._busy > 0;
  }

  get idle() {
    return this._idle;
  }

  /** @method setBusy()
   * Prevents this particle from indicating that it's idle until a matching
   * call to setIdle is made.
   */
  setBusy() {
    if (this._busy == 0)
    this._idle = new Promise((resolve, reject) => {
      this._idleResolver = resolve;
    });
    this._busy++;
  }

  /** @method setIdle()
   * Indicates that a busy period (initiated by a call to setBusy) has completed.
   */
  setIdle() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__platform_assert_web_js__["a" /* default */])(this._busy > 0);
    this._busy--;
    if (this._busy == 0)
      this._idleResolver();
  }

  set relevance(r) {
    this.relevances.push(r);
  }

  inputs() {
    return this.spec.inputs;
  }

  outputs() {
    return this.spec.outputs;
  }

  /** @method getSlot(name)
   * Returns the slot with provided name.
   */
  getSlot(name) {
    return this._slotByName.get(name);
  }

  addSlotHandler(f) {
    this.slotHandlers.push(f);
  }

  addStateHandler(states, f) {
    states.forEach(state => {
      if (!this.stateHandlers.has(state)) {
        this.stateHandlers.set(state, []);
      }
      this.stateHandlers.get(state).push(f);
    });
  }

  emit(state, value) {
    this.states.set(state, value);
    this.stateHandlers.get(state).forEach(f => f(value));
  }

  /** @method on(views, names, kind, f)
   * Convenience method for registering a callback on multiple views at once.
   *
   * views is a map from names to view handles
   * names indicates the views which should have a callback installed on them
   * kind is the kind of event that should be registered for
   * f is the callback function
   */
  on(views, names, kind, f) {
    if (typeof names == "string")
      names = [names];
    var trace = __WEBPACK_IMPORTED_MODULE_2__tracelib_trace_js__["a" /* default */].start({cat: 'particle', names: this.constructor.name + "::on", args: {view: names, event: kind}});
    names.forEach(name => views.get(name).on(kind, __WEBPACK_IMPORTED_MODULE_2__tracelib_trace_js__["a" /* default */].wrap({cat: 'particle', name: this.constructor.name, args: {view: name, event: kind}}, f), this));
    trace.end();
  }

  logDebug(tag, view) {
    if (!DEBUGGING)
      return;
    let direction = this.spec.connectionMap.get(tag).direction;
    view.debugString().then(v => console.log(
       `(${this.spec.name})(${direction})(${tag}): (${view.name})`, v));
  }

  when(changes, f) {
    changes.forEach(change => change.register(this, f));
  }

  fireEvent(slotName, event) {
    // TODO(sjmiles): tests can get here without a `this.slot`, maybe this needs to be fixed in MockSlotManager?
    let slot = this.getSlot(slotName);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__platform_assert_web_js__["a" /* default */])(slot, `Particle::fireEvent: slot ${slotName} is falsey`);
    slot.fireEvent(event);
  }

  static buildManifest(strings, ...bits) {
    let output = [];
    for (let i = 0; i < bits.length; i++) {
        let str = strings[i];
        let indent = / *$/.exec(str)[0];
        if (typeof bits[i] == 'string')
          var bitStr = bits[i];
        else
          var bitStr = bits[i].toManifestString();
        bitStr = bitStr.replace(/(\n)/g, '$1' + indent);
        output.push(str);
        output.push(bitStr);
    }
    if (strings.length > bits.length)
      output.push(strings[strings.length - 1]);
    return output.join('');
  }

  setParticleDescription(pattern) {
    return this.setDescriptionPattern('_pattern_', pattern);

  }
  setDescriptionPattern(connectionName, pattern) {
    let descriptions = this._views.get('descriptions');
    if (descriptions) {
      descriptions.store(new descriptions.entityClass({key: connectionName, value: pattern}, connectionName));
      return true;
    }
    return false;
  }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = Particle;


class ViewChanges {
  constructor(views, names, type) {
    if (typeof names == "string")
      names = [names];
    this.names = names;
    this.views = views;
    this.type = type;
  }
  register(particle, f) {
    var modelCount = 0;
    var afterAllModels = () => { if (++modelCount == this.names.length) { f(); } };

    for (var name of this.names) {
      var view = this.views.get(name);
      view.synchronize(this.type, afterAllModels, f, particle)
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["c"] = ViewChanges;


class SlotChanges {
  constructor() {
  }
  register(particle, f) {
    particle.addSlotHandler(f);
  }
}
/* unused harmony export SlotChanges */


class StateChanges {
  constructor(states) {
    if (typeof states == "string")
      states = [states];
    this.states = states;
  }
  register(particle, f) {
    particle.addStateHandler(this.states, f);
  }
}
/* unused harmony export StateChanges */


/* harmony default export */ __webpack_exports__["a"] = ({Particle, ViewChanges, SlotChanges, StateChanges});


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__entity_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__type_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__symbols_js__ = __webpack_require__(12);
// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt







// TODO: Should relations normalized by another layer, or here?
class Relation extends __WEBPACK_IMPORTED_MODULE_1__entity_js__["a" /* default */] {
  constructor(...entities) {
    super();
    this.entities = entities;
  }
  get data() {
    return this.entities.map(entity => entity[__WEBPACK_IMPORTED_MODULE_3__symbols_js__["a" /* default */].identifier].toLiteral());
  }
  static typeFor(relation) {
    var result = new __WEBPACK_IMPORTED_MODULE_2__type_js__["a" /* default */](relation.entities.map(entity => entity.constructor.type), relation.constructor);
    return result;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Relation);


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__type_js__ = __webpack_require__(4);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */



// ShapeView {name, direction, type}
// Slot {name, direction}

function _fromLiteral(member) {
  if (typeof member == 'object')
    return __WEBPACK_IMPORTED_MODULE_1__type_js__["a" /* default */].fromLiteral(member);
  return member;
}

function _toLiteral(member) {
  if (member && member.toLiteral)
    return member.toLiteral();
  return member;
}

class Shape {
  constructor(views, slots) {
    this.views = views;
    this.slots = slots;
    this._typeVars = [];
    for (let view of views)
      for (let field of ['type', 'name', 'direction'])
        if (Shape.isTypeVar(view[field]))
          this._typeVars.push({object: view, field});

    for (let slot of slots)
      for (let field of ['name', 'direction'])
        if (Shape.isTypeVar(slot[field]))
          this._typeVars.push({object: slot, field});
  }

  toPrettyString() {
    return "SHAAAAPE";
  }

  static fromLiteral(data) {
    let views = data.views.map(view => ({type: _fromLiteral(view.type), name: _fromLiteral(view.name), direction: _fromLiteral(view.direction)}));
    let slots = data.slots.map(slot => ({name: _fromLiteral(slot.name), direction: _fromLiteral(slot.direction)}));
    return new Shape(views, slots);
  }

  toLiteral() {
    let views = this.views.map(view => ({type: _toLiteral(view.type), name: _toLiteral(view.name), direction: _toLiteral(view.direction)}));
    let slots = this.slots.map(slot => ({name: _toLiteral(slot.name), direction: _toLiteral(slot.direction)}));
    return {views, slots};
  }

  clone() {
    var views = this.views.map(({name, direction, type}) => ({name, direction, type}));
    var slots = this.slots.map(({name, direction}) => ({name, direction}));
    return new Shape(views, slots);
  }

  equals(other) {
    if (this.views.length !== other.views.length)
      return false;

    // TODO: this isn't quite right as it doesn't deal with duplicates properly
    for (let otherView of other.views) {
      let exists = false;
      for (let view of this.views) {
        if (view.name == otherView.name && view.direction == otherView.direction && view.type.equals(otherView.type)) {
          exists = true;
          break;
        }
      }
      if (!exists)
        return false;
    }

    // TODO: compare slots too
    return true;
  }

  static isTypeVar(reference) {
    return (reference instanceof __WEBPACK_IMPORTED_MODULE_1__type_js__["a" /* default */]) && reference.hasProperty(r => r.isVariable || r.isVariableReference);
  }

  static mustMatch(reference) {
    return !(reference == undefined || Shape.isTypeVar(reference));
  }

  static viewsMatch(shapeView, particleView) {
    if (Shape.mustMatch(shapeView.name) && shapeView.name !== particleView.name)
      return false;
    // TODO: direction subsetting?
    if (Shape.mustMatch(shapeView.direction) && shapeView.direction !== particleView.direction)
      return false;
    // TODO: polymorphism?
    if (Shape.mustMatch(shapeView.type) && !shapeView.type.equals(particleView.type))
      return false;
    return true;
  }

  _particleMatches(particleSpec) {
    var viewMatches = this.views.map(view => particleSpec.connections.filter(connection => Shape.viewsMatch(view, connection)));

    var exclusions = [];

    function choose(list, exclusions) {
      if (list.length == 0)
        return true;
      var thisLevel = list.pop();
      for (var connection of thisLevel) {
        if (exclusions.includes(connection))
          continue;
        var newExclusions = exclusions.slice();
        newExclusions.push(connection);
        if (choose(list, newExclusions))
          return true;
      }

      return false;
    }

    return choose(viewMatches, []);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Shape);




/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recipe_walker_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__recipe_recipe_util_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__platform_assert_web_js__ = __webpack_require__(0);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt







class ViewMapperBase extends __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__["a" /* Strategy */] {
  async generate(strategizer) {
    var self = this;

    var results = __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__["a" /* default */].over(this.getResults(strategizer), new class extends __WEBPACK_IMPORTED_MODULE_1__recipe_walker_js__["a" /* default */] {
      onView(recipe, view) {
        if (view.fate !== self.fate)
          return;

        if (view.connections.length == 0)
          return;

        if (view.id)
          return;

        if (!view.type)
          return;

        // TODO: using the connection to retrieve type information is wrong.
        // Once validation of recipes generates type information on the view
        // we should switch to using that instead.
        var counts = __WEBPACK_IMPORTED_MODULE_3__recipe_recipe_util_js__["a" /* default */].directionCounts(view);
        return this.mapView(view, view.tags, view.type, counts);
      }

      mapView(view, tags, type, counts) {
        var score = -1;
        if (counts.in == 0 || counts.out == 0) {
          if (counts.unknown > 0)
            return;
          if (counts.out == 0)
            score = 1;
          else
            score = 0;
        }

        if (tags.length > 0)
          score += 4;

        var fate = self.fate;
        if (counts.out > 0 && fate == 'map') {
          return;
        }
        var views = self.getMappableViews(type, tags);
        if (views.length == 0)
          return;

        var responses = views.map(newView =>
          ((recipe, clonedView) => {
            for (var existingView of recipe.views)
              // TODO: Why don't we link the view connections to the existingView?
              if (existingView.id == newView.id)
                return 0;
            var tscore = 0;

            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__platform_assert_web_js__["a" /* default */])(newView.id);
            clonedView.mapToView(newView);
            if (clonedView.fate != 'copy') {
              clonedView.fate = fate;
            }
            return score + tscore;
          }));

        responses.push(null); // "do nothing" for this view.
        return responses;
      }
    }(__WEBPACK_IMPORTED_MODULE_1__recipe_walker_js__["a" /* default */].Permuted), this);

    return { results, generate: null };
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ViewMapperBase;



/***/ }),
/* 20 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

/* harmony default export */ __webpack_exports__["a"] = ({});


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PECOuterPort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PECInnerPort; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__particle_spec_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__type_js__ = __webpack_require__(4);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */






class ThingMapper {
  constructor(prefix) {
    this._prefix = prefix;
    this._nextIdentifier = 0;
    this._idMap = new Map();
    this._reverseIdMap = new Map();
  }

  _newIdentifier() {
    return this._prefix + (this._nextIdentifier++);
  }

  createMappingForThing(thing) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!this._reverseIdMap.has(thing));
    var id = this._newIdentifier();
    this.establishThingMapping(id, thing);
    return id;
  }

  maybeCreateMappingForThing(thing) {
    if (this.hasMappingForThing(thing)) {
      return this.identifierForThing(thing);
    }
    return this.createMappingForThing(thing);
  }

  async establishThingMapping(id, thing) {
    let continuation;
    if (Array.isArray(thing)) {
      [thing, continuation] = thing;
    }
    this._idMap.set(id, thing);
    if (thing instanceof Promise) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(continuation == null);
      await this.establishThingMapping(id, await thing);
    } else {
      this._reverseIdMap.set(thing, id);
      if (continuation) {
        await continuation();
      }
    }
  }

  hasMappingForThing(thing) {
    return this._reverseIdMap.has(thing);
  }

  identifierForThing(thing) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(this._reverseIdMap.has(thing), `Missing thing ${thing}`);
    return this._reverseIdMap.get(thing);
  }

  thingForIdentifier(id) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(this._idMap.has(id), `Missing id: ${id}`);
    return this._idMap.get(id);
  }
}


class APIPort {
  constructor(messagePort, prefix) {
    this._port = messagePort;
    this._mapper = new ThingMapper(prefix);
    this._messageMap = new Map();
    this._port.onmessage = async e => this._handle(e);
    this.messageCount = 0;

    this.Direct = {
      convert: a => a,
      unconvert: a => a
    }

    this.Stringify = {
      convert: a => a.toString(),
      unconvert: a => eval(a)
    }

    this.LocalMapped = {
      convert: a => this._mapper.maybeCreateMappingForThing(a),
      unconvert: a => this._mapper.thingForIdentifier(a)
    }

    this.Mapped = {
      convert: a => this._mapper.identifierForThing(a),
      unconvert: a => this._mapper.thingForIdentifier(a)
    }

    this.Dictionary = function(primitive) {
      return {
        convert: a => {
          var r = {};
          for (var key in a) {
            r[key] = primitive.convert(a[key]);
          }
          return r;
        }
      }
    }

    this.Map = function(keyprimitive, valueprimitive) {
      return {
        convert: a => {
          var r = {};
          a.forEach((value, key) => r[keyprimitive.convert(key)] = valueprimitive.convert(value));
          return r;
        },
        unconvert: a => {
          var r = new Map();
          for (var key in a)
            r.set(keyprimitive.unconvert(key), valueprimitive.unconvert(a[key]));
          return r;
        }
      }
    }

    this.List = function(primitive) {
      return {
        convert: a => a.map(v => primitive.convert(v)),
        unconvert: a => a.map(v => primitive.unconvert(v))
      }
    }

    this.ByLiteral = function(clazz) {
      return {
        convert: a => a.toLiteral(),
        unconvert: a => clazz.fromLiteral(a)
      }
    }
  }

  close() {
    this._port.close();
  }

  async _handle(e) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(this._messageMap.has(e.data.messageType));

    this.messageCount++;

    let handler = this._messageMap.get(e.data.messageType);
    let args;
    try {
      args = this._unprocessArguments(handler.args, e.data.messageBody);
    } catch (exc) {
      console.error(`Exception during unmarshaling for ${e.data.messageType}`);
      throw exc;
    }
    // If any of the converted arguments are still pending promises
    // wait for them to complete before processing the message.
    for (let arg of Object.values(args)) {
      if (arg instanceof Promise) {
        arg.then(() => this._handle(e));
        return;
      }
    }
    let result = this["on" + e.data.messageType](args);
    if (handler.isInitializer) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(args.identifier);
      await this._mapper.establishThingMapping(args.identifier, result);
    }
  }

  _processArguments(argumentTypes, args) {
    var messageBody = {};
    for (var argument in argumentTypes)
      messageBody[argument] = argumentTypes[argument].convert(args[argument]);
    return messageBody;
  }

  _unprocessArguments(argumentTypes, args) {
    var messageBody = {};
    for (var argument in argumentTypes)
      messageBody[argument] = argumentTypes[argument].unconvert(args[argument]);
    return messageBody;
  }

  registerCall(name, argumentTypes) {
    this[name] = args => {
      var call = { messageType: name, messageBody: this._processArguments(argumentTypes, args) };
      this._port.postMessage(call);
    };
  }

  registerHandler(name, argumentTypes) {
    this._messageMap.set(name, {args: argumentTypes});
  }

  registerInitializerHandler(name, argumentTypes) {
    argumentTypes.identifier = this.Direct;
    this._messageMap.set(name, {
      isInitializer: true,
      args: argumentTypes,
    });
  }

  registerInitializer(name, argumentTypes) {
    this[name] = (thing, args) => {
      var call = { messageType: name, messageBody: this._processArguments(argumentTypes, args) };
      call.messageBody.identifier = this._mapper.createMappingForThing(thing);
      this._port.postMessage(call);
    };
  }

  registerRedundantInitializer(name, argumentTypes) {
    this[name] = (thing, args) => {
      if (this._mapper.hasMappingForThing(thing))
        return;
      var call = { messageType: name, messageBody: this._processArguments(argumentTypes, args) };
      call.messageBody.identifier = this._mapper.createMappingForThing(thing);
      this._port.postMessage(call);
    };
  }
}

class PECOuterPort extends APIPort {
  constructor(messagePort) {
    super(messagePort, 'o');

    this.registerCall("Stop", {});
    this.registerCall("DefineParticle",
      {particleDefinition: this.Direct, particleFunction: this.Stringify});
    this.registerRedundantInitializer("DefineHandle", {type: this.ByLiteral(__WEBPACK_IMPORTED_MODULE_2__type_js__["a" /* default */]), name: this.Direct})
    this.registerInitializer("InstantiateParticle",
      {spec: this.ByLiteral(__WEBPACK_IMPORTED_MODULE_1__particle_spec_js__["a" /* default */]), handles: this.Map(this.Direct, this.Mapped)});

    this.registerCall("UIEvent", {particle: this.Mapped, slotName: this.Direct, event: this.Direct});
    this.registerCall("SimpleCallback", {callback: this.Direct, data: this.Direct});
    this.registerCall("AwaitIdle", {version: this.Direct});
    this.registerCall("StartRender", {particle: this.Mapped, slotName: this.Direct, contentTypes: this.List(this.Direct)});
    this.registerCall("StopRender", {particle: this.Mapped, slotName: this.Direct});

    this.registerHandler("Render", {particle: this.Mapped, slotName: this.Direct, content: this.Direct});
    this.registerHandler("Synchronize", {handle: this.Mapped, target: this.Mapped,
                                    type: this.Direct, callback: this.Direct,
                                    modelCallback: this.Direct});
    this.registerHandler("HandleGet", {handle: this.Mapped, callback: this.Direct});
    this.registerHandler("HandleToList", {handle: this.Mapped, callback: this.Direct});
    this.registerHandler("HandleSet", {handle: this.Mapped, data: this.Direct});
    this.registerHandler("HandleStore", {handle: this.Mapped, data: this.Direct});
    this.registerHandler("HandleRemove", {handle: this.Mapped, data: this.Direct});
    this.registerHandler("HandleClear", {handle: this.Mapped});
    this.registerHandler("Idle", {version: this.Direct, relevance: this.Map(this.Mapped, this.Direct)});

    this.registerHandler("ConstructInnerArc", {callback: this.Direct, particle: this.Mapped});
    this.registerCall("ConstructArcCallback", {callback: this.Direct, arc: this.LocalMapped});

    this.registerHandler("ArcCreateHandle", {callback: this.Direct, arc: this.LocalMapped, type: this.ByLiteral(__WEBPACK_IMPORTED_MODULE_2__type_js__["a" /* default */]), name: this.Direct});
    this.registerInitializer("CreateHandleCallback", {callback: this.Direct, type: this.ByLiteral(__WEBPACK_IMPORTED_MODULE_2__type_js__["a" /* default */]), name: this.Direct, id: this.Direct});

    this.registerHandler("ArcCreateSlot",
      { callback: this.Direct, arc: this.LocalMapped, transformationParticle: this.Mapped, transformationSlotName: this.Direct, hostedParticleName: this.Direct, hostedSlotName: this.Direct});
    this.registerInitializer("CreateSlotCallback", {callback: this.Direct, hostedSlotId: this.Direct});
    this.registerCall("InnerArcRender", { transformationParticle: this.Mapped, transformationSlotName: this.Direct, hostedSlotId: this.Direct, content: this.Direct});

    this.registerHandler("ArcLoadRecipe", {arc: this.LocalMapped, recipe: this.Direct, callback: this.Direct});
  }
}

class PECInnerPort extends APIPort {
  constructor(messagePort) {
    super(messagePort, 'i');

    this.registerHandler("Stop", {});
    // particleFunction needs to be eval'd in context or it won't work.
    this.registerHandler("DefineParticle",
      {particleDefinition: this.Direct, particleFunction: this.Direct});
    this.registerInitializerHandler("DefineHandle", {type: this.ByLiteral(__WEBPACK_IMPORTED_MODULE_2__type_js__["a" /* default */]), name: this.Direct});
    this.registerInitializerHandler("InstantiateParticle",
      {spec: this.ByLiteral(__WEBPACK_IMPORTED_MODULE_1__particle_spec_js__["a" /* default */]), handles: this.Map(this.Direct, this.Mapped)});

    this.registerHandler("UIEvent", {particle: this.Mapped, slotName: this.Direct, event: this.Direct});
    this.registerHandler("SimpleCallback", {callback: this.LocalMapped, data: this.Direct});
    this.registerHandler("AwaitIdle", {version: this.Direct});
    this.registerHandler("StartRender", {particle: this.Mapped, slotName: this.Direct, contentTypes: this.Direct});
    this.registerHandler("StopRender", {particle: this.Mapped, slotName: this.Direct});

    this.registerCall("Render", {particle: this.Mapped, slotName: this.Direct, content: this.Direct});
    this.registerCall("Synchronize", {handle: this.Mapped, target: this.Mapped,
                                 type: this.Direct, callback: this.LocalMapped,
                                 modelCallback: this.LocalMapped});
    this.registerCall("HandleGet", {handle: this.Mapped, callback: this.LocalMapped});
    this.registerCall("HandleToList", {handle: this.Mapped, callback: this.LocalMapped});
    this.registerCall("HandleSet", {handle: this.Mapped, data: this.Direct});
    this.registerCall("HandleStore", {handle: this.Mapped, data: this.Direct});
    this.registerCall("HandleRemove", {handle: this.Mapped, data: this.Direct});
    this.registerCall("HandleClear", {handle: this.Mapped});
    this.registerCall("Idle", {version: this.Direct, relevance: this.Map(this.Mapped, this.Direct)});

    this.registerCall("ConstructInnerArc", {callback: this.LocalMapped, particle: this.Mapped});
    this.registerHandler("ConstructArcCallback", {callback: this.LocalMapped, arc: this.Direct});

    this.registerCall("ArcCreateHandle", {callback: this.LocalMapped, arc: this.Direct, type: this.ByLiteral(__WEBPACK_IMPORTED_MODULE_2__type_js__["a" /* default */]), name: this.Direct});
    this.registerInitializerHandler("CreateHandleCallback", {callback: this.LocalMapped, type: this.ByLiteral(__WEBPACK_IMPORTED_MODULE_2__type_js__["a" /* default */]), name: this.Direct, id: this.Direct});
    this.registerCall("ArcCreateSlot",
      {callback: this.LocalMapped, arc: this.Direct, transformationParticle: this.Mapped, transformationSlotName: this.Direct, hostedParticleName: this.Direct, hostedSlotName: this.Direct});
    this.registerInitializerHandler("CreateSlotCallback", { callback: this.LocalMapped, hostedSlotId: this.Direct });
    this.registerHandler("InnerArcRender", {transformationParticle: this.Mapped, transformationSlotName: this.Direct, hostedSlotId: this.Direct, content: this.Direct});

    this.registerCall("ArcLoadRecipe", {arc: this.Direct, recipe: this.Direct, callback: this.LocalMapped});
  }
}


/* unused harmony default export */ var _unused_webpack_default_export = ({ PECOuterPort, PECInnerPort });


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

let nob = () => Object.create(null);

/* harmony default export */ __webpack_exports__["a"] = (Base => class extends Base {
  constructor() {
    super();
    this._pendingProps = nob();
    this._props = this._getInitialProps() || nob();
    this._lastProps = nob();
    this._state = this._getInitialState() || nob();
    this._lastState = nob();
  }
  _getInitialProps() {
  }
  _getInitialState() {
  }
  _getProperty(name) {
    return this._pendingProps[name] || this._props[name];
  }
  _setProperty(name, value) {
    // dirty checking opportunity
    if (this._validator || this._wouldChangeProp(name, value)) {
      this._pendingProps[name] = value;
      this._invalidateProps();
    }
  }
  _wouldChangeProp(name, value) {
    return (typeof value === 'object') || (this._props[name] !== value);
  }
  _setProps(props) {
    // TODO(sjmiles): should this be a replace instead of a merge?
    Object.assign(this._pendingProps, props);
    this._invalidateProps();
  }
  _invalidateProps() {
    this._propsInvalid = true;
    this._invalidate();
  }
  _setState(state) {
    Object.assign(this._state, state);
    this._invalidate();
  }
  _async(fn) {
    // TODO(sjmiles): SystemJS throws unless `Promise` is `window.Promise`
    return Promise.resolve().then(fn.bind(this));
    //return setTimeout(fn.bind(this), 10);
  }
  _invalidate() {
    if (!this._validator) {
      //this._log('register _async validate');
      //console.log(this.localName + (this.id ? '#' + this.id : '') + ': invalidated');
      this._validator = this._async(this._validate);
    }
  }
  _validate() {
    // try..catch to ensure we nullify `validator` before return
    try {
      // TODO(sjmiles): should this be a replace instead of a merge?
      Object.assign(this._props, this._pendingProps);
      if (this._propsInvalid) {
        // TODO(sjmiles): should/can have different timing from rendering?
        this._willReceiveProps(this._props, this._state, this._lastProps);
        this._propsInvalid = false;
      }
      if (this._shouldUpdate(this._props, this._state, this._lastProps, this._lastState)) {
        // TODO(sjmiles): consider throttling render to rAF
        this._ensureMount();
        this._update(this._props, this._state, this._lastProps);
      }
    } catch(x) {
      console.error(x);
    }
    // nullify validator _after_ methods so state changes don't reschedule validation
    // TODO(sjmiles): can/should there ever be state changes fom inside _update()? In React no, in Xen yes (until I have a good reason not too).
    this._validator = null;
    // save the old props and state
    // TODO(sjmiles): don't need to create these for default _shouldUpdate
    this._lastProps = Object.assign(nob(), this._props);
    //this._lastState = Object.assign(nob(), this._state);
    this._didUpdate(this._props, this._state);
  }
  _ensureMount() {
  }
  _willReceiveProps(props, state) {
  }
  /*
  _willReceiveState(props, state) {
  }
  */
  _shouldUpdate(props, state, lastProps) {
    return true;
  }
  _update(props, state) {
  }
  _didUpdate(props, state) {
  }
});


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/* harmony default export */ __webpack_exports__["a"] = ((scope => {

'use strict';

if (typeof document !== 'undefined' && !('currentImport' in document)) {
  Object.defineProperty(document, 'currentImport', {
    get() {
      return (document._currentScript || document.currentScript || document).ownerDocument;
    }
  });
}

/* Annotator */
// tree walker that generates arbitrary data using visitor function `cb`
// `cb` is called as `cb(node, key, notes)`
// where
//   `node` is a visited node.
//   `key` is a handle which identifies the node in a map generated by `Annotator.locateNodes`.
class Annotator {
  constructor(cb) {
    this.cb = cb;
  }
  // For subtree at `node`, produce annotation object `notes`.
  // the content of `notes` is completely determined by the behavior of the
  // annotator callback function supplied at the constructor.
  annotate(node, notes, opts) {
    this.notes = notes;
    this.opts = opts || 0;
    this.key = this.opts.key || 0;
    notes.locator = this._annotateSubtree(node);
    //console.log('notes:', notes);
    return notes;
  }
  // walking subtree at `node`
  _annotateSubtree(node) {
    let childLocators;
    for (let i = 0, child = node.firstChild, previous = null, neo; child; i++) {
      // returns a locator only if a node in the subtree requires one
      let childLocator = this._annotateNode(child);
      // only when necessary, maintain a sparse array of locators
      if (childLocator) {
        (childLocators = childLocators || {})[i] = childLocator;
      }
      // `child` may have been evacipated by visitor
      neo = previous ? previous.nextSibling : node.firstChild;
      if (neo === child) {
        previous = child;
        child = child.nextSibling;
      } else {
        child = neo;
        i--;
      }
    }
    // is falsey unless there was at least one childLocator
    return childLocators;
  }
  _annotateNode(node) {
    // visit node
    let key = this.key++;
    let shouldLocate = this.cb(node, key, this.notes, this.opts);
    // recurse
    //console.group(node.localName||'#text');
    let locators = this._annotateSubtree(node);
    //console.groupEnd();
    if (shouldLocate || locators) {
      //console.log('capturing', key, '('+(node.localName||'#text')+')');
      let cl = Object.create(null);
      cl.key = key;
      if (locators) {
        cl.sub = locators;
      }
      return cl;
    }
  }
}

let locateNodes = function(root, locator, map) {
  map = map || [];
  for (let n in locator) {
    let loc = locator[n];
    if (loc) {
      let node = root.childNodes[n];
      if (node.nodeType == Node.TEXT_NODE && node.parentElement) {
        // TODO(mmandlis): remove this line and the (property === 'textContent') clause
        // in _set() method, in favor of explicit innerHTML binding.
        map[loc.key] = node.parentElement;
      } else {
        map[loc.key] = node;
      }
      if (loc.sub) {
        // recurse
        locateNodes(node, loc.sub, map);
      }
    }
  }
  return map;
};

/* Annotation Producer */
// must return `true` for any node whose key we wish to track
let annotatorImpl = function(node, key, notes, opts) {
  // hook
  if (opts.annotator && opts.annotator(node, key, notes, opts)) {
    return true;
  }
  // default
  switch (node.nodeType) {
    case Node.DOCUMENT_FRAGMENT_NODE:
      return;
    case Node.ELEMENT_NODE:
      return annotateElementNode(node, key, notes);
    case Node.TEXT_NODE:
      return annotateTextNode(node, key, notes);
  }
};

let annotateTextNode = function(node, key, notes) {
  if (annotateMustache(node, key, notes, 'textContent', node.textContent)) {
    node.textContent = '';
    return true;
  }
};

let annotateElementNode = function(node, key, notes) {
  if (node.hasAttributes()) {
    let noted = false;
    for (let a$ = node.attributes, i = a$.length - 1, a; i >= 0 && (a = a$[i]); i--) {
      if (
        annotateEvent(node, key, notes, a.name, a.value) ||
        annotateMustache(node, key, notes, a.name, a.value)
      ) {
        node.removeAttribute(a.name);
        noted = true;
      }
    }
    return noted;
  }
};

let annotateMustache = function(node, key, notes, property, value) {
  if (value.slice(0, 2) === '{{') {
    if (property === 'class') {
      property = 'className';
    }
    let n = value.slice(2, -2);
    takeNote(notes, key, 'mustaches', property, n);
    if (n[0] === '$') {
      takeNote(notes, 'xlate', n, true);
    }
    return true;
  }
};

let annotateEvent = function(node, key, notes, name, value) {
  if (name.slice(0, 3) === 'on-') {
    if (value.slice(0, 2) === '{{') {
      value = value.slice(2, -2);
      console.warn(
        `Xen: event handler for '${name}' expressed as a mustache, which is not supported. Using literal value '${value}' instead.`
      );
    }
    takeNote(notes, key, 'events', name.slice(3), value);
    return true;
  }
};

let takeNote = function(notes, key, group, name, note) {
  let n$ = notes[key] || (notes[key] = Object.create(null));
  (n$[group] || (n$[group] = {}))[name] = note;
  //console.log('[%s]::%s.{{%s}}:', key, group, name, note);
};

let annotator = new Annotator(annotatorImpl);

let annotate = function(root, key, opts) {
  return (root._notes ||
    (root._notes = annotator.annotate(root.content, {/*ids:{}*/}, key, opts))
  );
};

/* Annotation Consumer */
let mapEvents = function(notes, map, mapper) {
  // add event listeners
  for (let key in notes) {
    let node = map[key];
    let events = notes[key] && notes[key].events;
    if (node && events) {
      for (let name in events) {
        mapper(node, name, events[name]);
      }
    }
  }
};

let listen = function(controller, node, eventName, handlerName) {
  node.addEventListener(eventName, function(e) {
    if (controller[handlerName]) {
      return controller[handlerName](e, e.detail);
    }
  });
};

let set = function(notes, map, scope, controller) {
  if (scope) {
    for (let key in notes) {
      let node = map[key];
      if (node) {
        // everybody gets a scope
        node.scope = scope;
        // now get your regularly scheduled bindings
        let mustaches = notes[key].mustaches;
        for (let name in mustaches) {
          let property = mustaches[name];
          if (property in scope) {
            _set(node, name, scope[property], controller);
          }
        }
      }
    }
  }
};

let _set = function(node, property, value, controller) {
  let modifier = property.slice(-1);
  //console.log('_set: %s, %s, '%s'', node.localName || '(text)', property, value);
  if (property === 'style%' || property === 'style') {
    if (typeof value === 'string') {
      node.style.cssText = value;
    } else {
      Object.assign(node.style, value);
    }
  } else if (modifier == '$') {
    let n = property.slice(0, -1);
    if (typeof value === 'boolean') {
      setBoolAttribute(node, n, value);
    } else {
      node.setAttribute(n, value);
    }
  } else if (property === 'textContent') {
    if (value && (value.$template || value.template)) {
      _setSubTemplate(node, value, controller);
    } else {
      node.textContent = (value || '');
    }
  } else if (property === 'unsafe-html') {
    node.innerHTML = value || '';
  } else {
    node[property] = value;
  }
};

let _setSubTemplate = function(node, value, controller) {
  // TODO(sjmiles): sub-template iteration ability
  // specially implemented to support arcs (serialization boundary)
  // Aim to re-implement as a plugin.
  let template = value.template;
  if (!template) {
    let container = node.getRootNode(); //node.parentElement
    template = container.querySelector(`template[${value.$template}]`);
  }
  node.textContent = '';
  if (template && value.models) {
    for (let m of value.models) {
      stamp(template).events(controller).set(m).appendTo(node);
    }
  }
};

let setBoolAttribute = function(node, attr, state) {
  node[
    (state === undefined ? !node.hasAttribute(attr) : state)
      ? 'setAttribute'
      : 'removeAttribute'
  ](attr, '');
};

let stamp = function(template, opts) {
  // construct (or use memoized) notes
  let notes = annotate(template, opts);
  // CRITICAL TIMING ISSUE #1:
  // importNode can have side-effects, like CustomElement callbacks (before we
  // can do any work on the imported subtree, before we can mapEvents, e.g.).
  // we could clone into an inert document (say a new template) and process the nodes
  // before importing if necessary.
  let root = document.importNode(template.content, true);
  // map DOM to keys
  let map = locateNodes(root, notes.locator);
  // return dom manager
  let dom = {
    root: root,
    notes: notes,
    map: map,
    $(slctr) {
      return this.root.querySelector(slctr);
    },
    set: function(scope) {
      set(notes, map, scope, this.controller);
      return this;
    },
    events: function(controller) {
      // TODO(sjmiles): originally `controller` was expected to be an Object with event handler
      // methods on it (typically a custom-element stamping a template).
      // In Arcs, we want to attach a generic handler (Function) for any event on this node.
      // Subtemplate stamping gets involved because they need to reuse whichever controller.
      // I suspect this can be simplified, but right now I'm just making it go.
      if (controller && typeof controller !== 'function') {
        controller = listen.bind(this, controller);
      }
      this.controller = controller;
      if (controller) {
        mapEvents(notes, map, controller);
      }
      return this;
    },
    appendTo: function(node) {
      if (this.root) {
        // TODO(sjmiles): assumes this.root is a fragment
        node.appendChild(this.root);
      } else {
        console.warn('Xen: cannot appendTo, template stamped no DOM');
      }
      // TODO(sjmiles): this.root is no longer a fragment
      this.root = node;
      return this;
    }
  };
  return dom;
};

return {
  setBoolAttribute,
  stamp
};

})(this));


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__particle_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__browser_lib_xen_state_js__ = __webpack_require__(23);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */







//let log = !global.document || (global.logging === false) ? () => {} : console.log.bind(console, `---------- DomParticle::`);
//console.log(!!global.document, global.logging, log);

let log = false ? console.log.bind(console) : () => {};

/** @class DomParticle
 * Particle that does stuff with DOM.
 */
class DomParticle extends __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__browser_lib_xen_state_js__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__particle_js__["b" /* Particle */]) {
  /** @method get template()
   * Override to return a String defining primary markup.
   */
  get template() {
    return '';
  }
  /** @method getTemplate(slotName)
   * Override to return a String defining primary markup for the given slot name.
   */
  getTemplate(slotName) {
    // TODO: only supports a single template for now. add multiple templates support.
    return this.template;
  }
  /** @method _shouldRender(props, state)
   * Override to return false if the Particle won't use
   * it's slot.
   */
  _shouldRender(props, state) {
    return true;
  }
  /** @method _render(props, state)
   * Override to return a dictionary to map into the template.
   */
  _render(props, state) {
    return {};
  }
  /** @method _willReceiveProps(props)
   * Override if necessary, to do things when props change.
   */
  _willReceiveProps(props) {
  }
  /** @method get config()
   * Override if necessary, to modify superclass config.
   */
  get config() {
    // TODO(sjmiles): getter that does work is a bad idea, this is temporary
    return {
      views: this.spec.inputs.map(i => i.name),
      // TODO(mmandlis): this.spec needs to be replace with a particle-spec loaded from
      // .manifest files, instead of .ptcl ones.
      slotNames: [...this.spec.slots.values()].map(s => s.name)
    };
  }
  _info() {
    return `---------- DomParticle::[${this.spec.name}]`;
  }
  async setViews(views) {
    this._views = views;
    let config = this.config;
    //let readableViews = config.views.filter(name => views.get(name).canRead);
    //this.when([new ViewChanges(views, readableViews, 'change')], async () => {
    this.when([new __WEBPACK_IMPORTED_MODULE_1__particle_js__["c" /* ViewChanges */](views, config.views, 'change')], async () => {
      // acquire (async) list data from views
      let data = await Promise.all(
        config.views
        .map(name => views.get(name))
        .map(view => view.toList ? view.toList() : view.get())
      );
      // convert view data (array) into props (dictionary)
      let props = Object.create(null);
      config.views.forEach((name, i) => {
        props[name] = data[i];
      });
      this._setProps(props);
    });
    // make sure we invalidate once, even if there are no incoming views
    this._setState({});
  }
  _update(props, state) {
    let shouldRender = this._shouldRender(this._props, this._state);
    if (shouldRender) {  // TODO: should _shouldRender be slot specific?
      this.config.slotNames.forEach(s => this.render(s, ["model"]));
      this.relevance = 1;  // TODO: improve relevance signal.
    }
  }

  render(slotName, contentTypes) {
    let slot = this.getSlot(slotName);
    if (!slot) {
      return;  // didn't receive StartRender.
    }
    contentTypes.forEach(ct => slot._requestedContentTypes.add(ct));
    if (this._shouldRender(this._props, this._state)) {
      let content = {};
      if (slot._requestedContentTypes.has("template")) {
        content["template"] = this._initializeRender(slot);
      }
      if (slot._requestedContentTypes.has("model")) {
        content["model"] = this._render(this._props, this._state);
      }
      slot.render(content);
    } else if (slot.isRendered) {
      // Send empty object, to clear rendered slot contents.
      slot.render({});
    }
  }

  // TODO: renderHostedSlot and combineHostedContent are methods needed for transformation particle
  // that renders UI. Consider adding a TransformationParticle base class.
  renderHostedSlot(slotName, hostedSlotId, content) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(this.hostedSlotBySlotId.has(hostedSlotId), `Missing model for slot ID ${hostedSlotId}`);
    this.hostedSlotBySlotId.get(hostedSlotId).content = content;

    let slot = this.getSlot(slotName);
    if (slot) {
      let combinedContent = this.combineHostedContent(Object.keys(content));

      // TODO: group multiple calls together!
      if (combinedContent) {
        slot.render(combinedContent);
      } else if (slot.isRendered) {
        slot.render({});
      }
    }
  }
  // Groups all rendered contents produced by the hosted particles, and sets the subId in each model.
  combineHostedContent(contentTypes) {
    let result = {};
    let includeModel = contentTypes.indexOf('model') >= 0;
    let includeTemplate = contentTypes.indexOf('template') >= 0;
    if (includeModel) {
      result.model = {items: []};
    }
    for (let value of this.hostedSlotBySlotId.values()) {
      let content = value.content;
      if (!content) {
        continue;
      }
      if (includeModel) {
        result.model.items.push(Object.assign(content.model || {}, {subId: value.subId}));
      }
      if (includeTemplate && !result.template) {
        // TODO: Currently using the first available template. Add support for multiple templates.
        result.template = content.template;
      }
    }
    return result;
  }
  _initializeRender(slot) {
    let template = this.getTemplate(slot.slotName);
    this._findHandlerNames(template).forEach(name => {
      slot.clearEventHandlers(name);
      slot.registerEventHandler(name, eventlet => {
        if (this[name]) {
          this[name](eventlet, this._state, this._views);
        }
      });
    });
    return template;
  }
  _findHandlerNames(html) {
    let handlers = new Map();
    let re = /on-.*?=\"([^\"]*)"/gmi;
    for (let m=re.exec(html); m; m=re.exec(html)) {
      handlers.set(m[1], true);
    }
    return Array.from(handlers.keys());
  }
}

/* harmony default export */ __webpack_exports__["a"] = (DomParticle);


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__identifier_js__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__entity_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__relation_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__symbols_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__in_memory_storage_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__particle_spec_js__ = __webpack_require__(9);
/** @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */







let identifier = __WEBPACK_IMPORTED_MODULE_3__symbols_js__["a" /* default */].identifier;



// TODO: This won't be needed once runtime is transferred between contexts.
function cloneData(data) {
  return data;
  //return JSON.parse(JSON.stringify(data));
}

function restore(entry, entityClass) {
  let {id, rawData} = entry;
  var entity = new entityClass(cloneData(rawData));
  if (entry.id) {
    entity.identify(entry.id);
  }

  // TODO some relation magic, somewhere, at some point.

  return entity;
}

/** @class Handle
 * Base class for Views and Variables.
 */
class Handle {
  constructor(view, canRead, canWrite) {
    this._view = view;
    this.canRead = canRead;
    this.canWrite = canWrite;
  }
  underlyingView() {
    return this._view;
  }
  /** @method on(kind, callback, target)
   * Register for callbacks every time the requested kind of event occurs.
   * Events are grouped into delivery sets by target, which should therefore
   * be the recieving particle.
   */
  on(kind, callback, target) {
    return this._view.on(kind, callback, target);
  }

  synchronize(kind, modelCallback, callback, target) {
    return this._view.synchronize(kind, modelCallback, callback, target);
  }

  generateID() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__platform_assert_web_js__["a" /* default */])(this._view.generateID);
    return this._view.generateID();
  }

  generateIDComponents() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__platform_assert_web_js__["a" /* default */])(this._view.generateIDComponents);
    return this._view.generateIDComponents();
  }

  _serialize(entity) {
    if (!entity.isIdentified())
      entity.createIdentity(this.generateIDComponents());
    let id = entity[identifier];
    let rawData = entity.dataClone();
    return {
      id,
      rawData
    };
  }

  _restore(entry) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__platform_assert_web_js__["a" /* default */])(this.entityClass, "Handles need entity classes for deserialization");
    return restore(entry, this.entityClass);
  }

  get type() {
    return this._view._type;
  }
  get name() {
    return this._view.name;
  }

  get _id() {
    return this._view._id;
  }

  toManifestString() {
    return `'${this._id}'`;
  }
}

/** @class View
 * A handle on a set of Entity data. Note that, as a set, a View can only contain
 * a single version of an Entity for each given ID. Further, no order is implied
 * by the set. A particle's manifest dictates the types of views that need to be
 * connected to that particle, and the current recipe identifies which views are
 * connected.
 */
class Collection extends Handle {
  constructor(view, canRead, canWrite) {
    // TODO: this should talk to an API inside the PEC.
    super(view, canRead, canWrite);
  }
  query() {
    // TODO: things
  }
  /** @method async toList()
   * Returns a list of the Entities contained by the View.
   * throws: Error if this view is not configured as a readable view (i.e. 'in' or 'inout')
     in the particle's manifest.
   */
  async toList() {
    // TODO: remove this and use query instead
    if (!this.canRead)
      throw new Error("View not readable");
    return (await this._view.toList()).map(a => this._restore(a));
  }

  /** @method store(entity)
   * Stores a new entity into the View.
   * throws: Error if this view is not configured as a writeable view (i.e. 'out' or 'inout')
     in the particle's manifest.
   */
  async store(entity) {
    if (!this.canWrite)
      throw new Error("View not writeable");
    var serialization = this._serialize(entity);
    return this._view.store(serialization);
  }

  /** @method remove(entity)
   * Removes an entity from the View.
   * throws: Error if this view is not configured as a writeable view (i.e. 'out' or 'inout')
     in the particle's manifest.
   */
  async remove(entity) {
    if (!this.canWrite)
      throw new Error("View not writeable");
    var serialization = this._serialize(entity);
    return this._view.remove(serialization.id);
  }

  async debugString() {
    var list = await this.toList();
    return list ? ('[' + list.map(p => p.debugString).join(", ") + ']') : 'undefined';
  }
}

/** @class Variable
 * A handle on a single entity. A particle's manifest dictates
 * the types of views that need to be connected to that particle, and
 * the current recipe identifies which views are connected.
 */
class Variable extends Handle {
  constructor(variable, canRead, canWrite) {
    super(variable, canRead, canWrite);
  }

  /** @method async get()
  * Returns the Entity contained by the Variable, or undefined if the Variable
  * is cleared.
  * throws: Error if this variable is not configured as a readable view (i.e. 'in' or 'inout')
    in the particle's manifest.
   */
  async get() {
    if (!this.canRead)
      throw new Error("View not readable");
    var result = await this._view.get();
    if (result == null)
      return undefined;
    if (this.type.isEntity)
      return this._restore(result);
    if (this.type.isInterface)
      return __WEBPACK_IMPORTED_MODULE_6__particle_spec_js__["a" /* default */].fromLiteral(result);
    return result;
  }

  /** @method set(entity)
   * Stores a new entity into the Variable, replacing any existing entity.
   * throws: Error if this variable is not configured as a writeable view (i.e. 'out' or 'inout')
     in the particle's manifest.
   */
  async set(entity) {
    if (!this.canWrite)
      throw new Error("View not writeable");
    return this._view.set(this._serialize(entity));
  }

  /** @method clear()
   * Clears any entity currently in the Variable.
   * throws: Error if this variable is not configured as a writeable view (i.e. 'out' or 'inout')
     in the particle's manifest.
   */
  async clear() {
    if (!this.canWrite)
      throw new Error("View not writeable");
    await this._view.clear();
  }
  async debugString() {
    var value = await this.get();
    return value ? value.debugString : 'undefined';
  }
}

function handleFor(view, isSet, canRead, canWrite) {
  if (canRead == undefined)
    canRead = true;
  if (canWrite == undefined)
    canWrite = true;
  let handle;
  if (isSet || (isSet == undefined && view.type.isSetView))
    handle = new Collection(view, canRead, canWrite);
  else
    handle = new Variable(view, canRead, canWrite);
  return handle;
}

/* harmony default export */ __webpack_exports__["a"] = ({handleFor});


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_js__ = __webpack_require__(5);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt




class Search {
  constructor(phrase, unresolvedTokens) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(phrase);

    this._phrase = "";
    this._unresolvedTokens = [];
    this._resolvedTokens = [];

    this.appendPhrase(phrase, unresolvedTokens);
  }
  appendPhrase(phrase, unresolvedTokens) {
    // concat phrase
    if (this._phrase.length > 0) {
      this._phrase = this.phrase.concat(" ");
    }
    this._phrase = this._phrase.concat(phrase);

    // update tokens
    let newTokens = phrase.toLowerCase().split(/[^a-z0-9]/g);
    newTokens.forEach(t => {
      if (!unresolvedTokens || unresolvedTokens.indexOf(t) >= 0) {
        this._unresolvedTokens.push(t)
      } else {
        this._resolvedTokens.push(t);
      }
    });
  }
  get phrase() { return this._phrase; }
  get unresolvedTokens() { return this._unresolvedTokens; }
  get resolvedTokens() { return this._resolvedTokens; }
  resolveToken(token) {
    let index = this.unresolvedTokens.indexOf(token.toLowerCase());
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(index >= 0, `Cannot resolved nonexistent token ${token}`);
    this._unresolvedTokens.splice(index, 1);
    this._resolvedTokens.push(token.toLowerCase());
  }

  isValid() {
    return this._unresolvedTokens.length > 0 || this._resolvedTokens.length > 0;
  }

  isResolved() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(Object.isFrozen(this));
    // Recipe is considered resolved, if at least one of the search tokens was resolved.
    // TODO: Unresolved tokens don't prevent the recipe from being resolved. For now...
    return this._resolvedTokens.length > 0;
  }

  _normalize() {
    this._unresolvedTokens.sort();
    this._resolvedTokens.sort();

    Object.freeze(this);
  }

  _copyInto(recipe) {
    if (recipe.search) {
      recipe.search.appendPhrase(this.phrase, this.unresolvedTokens);
    } else {
      recipe.search = new Search(this.phrase, this.unresolvedTokens);
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(recipe.search.resolvedTokens.length == this.resolvedTokens.length);
    }
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(this.resolvedTokens.every(rt => recipe.search.resolvedTokens.indexOf(rt) >= 0) &&
           this.unresolvedTokens.every(rt => recipe.search.unresolvedTokens.indexOf(rt) >= 0));
    return recipe.search;
  }

  toString(options) {
    let result = [];
    result.push(`search \`${this.phrase}\``);

    let tokenStr = [];
    tokenStr.push('  tokens');
    if (this.unresolvedTokens.length > 0) {
      tokenStr.push(this.unresolvedTokens.map(t => `\`${t}\``).join(" "));
    }
    if (this.resolvedTokens.length > 0) {
      tokenStr.push(`# ${this.resolvedTokens.map(t => `\`${t}\``).join(" ")}`);
    }
    if (options && options.showUnresolved) {
      if (this.unresolvedTokens.length > 0) {
        tokenStr.push('# unresolved search tokens');
      }
    }
    result.push(tokenStr.join(" "));

    return result.join("\n");
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Search);


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__in_memory_storage_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__symbols_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__entity_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__schema_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__type_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__relation_js__ = __webpack_require__(17);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */









function testEntityClass(type) {
  return new __WEBPACK_IMPORTED_MODULE_4__schema_js__["a" /* default */]({
    name: type,
    sections: [],
    parents: [],
  }).entityClass();
}

let BasicEntity = testEntityClass('BasicEntity');

/* unused harmony default export */ var _unused_webpack_default_export = ({
  Entity: __WEBPACK_IMPORTED_MODULE_3__entity_js__["a" /* default */],
  BasicEntity,
  Relation: __WEBPACK_IMPORTED_MODULE_6__relation_js__["a" /* default */],
  testing: {
    testEntityClass,
  },
  internals: {
    identifier: __WEBPACK_IMPORTED_MODULE_2__symbols_js__["a" /* default */].identifier,
    Type: __WEBPACK_IMPORTED_MODULE_5__type_js__["a" /* default */],
  }
});


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tracelib_trace_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__ = __webpack_require__(0);
// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt





class Scheduler {
  constructor() {
    this.frameQueue = [];
    this.targetMap = new Map();
    this._finishNotifiers = [];
    this._idle = Promise.resolve();
    this._idleResolver = null;
  }

  enqueue(view, eventRecords) {
    var trace = __WEBPACK_IMPORTED_MODULE_0__tracelib_trace_js__["a" /* default */].flow({cat: 'view', name: 'ViewBase::_fire flow'}).start();
    if (this.frameQueue.length == 0 && eventRecords.length > 0)
      this._asyncProcess();
    if (!this._idleResolver) {
      this._idle = new Promise((resolve, reject) => this._idleResolver = resolve);
    }
    for (var record of eventRecords) {
      var frame = this.targetMap.get(record.target);
      if (frame == undefined) {
        frame = {target: record.target, views: new Map(), traces: []};
        this.frameQueue.push(frame);
        this.targetMap.set(record.target, frame);
      }
      frame.traces.push(trace);
      var viewEvents = frame.views.get(view);
      if (viewEvents == undefined) {
        viewEvents = new Map();
        frame.views.set(view, viewEvents);
      }
      var kindEvents = viewEvents.get(record.kind);
      if (kindEvents == undefined) {
        kindEvents = [];
        viewEvents.set(record.kind, kindEvents);
      }
      kindEvents.push(record);
    }
  }

  get busy() {
    return this.frameQueue.length > 0;
  }

  get idle() {
    return this._idle;
  }

  _asyncProcess() {
    Promise.resolve().then(() => {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(this.frameQueue.length > 0, "_asyncProcess should not be invoked with 0 length queue");
      let frame = this.frameQueue.shift();
      this.targetMap.delete(frame.target);
      if (this.frameQueue.length > 0)
        this._asyncProcess();
      this._applyFrame(frame);
      if (this.frameQueue.length == 0) {
        this._idleResolver();
        this._idleResolver = null;
      }
    });
  }

  _applyFrame(frame) {
    var trace = __WEBPACK_IMPORTED_MODULE_0__tracelib_trace_js__["a" /* default */].start({cat: 'scheduler', name: 'Scheduler::_applyFrame', args: {target: frame.target ? frame.target.constructor.name : "NULL TARGET"}});

    var totalRecords = 0;
    for (let [view, kinds] of frame.views.entries()) {
      for (let [kind, records] of kinds.entries()) {
        var record = records[records.length - 1];
        record.callback(record.details);
      }
    }

    frame.traces.forEach(trace => trace.end());

    trace.end();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (new Scheduler());


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */




class Slot {
  constructor(consumeConn, arc) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(consumeConn);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(arc);
    this._consumeConn = consumeConn;
    this._arc = arc;
    this._context = null;
    this.startRenderCallback = null;
    this.stopRenderCallback = null;
    this._hostedSlotById = new Map();
  }
  get consumeConn() { return this._consumeConn; }
  get arc() { return this._arc; }
  getContext() { return this._context; }
  async setContext(context) { this._context = context; }
  isSameContext(context) { return this._context == context; }

  async updateContext(context) {
    // do nothing, if context unchanged.
    if ((!this.getContext() && !context) ||
        (this.getContext() && context && this.isSameContext(context))) {
      return;
    }

    // update the context;
    let wasNull = !this.getContext();
    await this.setContext(context);
    if (this.getContext()) {
      if (wasNull) {
        this.startRender();
      }
    } else {
      this.stopRender();
    }
  }
  startRender() {
    if (this.startRenderCallback) {
      let contentTypes = this.constructRenderRequest();
      this.startRenderCallback({ particle: this.consumeConn.particle, slotName: this.consumeConn.name, contentTypes });

      for (let hostedSlot of this._hostedSlotById.values()) {
        this.startRenderCallback({ particle: hostedSlot.particle, slotName: hostedSlot.slotName, contentTypes });
      }
    }
  }

  stopRender() {
    if (this.stopRenderCallback) {
      this.stopRenderCallback({ particle: this.consumeConn.particle, slotName: this.consumeConn.name });

      for (let hostedSlot of this._hostedSlotById.values()) {
        this.stopRenderCallback({ particle: hostedSlot.particle, slotName: hostedSlot.slotName });
      }
    }
  }

  async populateViewDescriptions() {
    let descriptions = {};
    await Promise.all(Object.values(this.consumeConn.particle.connections).map(async viewConn => {
      if (viewConn.view) {
        descriptions[`${viewConn.name}.description`] = (await this._arc.description.getViewDescription(viewConn.view)).toString();
      }
    }));
    return descriptions;
  }

  addHostedSlot(hostedSlotId, hostedParticleName, hostedSlotName) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(hostedSlotId, `Hosted slot ID must be provided`);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!this._hostedSlotById.has(hostedSlotId), `Hosted slot ${hostedSlotId} already exists`);
    this._hostedSlotById.set(hostedSlotId, {slotId: hostedSlotId, particleName: hostedParticleName, slotName: hostedSlotName});
    return hostedSlotId;
  }
  getHostedSlot(hostedSlotId) {
    return this._hostedSlotById.get(hostedSlotId);
  }
  findHostedSlot(hostedParticle, hostedSlotName) {
    for (let hostedSlot of this._hostedSlotById.values()) {
      if (hostedSlot.particle == hostedParticle && hostedSlot.slotName == hostedSlotName) {
        return hostedSlot;
      }
    }
  }
  initHostedSlot(hostedSlotId, hostedParticle) {
    let hostedSlot = this.getHostedSlot(hostedSlotId);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(hostedSlot, `Hosted slot ${hostedSlotId} doesn't exist`);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(hostedSlot.particleName == hostedParticle.name,
           `Unexpected particle name ${hostedParticle.name} for slot ${hostedSlotId}; expected: ${hostedSlot.particleName}`)
    hostedSlot.particle = hostedParticle;
    if (this.getContext() && this.startRenderCallback) {
      this.startRenderCallback({ particle: hostedSlot.particle, slotName: hostedSlot.slotName, contentTypes: this.constructRenderRequest() });
    }
  }

  // absract
  async setContent(content, handler) {}
  getInnerContext(slotName) {}
  constructRenderRequest() {}
  static findRootSlots(context) { }
}

/* harmony default export */ __webpack_exports__["a"] = (Slot);


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__in_memory_storage_js__ = __webpack_require__(14);
// @
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt




class StorageProviderFactory {
  constructor(arc) {
    this._arc = arc;
    this._storageInstances = {'in-memory': new __WEBPACK_IMPORTED_MODULE_0__in_memory_storage_js__["a" /* InMemoryStorage */](arc)};
  }

  _storageForKey(key) {
    var protocol = key.split(':')[0];
    return this._storageInstances[protocol];
  }

  construct(id, type, keyFragment) {
    return this._storageForKey(keyFragment).construct(id, type, keyFragment);
  }

  connect(id, type, key) {
    return this._storageForKey(key).connect(id, type, keyFragment);
  }

  newKey(id, associatedKeyFragment) {

  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StorageProviderFactory;



/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__arcs_runtime_loader_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__arcs_runtime_particle_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__arcs_runtime_dom_particle_js__ = __webpack_require__(25);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */





class BrowserLoader extends __WEBPACK_IMPORTED_MODULE_0__arcs_runtime_loader_js__["a" /* default */] {
  constructor(urlMap) {
    super();
    this._urlMap = urlMap;
    // TODO: Update all callers to pass a valid base URL to avoid the use of
    //       location here. `new URL(base)` should be valid.
    //this._base = new URL(base || '', global.location).href;
  }
  _resolve(path) {
    //return new URL(path, this._base).href;
    let url = this._urlMap[path];
    if (!url && path) {
      // TODO(sjmiles): inefficient!
      let macro = Object.keys(this._urlMap).sort((a,b) => b.length - a.length).find(k => path.slice(0, k.length) == k);
      if (macro) {
        url = this._urlMap[macro] + path.slice(macro.length);
      }
    }
    url = url || path;
    //console.log(`browser-cdn-loader: resolve(${path}) = ${url}`);
    return url;
  }
  loadResource(name) {
    return this._loadURL(this._resolve(name));
  }
  requireParticle(fileName) {
    let path = this._resolve(fileName);
    let result = [];
    self.defineParticle = function(particleWrapper) {
      result.push(particleWrapper);
    };
    importScripts(path);
    delete self.defineParticle;
    return this.unwrapParticle(result[0]);
  }
  unwrapParticle(particleWrapper) {
    // TODO(sjmiles): regarding `resolver`:
    //  _resolve method allows particles to request remapping of assets paths
    //  for use in DOM
    let resolver = this._resolve.bind(this);
    return particleWrapper({particle: __WEBPACK_IMPORTED_MODULE_1__arcs_runtime_particle_js__["a" /* default */], Particle: __WEBPACK_IMPORTED_MODULE_1__arcs_runtime_particle_js__["a" /* default */].Particle, DomParticle: __WEBPACK_IMPORTED_MODULE_2__arcs_runtime_dom_particle_js__["a" /* default */], resolver});
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BrowserLoader;
;


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__runtime_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tracelib_trace_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__type_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__relation_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__handle_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__outer_PEC_js__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__manifest_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__description_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__recipe_util_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__fake_pec_factory_js__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__storage_provider_factory_js__ = __webpack_require__(31);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
















class Arc {
  constructor({id, context, pecFactory, slotComposer, loader}) {
    // TODO: context should not be optional.
    this._context = context || new __WEBPACK_IMPORTED_MODULE_8__manifest_js__["a" /* default */]();
    // TODO: pecFactory should not be optional. update all callers and fix here.
    this._pecFactory = pecFactory ||  __WEBPACK_IMPORTED_MODULE_11__fake_pec_factory_js__["a" /* default */].bind(null);
    this.id = id;
    this._nextLocalID = 0;
    this._activeRecipe = new __WEBPACK_IMPORTED_MODULE_7__recipe_recipe_js__["a" /* default */]();
    // TODO: rename: this are just tuples of {particles, views, slots} of instantiated recipes merged into active recipe..
    this._recipes = [];
    this._loader = loader;

    // All the views, mapped by view ID
    this._viewsById = new Map();
    // .. and mapped by Type
    this._viewsByType = new Map();

    // information about last-seen-versions of views
    this._lastSeenVersion = new Map();

    this.particleViewMaps = new Map();
    let pecId = this.generateID();
    let innerPecPort = this._pecFactory(pecId);
    this.pec = new __WEBPACK_IMPORTED_MODULE_6__outer_PEC_js__["a" /* default */](innerPecPort, slotComposer, this, `${pecId}:outer`);
    if (slotComposer) {
      slotComposer.arc = this;
    }
    this.nextParticleHandle = 0;
    this._storageProviderFactory = new __WEBPACK_IMPORTED_MODULE_12__storage_provider_factory_js__["a" /* default */](this);

    // Dictionary from each tag string to a list of views
    this._tags = {};
    // Map from each view to a list of tags.
    this._viewTags = new Map();

    this._search = null;
    this._description = new __WEBPACK_IMPORTED_MODULE_9__description_js__["a" /* default */](this);
  }
  set search(search) {
    this._search = search ? search.toLowerCase().trim() : null;
  }

  get search() {
    return this._search;
  }

  get description() { return this._description; }

  static deserialize({serialization, pecFactory, slotComposer, arcMap}) {
    var entityMap = {};
    var viewMap = {};
    serialization.entities.forEach(e => entityMap[e.id] = e);
    var arc = new Arc({id: serialization.id, slotComposer});
    for (var serializedView of serialization.views) {
      if (serializedView.arc) {
        var view = arcMap.get(serializedView.arc).findViewById(serializedView.id);
        arc.mapView(view);
      } else {
        // TODO add a separate deserialize constructor for view?
        var view = arc.createView(new __WEBPACK_IMPORTED_MODULE_3__type_js__["a" /* default */](serializedView.type.tag, serializedView.type.data), serializedView.name, serializedView.id);
        view._version = serializedView.version;

        if (serializedView.sort == 'view') {
          var values = serializedView.values.map(a => entityMap[a]);
          values.forEach(v => view._items.set(v.id, v));
        } else {
          var value = entityMap[serializedView.value];
          view._stored = value;
        }
      }
      viewMap[view.id] = view;
      arc._lastSeenVersion.set(view.id, serializedView.version);
    }
    for (var serializedParticle of serialization.particles) {
      var particleHandle = arc._instantiateParticle(serializedParticle.name);
      for (var name in serializedParticle.views) {
        arc._connectParticleToView(particleHandle, serializedParticle, name, viewMap[serializedParticle.views[name]]);
      }
    }
    return arc;
  }

  get context() {
    return this._context;
  }

  get recipes() { return this._recipes; }

  loadedParticles() {
    return [...this.particleViewMaps.values()].map(({spec}) => spec);
  }

  _instantiateParticle(recipeParticle) {
    var handle = this.nextParticleHandle++;
    let viewMap = {spec: recipeParticle.spec, views: new Map()};
    this.particleViewMaps.set(handle, viewMap);

    for (let [name, connection] of Object.entries(recipeParticle.connections)) {
      if (!connection.view) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(connection.isOptional);
        continue;
      }
      let view = this.findViewById(connection.view.id);
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(view);
      this._connectParticleToView(handle, recipeParticle, name, view);
    }

    // At least all non-optional connections must be resolved
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(viewMap.views.size >= viewMap.spec.connections.filter(c => !c.isOptional).length,
           `Not all mandatory connections are resolved for {$particle}`);
    this.pec.instantiate(recipeParticle, viewMap.spec, viewMap.views, this._lastSeenVersion);
    return handle;
  }

  generateID() {
    return `${this.id}:${this._nextLocalID++}`;
  }

  generateIDComponents() {
    return {base: this.id, component: () => this._nextLocalID++};
  }

  get _views() {
    return [...this._viewsById.values()];
  }

  // Makes a copy of the arc used for speculative execution.
  cloneForSpeculativeExecution() {
    var arc = new Arc({id: this.generateID(), pecFactory: this._pecFactory, context: this.context, loader: this._loader});
    var viewMap = new Map();
    this._views.forEach(v => viewMap.set(v, v.clone()));
    this.particleViewMaps.forEach((value, key) => {
      arc.particleViewMaps.set(key, {
        spec: value.spec,
        views: new Map()
      });
      value.views.forEach(v => arc.particleViewMaps.get(key).views.set(v.name, v.clone()));
    });

   this._activeRecipe.mergeInto(arc._activeRecipe);
   // TODO: merge this._recipes too?

    for (let v of viewMap.values()) {
      // FIXME: Tags
      arc._registerView(v, []);
    }
    return arc;
  }

  serialize() {
    var s = { views: [], particles: [], id: this.id };

    // 1. serialize entities
    var entities = new Set();
    for (var view of this._views)
      view.extractEntities(entities);

    s.entities = [...entities.values()];

    // 2. serialize views
    for (var view of this._views) {
      if (view._arc !== this) {
        view.serializeMappingRecord(s.views);
      } else {
        view.serialize(s.views);
      }
    }

    // 3. serialize particles
    for (var particle of this.particleViewMaps.values()) {
      if (particle.spec.transient)
        continue;
      var name = particle.spec.name;
      var serializedParticle = { name, views: {}};
      for (let [key, value] of particle.views) {
        serializedParticle.views[key] = value.id;
      }
      s.particles.push(serializedParticle);
    }
    return s;
  }

  async instantiate(recipe) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(recipe.isResolved(), 'Cannot instantiate an unresolved recipe');

    let {views, particles, slots} = recipe.mergeInto(this._activeRecipe);
    this.description.onRecipeUpdate();

    for (let recipeView of views) {
      if (['copy', 'create'].includes(recipeView.fate)) {
        let view = this.createView(recipeView.type, /* name= */ null, /* id= */ null, recipeView.tags);
        if (recipeView.fate === "copy") {
          var copiedView = this.findViewById(recipeView.id);
          view.cloneFrom(copiedView);
        }
        recipeView.id = view.id;
        recipeView.fate = "use";
        // TODO: move the call to OuterPEC's DefineView to here
      }
      let view = this.findViewById(recipeView.id);
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(view, `view '${recipeView.id}' was not found`);

      view.description = await this.description.getViewDescription(recipeView);
    }

    particles.forEach(recipeParticle => this._instantiateParticle(recipeParticle));

    if (this.pec.slotComposer) {
      // TODO: pass slot-connections instead
      await this.pec.slotComposer.initializeRecipe(particles);
    }

    this._recipes.push({particles, views, slots});
  }

  _connectParticleToView(particleHandle, particle, name, targetView) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(targetView, "no target view provided");
    var viewMap = this.particleViewMaps.get(particleHandle);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(viewMap.spec.connectionMap.get(name) !== undefined, "can't connect view to a view slot that doesn't exist");
    viewMap.views.set(name, targetView);
  }

  createView(type, name, id, tags) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(type instanceof __WEBPACK_IMPORTED_MODULE_3__type_js__["a" /* default */], `can't createView with type ${type} that isn't a Type`);

    if (type.isRelation)
      type = __WEBPACK_IMPORTED_MODULE_3__type_js__["a" /* default */].newSetView(type);

      let view = this._storageProviderFactory.construct(id, type, 'in-memory');
      view.name = name;

      this._registerView(view, tags);
    return view;
  }

  _registerView(view, tags) {
    tags = tags || [];
    tags = Array.isArray(tags) ? tags : [tags];
    tags.forEach(tag => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(tag.startsWith('#'),
      `tag ${tag} must start with '#'`));

    this._viewsById.set(view.id, view);
    let byType = this._viewsByType.get(Arc._viewKey(view.type)) || [];
    byType.push(view);
    this._viewsByType.set(Arc._viewKey(view.type), byType);

    if (tags.length) {
      for (let tag of tags) {
        if (this._tags[tag] == undefined)
          this._tags[tag] = [];
        this._tags[tag].push(view);
      }
    }
    this._viewTags.set(view, new Set(tags));
  }

  // TODO: Don't use this, we should be testing the schemas for compatiblity
  //       instead of using just the name.
  static _viewKey(type) {
    if (type.isSetView) {
      return `list:${type.primitiveType().entitySchema.name}`;
    } else if (type.isEntity) {
      return type.entitySchema.name;
    } else if (type.isShape) {
      // TODO we need to fix this too, otherwise all views of shape type will
      // be of the 'same type' when searching by type.
      return type.shapeShape;
    }
  }

  findViewsByType(type, options) {
    // TODO: use options (location, labels, etc.) somehow.
    var views = this._viewsByType.get(Arc._viewKey(type)) || [];
    if (options && options.tags) {
      views = views.filter(view => options.tags.filter(tag => !this._viewTags.get(view).has(tag)).length == 0);
    }
    return views;
  }

  findViewById(id) {
    let view = this._viewsById.get(id);
    if (view == null) {
      view = this._context.findViewById(id);
    }
    return view;
  }

  // TODO: Remove this.
  _viewFor(type) {
    let views = this.findViewsByType(type);
    if (views.length > 0) {
      return views[0];
    }

    return this.createView(type, "automatically created for _viewFor");
  }

  commit(entities) {
    let entityMap = new Map();
    for (let entity of entities) {
      entityMap.set(entity, this._viewFor(__WEBPACK_IMPORTED_MODULE_3__type_js__["a" /* default */].newSetView(entity.constructor.type)));
    }
    for (let entity of entities) {
      if (entity instanceof __WEBPACK_IMPORTED_MODULE_4__relation_js__["a" /* default */]) {
        entity.entities.forEach(entity => entityMap.set(entity, this._viewFor(__WEBPACK_IMPORTED_MODULE_3__type_js__["a" /* default */].newSetView(entity.constructor.type))));
      }
    }
    this.newCommit(entityMap);
  }

  newCommit(entityMap) {
    for (let [entity, view] of entityMap.entries()) {
      entity.identify(this.generateID());
    }
    for (let [entity, view] of entityMap.entries()) {
      new __WEBPACK_IMPORTED_MODULE_5__handle_js__["a" /* default */].handleFor(view).store(entity);
    }
  }

  stop() {
    this.pec.stop();
  }

  toContextString(options) {
    let results = [];
    let views = [...this._viewsById.values()].sort(__WEBPACK_IMPORTED_MODULE_10__recipe_util_js__["a" /* default */].compareComparables);
    views.forEach(v => {
      results.push(v.toString(this._viewTags.get(v)));
    });

    // TODO: include views entities
    // TODO: include (remote) slots?

    if (!this._activeRecipe.isEmpty()) {
      results.push(this._activeRecipe.toString());
    }

    return results.join('\n');
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Arc);


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__recipe_recipe_util_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__recipe_walker_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__strategies_convert_constraints_to_connections_js__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__strategies_assign_remote_views_js__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__strategies_copy_remote_views_js__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__strategies_assign_views_by_tag_and_type_js__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__strategies_init_population_js__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__strategies_map_consumed_slots_js__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__strategies_map_remote_slots_js__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__strategies_match_particle_by_verb_js__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__strategies_name_unnamed_connections_js__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__strategies_add_use_views_js__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__strategies_create_description_handle_js__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__manifest_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__strategies_init_search_js__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__strategies_search_tokens_to_particles_js__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__strategies_fallback_fate_js__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__strategies_group_view_connections_js__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__strategies_combined_strategy_js__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__speculator_js__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__description_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__tracelib_trace_js__ = __webpack_require__(8);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt




























class CreateViews extends __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__["a" /* Strategy */] {
  // TODO: move generation to use an async generator.
  async generate(strategizer) {
    var results = __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__["a" /* default */].over(this.getResults(strategizer), new class extends __WEBPACK_IMPORTED_MODULE_4__recipe_walker_js__["a" /* default */] {
      onView(recipe, view) {
        var counts = __WEBPACK_IMPORTED_MODULE_3__recipe_recipe_util_js__["a" /* default */].directionCounts(view);

        var score = 1;
        if (counts.in == 0 || counts.out == 0) {
          if (counts.unknown > 0)
            return;
          if (counts.in == 0)
            score = -1;
          else
            score = 0;
        }

        if (!view.id && view.fate == "?") {
          return (recipe, view) => {view.fate = "create"; return score}
        }
      }
    }(__WEBPACK_IMPORTED_MODULE_4__recipe_walker_js__["a" /* default */].Permuted), this);

    return { results, generate: null };
  }
}


class Planner {
  // TODO: Use context.arc instead of arc
  init(arc) {
    this._arc = arc;
    let strategies = [
      new __WEBPACK_IMPORTED_MODULE_9__strategies_init_population_js__["a" /* default */](arc),
      new __WEBPACK_IMPORTED_MODULE_17__strategies_init_search_js__["a" /* default */](arc),
      new __WEBPACK_IMPORTED_MODULE_21__strategies_combined_strategy_js__["a" /* default */]([
        new __WEBPACK_IMPORTED_MODULE_18__strategies_search_tokens_to_particles_js__["a" /* default */](arc),
        new __WEBPACK_IMPORTED_MODULE_20__strategies_group_view_connections_js__["a" /* default */](),
      ]),
      new __WEBPACK_IMPORTED_MODULE_19__strategies_fallback_fate_js__["a" /* default */](),
      new CreateViews(),
      new __WEBPACK_IMPORTED_MODULE_8__strategies_assign_views_by_tag_and_type_js__["a" /* default */](arc),
      new __WEBPACK_IMPORTED_MODULE_5__strategies_convert_constraints_to_connections_js__["a" /* default */](arc),
      new __WEBPACK_IMPORTED_MODULE_10__strategies_map_consumed_slots_js__["a" /* default */](),
      new __WEBPACK_IMPORTED_MODULE_6__strategies_assign_remote_views_js__["a" /* default */](arc),
      new __WEBPACK_IMPORTED_MODULE_7__strategies_copy_remote_views_js__["a" /* default */](arc),
      new __WEBPACK_IMPORTED_MODULE_11__strategies_map_remote_slots_js__["a" /* default */](arc),
      new __WEBPACK_IMPORTED_MODULE_12__strategies_match_particle_by_verb_js__["a" /* default */](arc),
      new __WEBPACK_IMPORTED_MODULE_13__strategies_name_unnamed_connections_js__["a" /* default */](arc),
      new __WEBPACK_IMPORTED_MODULE_14__strategies_add_use_views_js__["a" /* default */](),
      new __WEBPACK_IMPORTED_MODULE_15__strategies_create_description_handle_js__["a" /* default */](),
    ];
    this.strategizer = new __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__["b" /* Strategizer */](strategies, [], {
      maxPopulation: 100,
      generationSize: 100,
      discardSize: 20,
    });
  }

  async generate() {
    var log = await this.strategizer.generate();
    return this.strategizer.generated;
  }

  async plan(timeout, generations) {
    let trace = __WEBPACK_IMPORTED_MODULE_24__tracelib_trace_js__["a" /* default */].async({cat: 'planning', name: 'Planner::plan', args: {timeout}})
    timeout = timeout || NaN;
    let allResolved = [];
    let now = () => (typeof performance == 'object') ? performance.now() : process.hrtime();
    let start = now();
    do {
      let generated = await trace.wait(() => this.generate());
      trace.resume({args: {
        generated: this.strategizer.generated.length,
      }});
      if (generations) {
        generations.push(generated);
      }

      let resolved = this.strategizer.generated
          .map(individual => individual.result)
          .filter(recipe => recipe.isResolved());
      allResolved.push(...resolved);
      if (now() - start > timeout) {
        console.warn('Planner.plan timed out.');
        break;
      }
    } while (this.strategizer.generated.length > 0);
    trace.end();
    return allResolved;
  }

  _matchesActiveRecipe(plan) {
    var planShape = __WEBPACK_IMPORTED_MODULE_3__recipe_recipe_util_js__["a" /* default */].recipeToShape(plan);
    var result = __WEBPACK_IMPORTED_MODULE_3__recipe_recipe_util_js__["a" /* default */].find(this._arc._activeRecipe, planShape);
    return result[0].score == 0;
  }

  async suggest(timeout, generations) {
    let trace = __WEBPACK_IMPORTED_MODULE_24__tracelib_trace_js__["a" /* default */].async({cat: 'planning', name: 'Planner::suggest', args: {timeout}})
    let plans = await trace.wait(() => this.plan(timeout, generations));
    trace.resume();
    let suggestions = [];
    let speculator = new __WEBPACK_IMPORTED_MODULE_22__speculator_js__["a" /* default */]();
    // TODO: Run some reasonable number of speculations in parallel.
    let results = [];
    for (let plan of plans) {
      let hash = ((hash) => { return hash.substring(hash.length - 4)}) (await plan.digest());

      if (this._matchesActiveRecipe(plan)) {
        this._updateGeneration(generations, hash, (g) => g.active = true);
        continue;
      }

      let relevance = await trace.wait(() => speculator.speculate(this._arc, plan));
      trace.resume();
      if (!relevance.isRelevant(plan)) {
        continue;
      }
      let rank = relevance.calcRelevanceScore();

      relevance.newArc.description.setRelevance(relevance);
      let description = await relevance.newArc.description.getRecipeSuggestion(relevance.newArc.recipes[0].particles);

      this._updateGeneration(generations, hash, (g) => g.description = description);

      // TODO: Move this logic inside speculate, so that it can stop the arc
      // before returning.
      relevance.newArc.stop();

      // Filter plans based on arc._search string.
      if (this._arc.search) {
        if (!plan.search) {
          // This plan wasn't constructed based on the provided search terms.
          if (description.toLowerCase().indexOf(arc.search) < 0) {
            // Description must contain the full search string.
            // TODO: this could be a strategy, if description was already available during strategies execution.
            continue;
          }
        } else {
          // This mean the plan was constructed based on provided search terms,
          // and at least one of them were resolved (in order for the plan to be resolved).
        }
      }

      results.push({
        plan,
        rank,
        description,
        hash
      });
    }
    trace.end();
    return results;
  }
  _updateGeneration(generations, hash, handler) {
    if (generations) {
      generations.forEach(g => {
        g.forEach(gg => {
          if (gg.hash.endsWith(hash)) {
            handler(gg);
          }
        });
      });
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Planner);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(20)))

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__slot_js__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dom_slot_js__ = __webpack_require__(45);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */






class SlotComposer {
  constructor(options) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(options.affordance, "Affordance is mandatory");
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(options.rootContext, "Root context is mandatory");

    this._containerKind = options.containerKind;
    this._affordance = options.affordance;
    this._slotClass = this.getSlotClass();
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(this._slotClass);

    this._contextById = this._slotClass.findRootSlots(options.rootContext) || {};
    if (Object.keys(this._contextById).length == 0) {
      // fallback to single "root" slot using the rootContext.
      this._contextById["root"] = options.rootContext;
    }

    this._slots = [];
  }
  get affordance() { return this._affordance; }
  getSlotClass() {
    switch(this._affordance) {
      case "dom":
      case "dom-touch":
      case "vr":
        return __WEBPACK_IMPORTED_MODULE_2__dom_slot_js__["a" /* default */];
      case "mock":
        return __WEBPACK_IMPORTED_MODULE_1__slot_js__["a" /* default */];
      default:
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])("unsupported affordance ", this._affordance);
    }
  }

  getSlot(particle, slotName) {
    return this._slots.find(s => s.consumeConn.particle == particle && s.consumeConn.name == slotName);
  }

  createHostedSlot(transformationParticle, transformationSlotName, hostedParticleName, hostedSlotName) {
    let hostedSlotId = this.arc.generateID();

    let transformationSlot = this.getSlot(transformationParticle, transformationSlotName);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(transformationSlot,
           `Unexpected transformation slot particle ${transformationParticle.name}:${transformationSlotName}, hosted particle ${hostedParticleName}, slot name ${hostedSlotName}`);
    transformationSlot.addHostedSlot(hostedSlotId, hostedParticleName, hostedSlotName);
    return hostedSlotId;
  }
  _findSlotByHostedSlotId(hostedSlotId) {
    for (let slot of this._slots) {
      let hostedSlot = slot.getHostedSlot(hostedSlotId);
      if (hostedSlot) {
        return slot;
      }
    }
  }
  findHostedSlot(hostedParticle, hostedSlotName) {
    for (let slot of this._slots) {
      let hostedSlot = slot.findHostedSlot(hostedParticle, hostedSlotName);
      if (hostedSlot) {
        return hostedSlot;
      }
    }
  }

  async initializeRecipe(recipeParticles) {
    let newSlots = [];
    // Create slots for each of the recipe's particles slot connections.
    recipeParticles.forEach(p => {
      Object.values(p.consumedSlotConnections).forEach(cs => {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(cs.targetSlot, `No target slot for particle's ${p.name} consumed slot: ${cs.name}.`);

        if (this._initHostedSlot(cs.targetSlot.id, p)) {
          // Skip slot creation for hosted slots.
          return;
        }

        let slot = new this._slotClass(cs, this.arc, this._containerKind);
        slot.startRenderCallback = this.arc.pec.startRender.bind(this.arc.pec);
        slot.stopRenderCallback = this.arc.pec.stopRender.bind(this.arc.pec);
        slot.innerSlotsUpdateCallback = this.updateInnerSlots.bind(this);
        newSlots.push(slot);
      });
    });

    // Attempt to set context for each of the slots.
    await Promise.all(newSlots.map(async s => {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!s.getContext(), `Unexpected context in new slot`);

      let context = null;
      let sourceConnection = s.consumeConn.targetSlot && s.consumeConn.targetSlot.sourceConnection;
      if (sourceConnection) {
        let sourceConnSlot = this.getSlot(sourceConnection.particle, sourceConnection.name);
        if (sourceConnSlot) {
          context = sourceConnSlot.getInnerContext(s.consumeConn.name);
        }
      } else {  // External slots provided at SlotComposer ctor (eg "root")
        context = this._contextById[s.consumeConn.name];
      }

      this._slots.push(s);

      if (context) {
        await s.updateContext(context);
      }
    }));
  }

  _initHostedSlot(hostedSlotId, hostedParticle) {
    let transformationSlot = this._findSlotByHostedSlotId(hostedSlotId);
    if (!transformationSlot) {
      return false;
    }
    transformationSlot.initHostedSlot(hostedSlotId, hostedParticle);
    return true;
  }

  async renderSlot(particle, slotName, content) {
    let slot = this.getSlot(particle, slotName);
    if (slot) {
      // Set the slot's new content.
      await slot.setContent(content, eventlet => {
        this.arc.pec.sendEvent(particle, slotName, eventlet)
        this.arc.makeSuggestions && this.arc.makeSuggestions();
      });
      return;
    }

    if (this._renderHostedSlot(particle, slotName, content)) {
      return;
    }

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(slot, `Cannot find slot (or hosted slot) ${slotName} for particle ${particle.name}`);
  }

  _renderHostedSlot(particle, slotName, content) {
    let hostedSlot = this.findHostedSlot(particle, slotName);
    if (!hostedSlot) {
      return false;
    }
    let transformationSlot = this._findSlotByHostedSlotId(hostedSlot.slotId);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(transformationSlot, `No transformation slot found for ${hostedSlot.slotId}`);

    this.arc.pec.innerArcRender(transformationSlot.consumeConn.particle, transformationSlot.consumeConn.name, hostedSlot.slotId, content);

    return true;
  }

  async updateInnerSlots(slot) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(slot, 'Cannot update inner slots of null');
    // Update provided slot contexts.
    await Promise.all(Object.keys(slot.consumeConn.providedSlots).map(async providedSlotName => {
      let providedContext = slot.getInnerContext(providedSlotName);
      let providedSlot = slot.consumeConn.providedSlots[providedSlotName];
      await Promise.all(providedSlot.consumeConnections.map(async cc => {
        // This will trigger "start" or "stop" render, if applicable.
        await this.getSlot(cc.particle, cc.name).updateContext(providedContext);
      }));
    }));
  }

  getAvailableSlots() {
    let availableSlots = {};
    this._slots.forEach(slot => {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(slot.consumeConn.targetSlot);
      Object.values(slot.consumeConn.providedSlots).forEach(ps => {
        if (!availableSlots[ps.name]) {
          availableSlots[ps.name] = [];
        }
        let psId = ps.id || `slotid-${this.arc.generateID()}`;
        ps.id = psId;
        let providedSlotSpec = slot.consumeConn.slotSpec.providedSlots.find(psSpec => psSpec.name == ps.name);
        availableSlots[ps.name].push({
          id: psId,
          count: ps.consumeConnections.length,
          providedSlotSpec,
          views: ps.viewConnections.map(vc => vc.view)
        });
      });
    });

    Object.keys(this._contextById).forEach(slotid => {
      if (!availableSlots[slotid]) {
        availableSlots[slotid] = [];
      }
      availableSlots[slotid].push({id:`rootslotid-${slotid}`, count:0, views: [], providedSlotSpec: {isSet: false}});
    });
    return availableSlots;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (SlotComposer);


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__arcs_runtime_arc_js__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__arcs_runtime_description_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__arcs_runtime_manifest_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__arcs_runtime_planner_js__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__arcs_runtime_slot_composer_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__arcs_runtime_type_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__browser_cdn_loader_js__ = __webpack_require__(32);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */









let Arcs = {
  version: '0.2',
  Arc: __WEBPACK_IMPORTED_MODULE_0__arcs_runtime_arc_js__["a" /* default */],
  Description: __WEBPACK_IMPORTED_MODULE_1__arcs_runtime_description_js__["a" /* default */],
  Manifest: __WEBPACK_IMPORTED_MODULE_2__arcs_runtime_manifest_js__["a" /* default */],
  Planner: __WEBPACK_IMPORTED_MODULE_3__arcs_runtime_planner_js__["a" /* default */],
  SlotComposer: __WEBPACK_IMPORTED_MODULE_4__arcs_runtime_slot_composer_js__["a" /* default */],
  Type: __WEBPACK_IMPORTED_MODULE_5__arcs_runtime_type_js__["a" /* default */],
  BrowserLoader: __WEBPACK_IMPORTED_MODULE_6__browser_cdn_loader_js__["a" /* default */],
};

window.Arcs = Arcs;


/***/ }),
/* 37 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

var supportedTypes = ["Text", "URL"];

class JsonldToManifest {
  static convert(jsonld, theClass) {
    var obj = JSON.parse(jsonld);
    var classes = {};
    var properties = {};

    if (!obj['@graph']) {
      obj['@graph'] = [obj];
    }

    for (var item of obj['@graph']) {
      if (item["@type"] == "rdf:Property")
        properties[item["@id"]] = item;
      else if (item["@type"] == "rdfs:Class") {
        classes[item["@id"]] = item;
        item.subclasses = [];
        item.superclass = null;
      }
    }

    for (var clazz of Object.values(classes)) {
      if (clazz['rdfs:subClassOf'] !== undefined) {
        if (clazz['rdfs:subClassOf'].length == undefined)
          clazz['rdfs:subClassOf'] = [clazz['rdfs:subClassOf']];
        for (let subClass of clazz['rdfs:subClassOf']) {
          var superclass = subClass['@id'];
          if (clazz.superclass == undefined)
            clazz.superclass = [];
          if (classes[superclass]) {
            classes[superclass].subclasses.push(clazz);
            clazz.superclass.push(classes[superclass]);
          } else {
            clazz.superclass.push({'@id': superclass});
          }
        }
      }
    }

    for (var clazz of Object.values(classes)) {
      if (clazz.subclasses.length == 0 && theClass == undefined) {
        theClass = clazz;
      }
    }

    var relevantProperties = [];
    for (var property of Object.values(properties)) {
      var domains = property['schema:domainIncludes'];
      if (!domains)
        domains = {'@id': theClass['@id']};
      if (!domains.length)
        domains = [domains];
      domains = domains.map(a => a['@id']);
      if (domains.includes(theClass['@id'])) {
        var name = property['@id'].split(':')[1];
        var type = property['schema:rangeIncludes'];
        if (!type)
          console.log(property);
        if (!type.length)
          type = [type];

        type = type.map(a => a['@id'].split(':')[1]);
        type = type.filter(type => supportedTypes.includes(type));
        if (type.length > 0)
        relevantProperties.push({name, type});
      }
    }

    var className = theClass['@id'].split(':')[1];
    var superNames = theClass.superclass ? theClass.superclass.map(a => a['@id'].split(':')[1]) : [];

    var s = '';
    for (let superName of superNames)
      s += `import 'https://schema.org/${superName}'\n\n`

    s += `schema ${className}`
    if (superNames.length > 0)
      s += ` extends ${superNames.join(', ')}`

    if (relevantProperties.length > 0) {
      s += '\n  optional';
      for (var property of relevantProperties) {
        if (property.type.length > 1)
          var type = '(' + property.type.join(" or ") + ')';
        else
          var type = property.type[0]
        s += `\n    ${type} ${property.name}`;
      }
    }
    s += '\n';

    return s;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (JsonldToManifest);


/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

/* harmony default export */ __webpack_exports__["a"] = ({});


/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

// TODO: Move HTMLElement to platform abstraction.
let HTMLElement;
if (typeof window == 'undefined') {
  HTMLElement = class HTMLElement {}
} else {
  HTMLElement = window.HTMLElement;
}

class ModelSelect extends HTMLElement {
  connectedCallback() {
    this.style.display = 'inline-block';
    this._requireSelect();
  }
  _requireSelect() {
    return this.select = this.select || this.appendChild(document.createElement('select'));
  }
  set options(options) {
    let select = this._requireSelect();
    select.textContent = '';
    options && options.forEach(o =>
      select.appendChild(
        Object.assign(document.createElement("option"), {
          value: o.value || o,
          text: o.text || o.value || o
        })
      )
    );
  }
}
/* unused harmony export default */


if (typeof customElements != 'undefined') {
  customElements.define('model-select', ModelSelect);
}


/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__xen_template_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__xen_element_js__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__xen_state_js__ = __webpack_require__(23);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */





class XList extends __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__xen_state_js__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__xen_element_js__["a" /* default */]) {
  static get observedAttributes() {
    return ['items','template','handler','render','scope'];
  }
  _mount() {
    this._setState({
      container: this.querySelector('[container]') || this,
      template: this.querySelector('template')
    });
    this.textContent = '';
  }
  _update(props, state) {
    var template = props.template || state.template;
    if (template) {
      this._renderList(state.container, template, props);
    }
  }
  _renderList(container, template, props) {
    // magically plumb eventMapper from an ancestor
    let p = this;
    while (!props.eventMapper && p) {
      props.eventMapper = p._eventMapper;
      p = p.parentElement;
    }
    //console.log('XList::_renderList:', props);
    var child = container.firstElementChild, next;
    props.items && props.items.forEach((item,i)=>{
      // use existing node if possible
      next = child && child.nextElementSibling;
      if (!child) {
        try {
          // TODO(sjmiles): install event handlers explicitly now
          var dom = __WEBPACK_IMPORTED_MODULE_0__xen_template_js__["a" /* default */].stamp(template).events(props.eventMapper);
        } catch(x) {
          console.warn('x-list: if `listen` is undefined, you need to provide a `handler` property for `on-*` events');
          throw x;
        }
        child = dom.root.firstElementChild;
        if (child) {
          child._listDom = dom;
          container.appendChild(dom.root);
        }
      }
      if (child) {
        // scope aka childProps
        var scope = Object.create(null);
        // accumulate scope to implement lexical binding
        if (props.scope) {
          Object.assign(scope, props.scope);
          scope.scope = props;
        }
        // TODO(sjmiles): failure to decide if an item is an `item` or an anonymous collection of properties
        scope.item = item;
        if (typeof item === 'object') {
          Object.assign(scope, item);
        }
        // list scope
        scope._items = props.items;
        scope._itemIndex = i;
        scope._item = item;
        // user can supply additional scope processing
        if (props.render) {
          Object.assign(scope, props.render(scope));
        }
        //console.log('_renderList.scope:', scope);
        child._listDom.set(scope);
        child = next;
      }
    });
    // remove extra nodes
    while (child) {
      next = child.nextElementSibling;
      child.remove();
      child = next;
    }
  }
}

if (typeof customElements != 'undefined') {
  customElements.define('x-list', XList);
}


/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

let HTMLElement;
if (typeof window == 'undefined') {
  HTMLElement = class HTMLElement {}
} else {
  HTMLElement = window.HTMLElement;
}

class XenElement extends HTMLElement {
  constructor() {
    super();
    this._mounted = false;
    this._root = this;
    this.__configureAccessors();
    this.__lazyAcquireProps();
  }
  get _class() {
    // TODO(sjmiles): problem accessing class statics under polyfills can be fixed
    // by attaching _class reference to element constructors (not provided)
    return (this.constructor._class || this.constructor);
  }
  __lazyAcquireProps() {
    var a = this._class.observedAttributes;
    a && a.forEach(n=>{
      if (n.toLowerCase() !== n) {
        console.error('Xen: Mixed-case attributes are not yet supported, `' + this.localName + '.observedAttributes` contains `' + n + '`.');
      }
      if (this.hasOwnProperty(n)) {
        var value = this[n];
        delete this[n];
        this[n] = value;
      } else if (this.hasAttribute(n)) {
        this[n] = this.getAttribute(n);
      }
    });
  }
  __configureAccessors() {
    // only do this once per prototype
    var p = Object.getPrototypeOf(this);
    if (!p.hasOwnProperty('__$xenPropsConfigured')) {
      p.__$xenPropsConfigured = true;
      var a = this._class.observedAttributes;
      a && a.forEach(n => {
        Object.defineProperty(p, n, {
          get() {
            // abstract
            return this._getProperty(n);
          },
          set(value) {
            // abstract
            this._setProperty(n, value);
          }
        });
      });
    }
  }
  connectedCallback() {
    this._mount();
  }
  _mount() {
    if (!this._mounted) {
      this._mounted = true;
      this._doMount();
      this._didMount();
    }
  }
  _doMount() {
  }
  _didMount() {
  }
  _fire(eventName, detail) {
    let event = new CustomEvent(eventName, {detail: detail});
    this.dispatchEvent(event);
    return event.detail;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = XenElement;



/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = (function() {
  "use strict";

  /*
   * Generated by PEG.js 0.9.0.
   *
   * http://pegjs.org/
   */

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function peg$SyntaxError(message, expected, found, location) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.location = location;
    this.name     = "SyntaxError";

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, peg$SyntaxError);
    }
  }

  peg$subclass(peg$SyntaxError, Error);

  function peg$parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},
        parser  = this,

        peg$FAILED = {},

        peg$startRuleFunctions = { Manifest: peg$parseManifest },
        peg$startRuleFunction  = peg$parseManifest,

        peg$c0 = function(items) {
            let result = items.map(item => item[1]);
            checkNormal(result);
            return result;
          },
        peg$c1 = "view",
        peg$c2 = { type: "literal", value: "view", description: "\"view\"" },
        peg$c3 = "of",
        peg$c4 = { type: "literal", value: "of", description: "\"of\"" },
        peg$c5 = "in",
        peg$c6 = { type: "literal", value: "in", description: "\"in\"" },
        peg$c7 = function(name, type, id, version, tags, source, items) {
            items = optional(items, extractIndented, []);
            return {
              kind: 'view',
              location: location(),
              name,
              type,
              id: optional(id, id => id[1], null),
              version: optional(version, version => version[1], null),
              tags: optional(tags, tags => tags[1], null),
              source,
              description: items.length > 0 ? items[0][2] : null
            };
          },
        peg$c8 = "description",
        peg$c9 = { type: "literal", value: "description", description: "\"description\"" },
        peg$c10 = "import",
        peg$c11 = { type: "literal", value: "import", description: "\"import\"" },
        peg$c12 = function(path) {
            return {
              kind: 'import',
              location: location(),
              path,
            };
          },
        peg$c13 = "shape",
        peg$c14 = { type: "literal", value: "shape", description: "\"shape\"" },
        peg$c15 = "<",
        peg$c16 = { type: "literal", value: "<", description: "\"<\"" },
        peg$c17 = ">",
        peg$c18 = { type: "literal", value: ">", description: "\">\"" },
        peg$c19 = function(name, typeVars, items) {
            return {
              kind: 'shape',
              location: location(),
              name,
              interface: optional(items, extractIndented, []).find(item => item.kind == 'interface'),
              slots: optional(items, extractIndented, []).filter(item => item.kind == 'particle-slot'),
            }
          },
        peg$c20 = "particle",
        peg$c21 = { type: "literal", value: "particle", description: "\"particle\"" },
        peg$c22 = function(name, implFile, items) {
            let args = null;
            let verbs = [];
            let affordance = [];
            let slots = [];
            let description = null;
            items = items ? extractIndented(items) : [];
            items.forEach(item => {
              if (item.kind == 'interface') {
                if (/[A-Z]/.test(item.verb[0]) && item.verb != name) {
                  error(`Verb ${item.verb} must start with a lower case character or be same as particle name.`);
                }
                verbs.push(item.verb);
                args = item.args;
              } else if (item.kind == 'particle-slot') {
                slots.push(item);
              } else if (item.kind == 'description') {
                // TODO: Super hacks.
                description = {
                  kind: 'description?',
                  location: 'FIXME',
                };
                item.description.forEach(d => { description[d.name] = d.pattern; });
              } else if (item.affordance) {
                affordance.push(item.affordance)
              } else {
                error(`Particle ${name} contains an unknown element: ${item.name}`);
              }
            });
            if (affordance.length == 0) {
              // Add default affordance
              affordance.push('dom');
            }
            affordance.push('mock');

            return {
              kind: 'particle',
              location: location(),
              name,
              implFile: optional(implFile, implFile => implFile[3], null),
              verbs,
              args,
              affordance,
              slots,
              description,
            };
          },
        peg$c23 = "(",
        peg$c24 = { type: "literal", value: "(", description: "\"(\"" },
        peg$c25 = ")",
        peg$c26 = { type: "literal", value: ")", description: "\")\"" },
        peg$c27 = function(verb, args) {
            return {
              kind: 'interface',
              location: location(),
              verb,
              args: args || []
            };
          },
        peg$c28 = ",",
        peg$c29 = { type: "literal", value: ",", description: "\",\"" },
        peg$c30 = function(head, tail) {
            return [head].concat(tail.map(a => a[2]));
          },
        peg$c31 = function(direction, type, name) {
            return {
              kind: 'particle-argument',
              location: location(),
              direction,
              type: type,
              name,
            };
          },
        peg$c32 = "inout",
        peg$c33 = { type: "literal", value: "inout", description: "\"inout\"" },
        peg$c34 = "out",
        peg$c35 = { type: "literal", value: "out", description: "\"out\"" },
        peg$c36 = function() {
            return text();
          },
        peg$c37 = "[",
        peg$c38 = { type: "literal", value: "[", description: "\"[\"" },
        peg$c39 = "]",
        peg$c40 = { type: "literal", value: "]", description: "\"]\"" },
        peg$c41 = function(type) {
            return {
              kind: 'list-type',
              location: location(),
              type,
            };
          },
        peg$c42 = "~",
        peg$c43 = { type: "literal", value: "~", description: "\"~\"" },
        peg$c44 = function(name) {
            return {
              kind: 'variable-type',
              location: location(),
              name,
            };
          },
        peg$c45 = function(name) {
            return {
              kind: 'reference-type',
              location: location(),
              name,
            };
          },
        peg$c46 = function(head, tail) {
            return [head, ...tail.map(a => a[2])];
          },
        peg$c47 = "affordance",
        peg$c48 = { type: "literal", value: "affordance", description: "\"affordance\"" },
        peg$c49 = "dom-touch",
        peg$c50 = { type: "literal", value: "dom-touch", description: "\"dom-touch\"" },
        peg$c51 = "dom",
        peg$c52 = { type: "literal", value: "dom", description: "\"dom\"" },
        peg$c53 = "vr",
        peg$c54 = { type: "literal", value: "vr", description: "\"vr\"" },
        peg$c55 = "voice",
        peg$c56 = { type: "literal", value: "voice", description: "\"voice\"" },
        peg$c57 = function(affordance) {
            return {
              kind: 'particle-affordance',
              location: location(),
              affordance,
            };
          },
        peg$c58 = "must",
        peg$c59 = { type: "literal", value: "must", description: "\"must\"" },
        peg$c60 = "consume",
        peg$c61 = { type: "literal", value: "consume", description: "\"consume\"" },
        peg$c62 = "set of",
        peg$c63 = { type: "literal", value: "set of", description: "\"set of\"" },
        peg$c64 = function(isRequired, isSet, name, items) {
            let formFactor = null;
            let providedSlots = [];
            items = optional(items, extractIndented, []);
            items.forEach(item => {
              if (item.kind == 'provided-slot') {
                providedSlots.push(item);
              } else if (item.kind == 'form-factor') {
                if (formFactor)
                  error('duplicate form factor for a slot');
                formFactor = item.formFactor;
              } else {
                error('Unsupported particle slot item ', item);
              }
            });
            return {
              kind: 'particle-slot',
              location: location(),
              name,
              isRequired: optional(isRequired, isRequired => isRequired[0] == 'must', false),
              isSet: !!isSet,
              formFactor,
              providedSlots
            };
          },
        peg$c65 = "formFactor",
        peg$c66 = { type: "literal", value: "formFactor", description: "\"formFactor\"" },
        peg$c67 = "fullscreen",
        peg$c68 = { type: "literal", value: "fullscreen", description: "\"fullscreen\"" },
        peg$c69 = "big",
        peg$c70 = { type: "literal", value: "big", description: "\"big\"" },
        peg$c71 = "medium",
        peg$c72 = { type: "literal", value: "medium", description: "\"medium\"" },
        peg$c73 = "small",
        peg$c74 = { type: "literal", value: "small", description: "\"small\"" },
        peg$c75 = function(formFactor) {
            return {
              kind: 'form-factor',
              location: location(),
              formFactor
            };
          },
        peg$c76 = "provide",
        peg$c77 = { type: "literal", value: "provide", description: "\"provide\"" },
        peg$c78 = function(isSet, name, items) {
            let formFactor = null;
            let views = [];
            items = items ? extractIndented(items) : [];
            items.forEach(item => {
              if (item.kind == 'form-factor') {
                if (formFactor)
                  error('duplicate form factor for a slot');
                formFactor = item.formFactor;
              } else {
                views.push(item.view);
              }
            });
            return {
              kind: 'provided-slot',
              location: location(),
              name,
              isSet: !!isSet,
              formFactor,
              views
            };
          },
        peg$c79 = function(view) {
            return {
              kind: 'particle-provided-slot-view',
              location: location(),
              view,
            };
          },
        peg$c80 = function(pattern, viewDescriptions) {
            return {
              kind: 'description',
              location: location(),
              description: [
                {
                  // TODO: this should be stored in a different field.
                  kind: 'default-description?',
                  location: location(),
                  name: 'pattern',
                  pattern: pattern,
                },
                ...optional(viewDescriptions, extractIndented, []),
              ],
            };
          },
        peg$c81 = function(name, pattern) {
            return {
              kind: 'view-description',
              location: location(),
              name,
              pattern,
            };
          },
        peg$c82 = "recipe",
        peg$c83 = { type: "literal", value: "recipe", description: "\"recipe\"" },
        peg$c84 = function(name, tags, items) {
            return {
              kind: 'recipe',
              location: location(),
              name: optional(name, name => name[1], null),
              tags: optional(tags, tags => tags[1], []),
              items: optional(items, extractIndented, []),
            };
          },
        peg$c85 = "as",
        peg$c86 = { type: "literal", value: "as", description: "\"as\"" },
        peg$c87 = function(name) {
            return name;
          },
        peg$c88 = function(ref, name, connections) {
            let viewConnections = [];
            let slotConnections = [];
            if (connections) {
              connections = extractIndented(connections);
              for (let conn of connections) {
                if (conn.kind == 'view-connection')
                  viewConnections.push(conn);
                else
                  slotConnections.push(conn)
              }
            }
            return {
              kind: 'particle',
              location: location(),
              name: optional(name, name => name[1], null),
              ref,
              connections: viewConnections,
              slotConnections: slotConnections,
            };
          },
        peg$c89 = "*",
        peg$c90 = { type: "literal", value: "*", description: "\"*\"" },
        peg$c91 = function(param, dir, target) {
            return {
              kind: 'view-connection',
              location: location(),
              param,
              dir,
              target: optional(target, target => target[1], null),
            };
          },
        peg$c92 = function(param, name, providedSlots) {
            return {
              kind: 'slot-connection',
              location: location(),
              param,
              name: optional(name, name=>name[1], null),
              providedSlots: optional(providedSlots, extractIndented, [])
            };
          },
        peg$c93 = function(param, name) {
            return {
              kind: 'provided-slot',
              location: location(),
              param,
              name: optional(name, name=>name[1], null)
            };
          },
        peg$c94 = function(from, dir, to) {
            return {
              kind: 'connection',
              location: location(),
              dir,
              from,
              to,
            };
          },
        peg$c95 = "search",
        peg$c96 = { type: "literal", value: "search", description: "\"search\"" },
        peg$c97 = "tokens",
        peg$c98 = { type: "literal", value: "tokens", description: "\"tokens\"" },
        peg$c99 = function(phrase, tokens) {
            return {
              kind: 'search',
              location: location(),
              phrase,
              tokens: optional(tokens, tokens => tokens[1][2].map(t => t[1]), null)
            };
          },
        peg$c100 = "<-",
        peg$c101 = { type: "literal", value: "<-", description: "\"<-\"" },
        peg$c102 = "->",
        peg$c103 = { type: "literal", value: "->", description: "\"->\"" },
        peg$c104 = "=",
        peg$c105 = { type: "literal", value: "=", description: "\"=\"" },
        peg$c106 = ".",
        peg$c107 = { type: "literal", value: ".", description: "\".\"" },
        peg$c108 = function(ident, param, tags) {
            let particle = null;
            let name = null;
            if (ident) {
              if (/^[A-Z]/.test(ident)) {
                particle = ident;
              } else {
                name = ident;
              }
            }

            return {
              kind: 'connection-target',
              location: location(),
              particle,
              name,
              param: optional(param, param => param[1], null),
              tags: optional(tags, tags => tags[1], []),
            }
          },
        peg$c109 = function(tags) {
            return {
              kind: 'connection-target',
              location: location(),
              tags,
            };
          },
        peg$c110 = "?",
        peg$c111 = { type: "literal", value: "?", description: "\"?\"" },
        peg$c112 = "use",
        peg$c113 = { type: "literal", value: "use", description: "\"use\"" },
        peg$c114 = "map",
        peg$c115 = { type: "literal", value: "map", description: "\"map\"" },
        peg$c116 = "create",
        peg$c117 = { type: "literal", value: "create", description: "\"create\"" },
        peg$c118 = "copy",
        peg$c119 = { type: "literal", value: "copy", description: "\"copy\"" },
        peg$c120 = function(type, ref, name) {
            return {
              kind: 'view',
              location: location(),
              name: optional(name, name => name[1], null),
              ref: optional(ref, ref => ref[1], null),
              fate: type
            }
          },
        peg$c121 = "#",
        peg$c122 = { type: "literal", value: "#", description: "\"#\"" },
        peg$c123 = /^[a-zA-Z]/,
        peg$c124 = { type: "class", value: "[a-zA-Z]", description: "[a-zA-Z]" },
        peg$c125 = /^[a-zA-Z0-9_]/,
        peg$c126 = { type: "class", value: "[a-zA-Z0-9_]", description: "[a-zA-Z0-9_]" },
        peg$c127 = function() {return text()},
        peg$c128 = function(head, tail) { return [head, ...(tail && tail[1] || [])]; },
        peg$c129 = function(tags) { return tags; },
        peg$c130 = function(name, tags) {
            return {
              kind: 'particle-ref',
              location: location(),
              name,
              tags: tags || [],
              verbs: [],
            };
          },
        peg$c131 = function(tags) {
            return {
              kind: 'particle-ref',
              location: location(),
              tags,
              verbs: [],
            };
          },
        peg$c132 = "particle can",
        peg$c133 = { type: "literal", value: "particle can", description: "\"particle can\"" },
        peg$c134 = function(verb, tags) {
            return {
              kind: 'particle-ref',
              location: location(),
              verbs: [verb],
              tags: tags || [],
            };
          },
        peg$c135 = function(id, tags) {
            return {
              kind: 'view-ref',
              location: location(),
              id,
              tags: tags || [],
            };
          },
        peg$c136 = function(name, tags) {
            return {
              kind: 'view-ref',
              location: location(),
              name,
              tags: tags || [],
            };
          },
        peg$c137 = function(tags) {
            return {
              kind: 'view-ref',
              location: location(),
              tags,
            };
          },
        peg$c138 = "slot",
        peg$c139 = { type: "literal", value: "slot", description: "\"slot\"" },
        peg$c140 = function(id, name) {
            return {
              kind: 'slot',
              location: location(),
              id: optional(id, id => id[1], null),
              name: optional(name, name => name[1], '')
            }
          },
        peg$c141 = "extends",
        peg$c142 = { type: "literal", value: "extends", description: "\"extends\"" },
        peg$c143 = function(first, rest) {
          var list = [first];
          for (let item of rest) {
            list.push(item[3]);
          }
          return list;
        },
        peg$c144 = "schema",
        peg$c145 = { type: "literal", value: "schema", description: "\"schema\"" },
        peg$c146 = function(name, parent, sections) {
            return {
              kind: 'schema',
              location: location(),
              name: name,
              parents: optional(parent, parent => parent, []),
              sections: optional(sections, extractIndented, []),
            };
          },
        peg$c147 = "normative",
        peg$c148 = { type: "literal", value: "normative", description: "\"normative\"" },
        peg$c149 = "optional",
        peg$c150 = { type: "literal", value: "optional", description: "\"optional\"" },
        peg$c151 = function(sectionType, fields) {
            return {
              kind: 'schema-section',
              location: location(),
              sectionType,
              fields: extractIndented(fields),
            };
          },
        peg$c152 = function(type, name) {
            return {
              kind: 'schema-field',
              location: location(),
              type,
              name,
            };
          },
        peg$c153 = "Text",
        peg$c154 = { type: "literal", value: "Text", description: "\"Text\"" },
        peg$c155 = "URL",
        peg$c156 = { type: "literal", value: "URL", description: "\"URL\"" },
        peg$c157 = "or",
        peg$c158 = { type: "literal", value: "or", description: "\"or\"" },
        peg$c159 = function(first, rest) {
          let typeList = [first];
          for (let type of rest) {
            typeList.push(type[3]);
          }
          return typeList;
        },
        peg$c160 = "@",
        peg$c161 = { type: "literal", value: "@", description: "\"@\"" },
        peg$c162 = /^[0-9]/,
        peg$c163 = { type: "class", value: "[0-9]", description: "[0-9]" },
        peg$c164 = function(version) {
            return Number(version.join(''));
          },
        peg$c165 = " ",
        peg$c166 = { type: "literal", value: " ", description: "\" \"" },
        peg$c167 = function(i) {
          i = i.join('');
          if (i.length > indent.length) {
            indents.push(indent);
            indent = i;
            return true;
          }
        },
        peg$c168 = function(i) {
          i = i.join('');
          if (i.length == indent.length) {
            return true;
          } else if (i.length < indent.length) {
            indent = indents.pop();
            return false;
          }
        },
        peg$c169 = function(i) {
          i = i.join('');
          if (i.length >= indent.length) {
            return true;
          } else if (i.length < indent.length) {
            indent = indents.pop();
            return false;
          }
        },
        peg$c170 = function() {
            let fixed = text();
            fixed = fixed.replace(/^(.)/, l => l.toUpperCase());
            expected(`a top level identifier (e.g. "${fixed}")`);
          },
        peg$c171 = "`",
        peg$c172 = { type: "literal", value: "`", description: "\"`\"" },
        peg$c173 = /^[^`]/,
        peg$c174 = { type: "class", value: "[^`]", description: "[^`]" },
        peg$c175 = function(pattern) { return pattern.join(''); },
        peg$c176 = "'",
        peg$c177 = { type: "literal", value: "'", description: "\"'\"" },
        peg$c178 = /^[^']/,
        peg$c179 = { type: "class", value: "[^']", description: "[^']" },
        peg$c180 = function(id) {return id.join('')},
        peg$c181 = /^[A-Z]/,
        peg$c182 = { type: "class", value: "[A-Z]", description: "[A-Z]" },
        peg$c183 = /^[a-z0-9_]/i,
        peg$c184 = { type: "class", value: "[a-z0-9_]i", description: "[a-z0-9_]i" },
        peg$c185 = function(ident) {return text()},
        peg$c186 = /^[a-z]/,
        peg$c187 = { type: "class", value: "[a-z]", description: "[a-z]" },
        peg$c188 = /^[ ]/,
        peg$c189 = { type: "class", value: "[ ]", description: "[ ]" },
        peg$c190 = { type: "any", description: "any character" },
        peg$c191 = /^[^\n]/,
        peg$c192 = { type: "class", value: "[^\\n]", description: "[^\\n]" },
        peg$c193 = "\r",
        peg$c194 = { type: "literal", value: "\r", description: "\"\\r\"" },
        peg$c195 = "\n",
        peg$c196 = { type: "literal", value: "\n", description: "\"\\n\"" },

        peg$currPos          = 0,
        peg$savedPos         = 0,
        peg$posDetailsCache  = [{ line: 1, column: 1, seenCR: false }],
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$savedPos, peg$currPos);
    }

    function location() {
      return peg$computeLocation(peg$savedPos, peg$currPos);
    }

    function expected(description) {
      throw peg$buildException(
        null,
        [{ type: "other", description: description }],
        input.substring(peg$savedPos, peg$currPos),
        peg$computeLocation(peg$savedPos, peg$currPos)
      );
    }

    function error(message) {
      throw peg$buildException(
        message,
        null,
        input.substring(peg$savedPos, peg$currPos),
        peg$computeLocation(peg$savedPos, peg$currPos)
      );
    }

    function peg$computePosDetails(pos) {
      var details = peg$posDetailsCache[pos],
          p, ch;

      if (details) {
        return details;
      } else {
        p = pos - 1;
        while (!peg$posDetailsCache[p]) {
          p--;
        }

        details = peg$posDetailsCache[p];
        details = {
          line:   details.line,
          column: details.column,
          seenCR: details.seenCR
        };

        while (p < pos) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }

          p++;
        }

        peg$posDetailsCache[pos] = details;
        return details;
      }
    }

    function peg$computeLocation(startPos, endPos) {
      var startPosDetails = peg$computePosDetails(startPos),
          endPosDetails   = peg$computePosDetails(endPos);

      return {
        start: {
          offset: startPos,
          line:   startPosDetails.line,
          column: startPosDetails.column
        },
        end: {
          offset: endPos,
          line:   endPosDetails.line,
          column: endPosDetails.column
        }
      };
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, found, location) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function(a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

          return s
            .replace(/\\/g,   '\\\\')
            .replace(/"/g,    '\\"')
            .replace(/\x08/g, '\\b')
            .replace(/\t/g,   '\\t')
            .replace(/\n/g,   '\\n')
            .replace(/\f/g,   '\\f')
            .replace(/\r/g,   '\\r')
            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
            .replace(/[\u0100-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
            .replace(/[\u1000-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc, foundDesc, i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1
          ? expectedDescs.slice(0, -1).join(", ")
              + " or "
              + expectedDescs[expected.length - 1]
          : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new peg$SyntaxError(
        message !== null ? message : buildMessage(expected, found),
        expected,
        found,
        location
      );
    }

    function peg$parseManifest() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      s1 = peg$parseeolWhiteSpace();
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseIndent();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$currPos;
          s5 = peg$parseSameIndent();
          if (s5 !== peg$FAILED) {
            s6 = peg$parseManifestItem();
            if (s6 !== peg$FAILED) {
              s5 = [s5, s6];
              s4 = s5;
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$FAILED;
          }
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$currPos;
            s5 = peg$parseSameIndent();
            if (s5 !== peg$FAILED) {
              s6 = peg$parseManifestItem();
              if (s6 !== peg$FAILED) {
                s5 = [s5, s6];
                s4 = s5;
              } else {
                peg$currPos = s4;
                s4 = peg$FAILED;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c0(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseManifestItem() {
      var s0;

      s0 = peg$parseRecipe();
      if (s0 === peg$FAILED) {
        s0 = peg$parseParticle();
        if (s0 === peg$FAILED) {
          s0 = peg$parseImport();
          if (s0 === peg$FAILED) {
            s0 = peg$parseSchema();
            if (s0 === peg$FAILED) {
              s0 = peg$parseManifestView();
              if (s0 === peg$FAILED) {
                s0 = peg$parseShape();
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parseManifestView() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16, s17, s18, s19, s20, s21;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 4) === peg$c1) {
        s1 = peg$c1;
        peg$currPos += 4;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c2); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseTopLevelIdent();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsewhiteSpace();
            if (s4 !== peg$FAILED) {
              if (input.substr(peg$currPos, 2) === peg$c3) {
                s5 = peg$c3;
                peg$currPos += 2;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c4); }
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parsewhiteSpace();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parseListType();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parseReferenceType();
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$currPos;
                    s9 = peg$parsewhiteSpace();
                    if (s9 !== peg$FAILED) {
                      s10 = peg$parseid();
                      if (s10 !== peg$FAILED) {
                        s9 = [s9, s10];
                        s8 = s9;
                      } else {
                        peg$currPos = s8;
                        s8 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s8;
                      s8 = peg$FAILED;
                    }
                    if (s8 === peg$FAILED) {
                      s8 = null;
                    }
                    if (s8 !== peg$FAILED) {
                      s9 = peg$currPos;
                      s10 = peg$parsewhiteSpace();
                      if (s10 !== peg$FAILED) {
                        s11 = peg$parseVersion();
                        if (s11 !== peg$FAILED) {
                          s10 = [s10, s11];
                          s9 = s10;
                        } else {
                          peg$currPos = s9;
                          s9 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s9;
                        s9 = peg$FAILED;
                      }
                      if (s9 === peg$FAILED) {
                        s9 = null;
                      }
                      if (s9 !== peg$FAILED) {
                        s10 = peg$currPos;
                        s11 = peg$parsewhiteSpace();
                        if (s11 !== peg$FAILED) {
                          s12 = peg$parseTagList();
                          if (s12 !== peg$FAILED) {
                            s11 = [s11, s12];
                            s10 = s11;
                          } else {
                            peg$currPos = s10;
                            s10 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s10;
                          s10 = peg$FAILED;
                        }
                        if (s10 === peg$FAILED) {
                          s10 = null;
                        }
                        if (s10 !== peg$FAILED) {
                          s11 = peg$parsewhiteSpace();
                          if (s11 !== peg$FAILED) {
                            if (input.substr(peg$currPos, 2) === peg$c5) {
                              s12 = peg$c5;
                              peg$currPos += 2;
                            } else {
                              s12 = peg$FAILED;
                              if (peg$silentFails === 0) { peg$fail(peg$c6); }
                            }
                            if (s12 !== peg$FAILED) {
                              s13 = peg$parsewhiteSpace();
                              if (s13 !== peg$FAILED) {
                                s14 = peg$parseid();
                                if (s14 !== peg$FAILED) {
                                  s15 = peg$parseeolWhiteSpace();
                                  if (s15 !== peg$FAILED) {
                                    s16 = peg$currPos;
                                    s17 = peg$parseIndent();
                                    if (s17 !== peg$FAILED) {
                                      s18 = [];
                                      s19 = peg$currPos;
                                      s20 = peg$parseSameIndent();
                                      if (s20 !== peg$FAILED) {
                                        s21 = peg$parseManifestViewDescription();
                                        if (s21 !== peg$FAILED) {
                                          s20 = [s20, s21];
                                          s19 = s20;
                                        } else {
                                          peg$currPos = s19;
                                          s19 = peg$FAILED;
                                        }
                                      } else {
                                        peg$currPos = s19;
                                        s19 = peg$FAILED;
                                      }
                                      if (s19 !== peg$FAILED) {
                                        while (s19 !== peg$FAILED) {
                                          s18.push(s19);
                                          s19 = peg$currPos;
                                          s20 = peg$parseSameIndent();
                                          if (s20 !== peg$FAILED) {
                                            s21 = peg$parseManifestViewDescription();
                                            if (s21 !== peg$FAILED) {
                                              s20 = [s20, s21];
                                              s19 = s20;
                                            } else {
                                              peg$currPos = s19;
                                              s19 = peg$FAILED;
                                            }
                                          } else {
                                            peg$currPos = s19;
                                            s19 = peg$FAILED;
                                          }
                                        }
                                      } else {
                                        s18 = peg$FAILED;
                                      }
                                      if (s18 !== peg$FAILED) {
                                        s17 = [s17, s18];
                                        s16 = s17;
                                      } else {
                                        peg$currPos = s16;
                                        s16 = peg$FAILED;
                                      }
                                    } else {
                                      peg$currPos = s16;
                                      s16 = peg$FAILED;
                                    }
                                    if (s16 === peg$FAILED) {
                                      s16 = null;
                                    }
                                    if (s16 !== peg$FAILED) {
                                      peg$savedPos = s0;
                                      s1 = peg$c7(s3, s7, s8, s9, s10, s14, s16);
                                      s0 = s1;
                                    } else {
                                      peg$currPos = s0;
                                      s0 = peg$FAILED;
                                    }
                                  } else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                  }
                                } else {
                                  peg$currPos = s0;
                                  s0 = peg$FAILED;
                                }
                              } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseManifestViewDescription() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 11) === peg$c8) {
        s1 = peg$c8;
        peg$currPos += 11;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c9); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsebackquotedString();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseeolWhiteSpace();
            if (s4 !== peg$FAILED) {
              s1 = [s1, s2, s3, s4];
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseImport() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c10) {
        s1 = peg$c10;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c11); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseid();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseeolWhiteSpace();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c12(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseShape() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 5) === peg$c13) {
        s1 = peg$c13;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c14); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseTopLevelIdent();
          if (s3 !== peg$FAILED) {
            s4 = peg$currPos;
            s5 = peg$parsewhiteSpace();
            if (s5 === peg$FAILED) {
              s5 = null;
            }
            if (s5 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 60) {
                s6 = peg$c15;
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c16); }
              }
              if (s6 !== peg$FAILED) {
                s7 = peg$parsewhiteSpace();
                if (s7 === peg$FAILED) {
                  s7 = null;
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$parseVariableTypeList();
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parsewhiteSpace();
                    if (s9 === peg$FAILED) {
                      s9 = null;
                    }
                    if (s9 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 62) {
                        s10 = peg$c17;
                        peg$currPos++;
                      } else {
                        s10 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c18); }
                      }
                      if (s10 !== peg$FAILED) {
                        s5 = [s5, s6, s7, s8, s9, s10];
                        s4 = s5;
                      } else {
                        peg$currPos = s4;
                        s4 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s4;
                      s4 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s4;
                    s4 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s4;
                  s4 = peg$FAILED;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$FAILED;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parseeolWhiteSpace();
              if (s5 !== peg$FAILED) {
                s6 = peg$currPos;
                s7 = peg$parseIndent();
                if (s7 !== peg$FAILED) {
                  s8 = [];
                  s9 = peg$currPos;
                  s10 = peg$parseSameIndent();
                  if (s10 !== peg$FAILED) {
                    s11 = peg$parseShapeItem();
                    if (s11 !== peg$FAILED) {
                      s10 = [s10, s11];
                      s9 = s10;
                    } else {
                      peg$currPos = s9;
                      s9 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s9;
                    s9 = peg$FAILED;
                  }
                  while (s9 !== peg$FAILED) {
                    s8.push(s9);
                    s9 = peg$currPos;
                    s10 = peg$parseSameIndent();
                    if (s10 !== peg$FAILED) {
                      s11 = peg$parseShapeItem();
                      if (s11 !== peg$FAILED) {
                        s10 = [s10, s11];
                        s9 = s10;
                      } else {
                        peg$currPos = s9;
                        s9 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s9;
                      s9 = peg$FAILED;
                    }
                  }
                  if (s8 !== peg$FAILED) {
                    s7 = [s7, s8];
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                if (s6 === peg$FAILED) {
                  s6 = null;
                }
                if (s6 !== peg$FAILED) {
                  s7 = peg$parseeolWhiteSpace();
                  if (s7 === peg$FAILED) {
                    s7 = null;
                  }
                  if (s7 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c19(s3, s4, s6);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseShapeItem() {
      var s0;

      s0 = peg$parseParticleInterface();
      if (s0 === peg$FAILED) {
        s0 = peg$parseParticleSlot();
      }

      return s0;
    }

    function peg$parseParticle() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 8) === peg$c20) {
        s1 = peg$c20;
        peg$currPos += 8;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c21); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseTopLevelIdent();
          if (s3 !== peg$FAILED) {
            s4 = peg$currPos;
            s5 = peg$parsewhiteSpace();
            if (s5 !== peg$FAILED) {
              if (input.substr(peg$currPos, 2) === peg$c5) {
                s6 = peg$c5;
                peg$currPos += 2;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c6); }
              }
              if (s6 !== peg$FAILED) {
                s7 = peg$parsewhiteSpace();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parseid();
                  if (s8 !== peg$FAILED) {
                    s5 = [s5, s6, s7, s8];
                    s4 = s5;
                  } else {
                    peg$currPos = s4;
                    s4 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s4;
                  s4 = peg$FAILED;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$FAILED;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parseeolWhiteSpace();
              if (s5 !== peg$FAILED) {
                s6 = peg$currPos;
                s7 = peg$parseIndent();
                if (s7 !== peg$FAILED) {
                  s8 = [];
                  s9 = peg$currPos;
                  s10 = peg$parseSameIndent();
                  if (s10 !== peg$FAILED) {
                    s11 = peg$parseParticleItem();
                    if (s11 !== peg$FAILED) {
                      s10 = [s10, s11];
                      s9 = s10;
                    } else {
                      peg$currPos = s9;
                      s9 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s9;
                    s9 = peg$FAILED;
                  }
                  while (s9 !== peg$FAILED) {
                    s8.push(s9);
                    s9 = peg$currPos;
                    s10 = peg$parseSameIndent();
                    if (s10 !== peg$FAILED) {
                      s11 = peg$parseParticleItem();
                      if (s11 !== peg$FAILED) {
                        s10 = [s10, s11];
                        s9 = s10;
                      } else {
                        peg$currPos = s9;
                        s9 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s9;
                      s9 = peg$FAILED;
                    }
                  }
                  if (s8 !== peg$FAILED) {
                    s7 = [s7, s8];
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                if (s6 === peg$FAILED) {
                  s6 = null;
                }
                if (s6 !== peg$FAILED) {
                  s7 = peg$parseeolWhiteSpace();
                  if (s7 === peg$FAILED) {
                    s7 = null;
                  }
                  if (s7 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c22(s3, s4, s6);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseParticleItem() {
      var s0;

      s0 = peg$parseParticleInterface();
      if (s0 === peg$FAILED) {
        s0 = peg$parseParticleAffordance();
        if (s0 === peg$FAILED) {
          s0 = peg$parseParticleSlot();
          if (s0 === peg$FAILED) {
            s0 = peg$parseParticleDescription();
          }
        }
      }

      return s0;
    }

    function peg$parseParticleInterface() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parseupperIdent();
      if (s1 === peg$FAILED) {
        s1 = peg$parselowerIdent();
      }
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 40) {
          s2 = peg$c23;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c24); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseParticleArgumentList();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 41) {
              s4 = peg$c25;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c26); }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parseeolWhiteSpace();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c27(s1, s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseParticleArgumentList() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      s1 = peg$parseParticleArgument();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 44) {
          s4 = peg$c28;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c29); }
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parsewhiteSpace();
          if (s5 !== peg$FAILED) {
            s6 = peg$parseParticleArgument();
            if (s6 !== peg$FAILED) {
              s4 = [s4, s5, s6];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 44) {
            s4 = peg$c28;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c29); }
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsewhiteSpace();
            if (s5 !== peg$FAILED) {
              s6 = peg$parseParticleArgument();
              if (s6 !== peg$FAILED) {
                s4 = [s4, s5, s6];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c30(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseParticleArgument() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parseParticleArgumentDirection();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseType();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsewhiteSpace();
            if (s4 !== peg$FAILED) {
              s5 = peg$parselowerIdent();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c31(s1, s3, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseParticleArgumentDirection() {
      var s0, s1;

      if (input.substr(peg$currPos, 5) === peg$c32) {
        s0 = peg$c32;
        peg$currPos += 5;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c33); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 2) === peg$c5) {
          s0 = peg$c5;
          peg$currPos += 2;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c6); }
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 3) === peg$c34) {
            s1 = peg$c34;
            peg$currPos += 3;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c35); }
          }
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c36();
          }
          s0 = s1;
        }
      }

      return s0;
    }

    function peg$parseType() {
      var s0;

      s0 = peg$parseVariableType();
      if (s0 === peg$FAILED) {
        s0 = peg$parseReferenceType();
        if (s0 === peg$FAILED) {
          s0 = peg$parseListType();
        }
      }

      return s0;
    }

    function peg$parseListType() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 91) {
        s1 = peg$c37;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c38); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseType();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 93) {
            s3 = peg$c39;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c40); }
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c41(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseVariableType() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 126) {
        s1 = peg$c42;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c43); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parselowerIdent();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c44(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseReferenceType() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parseupperIdent();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c45(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseVariableTypeList() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      s1 = peg$parseVariableType();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 44) {
          s4 = peg$c28;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c29); }
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parsewhiteSpace();
          if (s5 !== peg$FAILED) {
            s6 = peg$parseVariableType();
            if (s6 !== peg$FAILED) {
              s4 = [s4, s5, s6];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 44) {
            s4 = peg$c28;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c29); }
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsewhiteSpace();
            if (s5 !== peg$FAILED) {
              s6 = peg$parseVariableType();
              if (s6 !== peg$FAILED) {
                s4 = [s4, s5, s6];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c46(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseParticleAffordance() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 10) === peg$c47) {
        s1 = peg$c47;
        peg$currPos += 10;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c48); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          if (input.substr(peg$currPos, 9) === peg$c49) {
            s3 = peg$c49;
            peg$currPos += 9;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c50); }
          }
          if (s3 === peg$FAILED) {
            if (input.substr(peg$currPos, 3) === peg$c51) {
              s3 = peg$c51;
              peg$currPos += 3;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c52); }
            }
            if (s3 === peg$FAILED) {
              if (input.substr(peg$currPos, 2) === peg$c53) {
                s3 = peg$c53;
                peg$currPos += 2;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c54); }
              }
              if (s3 === peg$FAILED) {
                if (input.substr(peg$currPos, 5) === peg$c55) {
                  s3 = peg$c55;
                  peg$currPos += 5;
                } else {
                  s3 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c56); }
                }
              }
            }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseeolWhiteSpace();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c57(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseParticleSlot() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (input.substr(peg$currPos, 4) === peg$c58) {
        s2 = peg$c58;
        peg$currPos += 4;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c59); }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsewhiteSpace();
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        if (input.substr(peg$currPos, 7) === peg$c60) {
          s2 = peg$c60;
          peg$currPos += 7;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c61); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsewhiteSpace();
          if (s3 !== peg$FAILED) {
            s4 = peg$currPos;
            if (input.substr(peg$currPos, 6) === peg$c62) {
              s5 = peg$c62;
              peg$currPos += 6;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c63); }
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parsewhiteSpace();
              if (s6 !== peg$FAILED) {
                s5 = [s5, s6];
                s4 = s5;
              } else {
                peg$currPos = s4;
                s4 = peg$FAILED;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parselowerIdent();
              if (s5 !== peg$FAILED) {
                s6 = peg$parseeolWhiteSpace();
                if (s6 !== peg$FAILED) {
                  s7 = peg$currPos;
                  s8 = peg$parseIndent();
                  if (s8 !== peg$FAILED) {
                    s9 = [];
                    s10 = peg$currPos;
                    s11 = peg$parseSameIndent();
                    if (s11 !== peg$FAILED) {
                      s12 = peg$parseParticleSlotItem();
                      if (s12 !== peg$FAILED) {
                        s11 = [s11, s12];
                        s10 = s11;
                      } else {
                        peg$currPos = s10;
                        s10 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s10;
                      s10 = peg$FAILED;
                    }
                    while (s10 !== peg$FAILED) {
                      s9.push(s10);
                      s10 = peg$currPos;
                      s11 = peg$parseSameIndent();
                      if (s11 !== peg$FAILED) {
                        s12 = peg$parseParticleSlotItem();
                        if (s12 !== peg$FAILED) {
                          s11 = [s11, s12];
                          s10 = s11;
                        } else {
                          peg$currPos = s10;
                          s10 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s10;
                        s10 = peg$FAILED;
                      }
                    }
                    if (s9 !== peg$FAILED) {
                      s8 = [s8, s9];
                      s7 = s8;
                    } else {
                      peg$currPos = s7;
                      s7 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s7;
                    s7 = peg$FAILED;
                  }
                  if (s7 === peg$FAILED) {
                    s7 = null;
                  }
                  if (s7 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c64(s1, s4, s5, s7);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseParticleSlotItem() {
      var s0;

      s0 = peg$parseSlotFormFactor();
      if (s0 === peg$FAILED) {
        s0 = peg$parseParticleProvidedSlot();
      }

      return s0;
    }

    function peg$parseSlotFormFactor() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 10) === peg$c65) {
        s1 = peg$c65;
        peg$currPos += 10;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c66); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          if (input.substr(peg$currPos, 10) === peg$c67) {
            s3 = peg$c67;
            peg$currPos += 10;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c68); }
          }
          if (s3 === peg$FAILED) {
            if (input.substr(peg$currPos, 3) === peg$c69) {
              s3 = peg$c69;
              peg$currPos += 3;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c70); }
            }
            if (s3 === peg$FAILED) {
              if (input.substr(peg$currPos, 6) === peg$c71) {
                s3 = peg$c71;
                peg$currPos += 6;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c72); }
              }
              if (s3 === peg$FAILED) {
                if (input.substr(peg$currPos, 5) === peg$c73) {
                  s3 = peg$c73;
                  peg$currPos += 5;
                } else {
                  s3 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c74); }
                }
              }
            }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseeolWhiteSpace();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c75(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseParticleProvidedSlot() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 7) === peg$c76) {
        s1 = peg$c76;
        peg$currPos += 7;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c77); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          if (input.substr(peg$currPos, 6) === peg$c62) {
            s4 = peg$c62;
            peg$currPos += 6;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c63); }
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsewhiteSpace();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parselowerIdent();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseeolWhiteSpace();
              if (s5 !== peg$FAILED) {
                s6 = peg$currPos;
                s7 = peg$parseIndent();
                if (s7 !== peg$FAILED) {
                  s8 = [];
                  s9 = peg$currPos;
                  s10 = peg$parseSameIndent();
                  if (s10 !== peg$FAILED) {
                    s11 = peg$parseParticleProvidedSlotItem();
                    if (s11 !== peg$FAILED) {
                      s10 = [s10, s11];
                      s9 = s10;
                    } else {
                      peg$currPos = s9;
                      s9 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s9;
                    s9 = peg$FAILED;
                  }
                  while (s9 !== peg$FAILED) {
                    s8.push(s9);
                    s9 = peg$currPos;
                    s10 = peg$parseSameIndent();
                    if (s10 !== peg$FAILED) {
                      s11 = peg$parseParticleProvidedSlotItem();
                      if (s11 !== peg$FAILED) {
                        s10 = [s10, s11];
                        s9 = s10;
                      } else {
                        peg$currPos = s9;
                        s9 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s9;
                      s9 = peg$FAILED;
                    }
                  }
                  if (s8 !== peg$FAILED) {
                    s7 = [s7, s8];
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                if (s6 === peg$FAILED) {
                  s6 = null;
                }
                if (s6 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c78(s3, s4, s6);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseParticleProvidedSlotItem() {
      var s0;

      s0 = peg$parseSlotFormFactor();
      if (s0 === peg$FAILED) {
        s0 = peg$parseParticleProvidedSlotView();
      }

      return s0;
    }

    function peg$parseParticleProvidedSlotView() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 4) === peg$c1) {
        s1 = peg$c1;
        peg$currPos += 4;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c2); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parselowerIdent();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseeolWhiteSpace();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c79(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseParticleDescription() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 11) === peg$c8) {
        s1 = peg$c8;
        peg$currPos += 11;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c9); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsebackquotedString();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseeolWhiteSpace();
            if (s4 !== peg$FAILED) {
              s5 = peg$currPos;
              s6 = peg$parseIndent();
              if (s6 !== peg$FAILED) {
                s7 = [];
                s8 = peg$currPos;
                s9 = peg$parseSameIndent();
                if (s9 !== peg$FAILED) {
                  s10 = peg$parseParticleViewDescription();
                  if (s10 !== peg$FAILED) {
                    s9 = [s9, s10];
                    s8 = s9;
                  } else {
                    peg$currPos = s8;
                    s8 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s8;
                  s8 = peg$FAILED;
                }
                if (s8 !== peg$FAILED) {
                  while (s8 !== peg$FAILED) {
                    s7.push(s8);
                    s8 = peg$currPos;
                    s9 = peg$parseSameIndent();
                    if (s9 !== peg$FAILED) {
                      s10 = peg$parseParticleViewDescription();
                      if (s10 !== peg$FAILED) {
                        s9 = [s9, s10];
                        s8 = s9;
                      } else {
                        peg$currPos = s8;
                        s8 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s8;
                      s8 = peg$FAILED;
                    }
                  }
                } else {
                  s7 = peg$FAILED;
                }
                if (s7 !== peg$FAILED) {
                  s6 = [s6, s7];
                  s5 = s6;
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
              if (s5 === peg$FAILED) {
                s5 = null;
              }
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c80(s3, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseParticleViewDescription() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parselowerIdent();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsebackquotedString();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseeolWhiteSpace();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c81(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseRecipe() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c82) {
        s1 = peg$c82;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c83); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        s3 = peg$parsewhiteSpace();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseTopLevelIdent();
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          s4 = peg$parsewhiteSpace();
          if (s4 !== peg$FAILED) {
            s5 = peg$parseTagList();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseeolWhiteSpace();
            if (s4 !== peg$FAILED) {
              s5 = peg$currPos;
              s6 = peg$parseIndent();
              if (s6 !== peg$FAILED) {
                s7 = [];
                s8 = peg$currPos;
                s9 = peg$parseSameIndent();
                if (s9 !== peg$FAILED) {
                  s10 = peg$parseRecipeItem();
                  if (s10 !== peg$FAILED) {
                    s9 = [s9, s10];
                    s8 = s9;
                  } else {
                    peg$currPos = s8;
                    s8 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s8;
                  s8 = peg$FAILED;
                }
                while (s8 !== peg$FAILED) {
                  s7.push(s8);
                  s8 = peg$currPos;
                  s9 = peg$parseSameIndent();
                  if (s9 !== peg$FAILED) {
                    s10 = peg$parseRecipeItem();
                    if (s10 !== peg$FAILED) {
                      s9 = [s9, s10];
                      s8 = s9;
                    } else {
                      peg$currPos = s8;
                      s8 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s8;
                    s8 = peg$FAILED;
                  }
                }
                if (s7 !== peg$FAILED) {
                  s6 = [s6, s7];
                  s5 = s6;
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
              if (s5 === peg$FAILED) {
                s5 = null;
              }
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c84(s2, s3, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseRecipeItem() {
      var s0;

      s0 = peg$parseRecipeParticle();
      if (s0 === peg$FAILED) {
        s0 = peg$parseRecipeView();
        if (s0 === peg$FAILED) {
          s0 = peg$parseRecipeSlot();
          if (s0 === peg$FAILED) {
            s0 = peg$parseRecipeConnection();
            if (s0 === peg$FAILED) {
              s0 = peg$parseRecipeSearch();
            }
          }
        }
      }

      return s0;
    }

    function peg$parseName() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c85) {
        s1 = peg$c85;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c86); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parselowerIdent();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c87(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseRecipeParticle() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

      s0 = peg$currPos;
      s1 = peg$parseParticleRef();
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        s3 = peg$parsewhiteSpace();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseName();
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseeolWhiteSpace();
          if (s3 !== peg$FAILED) {
            s4 = peg$currPos;
            s5 = peg$parseIndent();
            if (s5 !== peg$FAILED) {
              s6 = [];
              s7 = peg$currPos;
              s8 = peg$parseSameIndent();
              if (s8 !== peg$FAILED) {
                s9 = peg$parseRecipeParticleItem();
                if (s9 !== peg$FAILED) {
                  s8 = [s8, s9];
                  s7 = s8;
                } else {
                  peg$currPos = s7;
                  s7 = peg$FAILED;
                }
              } else {
                peg$currPos = s7;
                s7 = peg$FAILED;
              }
              while (s7 !== peg$FAILED) {
                s6.push(s7);
                s7 = peg$currPos;
                s8 = peg$parseSameIndent();
                if (s8 !== peg$FAILED) {
                  s9 = peg$parseRecipeParticleItem();
                  if (s9 !== peg$FAILED) {
                    s8 = [s8, s9];
                    s7 = s8;
                  } else {
                    peg$currPos = s7;
                    s7 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s7;
                  s7 = peg$FAILED;
                }
              }
              if (s6 !== peg$FAILED) {
                s5 = [s5, s6];
                s4 = s5;
              } else {
                peg$currPos = s4;
                s4 = peg$FAILED;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c88(s1, s2, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseRecipeParticleItem() {
      var s0;

      s0 = peg$parseRecipeParticleConnection();
      if (s0 === peg$FAILED) {
        s0 = peg$parseRecipeParticleSlotConnection();
      }

      return s0;
    }

    function peg$parseRecipeParticleConnection() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      s1 = peg$parselowerIdent();
      if (s1 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 42) {
          s1 = peg$c89;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c90); }
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseDirection();
          if (s3 !== peg$FAILED) {
            s4 = peg$currPos;
            s5 = peg$parsewhiteSpace();
            if (s5 !== peg$FAILED) {
              s6 = peg$parseConnectionTarget();
              if (s6 !== peg$FAILED) {
                s5 = [s5, s6];
                s4 = s5;
              } else {
                peg$currPos = s4;
                s4 = peg$FAILED;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parseeolWhiteSpace();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c91(s1, s3, s4);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseRecipeParticleSlotConnection() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 7) === peg$c60) {
        s1 = peg$c60;
        peg$currPos += 7;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c61); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parselowerIdent();
          if (s3 !== peg$FAILED) {
            s4 = peg$currPos;
            s5 = peg$parsewhiteSpace();
            if (s5 !== peg$FAILED) {
              s6 = peg$parseName();
              if (s6 !== peg$FAILED) {
                s5 = [s5, s6];
                s4 = s5;
              } else {
                peg$currPos = s4;
                s4 = peg$FAILED;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parseeolWhiteSpace();
              if (s5 !== peg$FAILED) {
                s6 = peg$currPos;
                s7 = peg$parseIndent();
                if (s7 !== peg$FAILED) {
                  s8 = [];
                  s9 = peg$currPos;
                  s10 = peg$parseSameIndent();
                  if (s10 !== peg$FAILED) {
                    s11 = peg$parseRecipeParticleProvidedSlot();
                    if (s11 !== peg$FAILED) {
                      s10 = [s10, s11];
                      s9 = s10;
                    } else {
                      peg$currPos = s9;
                      s9 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s9;
                    s9 = peg$FAILED;
                  }
                  while (s9 !== peg$FAILED) {
                    s8.push(s9);
                    s9 = peg$currPos;
                    s10 = peg$parseSameIndent();
                    if (s10 !== peg$FAILED) {
                      s11 = peg$parseRecipeParticleProvidedSlot();
                      if (s11 !== peg$FAILED) {
                        s10 = [s10, s11];
                        s9 = s10;
                      } else {
                        peg$currPos = s9;
                        s9 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s9;
                      s9 = peg$FAILED;
                    }
                  }
                  if (s8 !== peg$FAILED) {
                    s7 = [s7, s8];
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                if (s6 === peg$FAILED) {
                  s6 = null;
                }
                if (s6 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c92(s3, s4, s6);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseRecipeParticleProvidedSlot() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 7) === peg$c76) {
        s1 = peg$c76;
        peg$currPos += 7;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c77); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parselowerIdent();
          if (s3 !== peg$FAILED) {
            s4 = peg$currPos;
            s5 = peg$parsewhiteSpace();
            if (s5 !== peg$FAILED) {
              s6 = peg$parseName();
              if (s6 !== peg$FAILED) {
                s5 = [s5, s6];
                s4 = s5;
              } else {
                peg$currPos = s4;
                s4 = peg$FAILED;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parseeolWhiteSpace();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c93(s3, s4);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseRecipeConnection() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      s1 = peg$parseConnectionTarget();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseDirection();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsewhiteSpace();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseConnectionTarget();
              if (s5 !== peg$FAILED) {
                s6 = peg$parseeolWhiteSpace();
                if (s6 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c94(s1, s3, s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseRecipeSearch() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c95) {
        s1 = peg$c95;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c96); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsebackquotedString();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseeolWhiteSpace();
            if (s4 !== peg$FAILED) {
              s5 = peg$currPos;
              s6 = peg$parseIndent();
              if (s6 !== peg$FAILED) {
                s7 = peg$currPos;
                s8 = peg$parseSameIndent();
                if (s8 !== peg$FAILED) {
                  if (input.substr(peg$currPos, 6) === peg$c97) {
                    s9 = peg$c97;
                    peg$currPos += 6;
                  } else {
                    s9 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c98); }
                  }
                  if (s9 !== peg$FAILED) {
                    s10 = [];
                    s11 = peg$currPos;
                    s12 = peg$parsewhiteSpace();
                    if (s12 !== peg$FAILED) {
                      s13 = peg$parsebackquotedString();
                      if (s13 !== peg$FAILED) {
                        s12 = [s12, s13];
                        s11 = s12;
                      } else {
                        peg$currPos = s11;
                        s11 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s11;
                      s11 = peg$FAILED;
                    }
                    if (s11 !== peg$FAILED) {
                      while (s11 !== peg$FAILED) {
                        s10.push(s11);
                        s11 = peg$currPos;
                        s12 = peg$parsewhiteSpace();
                        if (s12 !== peg$FAILED) {
                          s13 = peg$parsebackquotedString();
                          if (s13 !== peg$FAILED) {
                            s12 = [s12, s13];
                            s11 = s12;
                          } else {
                            peg$currPos = s11;
                            s11 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s11;
                          s11 = peg$FAILED;
                        }
                      }
                    } else {
                      s10 = peg$FAILED;
                    }
                    if (s10 !== peg$FAILED) {
                      s11 = peg$parseeolWhiteSpace();
                      if (s11 !== peg$FAILED) {
                        s8 = [s8, s9, s10, s11];
                        s7 = s8;
                      } else {
                        peg$currPos = s7;
                        s7 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s7;
                      s7 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s7;
                    s7 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s7;
                  s7 = peg$FAILED;
                }
                if (s7 !== peg$FAILED) {
                  s6 = [s6, s7];
                  s5 = s6;
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
              if (s5 === peg$FAILED) {
                s5 = null;
              }
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c99(s3, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseDirection() {
      var s0;

      if (input.substr(peg$currPos, 2) === peg$c100) {
        s0 = peg$c100;
        peg$currPos += 2;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c101); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 2) === peg$c102) {
          s0 = peg$c102;
          peg$currPos += 2;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c103); }
        }
        if (s0 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 61) {
            s0 = peg$c104;
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c105); }
          }
        }
      }

      return s0;
    }

    function peg$parseConnectionTarget() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parseupperIdent();
      if (s1 === peg$FAILED) {
        s1 = peg$parselowerIdent();
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 46) {
          s3 = peg$c106;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c107); }
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parselowerIdent();
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          s4 = peg$parsewhiteSpace();
          if (s4 !== peg$FAILED) {
            s5 = peg$parseTagList();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c108(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parseTagList();
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c109(s1);
        }
        s0 = s1;
      }

      return s0;
    }

    function peg$parseRecipeView() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 63) {
        s1 = peg$c110;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c111); }
      }
      if (s1 === peg$FAILED) {
        if (input.substr(peg$currPos, 3) === peg$c112) {
          s1 = peg$c112;
          peg$currPos += 3;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c113); }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 3) === peg$c114) {
            s1 = peg$c114;
            peg$currPos += 3;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c115); }
          }
          if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 6) === peg$c116) {
              s1 = peg$c116;
              peg$currPos += 6;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c117); }
            }
            if (s1 === peg$FAILED) {
              if (input.substr(peg$currPos, 4) === peg$c118) {
                s1 = peg$c118;
                peg$currPos += 4;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c119); }
              }
            }
          }
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        s3 = peg$parsewhiteSpace();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseViewRef();
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          s4 = peg$parsewhiteSpace();
          if (s4 !== peg$FAILED) {
            s5 = peg$parseName();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseeolWhiteSpace();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c120(s1, s2, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseTag() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 35) {
        s1 = peg$c121;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c122); }
      }
      if (s1 !== peg$FAILED) {
        if (peg$c123.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c124); }
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          if (peg$c125.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c126); }
          }
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            if (peg$c125.test(input.charAt(peg$currPos))) {
              s4 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c126); }
            }
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c127();
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseTagList() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parseTag();
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        s3 = peg$parsewhiteSpace();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseTagList();
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c128(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseSpaceTagList() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parsewhiteSpace();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseTagList();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c129(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseParticleRef() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parseupperIdent();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseSpaceTagList();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c130(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parseTagList();
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c131(s1);
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 12) === peg$c132) {
            s1 = peg$c132;
            peg$currPos += 12;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c133); }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parsewhiteSpace();
            if (s2 !== peg$FAILED) {
              s3 = peg$parselowerIdent();
              if (s3 !== peg$FAILED) {
                s4 = peg$parseSpaceTagList();
                if (s4 === peg$FAILED) {
                  s4 = null;
                }
                if (s4 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c134(s3, s4);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        }
      }

      return s0;
    }

    function peg$parseViewRef() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parseid();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseSpaceTagList();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c135(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parseupperIdent();
        if (s1 !== peg$FAILED) {
          s2 = peg$parseSpaceTagList();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c136(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parseTagList();
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c137(s1);
          }
          s0 = s1;
        }
      }

      return s0;
    }

    function peg$parseRecipeSlot() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 4) === peg$c138) {
        s1 = peg$c138;
        peg$currPos += 4;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c139); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        s3 = peg$parsewhiteSpace();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseid();
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          s4 = peg$parsewhiteSpace();
          if (s4 !== peg$FAILED) {
            s5 = peg$parseName();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseeolWhiteSpace();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c140(s2, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseExtendsList() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;

      s0 = peg$currPos;
      s1 = peg$parsewhiteSpace();
      if (s1 !== peg$FAILED) {
        if (input.substr(peg$currPos, 7) === peg$c141) {
          s2 = peg$c141;
          peg$currPos += 7;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c142); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsewhiteSpace();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseupperIdent();
            if (s4 !== peg$FAILED) {
              s5 = [];
              s6 = peg$currPos;
              s7 = peg$parsewhiteSpace();
              if (s7 === peg$FAILED) {
                s7 = null;
              }
              if (s7 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 44) {
                  s8 = peg$c28;
                  peg$currPos++;
                } else {
                  s8 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c29); }
                }
                if (s8 !== peg$FAILED) {
                  s9 = peg$parsewhiteSpace();
                  if (s9 !== peg$FAILED) {
                    s10 = peg$parseupperIdent();
                    if (s10 !== peg$FAILED) {
                      s7 = [s7, s8, s9, s10];
                      s6 = s7;
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
              } else {
                peg$currPos = s6;
                s6 = peg$FAILED;
              }
              while (s6 !== peg$FAILED) {
                s5.push(s6);
                s6 = peg$currPos;
                s7 = peg$parsewhiteSpace();
                if (s7 === peg$FAILED) {
                  s7 = null;
                }
                if (s7 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 44) {
                    s8 = peg$c28;
                    peg$currPos++;
                  } else {
                    s8 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c29); }
                  }
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parsewhiteSpace();
                    if (s9 !== peg$FAILED) {
                      s10 = peg$parseupperIdent();
                      if (s10 !== peg$FAILED) {
                        s7 = [s7, s8, s9, s10];
                        s6 = s7;
                      } else {
                        peg$currPos = s6;
                        s6 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
              }
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c143(s4, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseSchema() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c144) {
        s1 = peg$c144;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c145); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseTopLevelIdent();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseExtendsList();
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parseeolWhiteSpace();
              if (s5 !== peg$FAILED) {
                s6 = peg$currPos;
                s7 = peg$parseIndent();
                if (s7 !== peg$FAILED) {
                  s8 = [];
                  s9 = peg$currPos;
                  s10 = peg$parseSameIndent();
                  if (s10 !== peg$FAILED) {
                    s11 = peg$parseSchemaSection();
                    if (s11 !== peg$FAILED) {
                      s10 = [s10, s11];
                      s9 = s10;
                    } else {
                      peg$currPos = s9;
                      s9 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s9;
                    s9 = peg$FAILED;
                  }
                  while (s9 !== peg$FAILED) {
                    s8.push(s9);
                    s9 = peg$currPos;
                    s10 = peg$parseSameIndent();
                    if (s10 !== peg$FAILED) {
                      s11 = peg$parseSchemaSection();
                      if (s11 !== peg$FAILED) {
                        s10 = [s10, s11];
                        s9 = s10;
                      } else {
                        peg$currPos = s9;
                        s9 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s9;
                      s9 = peg$FAILED;
                    }
                  }
                  if (s8 !== peg$FAILED) {
                    s7 = [s7, s8];
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                if (s6 === peg$FAILED) {
                  s6 = null;
                }
                if (s6 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c146(s3, s4, s6);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseSchemaSection() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 9) === peg$c147) {
        s1 = peg$c147;
        peg$currPos += 9;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c148); }
      }
      if (s1 === peg$FAILED) {
        if (input.substr(peg$currPos, 8) === peg$c149) {
          s1 = peg$c149;
          peg$currPos += 8;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c150); }
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseeolWhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          s4 = peg$parseIndent();
          if (s4 !== peg$FAILED) {
            s5 = [];
            s6 = peg$currPos;
            s7 = peg$parseSameIndent();
            if (s7 !== peg$FAILED) {
              s8 = peg$parseSchemaField();
              if (s8 !== peg$FAILED) {
                s9 = peg$parseeolWhiteSpace();
                if (s9 !== peg$FAILED) {
                  s7 = [s7, s8, s9];
                  s6 = s7;
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
              } else {
                peg$currPos = s6;
                s6 = peg$FAILED;
              }
            } else {
              peg$currPos = s6;
              s6 = peg$FAILED;
            }
            if (s6 !== peg$FAILED) {
              while (s6 !== peg$FAILED) {
                s5.push(s6);
                s6 = peg$currPos;
                s7 = peg$parseSameIndent();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parseSchemaField();
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parseeolWhiteSpace();
                    if (s9 !== peg$FAILED) {
                      s7 = [s7, s8, s9];
                      s6 = s7;
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
              }
            } else {
              s5 = peg$FAILED;
            }
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c151(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseSchemaField() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parseSchemaType();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parselowerIdent();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c152(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseSchemaType() {
      var s0;

      if (input.substr(peg$currPos, 4) === peg$c153) {
        s0 = peg$c153;
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c154); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 3) === peg$c155) {
          s0 = peg$c155;
          peg$currPos += 3;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c156); }
        }
        if (s0 === peg$FAILED) {
          s0 = peg$parseSchemaUnionType();
        }
      }

      return s0;
    }

    function peg$parseSchemaUnionType() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 40) {
        s1 = peg$c23;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c24); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseSchemaType();
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$currPos;
            s6 = peg$parsewhiteSpace();
            if (s6 !== peg$FAILED) {
              if (input.substr(peg$currPos, 2) === peg$c157) {
                s7 = peg$c157;
                peg$currPos += 2;
              } else {
                s7 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c158); }
              }
              if (s7 !== peg$FAILED) {
                s8 = peg$parsewhiteSpace();
                if (s8 !== peg$FAILED) {
                  s9 = peg$parseSchemaType();
                  if (s9 !== peg$FAILED) {
                    s6 = [s6, s7, s8, s9];
                    s5 = s6;
                  } else {
                    peg$currPos = s5;
                    s5 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$currPos;
              s6 = peg$parsewhiteSpace();
              if (s6 !== peg$FAILED) {
                if (input.substr(peg$currPos, 2) === peg$c157) {
                  s7 = peg$c157;
                  peg$currPos += 2;
                } else {
                  s7 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c158); }
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$parsewhiteSpace();
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parseSchemaType();
                    if (s9 !== peg$FAILED) {
                      s6 = [s6, s7, s8, s9];
                      s5 = s6;
                    } else {
                      peg$currPos = s5;
                      s5 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s5;
                    s5 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsewhiteSpace();
              if (s5 === peg$FAILED) {
                s5 = null;
              }
              if (s5 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 41) {
                  s6 = peg$c25;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c26); }
                }
                if (s6 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c159(s3, s4);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseVersion() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 64) {
        s1 = peg$c160;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c161); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c162.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c163); }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c162.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c163); }
            }
          }
        } else {
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c164(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseIndent() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      peg$silentFails++;
      s1 = peg$currPos;
      s2 = [];
      if (input.charCodeAt(peg$currPos) === 32) {
        s3 = peg$c165;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c166); }
      }
      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (input.charCodeAt(peg$currPos) === 32) {
            s3 = peg$c165;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c166); }
          }
        }
      } else {
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = peg$currPos;
        s3 = peg$c167(s2);
        if (s3) {
          s3 = void 0;
        } else {
          s3 = peg$FAILED;
        }
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      peg$silentFails--;
      if (s1 !== peg$FAILED) {
        peg$currPos = s0;
        s0 = void 0;
      } else {
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseSameIndent() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$currPos;
      peg$silentFails++;
      s2 = peg$currPos;
      s3 = [];
      if (input.charCodeAt(peg$currPos) === 32) {
        s4 = peg$c165;
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c166); }
      }
      while (s4 !== peg$FAILED) {
        s3.push(s4);
        if (input.charCodeAt(peg$currPos) === 32) {
          s4 = peg$c165;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c166); }
        }
      }
      if (s3 !== peg$FAILED) {
        peg$savedPos = peg$currPos;
        s4 = peg$c168(s3);
        if (s4) {
          s4 = void 0;
        } else {
          s4 = peg$FAILED;
        }
        if (s4 !== peg$FAILED) {
          s3 = [s3, s4];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      peg$silentFails--;
      if (s2 !== peg$FAILED) {
        peg$currPos = s1;
        s1 = void 0;
      } else {
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (input.charCodeAt(peg$currPos) === 32) {
          s3 = peg$c165;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c166); }
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (input.charCodeAt(peg$currPos) === 32) {
            s3 = peg$c165;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c166); }
          }
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseSameOrMoreIndent() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$currPos;
      peg$silentFails++;
      s2 = peg$currPos;
      s3 = [];
      if (input.charCodeAt(peg$currPos) === 32) {
        s4 = peg$c165;
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c166); }
      }
      while (s4 !== peg$FAILED) {
        s3.push(s4);
        if (input.charCodeAt(peg$currPos) === 32) {
          s4 = peg$c165;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c166); }
        }
      }
      if (s3 !== peg$FAILED) {
        peg$savedPos = peg$currPos;
        s4 = peg$c169(s3);
        if (s4) {
          s4 = void 0;
        } else {
          s4 = peg$FAILED;
        }
        if (s4 !== peg$FAILED) {
          s3 = [s3, s4];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      peg$silentFails--;
      if (s2 !== peg$FAILED) {
        peg$currPos = s1;
        s1 = void 0;
      } else {
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (input.charCodeAt(peg$currPos) === 32) {
          s3 = peg$c165;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c166); }
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (input.charCodeAt(peg$currPos) === 32) {
            s3 = peg$c165;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c166); }
          }
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseTopLevelIdent() {
      var s0, s1;

      s0 = peg$parseupperIdent();
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parselowerIdent();
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c170();
        }
        s0 = s1;
      }

      return s0;
    }

    function peg$parsebackquotedString() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 96) {
        s1 = peg$c171;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c172); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c173.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c174); }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c173.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c174); }
            }
          }
        } else {
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 96) {
            s3 = peg$c171;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c172); }
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c175(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseid() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 39) {
        s1 = peg$c176;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c177); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c178.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c179); }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c178.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c179); }
            }
          }
        } else {
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 39) {
            s3 = peg$c176;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c177); }
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c180(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseupperIdent() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (peg$c181.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c182); }
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        if (peg$c183.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c184); }
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (peg$c183.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c184); }
          }
        }
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c185(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parselowerIdent() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (peg$c186.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c187); }
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        if (peg$c183.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c184); }
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (peg$c183.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c184); }
          }
        }
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c185(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsewhiteSpace() {
      var s0, s1;

      s0 = [];
      if (input.charCodeAt(peg$currPos) === 32) {
        s1 = peg$c165;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c166); }
      }
      if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s0.push(s1);
          if (input.charCodeAt(peg$currPos) === 32) {
            s1 = peg$c165;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c166); }
          }
        }
      } else {
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseeolWhiteSpace() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c188.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c189); }
      }
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (peg$c188.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c189); }
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        if (input.length > peg$currPos) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c190); }
        }
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = void 0;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = [];
        if (peg$c188.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c189); }
        }
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c188.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c189); }
          }
        }
        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 35) {
            s2 = peg$c121;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c122); }
          }
          if (s2 !== peg$FAILED) {
            s3 = [];
            if (peg$c191.test(input.charAt(peg$currPos))) {
              s4 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c192); }
            }
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              if (peg$c191.test(input.charAt(peg$currPos))) {
                s4 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c192); }
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parseeolWhiteSpace();
              if (s4 !== peg$FAILED) {
                s1 = [s1, s2, s3, s4];
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = [];
          if (peg$c188.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c189); }
          }
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (peg$c188.test(input.charAt(peg$currPos))) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c189); }
            }
          }
          if (s1 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 13) {
              s2 = peg$c193;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c194); }
            }
            if (s2 === peg$FAILED) {
              s2 = null;
            }
            if (s2 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 10) {
                s3 = peg$c195;
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c196); }
              }
              if (s3 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 13) {
                  s4 = peg$c193;
                  peg$currPos++;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c194); }
                }
                if (s4 === peg$FAILED) {
                  s4 = null;
                }
                if (s4 !== peg$FAILED) {
                  s5 = peg$parseeolWhiteSpace();
                  if (s5 === peg$FAILED) {
                    s5 = null;
                  }
                  if (s5 !== peg$FAILED) {
                    s1 = [s1, s2, s3, s4, s5];
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        }
      }

      return s0;
    }


      var indent = '';
      var indents = [];
      function extractIndented(items) {
        return items[1].map(item => item[1]);
      }
      function optional(result, extract, defaultValue) {
        if (result != null) {
          let value = extract(result);
          if (value != null) {
            return value;
          }
        }
        return defaultValue == null ? null : defaultValue;
      }
      function checkNormal(result) {
        if (['string', 'number', 'boolean'].includes(typeof result) || result === null) {
          return;
        }
        if (Array.isArray(result)) {
          for (let item of result) {
            checkNormal(item);
          }
          return;
        }
        if (!result.location) {
          throw new Error(`no 'location' in ${JSON.stringify(result)}`);
        }
        if (!result.kind) {
          throw new Error(`no 'kind' in ${JSON.stringify(result)}`);
        }
        for (let key of Object.keys(result)) {
          if (['location', 'kind'].includes(key)) {
            continue;
          }
          checkNormal(result[key]);
        }
      }


    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(
        null,
        peg$maxFailExpected,
        peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
        peg$maxFailPos < input.length
          ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
          : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
      );
    }
  }

  return {
    SyntaxError: peg$SyntaxError,
    parse:       peg$parse
  };
})();

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DomContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SetDomContext; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__browser_lib_xen_template_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__browser_lib_x_list_js__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__browser_lib_model_select_js__ = __webpack_require__(40);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */





// TODO(sjmiles): should be elsewhere
// TODO(sjmiles): using Node syntax to import custom-elements in strictly-browser context
// TOOD(dstockwell): why was this only in browser context?



class DomContext {
  constructor(context, containerKind) {
    this._context = context;
    this._containerKind = containerKind;
    // TODO(sjmiles): _liveDom needs new name
    this._liveDom = null;
    this._innerContextBySlotName = {};
  }
  initContext(context) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(context);
    if (!this._context) {
      this._context = document.createElement(this._containerKind || 'div');
      context.appendChild(this._context);
    } else {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(this._context.parentNode == context,
             'TODO: add support for moving slot to different context');
    }
  }
  isEqual(context) {
    return this._context.parentNode == context;
  }
  updateModel(model) {
    if (this._liveDom) {
      this._liveDom.set(model);
    }
  }
  clear() {
    if (this._liveDom) {
      this._liveDom.root.textContent = "";
    }
    this._liveDom = null;
    this._innerContextBySlotName = {};

  }
  stampTemplate(template, eventHandler) {
    if (!this._liveDom) {
      // TODO(sjmiles): hack to allow subtree elements (e.g. x-list) to marshal events
      this._context._eventMapper = this._eventMapper.bind(this, eventHandler);
      this._liveDom = __WEBPACK_IMPORTED_MODULE_1__browser_lib_xen_template_js__["a" /* default */]
          .stamp(template)
          .events(this._context._eventMapper)
          .appendTo(this._context);
    }
  }
  observe(observer) {
    observer.observe(this._context, {childList: true, subtree: true});
  }
  getInnerContext(innerSlotName) {
    return this._innerContextBySlotName[innerSlotName];
  }
  isDirectInnerSlot(slot) {
    let parentNode = slot.parentNode;
    while (parentNode) {
      if (parentNode == this._context) {
        return true;
      }
      if (parentNode.getAttribute("slotid")) {
        // this is an inner slot of an inner slot.
        return false;
      }
      parentNode = parentNode.parentNode;
    }
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(false);
  }
  initInnerContexts(slotSpec) {
    this._innerContextBySlotName = {};
    Array.from(this._context.querySelectorAll("[slotid]")).forEach(s => {
      if (!this.isDirectInnerSlot(s)) {
        // Skip inner slots of an inner slot of the given slot.
        return;
      }
      let slotId = s.getAttribute('slotid');
      let providedSlotSpec = slotSpec.providedSlots.find(ps => ps.name == slotId);
      if (providedSlotSpec) {  // Skip non-declared slots
        let subId = s.getAttribute('subid');
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!subId || providedSlotSpec.isSet,
            `Slot provided in ${slotSpec.name} sub-id ${subId} doesn't match set spec: ${providedSlotSpec.isSet}`);
        if (providedSlotSpec.isSet) {
          if (!this._innerContextBySlotName[slotId]) {
            this._innerContextBySlotName[slotId] = {};
          }
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!this._innerContextBySlotName[slotId][subId],
                 `Slot ${slotSpec.name} cannot provide multiple ${slotId}:${subId} inner slots`);
          this._innerContextBySlotName[slotId][subId] = s;
        } else {
          this._innerContextBySlotName[slotId] = s;
        }
      } else {
        console.warn(`Slot ${slotSpec.name} has unexpected inner slot ${slotId}`);
      }
    });
  }
  findRootSlots() {
    let innerSlotById = {};
    Array.from(this._context.querySelectorAll("[slotid]")).forEach(s => {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(this.isDirectInnerSlot(s), 'Unexpected inner slot');
      let slotId = s.getAttribute('slotid');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!innerSlotById[slotId], `Duplicate root slot ${slotId}`);
      innerSlotById[slotId] = s;
    });
    return innerSlotById;
  }
  _eventMapper(eventHandler, node, eventName, handlerName) {
    node.addEventListener(eventName, event => {
      // TODO(sjmiles): we have an extremely minimalist approach to events here, this is useful IMO for
      // finding the smallest set of features that we are going to need.
      // First problem: click event firing multiple times as it bubbles up the tree, minimalist solution
      // is to enforce a 'first listener' rule by executing `stopPropagation`.
      event.stopPropagation();
      eventHandler({
        handler: handlerName,
        data: {
          key: node.key,
          value: node.value
        }
      });
    });
  }
}

class SetDomContext {
  constructor(containerKind) {
    this._contextBySubId = {};
    this._containerKind = containerKind;
  }
  initContext(context) {
    Object.keys(context).forEach(subId => {
      if (!this._contextBySubId[subId] || !this._contextBySubId[subId].isEqual(context[subId])) {
        this._contextBySubId[subId] = new DomContext(null, this._containerKind);
      }
      this._contextBySubId[subId].initContext(context[subId]);
    });
    // Delete sub-contexts that are not found in the new context.
    Object.keys(this._contextBySubId).forEach(subId => {
      if (!context[subId]) {
        delete this._contextBySubId[subId];
      }
    });
  }
  isEqual(context) {
    return Object.keys(this._contextBySubId).length == Object.keys(context).length &&
           !Object.keys(this._contextBySubId).find(c => this._contextBySubId[c] != context[c]);
  }
  updateModel(model) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(model.items, `Model must contain items`);
    model.items.forEach(item => {
      Object.keys(model).forEach(key => {
        if (key != 'items') {
          item[key] = model[key];
        }
      });
      if (this._contextBySubId[item.subId]) {
        this._contextBySubId[item.subId].updateModel(item);
      }
    });
  }
  clear() {
    Object.values(this._contextBySubId).forEach(context => context.clear());
  }
  stampTemplate(template, eventHandler, eventMapper) {
    Object.values(this._contextBySubId).forEach(context => context.stampTemplate(template, eventHandler, eventMapper));
  }
  observe(observer) {
    Object.values(this._contextBySubId).forEach(context => context.observe(observer));
  }
  getInnerContext(innerSlotName) {
    var innerContexts = {};
    Object.keys(this._contextBySubId).forEach(subId => {
      innerContexts[subId] = this._contextBySubId[subId].getInnerContext(innerSlotName);
    });
    return innerContexts;
  }
  initInnerContexts(slotSpec) {
    Object.values(this._contextBySubId).forEach(context => context.initInnerContexts(slotSpec));
  }
}




/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__slot_js__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dom_context_js__ = __webpack_require__(44);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */






let templates = new Map();

class DomSlot extends __WEBPACK_IMPORTED_MODULE_1__slot_js__["a" /* default */] {
  constructor(consumeConn, arc, containerKind) {
    super(consumeConn, arc);
    this._templateName = `${this.consumeConn.particle.name}::${this.consumeConn.name}`;
    this._model = null;
    this._observer = this._initMutationObserver();
    this._containerKind = containerKind;
  }

  async setContext(context) {
    let wasNull = true;
    if (this.getContext()) {
      this.getContext().clear();
      wasNull = false;
    }

    if (context) {
      if (!this.getContext()) {
        this._context = this._createDomContext();
      }
      this.getContext().initContext(context);
      if (!wasNull) {
        await this._doRender();
      }
    } else {
      this._context = null;
    }
  }
  _createDomContext() {
    if (this.consumeConn.slotSpec.isSet) {
      return new __WEBPACK_IMPORTED_MODULE_2__dom_context_js__["a" /* SetDomContext */](this._containerKind);
    }
    return new __WEBPACK_IMPORTED_MODULE_2__dom_context_js__["b" /* DomContext */](null, this._containerKind);
  }
  _initMutationObserver() {
    return new MutationObserver(async () => {
      this._observer.disconnect();

      if (this.getContext()) {
        // Update inner slots.
        this.getContext().initInnerContexts(this.consumeConn.slotSpec);
        await this.innerSlotsUpdateCallback(this);

        // Reactivate the observer.
        this.getContext().observe(this._observer);
      }
    });
  }
  _createTemplateElement(template) {
    return Object.assign(document.createElement('template'), { innerHTML: template});
  }
  isSameContext(context) {
    return this.getContext().isEqual(context);
  }

  getTemplate() {
    return templates.get(this._templateName);
  }

  // TODO(sjmiles): triggered when innerPEC sends Render message to outerPEC,
  // (usually by request of DomParticle::render())
  // `handler` is generated by caller (slot-composer::renderSlot())
  async setContent(content, handler) {
    if (!content || Object.keys(content).length == 0) {
      if (this.getContext()) {
        this.getContext().clear();
      }
      this._model = null;
      return;
    }
    if (!this.getContext()) {
      return;
    }
    if (content.template) {
      if (this.getTemplate()) {
        // Template is being replaced.
        this.getContext().clear();
      }
      templates.set(this._templateName, this._createTemplateElement(content.template));
    }
    this.eventHandler = handler;
    if (Object.keys(content).indexOf("model") >= 0) {
      this._model = content.model;
    }
    await this._doRender();
  }
  async _doRender() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(this.getContext());

    this.getContext().observe(this._observer);

    // Initialize template, if possible.
    if (this.getTemplate()) {
      this.getContext().stampTemplate(this.getTemplate(), this.eventHandler);
    }
    // else {
    // TODO: should trigger request to particle, if template missing?
    //}

    if (this._model) {
      let update = await this.populateViewDescriptions();
      this._model = Object.assign(this._model, update);
      this.getContext().updateModel(this._model);
    }
  }
  getInnerContext(slotName) {
    return this.getContext() && this.getContext().getInnerContext(slotName);
  }
  constructRenderRequest() {
    let request = ["model"];
    if (!this.getTemplate()) {
      request.push("template");
    }
    return request;
  }
  static findRootSlots(context) {
    return new __WEBPACK_IMPORTED_MODULE_2__dom_context_js__["b" /* DomContext */](context, this._containerKind).findRootSlots(context);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (DomSlot);


/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__inner_PEC_js__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__message_channel_js__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__loader_js__ = __webpack_require__(15);
// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt







// TODO: Make this generic so that it can also be used in-browser, or add a
// separate in-process browser pec-factory.
/* harmony default export */ __webpack_exports__["a"] = (function(id) {
  var channel = new __WEBPACK_IMPORTED_MODULE_1__message_channel_js__["a" /* default */]();
  new __WEBPACK_IMPORTED_MODULE_0__inner_PEC_js__["a" /* default */](channel.port1, `${id}:inner`, new __WEBPACK_IMPORTED_MODULE_2__loader_js__["a" /* default */]());
  return channel.port2;
});;


/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

/* harmony default export */ __webpack_exports__["a"] = (fetch);


/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__type_js__ = __webpack_require__(4);
// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt





// TODO: relation identifier should incorporate key/value identifiers
class Identifier {
  constructor(view, type, key) {
    this.view = type;
    this.type = type;
    this.key = key;
  }
  toLiteral() {
    return [this.view, this.type.toLiteral(), this.key];
  }
  static fromLiteral(data) {
    let [view, literalType, key] = data;
    return new Identifier(view, __WEBPACK_IMPORTED_MODULE_1__type_js__["a" /* default */].fromLiteral(literalType), key);
  }
}

/* unused harmony default export */ var _unused_webpack_default_export = (Identifier);


/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__type_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__handle_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_channel_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__particle_spec_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__schema_js__ = __webpack_require__(7);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */




// import {define} from './particle.js';





class StorageProxy {
  constructor(id, type, port, pec, name, version) {
    this._id = id;
    this._type = type;
    this._port = port;
    this._pec = pec;
    this.name = name;
    this._version = version;
    this.state = 'outOfDate';
  }

  get id() {
    return this._id;
  }

  get type() {
    return this._type;
  }

  generateIDComponents() {
    return this._pec.generateIDComponents();
  }

  on(type, callback, target) {
    var dataFreeCallback = (d) => callback();
    this.synchronize(type, dataFreeCallback, dataFreeCallback, target);
  }

  synchronize(type, modelCallback, callback, target) {
    this._port.Synchronize({handle: this, modelCallback, callback, target, type});
  }

  get() {
    return new Promise((resolve, reject) =>
      this._port.HandleGet({ callback: r => {resolve(r)}, handle: this }));
  }

  toList() {
    return new Promise((resolve, reject) =>
      this._port.HandleToList({ callback: r => resolve(r), handle: this }));
  }

  set(entity) {
    this._port.HandleSet({data: entity, handle: this});
  }

  store(entity) {
    this._port.HandleStore({data: entity, handle: this});
  }

  remove(entityId) {
    this._port.HandleRemove({data: entityId, handle: this});
  }

  clear() {
    this._port.HandleClear({handle: this});
  }
}

class InnerPEC {
  constructor(port, idBase, loader) {
    this._apiPort = new __WEBPACK_IMPORTED_MODULE_3__api_channel_js__["b" /* PECInnerPort */](port);
    this._particles = [];
    this._idBase = idBase;
    this._nextLocalID = 0;
    this._loader = loader;
    this._pendingLoads = [];

    /*
     * This code ensures that the relevant types are known
     * in the scope object, because otherwise we can't do
     * particleSpec resolution, which is currently a necessary
     * part of particle construction.
     *
     * Possibly we should eventually consider having particle
     * specifications separated from particle classes - and
     * only keeping type information on the arc side.
     */
    this._apiPort.onDefineHandle = ({type, identifier, name, version}) => {
      return new StorageProxy(identifier, type, this._apiPort, this, name, version);
    };

    this._apiPort.onCreateHandleCallback = ({type, id, name, callback}) => {
      var proxy = new StorageProxy(id, type, this._apiPort, this, name, 0);
      Promise.resolve().then(() => callback(proxy));
      return proxy;
    }

    this._apiPort.onCreateSlotCallback = ({hostedSlotId, callback}) => {
      Promise.resolve().then(() => callback(hostedSlotId));
      return hostedSlotId;
    }

    this._apiPort.onInnerArcRender = ({transformationParticle, transformationSlotName, hostedSlotId, content}) => {
      transformationParticle.renderHostedSlot(transformationSlotName, hostedSlotId, content);
    }

    this._apiPort.onDefineParticle = ({particleDefinition, particleFunction}) => {
      var particle = define(particleDefinition, eval(particleFunction));
      this._loader.registerParticle(particle);
    };

    this._apiPort.onStop = () => {
      if (global.close) {
        global.close();
      }
    }

    this._apiPort.onInstantiateParticle =
      ({spec, handles}) => this._instantiateParticle(spec, handles);

    this._apiPort.onSimpleCallback = ({callback, data}) => callback(data);

    this._apiPort.onConstructArcCallback = ({callback, arc}) => callback(arc);

    this._apiPort.onAwaitIdle = ({version}) =>
      this.idle.then(a => this._apiPort.Idle({version, relevance: this.relevance}));

    this._apiPort.onUIEvent = ({particle, slotName, event}) => particle.fireEvent(slotName, event);

    this._apiPort.onStartRender = ({particle, slotName, contentTypes}) => {
      /** @class Slot
       * A representation of a consumed slot. Retrieved from a particle using
       * particle.getSlot(name)
       */
      class Slotlet {
        constructor(pec, particle, slotName) {
          this._slotName = slotName;
          this._particle = particle;
          this._handlers = new Map();
          this._pec = pec;
          this._requestedContentTypes = new Set();
        }
        get particle() { return this._particle; }
        get slotName() { return this._slotName; }
        get isRendered() { return this._isRendered; }
        /** @method render(content)
         * renders content to the slot.
         */
        render(content) {
          this._pec._apiPort.Render({particle, slotName, content});

          Object.keys(content).forEach(key => { this._requestedContentTypes.delete(key) });
          // Slot is considered rendered, if a non-empty content was sent and all requested content types were fullfilled.
          this._isRendered = this._requestedContentTypes.size == 0 && (Object.keys(content).length > 0);
        }
        /** @method registerEventHandler(name, f)
         * registers a callback to be invoked when 'name' event happens.
         */
        registerEventHandler(name, f) {
          if (!this._handlers.has(name)) {
            this._handlers.set(name, []);
          }
          this._handlers.get(name).push(f);
        }
        clearEventHandlers(name) {
          this._handlers.set(name, []);
        }
        fireEvent(event) {
          for (var handler of this._handlers.get(event.handler) || []) {
            handler(event);
          }
        }
      }

      particle._slotByName.set(slotName, new Slotlet(this, particle, slotName));
      particle.render(slotName, contentTypes);
    };

    this._apiPort.onStopRender = ({particle, slotName}) => {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__["a" /* default */])(particle._slotByName.has(slotName),
        `Stop render called for particle ${particle.name} slot ${slotName} without start render being called.`);
      particle._slotByName.delete(slotName);
    }
  }

  generateIDComponents() {
    return {base: this._idBase, component: () => this._nextLocalID++};
  }

  generateID() {
    return `${this._idBase}:${this._nextLocalID++}`;
  }

  innerArcHandle(arcId) {
    var pec = this;
    return {
      createHandle: function(type, name) {
        return new Promise((resolve, reject) =>
          pec._apiPort.ArcCreateHandle({arc: arcId, type, name, callback: proxy => {
            var v = __WEBPACK_IMPORTED_MODULE_1__handle_js__["a" /* default */].handleFor(proxy, proxy.type.isSetView, true, true);
            v.entityClass = (proxy.type.isSetView ? proxy.type.primitiveType().entitySchema : proxy.type.entitySchema).entityClass();
            resolve(v);
          }}));
      },
      createSlot: function(transformationParticle, transformationSlotName, hostedParticleName, hostedSlotName) {
        return new Promise((resolve, reject) =>
          pec._apiPort.ArcCreateSlot({arc: arcId, transformationParticle, transformationSlotName, hostedParticleName, hostedSlotName, callback: hostedSlotId => {
            resolve(hostedSlotId);
          }}));
      },
      loadRecipe: function(recipe) {
        // TODO: do we want to return a promise on completion?
        return new Promise((resolve, reject) =>
          pec._apiPort.ArcLoadRecipe({arc: arcId, recipe, callback: a => {
            if (a == undefined)
              resolve();
            else
              reject(a);
          }}));
      }
    };
  }

  defaultCapabilitySet() {
    return {
      constructInnerArc: particle => {
        return new Promise((resolve, reject) =>
          this._apiPort.ConstructInnerArc({ callback: arcId => {resolve(this.innerArcHandle(arcId))}, particle }));
      }
    }
  }

  async _instantiateParticle(spec, proxies) {
    let name = spec.name;
    var resolve = null;
    var p = new Promise((res, rej) => resolve = res);
    this._pendingLoads.push(p);
    let clazz = await this._loader.loadParticleClass(spec);
    let capabilities = this.defaultCapabilitySet();
    let particle = new clazz();  // TODO: how can i add an argument to DomParticle ctor?
    particle.capabilities = capabilities;
    this._particles.push(particle);

    var handleMap = new Map();
    proxies.forEach((value, key) => {
      handleMap.set(key, __WEBPACK_IMPORTED_MODULE_1__handle_js__["a" /* default */].handleFor(value, value.type.isSetView, spec.connectionMap.get(key).isInput, spec.connectionMap.get(key).isOutput));
    });

    for (let localHandle of handleMap.values()) {
      var type = localHandle.underlyingView().type;
      let schemaModel;
      if (type.isSetView && type.primitiveType().isEntity) {
        schemaModel = type.primitiveType().entitySchema;
      } else if (type.isEntity) {
        schemaModel = type.entitySchema;
      }

      if (schemaModel)
        localHandle.entityClass = schemaModel.entityClass();
    }

    return [particle, async () => {
      resolve();
      var idx = this._pendingLoads.indexOf(p);
      this._pendingLoads.splice(idx, 1);
      await particle.setViews(handleMap);
    }];
  }

  get relevance() {
    var rMap = new Map();
    this._particles.forEach(p => {
      if (p.relevances.length == 0)
        return;
      rMap.set(p, p.relevances);
      p.relevances = [];
    });
    return rMap;
  }

  get busy() {
    if (this._pendingLoads.length > 0)
      return true;
    for (let particle of this._particles) {
      if (particle.busy) {
        return true;
      }
    }
    return false;
  }

  get idle() {
    if (!this.busy) {
      return Promise.resolve();
    }
    return Promise.all(this._pendingLoads.concat(this._particles.map(particle => particle.idle))).then(() => this.idle);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (InnerPEC);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(37)))

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */


class MessagePort {
  constructor(channel, id, other) {
    this._channel = channel;
    this._id = id;
    this._other = other;
    this._onmessage = undefined;
  }

  postMessage(message) {
    this._channel._post(this._other, message);
  }

  set onmessage(f) {
    this._onmessage = f;
  }

  close() {
    this.postMessage = function(){};
  }
}

class MessageEvent {
  constructor(message) {
    this.data = message;
  }
}

class MessageChannel {
  constructor() {
    this.port1 = new MessagePort(this, 0, 1);
    this.port2 = new MessagePort(this, 1, 0);
    this._ports = [this.port1, this.port2];
  }

  async _post(id, message) {
    message = JSON.parse(JSON.stringify(message));
    if (this._ports[id]._onmessage) {
      try {
        // Yield so that we deliver the message asynchronously.
        await 0;
        await this._ports[id]._onmessage(new MessageEvent(message));
      } catch (e) {
        console.error("Exception in particle code\n", e);
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (MessageChannel);


/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__particle_execution_context_js__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_channel_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__manifest_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__loader_js__ = __webpack_require__(15);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */







// TODO: fix


class OuterPEC extends __WEBPACK_IMPORTED_MODULE_0__particle_execution_context_js__["a" /* default */] {
  constructor(port, slotComposer, arc) {
    super();
    this._particles = [];
    this._apiPort = new __WEBPACK_IMPORTED_MODULE_2__api_channel_js__["a" /* PECOuterPort */](port);
    this._arc = arc;
    this._nextIdentifier = 0;
    this.slotComposer = slotComposer;

    this._apiPort.onRender = ({particle, slotName, content}) => {
      if (this.slotComposer) {
        this.slotComposer.renderSlot(particle, slotName, content);
      }
    }

    this._apiPort.onSynchronize = async ({handle, target, callback, modelCallback, type}) => {
      if (handle.constructor.name == 'InMemoryVariable') {
        var model = await handle.get();
      } else {
        var model = await handle.toList();
      }
      this._apiPort.SimpleCallback({callback: modelCallback, data: model}, target);
      handle.on(type, data => this._apiPort.SimpleCallback({callback, data}), target);
    };

    this._apiPort.onHandleGet = async ({handle, callback}) => {
      this._apiPort.SimpleCallback({callback, data: await handle.get()});
    }

    this._apiPort.onHandleToList = async ({handle, callback}) => {
      this._apiPort.SimpleCallback({callback, data: await handle.toList()});
    }

    this._apiPort.onHandleSet = ({handle, data}) => {handle.set(data)};
    this._apiPort.onHandleStore = ({handle, data}) => handle.store(data);
    this._apiPort.onHandleClear = ({handle}) => handle.clear();
    this._apiPort.onHandleRemove = ({handle, data}) => handle.remove(data);

    this._apiPort.onIdle = ({version, relevance}) => {
      if (version == this._idleVersion) {
        this._idlePromise = undefined;
        this._idleResolve(relevance);
      }
    }

    this._apiPort.onConstructInnerArc = ({callback, particle}) => {
      var arc = {};
      this._apiPort.ConstructArcCallback({callback, arc});
    }

    this._apiPort.onArcCreateHandle = ({callback, arc, type, name}) => {
      var view = this._arc.createView(type, name);
      this._apiPort.CreateHandleCallback(view, {type, name, callback, id: view.id});
    }

    this._apiPort.onArcCreateSlot = ({callback, arc, transformationParticle, transformationSlotName, hostedParticleName,  hostedSlotName}) => {
      if (this.slotComposer) {
        var hostedSlotId = this.slotComposer.createHostedSlot(transformationParticle, transformationSlotName, hostedParticleName, hostedSlotName);
      }
      this._apiPort.CreateSlotCallback({}, {callback, hostedSlotId});
    }

    this._apiPort.onArcLoadRecipe = async ({arc, recipe, callback}) => {
      let manifest = await __WEBPACK_IMPORTED_MODULE_3__manifest_js__["a" /* default */].parse(recipe, {loader: this._arc._loader, fileName: ''});
      let error = undefined;
      var recipe = manifest.recipes[0];
      if (recipe) {
        for (var view of recipe.views) {
          view.mapToView(this._arc.findViewById(view.id));
        }
        if (recipe.normalize()) {
          if (recipe.isResolved()) {
            this._arc.instantiate(recipe);
          } else {
            error = `Recipe is not resolvable ${recipe.toString({showUnresolved: true})}`;
          }
        } else {
          error = "Recipe could not be normalized";
        }
      } else {
        error = "No recipe defined";
      }
      this._apiPort.SimpleCallback({callback, data: error})
    }
  }

  stop() {
    this._apiPort.Stop();
  }

  get idle() {
    if (this._idlePromise == undefined) {
      this._idlePromise = new Promise((resolve, reject) => {
        this._idleResolve = resolve;
      });
    }
    this._idleVersion = this._nextIdentifier;
    this._apiPort.AwaitIdle({version: this._nextIdentifier++});
    return this._idlePromise;
  }

  get messageCount() {
    return this._apiPort.messageCount;
  }

  sendEvent(particle, slotName, event) {
    this._apiPort.UIEvent({particle, slotName, event})
  }

  instantiate(particleSpec, spec, views, lastSeenVersion) {
    views.forEach(view => {
      var version = lastSeenVersion.get(view.id) || 0;
      this._apiPort.DefineHandle(view, { type: view.type, name: view.name,
                                       version });
    });

    // TODO: Can we just always define the particle and map a handle for use in later
    //       calls to InstantiateParticle?
    if (spec._model._isInline) {
      this._apiPort.DefineParticle({
        particleDefinition: spec._model._inlineDefinition,
        particleFunction: spec._model._inlineUpdateFunction
      });
    }

    // TODO: rename this concept to something like instantiatedParticle, handle or registration.
    this._apiPort.InstantiateParticle(particleSpec, {spec, handles: views});
    return particleSpec;
  }
  startRender({particle, slotName, contentTypes}) {
    this._apiPort.StartRender({particle, slotName, contentTypes});
  }
  stopRender({particle, slotName}) {
    this._apiPort.StopRender({particle, slotName});
  }
  innerArcRender(transformationParticle, transformationSlotName, hostedSlotId, content) {
    this._apiPort.InnerArcRender({transformationParticle, transformationSlotName, hostedSlotId, content})
  }
}

/* harmony default export */ __webpack_exports__["a"] = (OuterPEC);


/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt


class ParticleExecutionContext {
  constructor() {
  }

  // Instantiates `particle` in this context, connecting `views` to the particle's inputs and outputs.
  // `mutateCallback` will be called each time the particle mutates a view or entity.
  // Returns an identifier to refer to the particle (in `dispatch`).
  instantiate(particle, views, mutateCallback) {
    // views => {name => viewId}
    throw 'unimplemented';
  }

  // Dispatches an event to the particle identified by `particleId` for the view or entity identified
  // by `entityId` concerning `eventDetails. The `morePending` flag indicates whether there are any
  // known further events to be dispatched to the same particle.
  dispatch(particleId, entityId, eventDetails, morePending) {
    throw 'unimplemented';
  }

  // Returns a promise which resolves when the PEC becomes idle (no known input processing).
  get idle() {
    throw 'unimplemented';
  }

  // Returns a promise which resolves to a map from particle identifier to a list of the relevance
  // entries generated by that particle.
  get relevance() {
    throw 'unimplemented';
  }
}

/* harmony default export */ __webpack_exports__["a"] = (ParticleExecutionContext);


/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_js__ = __webpack_require__(5);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt



class ConnectionConstraint {
  constructor(from, fromConnection, to, toConnection) {
    this.fromParticle = from;
    this.fromConnection = fromConnection;
    this.toParticle = to;
    this.toConnection = toConnection;
    Object.freeze(this);
  }

  _copyInto(recipe) {
    return recipe.newConnectionConstraint(this.fromParticle, this.fromConnection, this.toParticle, this.toConnection);
  }

  _compareTo(other) {
    let cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_0__util_js__["a" /* default */].compareStrings(this.fromParticle.name, other.fromParticle.name)) != 0) return cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_0__util_js__["a" /* default */].compareStrings(this.fromConnection, other.fromConnection)) != 0) return cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_0__util_js__["a" /* default */].compareStrings(this.toParticle.name, other.toParticle.name)) != 0) return cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_0__util_js__["a" /* default */].compareStrings(this.toConnection, other.toConnection)) != 0) return cmp;
    return 0;
  }

  toString() {
    return `${this.fromParticle.name}.${this.fromConnection} -> ${this.toParticle.name}.${this.toConnection}`;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (ConnectionConstraint);


/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

/* harmony default export */ __webpack_exports__["a"] = (async function(str) {
  let buffer = new TextEncoder('utf-8').encode(str);
  let digest = await crypto.subtle.digest('SHA-1', buffer)
  return Array.from(new Uint8Array(digest)).map(x => ('00' + x.toString(16)).slice(-2)).join('');
});;


/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__slot_connection_js__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__view_connection_js__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_js__ = __webpack_require__(5);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt






class Particle {
  constructor(recipe, name) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(recipe);
    this._recipe = recipe;
    this._id = undefined;
    this._name = name;
    this._localName = undefined;
    this._spec = undefined;
    this._tags = [];
    this._verbs = [];

    this._connections = {};
    // TODO: replace with constraint connections on the recipe
    this._unnamedConnections = [];
    this._consumedSlotConnections = {};  // map of consumed Slot connections by slot name.
  }

  _copyInto(recipe, cloneMap) {
    var particle = recipe.newParticle(this._name);
    particle._id  = this._id;
    particle._tags = [...this._tags];
    particle._verbs = [...this._verbs];
    particle._spec = this._spec;

    Object.keys(this._connections).forEach(key => {
      particle._connections[key] = this._connections[key]._clone(particle, cloneMap);
    });
    particle._unnamedConnections = this._unnamedConnections.map(connection => connection._clone(particle, cloneMap));
    Object.keys(this._consumedSlotConnections).forEach(key => {
      particle._consumedSlotConnections[key] = this._consumedSlotConnections[key]._clone(particle, cloneMap);
    });

    return particle;
  }

  _startNormalize() {
    this._localName = null;
    this._tags.sort();
    this._verbs.sort();
    let normalizedConnections = {};
    for (let key of (Object.keys(this._connections).sort())) {
      normalizedConnections[key] = this._connections[key];
    }
    this._connections = normalizedConnections;

    let normalizedSlotConnections = {};
    for (let key of (Object.keys(this._consumedSlotConnections).sort())) {
      normalizedSlotConnections[key] = this._consumedSlotConnections[key];
    }
    this._consumedSlotConnections = normalizedSlotConnections;
  }

  _finishNormalize() {
    this._unnamedConnections.sort(__WEBPACK_IMPORTED_MODULE_3__util_js__["a" /* default */].compareComparables);
    Object.freeze(this);
  }

  _compareTo(other) {
    let cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_3__util_js__["a" /* default */].compareStrings(this._id, other._id)) != 0) return cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_3__util_js__["a" /* default */].compareStrings(this._name, other._name)) != 0) return cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_3__util_js__["a" /* default */].compareStrings(this._localName, other._localName)) != 0) return cmp;
    // TODO: spec?
    if ((cmp = __WEBPACK_IMPORTED_MODULE_3__util_js__["a" /* default */].compareArrays(this._tags, other._tags, __WEBPACK_IMPORTED_MODULE_3__util_js__["a" /* default */].compareStrings)) != 0) return cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_3__util_js__["a" /* default */].compareArrays(this._verbs, other._verbs, __WEBPACK_IMPORTED_MODULE_3__util_js__["a" /* default */].compareStrings)) != 0) return cmp;
    // TODO: slots
    return 0;
  }

  _isValid() {
    if (!this.spec) {
      return true;
    }
    if (!this.name && !this.primaryVerb) {
      // Must have either name of a verb
      return false;
    }
    // TODO: What
    return true;
  }

  isResolved(options) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(Object.isFrozen(this));
    // TODO: slots
    if (this.consumedSlotConnections.length > 0) {
      let fulfilledSlotConnections = this.consumedSlotConnections.filter(connection => connection.targetSlot !== undefined);
      if (fulfilledSlotConnections.length == 0) {
        if (options && options.showUnresolved) {
          options.details = 'unfullfilled slot connections';
        }
        return false;
      }
    }
    if (!this.spec) {
      if (options && options.showUnresolved) {
        options.details = 'missing spec';
      }
      return false;
    }
    if (this.spec.connectionMap.size != Object.keys(this._connections).length) {
      if (options && options.showUnresolved) {
        options.details = 'unresolved connections';
      }
      return false;
    }
    if (this.unnamedConnections.length != 0) {
      if (options && options.showUnresolved) {
        options.details = `${this.unnamedConnections.length} unnamed connections`;
      }
      return false;
    }
    return true;
  }

  get recipe() { return this._recipe; }
  get localName() { return this._localName; }
  set localName(name) { this._localName = name; }
  get id() { return this._id; } // Not resolved until we have an ID.
  get name() { return this._name; }
  set name(name) { this._name = name; }
  get spec() { return this._spec; }
  get tags() { return this._tags; }
  set tags(tags) { this._tags = tags; }
  get connections() { return this._connections; } // {parameter -> ViewConnection}
  get unnamedConnections() { return this._unnamedConnections; } // ViewConnection*
  get consumedSlotConnections() { return this._consumedSlotConnections; }
  get primaryVerb() { if (this._verbs.length > 0) return this._verbs[0]; }
  set verbs(verbs) { this._verbs = verbs; }

  set spec(spec) {
    this._spec = spec;
    for (var connectionName of spec.connectionMap.keys()) {
      var speccedConnection = spec.connectionMap.get(connectionName);
      var connection = this.connections[connectionName];
      if (connection == undefined) {
        connection = this.addConnectionName(connectionName);
      }
      // TODO: don't just overwrite here, check that the types
      // are compatible if one already exists.
      connection.type = speccedConnection.type;
      connection.direction = speccedConnection.direction;
    }
    spec.slots.forEach(slotSpec => {
      if (this._consumedSlotConnections[slotSpec.name] == undefined)
        var slotConn = this.addSlotConnection(slotSpec.name);
      this._consumedSlotConnections[slotSpec.name].slotSpec = slotSpec;
    });
  }

  addUnnamedConnection() {
    var connection = new __WEBPACK_IMPORTED_MODULE_2__view_connection_js__["a" /* default */](undefined, this);
    this._unnamedConnections.push(connection);
    return connection;
  }

  addConnectionName(name) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(this._connections[name] == undefined);
    this._connections[name] = new __WEBPACK_IMPORTED_MODULE_2__view_connection_js__["a" /* default */](name, this);
    return this._connections[name];
  }

  allConnections() {
    return Object.values(this._connections).concat(this._unnamedConnections);
  }

  ensureConnectionName(name) {
    return this._connections[name] || this.addConnectionName(name);
  }

  getConnectionByName(name) {
    return this._connections[name];
  }

  nameConnection(connection, name) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!this._connections[name].view, `Connection "${name}" already has a view`);

    var idx = this._unnamedConnections.indexOf(connection);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(idx >= 0, `Cannot name '${name}' nonexistent unnamed connection.`);
    connection._name = name;

    connection.type = this._connections[name].type;
    if (connection.direction != this._connections[name].direction) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(connection.direction == "inout",
             `Unnamed connection cannot adjust direction ${connection.direction} to ${name}'s direction ${this._connections[name].direction}`);
      connection.direction = this._connections[name].direction;
    }

    this._connections[name] = connection;
    this._unnamedConnections.splice(idx, 1);
  }

  addSlotConnection(name) {
    let slotConn = new __WEBPACK_IMPORTED_MODULE_1__slot_connection_js__["a" /* default */](name, this);
    this._consumedSlotConnections[name] = slotConn;
    return slotConn;
  }

  toString(nameMap, options) {
    let result = [];
    // TODO: we need at least name or tags
    if (this.name) {
      result.push(this.name);
      result.push(...this.tags);

      result.push(`as ${(nameMap && nameMap.get(this)) || this.localName}`);
      if (this.primaryVerb && this.primaryVerb != this.name) {
        result.push(`# verb=${this.primaryVerb}`);
      }
    } else {  // verb must exist, if there is no name.
      result.push(`particle can ${this.primaryVerb}`);
    }
    if (options && options.showUnresolved) {
      if (!this.isResolved(options)) {
        result.push(`# unresolved particle: ${options.details}`);
      }
    }

    result = [result.join(' ')];

    for (let connection of this.unnamedConnections) {
      result.push(connection.toString(nameMap, options).replace(/^|(\n)/g, '$1  '));
    }
    for (let connection of Object.values(this.connections)) {
      result.push(connection.toString(nameMap, options).replace(/^|(\n)/g, '$1  '));
    }
    for (let slotConnection of Object.values(this._consumedSlotConnections)) {
      result.push(slotConnection.toString(nameMap, options).replace(/^|(\n)/g, '$1  '));
    }
    return result.join('\n')
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Particle);


/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_js__ = __webpack_require__(5);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt




class SlotConnection {
  constructor(name, particle) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(particle);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(particle.recipe);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(name);

    this._recipe = particle.recipe;
    this._particle = particle;
    this._name = name;
    this._slotSpec = undefined;  // isRequired + formFactor
    this._targetSlot = undefined;  // Slot?
    this._providedSlots = {};      // Slot*
  }

  get recipe() { return this._recipe; }
  get particle() { return this._particle; }
  get name() { return this._name; }
  get slotSpec() { return this._slotSpec; }
  get targetSlot() { return this._targetSlot; }
  get providedSlots() { return this._providedSlots; }

  set slotSpec(slotSpec) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(this.name == slotSpec.name);
    this._slotSpec = slotSpec;
    slotSpec.providedSlots.forEach(providedSlot => {
      let slot = this.providedSlots[providedSlot.name];
      if (slot == undefined) {
        slot = this.recipe.newSlot(providedSlot.name);
        slot._sourceConnection = this;
        slot._name = providedSlot.name;
        this.providedSlots[providedSlot.name] = slot;
      }
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(slot.viewConnections.length == 0, "View connections must be empty");
      providedSlot.views.forEach(view => slot.viewConnections.push(this.particle.connections[view]));
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(slot._name == providedSlot.name);
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!slot.formFactor);
      slot.formFactor = providedSlot.formFactor;
    });
  }

  connectToSlot(targetSlot) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(targetSlot);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!this.targetSlot);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(this.recipe == targetSlot.recipe, 'Cannot connect to slot from different recipe');

    this._targetSlot = targetSlot;
    targetSlot.consumeConnections.push(this);
  }

  _clone(particle, cloneMap) {
    if (cloneMap.has(this)) {
      return cloneMap.get(this);
    }

    var slotConnection = particle.addSlotConnection(this.name);
    if (this.slotSpec) {
      slotConnection._slotSpec = particle.spec.getSlotSpec(this.name);
    }

    cloneMap.set(this, slotConnection);
    return slotConnection;
  }

  _normalize() {
    let normalizedSlots = {};
    for (let key of (Object.keys(this._providedSlots).sort())) {
      normalizedSlots[key] = this._providedSlots[key];
    }
    this._providedSlots = normalizedSlots;
    Object.freeze(this);
  }

  _compareTo(other) {
    let cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareStrings(this.name, other.name)) != 0) return cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareComparables(this._targetSlot, other._targetSlot)) != 0) return cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareComparables(this._particle, other._particle)) != 0) return cmp;
    return 0;
  }

  _isValid() {
    if (this._targetSlot && this._targetSlot.sourceConnection &&
        this._targetSlot != this._targetSlot.sourceConnection.providedSlots[this._targetSlot.name]) {
      return false;
    }

    // TODO: add more checks.
    return true;
  }

  isResolved(options) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(Object.isFrozen(this));

    if (!this.name) {
      if (options) {
        options.details = "missing name";
      }
      return false;
    }
    if (!this.particle) {
      if (options) {
        options.details = "missing particle";
      }
      return false;
    }
    if (!this.targetSlot) {
      if (options) {
        options.details = "missing target-slot";
      }
      return false;
    }
    if (this.slotSpec.isRequired && this.targetSlot.sourceConnection == undefined) {
      if (options) {
        options.details = "missing target-slot's source-connection of required connection";
      }
      return false;
    }
    return true;
  }

  toString(nameMap, options) {
    let consumeRes = [];
    consumeRes.push('consume');
    if (this.slotSpec.isSet) {
      consumeRes.push('set of');
    }
    consumeRes.push(`${this.name}`);
    if (this.targetSlot)
      consumeRes.push(`as ${(nameMap && nameMap.get(this.targetSlot)) || this.targetSlot.localName}`);

    if (options && options.showUnresolved) {
      if (!this.isResolved(options)) {
        consumeRes.push(`# unresolved slot-connection: ${options.details}`);
      }
    }

    let result = [];
    result.push(consumeRes.join(" "));

    Object.keys(this.providedSlots).forEach(psName => {
      let providedSlot = this.providedSlots[psName];
      let provideRes = [];
      provideRes.push('  provide');
      let providedSlotSpec = this.slotSpec.providedSlots.find(ps => ps.name == psName);
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(providedSlotSpec, `Cannot find providedSlotSpec for ${psName}`);
      if (providedSlotSpec.isSet) {
        provideRes.push('set of');
      }
      provideRes.push(`${psName} as ${(nameMap && nameMap.get(providedSlot)) || providedSlot}`);
      result.push(provideRes.join(" "));
    });
    return result.join("\n");
  }
}

/* harmony default export */ __webpack_exports__["a"] = (SlotConnection);


/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_js__ = __webpack_require__(5);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt




class Slot {
  constructor(recipe, name) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(recipe);

    this._recipe = recipe;
    this._id = undefined;          // The ID of the slot in the context
    this._localName = undefined;   // Local id within the recipe
    this._name = name;

    this._formFactor = undefined;
    this._viewConnections = [];  // ViewConnection* (can only be set if source connection is set and particle in slot connections is set)
    this._sourceConnection = undefined;  // SlotConnection
    this._consumerConnections = [];  // SlotConnection*
  }

  get recipe() { return this._recipe; }
  get id() { return this._id; }
  set id(id) { this._id = id; }
  get localName() { return this._localName; }
  set localName(localName) { this._localName = localName; }
  get name() { return this._name; };
  set name(name) { this._name = name; };
  get formFactor() { return this._formFactor; }
  set formFactor(formFactor) { this._formFactor = formFactor; }
  get viewConnections() { return this._viewConnections; }
  get sourceConnection() { return this._sourceConnection; }
  set sourceConnection(sourceConnection) { this._sourceConnection = sourceConnection; }
  get consumeConnections() { return this._consumerConnections; }

  _copyInto(recipe, cloneMap) {
    var slot = undefined;
    if (!this.sourceConnection && this.id)
      slot = recipe.findSlot(this.id);
    if (slot == undefined) {
      var slot = recipe.newSlot(this.name);
      slot._id = this.id;
      slot._formFactor = this.formFactor;
      slot._localName = this._localName;
      // the connections are re-established when Particles clone their attached SlotConnection objects.
      slot._sourceConnection = cloneMap.get(this._sourceConnection);
      if (slot.sourceConnection)
        slot.sourceConnection._providedSlots[slot.name] = slot;
      this._viewConnections.forEach(connection => slot._viewConnections.push(cloneMap.get(connection)));
    }
    this._consumerConnections.forEach(connection => cloneMap.get(connection).connectToSlot(slot));
    return slot;
  }

  _startNormalize() {
    this.localName = null;
  }

  _finishNormalize() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(Object.isFrozen(this._source));
    this._consumerConnections.forEach(cc => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(Object.isFrozen(cc)));
    this._consumerConnections.sort(__WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareComparables);
    Object.freeze(this);
  }

  _compareTo(other) {
    let cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareStrings(this.id, other.id)) != 0) return cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareStrings(this.localName, other.localName)) != 0) return cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareStrings(this.formFactor, other.formFactor)) != 0) return cmp;
    return 0;
  }

  isResolved(options) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(Object.isFrozen(this));

    if (options && options.showUnresolved) {
      options.details = [];
      if (!this._sourceConnection) {
        options.details.push('missing source-connection');
      }
      if (!this.id) {
        options.details.push('missing id');
      }
      options.details = options.details.join('; ');
    }

    return this._sourceConnection || this.id;
  }

  _isValid() {
    // TODO: implement
    return true;
  }

  toString(nameMap, options) {
    let result = [];
    if (this.id) {
      result.push(`slot '${this.id}' as ${(nameMap && nameMap.get(this)) || this.localName}`);
      if (options && options.showUnresolved) {
        if (!this.isResolved(options)) {
          result.push(`# unresolved slot: ${options.details}`);
        }
      }
    }
    else if (options && options.showUnresolved && !this.isResolved(options)) {
      result.push(`slot as ${(nameMap && nameMap.get(this)) || this.localName} # unresolved slot: ${options.details}`);
    }
    return result.join(' ');
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Slot);


/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__type_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__ = __webpack_require__(0);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt




class TypeChecker {

  // list: [{type, direction, connection}]
  static processTypeList(list) {
    if (list.length == 0) {
      return {type: {type: undefined}, valid: true};
    }
    var baseType = list[0];
    var variableResolutions = [];
    for (var i = 1; i < list.length; i++) {
      let result = TypeChecker.compareTypes(baseType, list[i], variableResolutions);
      baseType = result.type;
      if (!result.valid) {
        return {valid: false};
      }
    }

    return {type: baseType, valid: true};
  }

  static _coerceTypes(left, right) {
    var leftType = left.type;
    var rightType = right.type;

    while (leftType.isSetView && rightType.isSetView) {
      leftType = leftType.primitiveType();
      rightType = rightType.primitiveType();
    }

    leftType = leftType.resolvedType();
    rightType = rightType.resolvedType();

    if (leftType.equals(rightType))
      return left;

    // TODO: direction?
    if (leftType.isVariable) {
      leftType.variable.resolution = rightType;
      var type = right;
    } else if (rightType.isVariable) {
      rightType.variable.resolution = leftType;
      var type = left;
    } else {
      return null;
    }
    return type;
  }

  static isSubclass(subclass, superclass) {
    var subtype = subclass.type;
    var supertype = superclass.type;
    while (subtype.isSetView && supertype.isSetView) {
      subtype = subtype.primitiveType();
      supertype = supertype.primitiveType();
    }

    if (!(subtype.isEntity && supertype.isEntity))
      return false;

    function checkSuper(schema) {
      if (!schema)
        return false;
      if (schema.equals(supertype.entitySchema))
        return true;
      for (let parent of schema.parents)
        if (checkSuper(parent))
          return true;
      return false;
    }

    return checkSuper(subtype.entitySchema);
  }

  // left, right: {type, direction, connection}
  static compareTypes(left, right) {
    if (left.type.equals(right.type))
      return {type: left, valid: true};

    if (TypeChecker.isSubclass(left, right)) {
      var subclass = left;
      var superclass = right;
    } else if (TypeChecker.isSubclass(right, left)) {
      var subclass = right;
      var superclass = left;
    }

    // TODO: this arbitrarily chooses type restriction when
    // super direction is 'in' and sub direction is 'out'. Eventually
    // both possibilities should be encoded so we can maximise resolution
    // opportunities
    if (superclass) {
      // treat view types as if they were 'inout' connections. Note that this
      // guarantees that the view's type will be preserved, and that the fact
      // that the type comes from a view rather than a connection will also
      // be preserved.
      var superDirection = superclass.connection ? superclass.connection.direction : 'inout';
      var subDirection = subclass.connection ? subclass.connection.direction : 'inout';
      if (superDirection == 'in') {
        return {type: subclass, valid: true};
      }
      if (subDirection == 'out') {
        return {type: superclass, valid: true};
      }
      return {valid: false};
    }

    let result  = TypeChecker._coerceTypes(left, right);
    if (result == null) {
      return {valid: false};
    }
    // TODO: direction?
    return {type: result.type, valid: true}
  }

  static substitute(type, variable, value) {
    if (type.equals(variable))
      return value;
    if (type.isSetView)
      return TypeChecker.substitute(type.primitiveType(), variable, value).setViewOf();
    return type;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (TypeChecker);


/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_js__ = __webpack_require__(5);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt




class ViewConnection {
  constructor(name, particle) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(particle);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(particle.recipe);
    this._recipe = particle.recipe;
    this._name = name;
    this._tags = [];
    this._type = undefined;
    this._rawType = undefined;
    this._direction = undefined;
    this._particle = particle;
    this._view = undefined;
  }

  _clone(particle, cloneMap) {
    if (cloneMap.has(this)) {
      return cloneMap.get(this);
    }
    var viewConnection = new ViewConnection(this._name, particle);
    viewConnection._tags = [...this._tags];
    viewConnection._type = this._type;
    viewConnection._rawType = this._rawType;
    viewConnection._direction = this._direction;
    if (this._view != undefined) {
      viewConnection._view = cloneMap.get(this._view);
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(viewConnection._view !== undefined);
      viewConnection._view.connections.push(viewConnection);
    }
    cloneMap.set(this, viewConnection);
    return viewConnection;
  }

  _normalize() {
    this._tags.sort();
    // TODO: type?
    Object.freeze(this);
  }

  _compareTo(other) {
    let cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareComparables(this._particle, other._particle)) != 0) return cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareStrings(this._name, other._name)) != 0) return cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareArrays(this._tags, other._tags, __WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareStrings)) != 0) return cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareComparables(this._view, other._view)) != 0) return cmp;
    // TODO: add type comparison
    // if ((cmp = util.compareStrings(this._type, other._type)) != 0) return cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareStrings(this._direction, other._direction)) != 0) return cmp;
    return 0;
  }

  get recipe() { return this._recipe; }
  get name() { return this._name; } // Parameter name?
  get tags() { return this._tags; }
  get type() {
    if (this._type)
      return this._type;
    return this._rawType;
  }
  get rawType() {
    return this._rawType;
  }
  get direction() { return this._direction; } // in/out
  get isInput() {
    return this.direction == "in" || this.direction == "inout";
  }
  get isOutput() {
    return this.direction == "out" || this.direction == "inout";
  }
  get view() { return this._view; } // View?
  get particle() { return this._particle; } // never null

  set tags(tags) { this._tags = tags; }
  set type(type) {
    this._rawType = type;
    this._type = undefined;
    this._resetViewType();
  }

  set direction(direction) {
    this._direction = direction;
    this._resetViewType();
  }

  get spec() {
    return this.particle.spec.connectionMap.get(this.name);
  }

  get isOptional() {
    return this.spec.isOptional;
  }

  _isValid() {
    if (this.direction && !['in', 'out', 'inout', 'host'].includes(this.direction)) {
      return false;
    }
    if (this.type && this.particle && this.particle.spec) {
      let connectionSpec = this.particle.spec.connectionMap.get(this.name);
      if (connectionSpec) {
        // TODO: this shouldn't be a direct equals comparison
        if (!this.rawType.equals(connectionSpec.type)) {
          return false;
        }
        if (this.direction != connectionSpec.direction) {
          return false;
        }
      }
    }
    return true;
  }

  isResolved(options) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(Object.isFrozen(this));

    if (this.isOptional) {
      return true;
    }

    // TODO: This should use this._type, or possibly not consider type at all.
    if (!this.type) {
      if (options) {
        options.details = 'missing type';
      }
      return false;
    }
    if (!this._direction) {
      if (options) {
        options.details = 'missing direction';
      }
      return false;
    }
    if (!this.view) {
      if (options) {
        options.details = 'missing view';
      }
      return false;
    }
    return true;
  }

  _resetViewType() {
    if (this._view)
      this._view._type = undefined;
  }

  connectToView(view) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(view.recipe == this.recipe);
    this._view = view;
    this._resetViewType();
    this._view.connections.push(this);
  }

  toString(nameMap, options) {
    let result = [];
    result.push(this.name || '*');
    // TODO: better deal with unspecified direction.
    result.push({'in': '<-', 'out': '->', 'inout': '='}[this.direction] || this.direction || '=');
    if (this.view) {
      result.push(`${(nameMap && nameMap.get(this.view)) || this.view.localName}`);
    }
    result.push(...this.tags);

    if (options && options.showUnresolved) {
      if (!this.isResolved(options)) {
        result.push(`# unresolved view-connection: ${options.details}`);
      }
    }

    return result.join(' ');
  }
}

/* harmony default export */ __webpack_exports__["a"] = (ViewConnection);


/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__type_checker_js__ = __webpack_require__(58);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt





class View {
  constructor(recipe) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(recipe);
    this._recipe = recipe;
    this._id = null;
    this._localName = undefined;
    this._tags = [];
    this._type = undefined;
    this._fate = null;
    // TODO: replace originalFate with more generic mechanism for tracking
    // how and from what the recipe was generated.
    this._originalFate = null;
    this._connections = [];
    this._mappedType = undefined;
  }

  _copyInto(recipe) {
    var view = undefined;
    if (this._id !== null && ['map', 'use', 'copy'].includes(this.fate))
      view = recipe.findView(this._id);

    if (view == undefined) {
      var view = recipe.newView();
      view._id = this._id;
      view._tags = [...this._tags];
      view._type = this._type;
      view._fate = this._fate;
      view._originalFate = this._originalFate;
      view._mappedType = this._mappedType;

      // the connections are re-established when Particles clone their
      // attached ViewConnection objects.
      view._connections = [];
    }
    return view;
  }

  _startNormalize() {
    this._localName = null;
    this._tags.sort();
    // TODO: type?
  }

  _finishNormalize() {
    for (let connection of this._connections) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(Object.isFrozen(connection), `View connection '${connection.name}' is not frozen.`);
    }
    this._connections.sort(__WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareComparables);
    Object.freeze(this);
  }

  _compareTo(other) {
    let cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareStrings(this._id, other._id)) != 0) return cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareStrings(this._localName, other._localName)) != 0) return cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareArrays(this._tags, other._tags, __WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareStrings)) != 0) return cmp;
    // TODO: type?
    if ((cmp = __WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareStrings(this.fate, other.fate)) != 0) return cmp;
    return 0;
  }

  // a resolved View has either an id or create=true
  get fate() { return this._fate || "?"; }
  set fate(fate) {
    if (this._originalFate == null) {
      this._originalFate = this._fate;
    }
    this._fate = fate;
  }
  get originalFate() { return this._originalFate || "?"; }
  get recipe() { return this._recipe; }
  get tags() { return this._tags; } // only tags owned by the view
  set tags(tags) { this._tags = tags; }
  get type() { return this._type; } // nullable
  get id() { return this._id; }
  set id(id) { this._id = id; }
  mapToView(view) {
    this._id = view.id;
    this._type = undefined;
    this._mappedType = view.type;
  }
  get localName() { return this._localName; }
  set localName(name) { this._localName = name; }
  get connections() { return this._connections } // ViewConnection*

  _isValid() {
    var typeSet = [];
    if (this._mappedType)
      typeSet.push({type: this._mappedType});
    var tags = new Set();
    for (let connection of this._connections) {
      // A remote view cannot be connected to an output param.
      if (this.fate == 'map' && ['out', 'inout'].includes(connection.direction)) {
        return false;
      }
      if (connection.type)
        typeSet.push({type: connection.type, direction: connection.direction, connection});
      connection.tags.forEach(tag => tags.add(tag));
    }
    var {type, valid} = __WEBPACK_IMPORTED_MODULE_2__type_checker_js__["a" /* default */].processTypeList(typeSet);
    if (valid) {
      this._type = type.type;
      this._tags.forEach(tag => tags.add(tag));
      this._tags = [...tags];
    }
    return valid;
  }

  isResolved(options) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(Object.isFrozen(this));
    if (!this._type) {
      if (options) {
        options.details = "missing type";
      }
      return false;
    }
    switch (this.fate) {
      case "?": {
        if (options) {
          options.details = "missing fate";
        }
        return false;
      }
      case "copy":
      case "map":
      case "use": {
        if (options && this.id === null) {
          options.details = "missing id";
        }
        return this.id !== null;
      }
      case "create":
        return true;
      default: {
        if (options) {
          options.details = `invalid fate ${this.fate}`;
        }
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(false, `Unexpected fate: ${this.fate}`);
      }
    }
  }

  toString(nameMap, options) {
    // TODO: type? maybe output in a comment
    let result = [];
    result.push(this.fate);
    if (this.id) {
      result.push(`'${this.id}'`);
    }
    result.push(...this.tags);
    result.push(`as ${(nameMap && nameMap.get(this)) || this.localName}`);
    if (this.type) {
      result.push('#');
      result.push(this.type.toPrettyString());
    }
    if (options && options.showUnresolved) {
      let options = {};
      if (!this.isResolved(options)) {
        result.push(` # unresolved view: ${options.details}`);
      }
    }

    return result.join(' ');
  }
}

/* harmony default export */ __webpack_exports__["a"] = (View);


/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__ = __webpack_require__(0);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt





class WalkerBase extends __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__["b" /* Strategizer */].Walker {
  constructor(tactic) {
    super();
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__["a" /* default */])(tactic);
    this.tactic = tactic;
  }

  _runUpdateList(recipe, updateList) {
    var newRecipes = [];
    if (updateList.length) {
      switch (this.tactic) {
        case WalkerBase.Permuted:
          var permutations = [[]];
          updateList.forEach(({continuation, context}) => {
            var newResults = [];
            if (typeof continuation == 'function')
              continuation = [continuation];
            continuation.forEach(f => {
              permutations.forEach(p => {
                var newP = p.slice();
                newP.push({f, context});
                newResults.push(newP);
              });
            });
            permutations = newResults;
          });

          for (var permutation of permutations) {
            var cloneMap = new Map();
            var newRecipe = recipe.clone(cloneMap);
            var score = 0;
            permutation = permutation.filter(p => p.f !== null);
            if (permutation.length == 0)
              continue;
            permutation.forEach(({f, context}) => {
              score += f(newRecipe, cloneMap.get(context))
            });

            newRecipes.push({recipe: newRecipe, score});
          }
          break;
        case WalkerBase.Independent:
          updateList.forEach(({continuation, context}) => {
            if (typeof continuation == 'function')
              continuation = [continuation];
            continuation.forEach(f => {
              if (f == null)
                f = () => 0;
              var cloneMap = new Map();
              var newRecipe = recipe.clone(cloneMap);
              var score = f(newRecipe, cloneMap.get(context));
              newRecipes.push({recipe: newRecipe, score});
            });
          });
          break;
        default:
          throw `${this.tactic} not supported`;
      }
    }

    // commit phase - output results.

    for (var newRecipe of newRecipes) {
      var result = this.createDescendant(newRecipe.recipe, newRecipe.score);
    }
  }

  createDescendant(recipe, score) {
    let valid = recipe.normalize();
    //if (!valid) debugger;
    let hash = valid ? recipe.digest() : null
    super.createDescendant(recipe, score, hash, valid);
  }

  isEmptyResult(result) {
    if (!result)
      return true;

    if (result.constructor == Array && result.length <= 0)
      return true;

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__["a" /* default */])(typeof result == 'function' || result.length);

    return false;
  }
}

WalkerBase.Permuted = "permuted";
WalkerBase.Independent = "independent";

/* harmony default export */ __webpack_exports__["a"] = (WalkerBase);


/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */


class Relevance {
  constructor() {
    this.relevanceMap = new Map();
  }

  apply(relevance) {
    for (let key of relevance.keys()) {
      if (this.relevanceMap.has(key))
        this.relevanceMap.set(key, this.relevanceMap.get(key).concat(relevance.get(key)));
      else
        this.relevanceMap.set(key, relevance.get(key));
    }
  }

  calcRelevanceScore() {
    let relevance = 1;
    let hasNegative = false;
    for (let rList of this.relevanceMap.values()) {
      let particleRelevance = Relevance.particleRelevance(rList);
      if (particleRelevance < 0) {
        hasNegative = true;
      }
      relevance *= Math.abs(particleRelevance);
    }
    return relevance * (hasNegative ? -1 : 1);
  }

  // Returns false, if at least one of the particles relevance lists ends with a negative score.
  isRelevant(plan) {
    let hasUi = plan.particles.some(p => Object.keys(p.consumedSlotConnections).length > 0);
    let rendersUi = false;
    this.relevanceMap.forEach((rList, particle) => {
      if (rList[rList.length - 1] < 0) {
        return false;
      } else if (Object.keys(particle.consumedSlotConnections).length) {
        rendersUi = true;
      }
    });
    // If the recipe has UI rendering particles, at least one of the particles must render UI.
    return hasUi == rendersUi;
  }

  static scaleRelevance(relevance) {
    if (relevance == undefined) {
      relevance = 5;
    }
    relevance = Math.max(-1, Math.min(relevance, 10));
    // TODO: might want to make this geometric or something instead;
    return relevance / 5;
  }

  static particleRelevance(relevanceList) {
    let relevance = 1;
    let hasNegative = false;
    relevanceList.forEach(r => {
      let scaledRelevance = Relevance.scaleRelevance(r);
      if (scaledRelevance < 0) {
        hasNegative = true;
      }
      relevance *= Math.abs(scaledRelevance);
    });
    return relevance * (hasNegative ? -1 : 1);
  }

  calcParticleRelevance(particle) {
    if (this.relevanceMap.has(particle)) {
      return Relevance.particleRelevance(this.relevanceMap.get(particle));
    }
    return -1;
  }
}
/* harmony default export */ __webpack_exports__["a"] = (Relevance);


/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tracelib_trace_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scheduler_js__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__relevance_js__ = __webpack_require__(62);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */







class Speculator {

  speculate(arc, plan) {
    var trace = __WEBPACK_IMPORTED_MODULE_1__tracelib_trace_js__["a" /* default */].start({cat: "speculator", name: "Speculator::speculate"});
    var newArc = arc.cloneForSpeculativeExecution();
    let relevance = new __WEBPACK_IMPORTED_MODULE_3__relevance_js__["a" /* default */]();
    async function awaitCompletion() {
      await __WEBPACK_IMPORTED_MODULE_2__scheduler_js__["a" /* default */].idle;
      var messageCount = newArc.pec.messageCount;
      relevance.apply(await newArc.pec.idle);

      if (newArc.pec.messageCount !== messageCount + 1)
        return awaitCompletion();
      else {
        relevance.newArc = newArc;
        return relevance;
      }
    }

    let result = newArc.instantiate(plan).then(a => awaitCompletion());
    trace.end();
    return result;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Speculator);


/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipe_walker_js__ = __webpack_require__(3);

// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt





class AddUseViews extends __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__["a" /* Strategy */] {
  // TODO: move generation to use an async generator.
  async generate(strategizer) {
    var results = __WEBPACK_IMPORTED_MODULE_1__recipe_recipe_js__["a" /* default */].over(this.getResults(strategizer), new class extends __WEBPACK_IMPORTED_MODULE_2__recipe_walker_js__["a" /* default */] {
      onRecipe(recipe) {
        // Don't add use views while there are outstanding constraints
        if (recipe.connectionConstraints.length > 0)
          return;
        // Don't add use views to a recipe with free views
        var freeViews = recipe.views.filter(view => view.connections.length == 0);
        if (freeViews.length > 0)
          return;

        var disconnectedConnections = recipe.viewConnections.filter(vc => vc.view == null && !vc.isOptional);

        return recipe => {
          disconnectedConnections.forEach(vc => {
            var clonedVC = recipe.updateToClone({vc}).vc;
            var view = recipe.newView();
            view.fate = 'use';
            clonedVC.connectToView(view);
          });
          return 0;
        };
      }
    }(__WEBPACK_IMPORTED_MODULE_2__recipe_walker_js__["a" /* default */].Permuted), this);

    return { results, generate: null };
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AddUseViews;



/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recipe_walker_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__recipe_recipe_util_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__view_mapper_base_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__schema_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__platform_assert_web_js__ = __webpack_require__(0);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt










class AssignRemoteViews extends __WEBPACK_IMPORTED_MODULE_4__view_mapper_base_js__["a" /* default */] {
  constructor(arc) {
    super();
    this._arc = arc;
    this.fate = 'map';
  }

  getMappableViews(type, tags) {
    if (tags.length > 0) {
      return this._arc.context.findViewsByType(type, {tags});
    } else {
      return this._arc.context.findViewsByType(type);
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AssignRemoteViews;



/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recipe_walker_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__recipe_recipe_util_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__view_mapper_base_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__platform_assert_web_js__ = __webpack_require__(0);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt









class AssignViewsByTagAndType extends __WEBPACK_IMPORTED_MODULE_4__view_mapper_base_js__["a" /* default */] {
  constructor(arc) {
    super();
    this.arc = arc;
    this.fate = 'use';
  }

  getMappableViews(type, tags) {
    if (tags.length > 0) {
      return this.arc.findViewsByType(type, {tags});
    } else {
      return this.arc.findViewsByType(type);
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AssignViewsByTagAndType;



/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__recipe_walker_js__ = __webpack_require__(3);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt






class CombinedStrategy extends __WEBPACK_IMPORTED_MODULE_1__strategizer_strategizer_js__["a" /* Strategy */] {
  constructor(strategies) {
    super();
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(strategies.length > 1, 'Strategies must contain at least 2 elements.');
    this._strategies = strategies;
    this._strategies.forEach(strategy => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(strategy.walker));
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(this._strategies[0].getResults);
  }
  _getLeaves(results) {
    // Only use leaf recipes.
    let recipeByParent = new Map();
    let resultsList = [...results.values()];
    resultsList.forEach(r => {
      r.derivation.forEach(d => {
        if (d.parent) {
          recipeByParent.set(d.parent, r);
        }
      });
    });
    return resultsList.filter(r => !recipeByParent.has(r));
  }
  async generate(strategizer) {
    let results = this._strategies[0].getResults(strategizer);
    let totalResults = new Map();
    for (let strategy of this._strategies) {
      results = __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__["a" /* default */].over(results, strategy.walker, strategy);
      results = await Promise.all(results.map(async result => {
        if (result.hash) {
          result.hash = await result.hash;
        }
        if (!totalResults.has(result.hash)) {
          // TODO: deduping of results is already done in strategizer.
          // It should dedup the intermeditate derivations as well.
          totalResults.set(result.hash, result);
        }
        return result;
      }));
      results = this._getLeaves(totalResults);
    }

    return { results, generate: null };
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CombinedStrategy;
;


/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipe_walker_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__recipe_recipe_util_js__ = __webpack_require__(6);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt






class ConvertConstraintsToConnections extends __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__["a" /* Strategy */] {
  constructor(arc) {
    super();
    this.affordance = arc.pec.slotComposer ? arc.pec.slotComposer.affordance : null;
  }
  async generate(strategizer) {
    var affordance = this.affordance;
    var results = __WEBPACK_IMPORTED_MODULE_1__recipe_recipe_js__["a" /* default */].over(this.getResults(strategizer), new class extends __WEBPACK_IMPORTED_MODULE_2__recipe_walker_js__["a" /* default */] {
      onRecipe(recipe) {
        var particles = new Set();
        var views = new Set();
        var map = {};
        var particlesByName = {};
        var viewCount = 0;
        for (var constraint of recipe.connectionConstraints) {
          if (affordance && (!constraint.fromParticle.matchAffordance(affordance) || !constraint.toParticle.matchAffordance(affordance))) {
            return;
          }
          particles.add(constraint.fromParticle.name);
          if (map[constraint.fromParticle.name] == undefined) {
            map[constraint.fromParticle.name] = {};
            particlesByName[constraint.fromParticle.name] = constraint.fromParticle;
          }
          particles.add(constraint.toParticle.name);
          if (map[constraint.toParticle.name] == undefined) {
            map[constraint.toParticle.name] = {};
            particlesByName[constraint.toParticle.name] = constraint.toParticle;
          }
          var view = map[constraint.fromParticle.name][constraint.fromConnection];
          if (view == undefined) {
            view = 'v' + viewCount++;
            map[constraint.fromParticle.name][constraint.fromConnection] = view;
            views.add(view);
          }
          map[constraint.toParticle.name][constraint.toConnection] = view;
        }
        var shape = __WEBPACK_IMPORTED_MODULE_3__recipe_recipe_util_js__["a" /* default */].makeShape([...particles.values()], [...views.values()], map);
        var results = __WEBPACK_IMPORTED_MODULE_3__recipe_recipe_util_js__["a" /* default */].find(recipe, shape);

        return results.map(match => {
          return (recipe) => {
            var score = recipe.connectionConstraints.length + match.score;
            var recipeMap = recipe.updateToClone(match.match);
            for (var particle in map) {
              for (var connection in map[particle]) {
                var view = map[particle][connection];
                var recipeParticle = recipeMap[particle];
                if (recipeParticle == null) {
                  recipeParticle = recipe.newParticle(particle);
                  recipeParticle.spec = particlesByName[particle];
                  recipeMap[particle] = recipeParticle;
                }
                var recipeViewConnection = recipeParticle.connections[connection];
                if (recipeViewConnection == undefined)
                  recipeViewConnection = recipeParticle.addConnectionName(connection);
                var recipeView = recipeMap[view];
                if (recipeView == null) {
                  recipeView = recipe.newView();
                  recipeView.fate = 'create';
                  recipeMap[view] = recipeView;
                }
                if (recipeViewConnection.view == null)
                  recipeViewConnection.connectToView(recipeView);
              }
            }
            recipe.clearConnectionConstraints();
            return score;
          }
        });
      }
    }(__WEBPACK_IMPORTED_MODULE_2__recipe_walker_js__["a" /* default */].Independent), this);

    return { results, generate: null };
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ConvertConstraintsToConnections;



/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recipe_walker_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__recipe_recipe_util_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__view_mapper_base_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__schema_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__platform_assert_web_js__ = __webpack_require__(0);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt










class CopyRemoteViews extends __WEBPACK_IMPORTED_MODULE_4__view_mapper_base_js__["a" /* default */] {
  constructor(arc) {
    super();
    this._arc = arc;
    this.fate = 'copy';
  }

  getMappableViews(type, tags) {
    if (tags.length > 0) {
      return this._arc.context.findViewsByType(type, {tags});
    } else {
      return this._arc.context.findViewsByType(type);
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CopyRemoteViews;



/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__recipe_walker_js__ = __webpack_require__(3);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt






class CreateDescriptionHandle extends __WEBPACK_IMPORTED_MODULE_1__strategizer_strategizer_js__["a" /* Strategy */] {
  async generate(strategizer) {
    var results = __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__["a" /* default */].over(this.getResults(strategizer), new class extends __WEBPACK_IMPORTED_MODULE_3__recipe_walker_js__["a" /* default */] {
      onViewConnection(recipe, viewConnection) {
        if (viewConnection.view)
          return;
        if (viewConnection.name != "descriptions")
          return;

        return (recipe, viewConnection) => {
          var view = recipe.newView();
          view.fate = 'create';
          viewConnection.connectToView(view);
          return 1;
        };
      }
    }(__WEBPACK_IMPORTED_MODULE_3__recipe_walker_js__["a" /* default */].Permuted), this);

    return { results, generate: null };
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CreateDescriptionHandle;



/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__recipe_walker_js__ = __webpack_require__(3);

// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt






class FallbackFate extends __WEBPACK_IMPORTED_MODULE_1__strategizer_strategizer_js__["a" /* Strategy */] {
  async generate(strategizer) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(strategizer);
    let generated = strategizer.generated.filter(result => !result.result.isResolved());
    let terminal = strategizer.terminal;
    var results = __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__["a" /* default */].over([...generated, ...terminal], new class extends __WEBPACK_IMPORTED_MODULE_3__recipe_walker_js__["a" /* default */] {
      onView(recipe, view) {
        // Only apply this strategy only to user query based recipes with resolved tokens.
        if (!recipe.search || (recipe.search.resolvedTokens.length == 0)) {
          return;
        }

        // Only apply to views whose fate is set, but wasn't explicitly defined in the recipe.
        if (view.isResolved() || view.fate == "?" || view.originalFate != "?") {
          return;
        }

        let hasOutConns = view.connections.some(vc => vc.isOutput);
        let newFate = hasOutConns ? "copy" : "map";
        if (view.fate == newFate) {
          return;
        }

        return (recipe, clonedView) => {
          clonedView.fate = newFate;
          return 0;
        };
      }
    }(__WEBPACK_IMPORTED_MODULE_3__recipe_walker_js__["a" /* default */].Permuted), this);

    return { results, generate: null };
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FallbackFate;



/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__recipe_walker_js__ = __webpack_require__(3);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt






class GroupViewConnections extends __WEBPACK_IMPORTED_MODULE_1__strategizer_strategizer_js__["a" /* Strategy */] {
  constructor() {
    super();

    this._walker = new class extends __WEBPACK_IMPORTED_MODULE_3__recipe_walker_js__["a" /* default */] {
      onRecipe(recipe) {
        // Only apply this strategy if ALL view connections are named and have types.
        if (recipe.viewConnections.find(vc => !vc.type || !vc.name || vc.isOptional)) {
          return;
        }
        // Find all unique types used in the recipe that have unbound view connections.
        let types = new Set();
        recipe.viewConnections.forEach(vc => {
          if (!vc.isOptional && !vc.view && !Array.from(types).find(t => t.equals(vc.type))) {
            types.add(vc.type);
          }
        });

        let groupsByType = new Map();
        types.forEach(type => {
          // Find the particle with the largest number of unbound connections of the same type.
          let countConnectionsByType = (connections) => Object.values(connections).filter(conn => {
            return !conn.isOptional && !conn.view && type.equals(conn.type);
          }).length;
          let sortedParticles = [...recipe.particles].sort((p1, p2) => {
            return countConnectionsByType(p2.connections) - countConnectionsByType(p1.connections);
          }).filter(p => countConnectionsByType(p.connections) > 0);
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(sortedParticles.length > 0);

          // View connections of the same particle cannot be bound to the same view. Iterate on view connections of the particle
          // with the most connections of the given type, and group each of them with same typed view connections of other particles.
          let particleWithMostConnectionsOfType = sortedParticles[0];
          let groups = new Map();
          groupsByType.set(type, groups);
          let allTypeViewConnections = recipe.viewConnections.filter(c => {
            return !c.isOptional && !c.view && type.equals(c.type) && (c.particle != particleWithMostConnectionsOfType);
          });

          let iteration = 0;
          while(allTypeViewConnections.length > 0) {
            Object.values(particleWithMostConnectionsOfType.connections).forEach(viewConnection => {
              if (!type.equals(viewConnection.type)) {
                return;
              }
              if (!groups.has(viewConnection)) {
                groups.set(viewConnection, []);
              }
              let group = groups.get(viewConnection);

              // filter all connections where this particle is already in a group.
              let possibleConnections = allTypeViewConnections.filter(c => !group.find(gc => gc.particle == c.particle));
              let selectedConn = possibleConnections.find(c => viewConnection.isInput != c.isInput || viewConnection.isOutput != c.isOutput);
              // TODO: consider tags.
              // TODO: Slots view restrictions should also be accounted for when grouping.
              if (!selectedConn) {
                if (possibleConnections.length == 0 || iteration == 0) {
                  // During first iteration only bind opposite direction connections ("in" with "out" and vice versa)
                  // to ensure each group has both direction connections as much as possible.
                  return;
                }
                selectedConn = possibleConnections[0];
              }
              group.push(selectedConn);
              allTypeViewConnections = allTypeViewConnections.filter(c => c != selectedConn);
            });
            iteration++;
          }
          // Remove groups where no connections were bound together.
          groups.forEach((otherConns, conn) => {
            if (otherConns.length == 0) {
              groups.delete(conn);
            } else {
              otherConns.push(conn);
            }
          });
        });

        return recipe => {
          groupsByType.forEach((groups, type) => {
            groups.forEach(group => {
              let recipeView = recipe.newView();
              group.forEach(conn => {
                let cloneConn = recipe.updateToClone({conn}).conn;
                cloneConn.connectToView(recipeView)
              });
            });
          });
          // TODO: score!
        };
      }
    }(__WEBPACK_IMPORTED_MODULE_3__recipe_walker_js__["a" /* default */].Permuted);
  }
  get walker() {
    return this._walker;
  }
  async generate(strategizer) {
    return {
      results: __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__["a" /* default */].over(this.getResults(strategizer), this.walker, this),
      generate: null,
    };
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GroupViewConnections;
;


/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__ = __webpack_require__(2);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt



class InitPopulation extends __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__["a" /* Strategy */] {
  constructor(arc) {
    super();
    this._recipes = [];
    for (let recipe of (arc.context.recipes || [])) {
      // Filter out recipes containing particles that don't support the current affordance.
      if (arc.pec.slotComposer) {
        if (recipe.particles.find(p => p.spec && !p.spec.matchAffordance(arc.pec.slotComposer.affordance)) !== undefined) {
          continue;
        }
      }
      recipe = recipe.clone();
      if (!recipe.normalize()) {
        console.warn('could not normalize a context recipe');
      } else {
        this._recipes.push(recipe);
      }
    }
    this._loadedParticles = new Set(arc.loadedParticles().map(spec => spec.implFile));
  }
  async generate(strategizer) {
    if (strategizer.generation != 0) {
      return { results: [], generate: null };
    }
    let results = this._recipes.map(recipe => ({
      result: recipe,
      score: 1 - recipe.particles.filter(particle => particle.spec && this._loadedParticles.has(particle.spec.implFile)).length,
      derivation: [{strategy: this, parent: undefined}],
      hash: recipe.digest(),
      valid: Object.isFrozen(recipe),
    }));

    return {
      results: results,
      generate: null,
    };
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = InitPopulation;



/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__ = __webpack_require__(0);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt





class InitSearch extends __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__["a" /* Strategy */] {
  constructor(arc) {
    super();
    // TODO: Figure out where this should really come from.
    this._search = arc.search;
  }
  async generate(strategizer) {
    if (this._search == null || strategizer.generation != 0) {
      return {
        results: [],
        generate: null,
      };
    }

    let recipe = new __WEBPACK_IMPORTED_MODULE_1__recipe_recipe_js__["a" /* default */]();
    recipe.setSearchPhrase(this._search);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__["a" /* default */])(recipe.normalize());
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__["a" /* default */])(!recipe.isResolved())

    return {
      results: [{
        result: recipe,
        score: 0,
        derivation: [{strategy: this, parent: undefined}],
        hash: recipe.digest(),
      }],
      generate: null,
    };
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = InitSearch;
;


/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipe_walker_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__recipe_recipe_util_js__ = __webpack_require__(6);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt






class MapConsumedSlots extends __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__["a" /* Strategy */] {
  async generate(strategizer) {
    var results = __WEBPACK_IMPORTED_MODULE_1__recipe_recipe_js__["a" /* default */].over(this.getResults(strategizer), new class extends __WEBPACK_IMPORTED_MODULE_2__recipe_walker_js__["a" /* default */] {
      onSlotConnection(recipe, slotConnection) {
        if (slotConnection.targetSlot)
          return;
        var potentialSlots = recipe.slots.filter(slot => {
          if (slotConnection.name != slot.name)
            return false;

          if (!slot.sourceConnection) {
            return;
          }

          let providedSlotSpec =
              slot.sourceConnection.slotSpec.providedSlots.find(ps => ps.name == slotConnection.name);
          if (slotConnection.slotSpec.isSet != providedSlotSpec.isSet)
            return;

          // Verify view connections match.
          var views = slot.viewConnections.map(connection => connection.view);
          if (views.length == 0) {
            return true;
          }
          var particle = slotConnection.particle;
          for (var name in particle.connections) {
            var connection = particle.connections[name];
            if (views.includes(connection.view))
              return true;
          }
          return false;
        });
        return potentialSlots.map(slot => {
          return (recipe, slotConnection) => {
            let clonedSlot = recipe.updateToClone({slot})
            slotConnection.connectToSlot(clonedSlot.slot);
            return 1;
          };
        });
      }
    }(__WEBPACK_IMPORTED_MODULE_2__recipe_walker_js__["a" /* default */].Permuted), this);

    return { results, generate: null };
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MapConsumedSlots;



/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipe_walker_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__recipe_recipe_util_js__ = __webpack_require__(6);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt






class MapRemoteSlots extends __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__["a" /* Strategy */] {
  constructor(arc) {
    super();
    this.remoteSlots = arc.pec.slotComposer ? arc.pec.slotComposer.getAvailableSlots() : {};
  }
  async generate(strategizer) {
    var remoteSlots = this.remoteSlots;
    var results = __WEBPACK_IMPORTED_MODULE_1__recipe_recipe_js__["a" /* default */].over(this.getResults(strategizer), new class extends __WEBPACK_IMPORTED_MODULE_2__recipe_walker_js__["a" /* default */] {
      onSlotConnection(recipe, slotConnection) {
        if (slotConnection.targetSlot && slotConnection.targetSlot.id)
          return;
        if (remoteSlots[slotConnection.name] == undefined)
          return;

        let matchingSlots = remoteSlots[slotConnection.name].filter(remoteSlot => {
          if (slotConnection.slotSpec.isSet != remoteSlot.providedSlotSpec.isSet) {
            return false;
          }

          var views = remoteSlot.views;
          let viewsMatch = false;
          if (views.length == 0) {
            return true;
          } else {
            var particle = slotConnection.particle;
            for (var name in particle.connections) {
              var connection = particle.connections[name];
              if (!connection.view)
                continue;
              if (views.find(v => v.id == connection.view.id)) {
                return true;
              }
            }
          }
          return false;
        });
        if (matchingSlots.length == 0) {
          return;
        }
        matchingSlots.sort((s1, s2) => {
          let score1 = 1 - s1.count;
          let score2 = 1 - s2.count;
          return score2 - score1;
        });
        let remoteSlotId = matchingSlots[0].id;
        let score = 1 - matchingSlots[0].count;

        return (recipe, slotConnection) => {
          if (!slotConnection.targetSlot) {
            let slot = recipe.slots.find(slot => {
              return (slot.id == remoteSlotId) || (!slot.id && (slot.name == slotConnection.name));
            });
            if (!slot) {
              slot = recipe.newSlot(slotConnection.name);
            }
            slotConnection.connectToSlot(slot);
          }
          slotConnection.targetSlot.id = remoteSlotId;
          return score;
        }
      }
    }(__WEBPACK_IMPORTED_MODULE_2__recipe_walker_js__["a" /* default */].Permuted), this);

    return { results, generate: null };
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MapRemoteSlots;



/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipe_walker_js__ = __webpack_require__(3);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt





class MatchParticleByVerb extends __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__["a" /* Strategy */] {
  constructor(arc) {
    super();
    this._arc = arc;
  }

  async generate(strategizer) {
    var arc = this._arc;
    var results = __WEBPACK_IMPORTED_MODULE_1__recipe_recipe_js__["a" /* default */].over(this.getResults(strategizer), new class extends __WEBPACK_IMPORTED_MODULE_2__recipe_walker_js__["a" /* default */] {
      onParticle(recipe, particle) {
        if (particle.name) {
          // Particle already has explicit name.
          return;
        }

        let particleSpecs = arc.context.findParticlesByVerb(particle.primaryVerb)
            .filter(spec => !arc.pec.slotComposer || spec.matchAffordance(arc.pec.slotComposer.affordance))

        return particleSpecs.map(spec => {
          return (recipe, particle) => {
            let score = 1;

            particle.name = spec.name;
            particle.spec = spec;

            return score;
          };
        });
      }
    }(__WEBPACK_IMPORTED_MODULE_2__recipe_walker_js__["a" /* default */].Permuted), this);

    return { results, generate: null };
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MatchParticleByVerb;
;


/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipe_walker_js__ = __webpack_require__(3);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt





class NameUnnamedConnections extends __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__["a" /* Strategy */] {
  async generate(strategizer) {
    var results = __WEBPACK_IMPORTED_MODULE_1__recipe_recipe_js__["a" /* default */].over(this.getResults(strategizer), new class extends __WEBPACK_IMPORTED_MODULE_2__recipe_walker_js__["a" /* default */] {
      onViewConnection(recipe, viewConnection) {
        if (viewConnection.name)
          return;   // it is already named.

        if (!viewConnection.particle.spec)
          return;   // the particle doesn't have spec yet.

        let possibleSpecConns = viewConnection.particle.spec.connections.filter(specConn => {
          // filter specs with matching types that don't have views bound to the corresponding view connection.
          return !specConn.isOptional &&
                 viewConnection.view.type.equals(specConn.type) &&
                 !viewConnection.particle.getConnectionByName(specConn.name).view;
        });

        return possibleSpecConns.map(specConn => {
          return (recipe, viewConnection) => {
            viewConnection.particle.nameConnection(viewConnection, specConn.name);
            return 1;
          };
        });
      }
    }(__WEBPACK_IMPORTED_MODULE_2__recipe_walker_js__["a" /* default */].Permuted), this);

    return { results, generate: null };
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = NameUnnamedConnections;



/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__recipe_walker_js__ = __webpack_require__(3);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt






class SearchTokensToParticles extends __WEBPACK_IMPORTED_MODULE_1__strategizer_strategizer_js__["a" /* Strategy */] {
  constructor(arc) {
    super();
    // TODO: Recipes. Views?
    this._byToken = {};
    for (let particle of arc.context.particles) {
      let name = particle.name.toLowerCase();
      this._addParticle(name, particle);

      let verb = particle.primaryVerb;
      if (verb != name) {
        this._addParticle(verb, particle);
      }
    }

    let findParticles = token => this._byToken[token] || [];
    class Walker extends __WEBPACK_IMPORTED_MODULE_3__recipe_walker_js__["a" /* default */] {
      onRecipe(recipe) {
        if (!recipe.search || !recipe.search.unresolvedTokens.length) {
          return;
        }

        let specsByToken = {};
        for (let token of recipe.search.unresolvedTokens) {
          for (let spec of findParticles(token)) {
            // TODO: Skip particles that are already in the active recipe?
            specsByToken[token] = specsByToken[token] || [];
            specsByToken[token].push(spec)
          }
        }
        let resolvedTokens = Object.keys(specsByToken);
        if (resolvedTokens.length == 0) {
          return;
        }

        const flatten = (arr) => [].concat.apply([], arr);
        const product = (...sets) =>
          sets.reduce((acc, set) =>
            flatten(acc.map(x => set.map(y => [ ...x, y ]))),
            [[]]);
        let possibleCombinations = product.apply(null, Object.values(specsByToken).map(v => flatten(v)));

        return possibleCombinations.map(combination => {
          return recipe => {
            resolvedTokens.forEach(token => recipe.search.resolveToken(token));
            combination.forEach(spec => {
              let particle = recipe.newParticle(spec.name);
              particle.spec = spec;
            });
            return resolvedTokens.size;
          };
        });
      }
    };
    this._walker = new Walker(__WEBPACK_IMPORTED_MODULE_3__recipe_walker_js__["a" /* default */].Permuted);
  }

  get walker() {
    return this._walker;
  }

  getResults(strategizer) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(strategizer);
    let generated = super.getResults(strategizer).filter(result => !result.result.isResolved());
    let terminal = strategizer.terminal;
    return [...generated, ...terminal];
  }

  _addParticle(token, particle) {
    this._byToken[token] = this._byToken[token] || [];
    this._byToken[token].push(particle);
  }
  async generate(strategizer) {
    return {
      results: __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__["a" /* default */].over(this.getResults(strategizer), this.walker, this),
      generate: null,
    };
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SearchTokensToParticles;
;


/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt


class TypeVariable {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.resolution = null;
  }

  toLiteral() {
    return this;
  }

  fromLiteral(data) {
    return new TypeVariable(data.name, data.id);
  }

  get isResolved() {
    return this.resolution !== undefined;
  }

  resolve(type) {
    this.resolution = type;
  }

}

/* harmony default export */ __webpack_exports__["a"] = (TypeVariable);


/***/ })
/******/ ]);
//# sourceMappingURL=ArcsLib.js.map