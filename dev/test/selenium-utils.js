/*
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */


let debug = true;

/**
 * Traverse the list of query selectors. After each selector, both the shadow
 * & light DOM trees will be traversed.
 *
 * Selectors must be specific - if a selector matches multiple items
 * (including results in both the light & shadow trees) this method will error
 * out.
 */
function pierceShadows(querySelectors) {
  return _pierceShadows(document, querySelectors);
}

function _pierceShadows(node, querySelectors, depth) {
  if (undefined===depth) depth=0;


  let remainingSelectors = querySelectors.slice(1);
  let nextNode = node.querySelectorAll(querySelectors[0]);
  if (nextNode.length>1) {
    throw `too many results for selector ${querySelectors[0]}: ${nextNode}`;
  }
  nextNode = nextNode[0];


  // all done
  if (0==remainingSelectors.length) {
    !debug || console.log(`${Array(depth+1).join(' ')}end of recursion at ${nextNode}`);
    return nextNode;
  } else {
    let light, shadow;
    if (nextNode) {
      !debug || console.log(`${Array(depth+1).join(' ')}descending to light ${nextNode} with selector ${remainingSelectors[0]}`);
      light = _pierceShadows(nextNode, remainingSelectors, depth+1);
    }
    if (nextNode && nextNode.shadowRoot) {
      !debug || console.log(`${Array(depth+1).join(' ')}descending to shadow ${nextNode.shadowRoot} with selector ${remainingSelectors[0]}`);
      shadow = _pierceShadows(nextNode.shadowRoot, remainingSelectors, depth+1);
    }
    !debug || console.log(`${Array(depth+1).join(' ')}returning light ${light} and shadow ${shadow}`);

    if (light && shadow) {
      throw `both light & shadow roots were valid; please use a more selective descriptor (${light}, ${shadow})`;
    }

    return light || shadow;
  }
}
