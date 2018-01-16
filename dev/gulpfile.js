// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

const gulp = require('gulp');
const execSync = require('child_process').execSync;
const path = require('path');
const resolve = path.resolve;
const sep = path.sep;
const argv = require('yargs').argv;

const target = `./lib`;

const paths = {
  build: `${target}`
};

const sources = {
  cdn: [
    'worker-entry-cdn.js',
    'ArcsLib.js',
    'Tracelib.js'
  ]
};

let arcsBuild = async (path) => {
  try {
    const options = {cwd: resolve(path), stdio: 'inherit'};
    await execSync('npm install', options);

    await execSync(`node tools${sep}sigh.js`, options);
  } catch(e) {
    console.log(`error running arcs build`, e);

    // allow the arcs-cdn build to be continued even if the arcs build is
    // failing. This is ideally a rarer case (so it's an option, not the
    // default); hopefully arcs is working, and it's hard to predict if
    // arcs-cdn will work if the arcs upon which it's based is known to be
    // failing.
    if (!argv.ignoreArcFailure) {
      throw Error(`********************
  There was an error executing the arcs build.
  To copy arcs-runtime despite the failure(not recommended), run 'gulp --ignore-arc-failure'.
  Otherwise, fix the build issues in arcs and re-run.
  ********************`);
    }
  }
};

gulp.task('arcs-build', async function() {
  await arcsBuild(arcs);
});

let pack = async (files) => {
  try {
    const webpack = require('webpack');
    let node = {
      fs: 'empty',
      mkdirp: 'empty',
      minimist: 'empty',
    };
    for (let file of files) {
      await new Promise((resolve, reject) => {
        webpack({
          entry: `./source/${file}`,
          output: {
            filename: `./${paths.build}/${file}`,
          },
          node,
          devtool: 'sourcemap',
        }, (err, stats) => {
          if (err) {
            reject(err);
          }
          console.log(stats.toString({colors: true, verbose: true}));
          resolve();
        });
      });
    }

  } catch(x) {
    // in case of emergency, break glass .. then stay calm and carry on watching
    console.log(x);
  }
};

gulp.task('copy-runtime', ['arcs-build'], async function() {
  await pack(sources.cdn);
});

const components = `${target}components/`;
const arcs = `../../arcs/`;
const browserlib = `runtime/browser/lib/`;

const strategyExplorer = `strategy-explorer`;
const suggestionsElement = `suggestions-element.js`;
const glob = `/**/*`;

gulp.task('copy-support', ['arcs-build'], function () {
  gulp.src(`${arcs}${strategyExplorer}${glob}`).pipe(gulp.dest(`${components}${strategyExplorer}`));
  gulp.src(`${arcs}${browserlib}${suggestionsElement}`).pipe(gulp.dest(`${components}`));
});

gulp.task('default', ['arcs-build', 'copy-runtime'/*,'copy-support'*/]);
