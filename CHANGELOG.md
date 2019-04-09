# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).



## Unreleased

### Changed
- Raised the minimal Node requirement to 8.


## [2.0.0-alpha.3] - 2019-04-08

### Changed
- Upgraded to Ember Canary (internally).
- Removed dependency on `ember-awesome-macros` and `ember-macro-helpers`.
- Account for current placeholder padding when determining next placeholder position.
- Added bottom padding to the `body` of the demo app, fixes nested list jumping issue.
  
## Documentation
- Updated the version of the Ember CLI badge.

## [2.0.0-alpha.2] - 2019-04-03

### Changed
- Upgraded to Ember CLI 3.8, got rid of jQuery dependency. :warning: Nested lists don't work in Ember without jQuery, see https://github.com/emberjs/ember.js/issues/17840
- Moved to kaliber5/ember-drag-sort
- Adjusted code style/linting

## [1.1.1] - 2017-11-15
### Fixed
* Fixed placeholder jumping around in nested lists, by [@lolmaus](https://github.com/lolmaus/)


## [1.1.0] - 2017-11-14
### Added
* Table demo ([#12](https://github.com/Deveo/ember-drag-sort/issues/12), reported by [@livfwd](https://github.com/livfwd), fixed by [@lolmaus](https://github.com/lolmaus/))

### Tech debt
* Upgraded to Ember CLI 2.16.2
* Migrated to new module imports (RFC 176)

## [1.0.2] - 2017-10-3
### Fixed
* Make ember-awesome-macros a dependency instead of subdependency ([#11](https://github.com/Deveo/ember-drag-sort/issues/11), fixed by [@lolmaus](https://github.com/lolmaus/))

## [1.0.1] - 2017-09-30
### Added
* Make page objects aware of drag handles ([#10](https://github.com/Deveo/ember-drag-sort/issues/10), implemented by [@lolmaus](https://github.com/lolmaus/))

## [1.0.0] - 2017-09-11
### Added
* Drag handle ([#5](https://github.com/Deveo/ember-drag-sort/issues/5), implemented by [@lolmaus](https://github.com/lolmaus/))

## [1.0.0-beta-0] - 2017-08-31
### Added
* Unsortable lists ([#4](https://github.com/Deveo/ember-drag-sort/pull/4), implemented by [@lolmaus](https://github.com/lolmaus/))

## [1.0.0-alpha.9] - 2017-05-22
Public release.
