# arcs-cdn

Build Process

1. Have local checkouts of **arcs** and **arcs-cdn** as siblings (i.e. the gulpfile in arcs-cdn expects to find mainline source code in ../arcs).

	**[path]/arcs  
	[path]/arcs-cdn**

2. Install npm utilities for arcs-cdn (one time).

	[path]/arcs-cdn/> **npm install**

3. Check target, build artifacts  
  a. check **gulpfile.js**, build target (version number) is set there  
  b. [path]/arcs-cdn/> **gulp**

4. Built artifacts should appear in [path]/arcs-cdn/**[version]**/ (ArcsLib.js [+.map], and worker-entry-cdn.js [+.map]).

5. Update playground/ or other files as needed.

6. Commit/push the arcs-cdn repo.
