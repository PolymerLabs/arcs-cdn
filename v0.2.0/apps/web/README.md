# arcs-cdn

## Arcs Webapp

https://polymerlabs.github.io/arcs-cdn/v0.2/apps/web/

The webapp can be configured with URL parameters:

* solo=[path]
  * Uses only the manifest at [path] to bootstrap the Arc context.
* manifest=[path]
  * Uses manifest at [path] in addition to the set of manifests published in the Arcs (admin) database.
* nokey
  * do not persist this arc (i.e. no `amkey` is assigned)
* user=[name]
  * select or create user with [name]
* search=[search terms]
  * preload the search box with [search terms]
* root=[path]
  * override the root path used to locate CDN resources (advanced).

Example:

https://polymerlabs.github.io/arcs-cdn/v0.2/apps/web/?nokey&solo=arcs.manifest
