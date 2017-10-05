# arcs-cdn

## Arcs Applications

### Arcs Webapp

https://polymerlabs.github.io/arcs-cdn/v0.2/apps/web/

### Arcs VR

https://polymerlabs.github.io/arcs-cdn/v0.2/apps/vr/

### Arcs ChromeCast

https://polymerlabs.github.io/arcs-cdn/v0.2/apps/chromecast/

### Arcs Home

TBD.

## Build Process

The Arcs engine and some other primary resources live in PolymerLabs/Arcs repository. Here are instructions on how to rebuild

Initial Setup

1. Have local checkouts of **arcs** and **arcs-cdn** as siblings (i.e. the gulpfile in arcs-cdn expects to find mainline source code in ../arcs).

	**[path]/arcs
	[path]/arcs-cdn**

2. Install npm utilities for arcs-cdn (one time).

	[path]/arcs-cdn/> **npm install**

Building Arcs Lib

1. Build browser-loadable artifacts

	[path]/arcs-cdn/[version]/> **gulp**

2. Built artifacts should appear in [path]/arcs-cdn/[version]/lib.
