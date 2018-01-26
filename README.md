[![Build Status](https://travis-ci.org/PolymerLabs/arcs-cdn.svg?branch=gh-pages)](https://travis-ci.org/PolymerLabs/arcs-cdn)

# arcs-cdn

## Versions and Development

Generally the pattern for resources is:

`arcs-cdn/[version]/...`

Where `[version]` is `v[Major].[Minor].[Release]`.

There is some basic semver support, so `arcs-cdn/v0.1/app` will call up the latest version of `app` that matches `0.1.*`.

The _in-development_ version is at version `dev` (e.g. https://polymerlabs.github.io/arcs-cdn/dev/apps/web/). This version has no SLA (it may be broken at any particular time).

## READMEs

- See `arcs-cdn/[version]/README.md` for general information about `[version]`.
- See `arcs-cdn/[version]/apps/[app]/README.me` for information about using `[app]`.

## Tests

Tests can be run across all versions from the top-level, including both unit
tests and selenium tests. To run all tests, first start a web server on port
8080 that serves from the arcs-cdn directory as the root. One is provided,
simply:

```
arcs-cdn> npm install
arcs-cdn> npm start
```

That server will block, so you'll need to use a new shell to run tests:

```
arcs-cdn> npm test
```

### Debugging Selenium Failures

Selenium failures are often easy to cause due to seemingly unrelated changes,
and difficult to diagnose.

There are 2 main avenues to debug them in this system. The first is to have
the browser run in a graphical manner (as opposed to the default headless
configuration). The second is to actually debug the running selenium instance.

There are some debugging hints (code and configuration you can uncomment to
make debugging easier) in `test/specs/start-test.js` and `test/wdio.conf.js`
marked with the phrase `debug hint`.

#### Graphical (non-headless)

It may be easiest to see the problem in a browser window to diagnose it. Edit
`wdio.conf.js` in the branch with failures, comment out the `'--headless'`
option and increase the mocha timeout. In combination, these two changes will
allow you to see what's happening on the screen, and will give you enough time
to debug the situation.

```
arcs-cdn> vi dev/test/wdio.conf.js
arcs-cdn> git diff dev/test/wdio.conf.js
diff --git a/dev/test/wdio.conf.js b/dev/test/wdio.conf.js
index 0e36452..8ecf3d6 100644
--- a/dev/test/wdio.conf.js
+++ b/dev/test/wdio.conf.js
@@ -50,7 +50,7 @@ exports.config = {
       chromeOptions: {
         args: [
           // arcs note: comment this out to see the system running
-          '--headless'
+          // '--headless'
         ]
       }
     }
@@ -139,7 +139,7 @@ exports.config = {
   mochaOpts: {
     ui: 'bdd',
     // arcs note: increase this timeout for debugging
-    timeout: 20003
+    timeout: 2000003
   }
   //
   // =====
```

Then, in your test, you can add a breakpoint (via `browser.debug();`) to pause
execution so you can debug in the browser. It may be worthwhile to add several
`browser.debug()` invocations through your flow to trace execution (`.exit`
will exit the debugger and continue execution of the test).

At that point you can open up DevTools in the browser to debug the current
state, or inspect it visually. Some utilities (those in `selenium-utils.js`,
including pierceShadows) have already been loaded.

There are also some commands available natively at that point, including
`.help` and the `browser` variable (including methods such as
`browser.execute()`).

#### Attaching a Debugger

To attach a debugger, uncomment the execArgv `--inspect` configuration option.
It's likely that you'll still want to have increased the mochaTimeout and to
be running graphically, so those are in the example as well:

```
arcs-cdn> git diff dev/test/wdio.conf.js
diff --git a/dev/test/wdio.conf.js b/dev/test/wdio.conf.js
index 0e36452..4240c0a 100644
--- a/dev/test/wdio.conf.js
+++ b/dev/test/wdio.conf.js
@@ -50,11 +50,12 @@ exports.config = {
       chromeOptions: {
         args: [
           // arcs note: comment this out to see the system running
-          '--headless'
+          // '--headless'
         ]
       }
     }
   ],
+  execArgv: ['--inspect'],
   //
   // ===================
   // Test Configurations
@@ -139,7 +140,7 @@ exports.config = {
   mochaOpts: {
     ui: 'bdd',
     // arcs note: increase this timeout for debugging
-    timeout: 20003
+    timeout: 2000003
   }
   //
   // =====
```

When starting, you should see log item like `debugger listening on
ws://127.0.0.1:9229/..` as normally appears for [node
debugging](https://nodejs.org/api/debugger.html). Passing the `--inspect`
argument will also enable the [V8 Inspector
Integration](https://nodejs.org/api/debugger.html) which may be easier to use
(to activate this, look for a node icon in a Chrome DevTools process).

Adding `debugger;` statements may be the easiest way to activate the debugger.
Using `browser.debug();` statements to pause execution to give you time to
attach a debugger may be helpful as well.
