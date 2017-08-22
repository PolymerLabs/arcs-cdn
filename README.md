# arcs-cdn

Build Process

1. Have local checkouts of **arcs** and **arcs-cdn** as siblings (i.e. the gulpfile in arcs-cdn expects to find mainline source code in ../arcs).

	**[path]/arcs  
	[path]/arcs-cdn**

2. Install npm utilities for arcs-cdn (one time).

	[path]/arcs-cdn/> **npm install**

3. Check **gulpfile.js**, ensure correct build target (version number) is set there.

4. Build artifacts  

	[path]/arcs-cdn/> **gulp**

5. Built artifacts should appear in [path]/arcs-cdn/**[version]**/.

6. Update playground/ or other files as needed.

7. Commit/push the arcs-cdn repo.
