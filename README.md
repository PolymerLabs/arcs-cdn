# arcs-cdn

Build Process

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
