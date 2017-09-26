# arcs-cdn/app

# 
## Arcs Applications

### Arcs Webapp

https://polymerlabs.github.io/arcs-cdn/v0.1/app/

The webapp can be configured with URL parameters:

* manifest=[path]
  * Uses manifest at [path] in addition to the set of manifests published in the Arcs (admin) database.
* solo=[path]
  * Uses only the manifest at [path] to bootstrap the Arc context.
* nokey
  * do not persist this arc (i.e. no `amkey` is assigned)
* root=[path]
  * override the root path used to locate CDN resources (advanced).
* user=[name]
  * select or create user with [name]

Example:

https://polymerlabs.github.io/arcs-cdn/v0.1/app/?nokey&manifest=arcs.manifest

### Arcs VR

https://polymerlabs.github.io/arcs-cdn/v0.1/vr/ (currently broken)

### Arcs ChromeCast

TBD.

### Arcs Home

TBD.

## Versions and Development

Generally the pattern for resources is:

`...arcs-cdn/[version]/...`

Where `[version]` is `v[Major].[Minor].[Release]`.

There is some basic semver support, so `arcs-cdn/v0.1/app` will call up the latest version of `app` that matches `0.1.*`.

The _in-development_ version is at version `dev` (e.g. https://polymerlabs.github.io/arcs-cdn/dev/app/). This version has no SLA (it may be broken at any particular time).

## Build Process

The Arcs engine and some other primary resources live in PolymerLabs/Arcs repository. Here are instructions on how to rebuild

1. Have local checkouts of **arcs** and **arcs-cdn** as siblings (i.e. the gulpfile in arcs-cdn expects to find mainline source code in ../arcs).

	**[path]/arcs
	[path]/arcs-cdn**

2. Install npm utilities for arcs-cdn (one time).

	[path]/arcs-cdn/> **npm install**

3. Build browser-loadable artifacts

	[path]/arcs-cdn/> **gulp**

4. Built artifacts should appear in [path]/arcs-cdn/**master**/lib.

5. Update playground/ or other files as needed.

6. To cut a new version, simply copy /**master**/ to /**vX.Y.Z**/
