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
  const options = {cwd: resolve(path), stdio: 'inherit'};
  await execSync('npm install', options);
  await execSync(`node tools${sep}sigh.js`, options);
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

gulp.task('build', ['arcs-build'], async function() {
  await pack(sources.cdn);
});

const components = `${target}components/`;
const arcs = `../../arcs/`;
const browserlib = `runtime/browser/lib/`;

const strategyExplorer = `strategy-explorer`;
const suggestionsElement = `suggestions-element.js`;
const glob = `/**/*`;

gulp.task('copy', function () {
  gulp.src(`${arcs}${strategyExplorer}${glob}`).pipe(gulp.dest(`${components}${strategyExplorer}`));
  gulp.src(`${arcs}${browserlib}${suggestionsElement}`).pipe(gulp.dest(`${components}`));
});

gulp.task('default', ['build'/*,'copy'*/]);

