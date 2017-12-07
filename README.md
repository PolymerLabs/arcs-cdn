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
