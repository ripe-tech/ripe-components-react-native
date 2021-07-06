# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

* Fallback image on loading error in avatar component
* Checkbox component
* Input component
* Select component
* Radio button component
* Snackbar component
* Progress bar component
* Toggle button component
* Multiple files selection with image picker
* Date input component
* Switcher component
* Input animated component
* Added `animateScrollBottom` prop to chat
* `onScroll` and `onScrollBottom` props in chat component
* Radio group component
* Added three types of borders to key value sections: `"none"`, `"soft"` (default) or `"hard"`

### Changed

*

### Fixed

* `normalizeImages` function handling of images coming from camera
* `onRichTextInputPhotoAdded` function in chat component as from the time the `react-native-image-picker` was bumped to v4.0, there is no need to force an array in attachment property

## [0.4.0] - 2021-04-07

### Added

* Added Pick from image from gallery
* Added `photos` icon to the icons library
* Support for `onSelectedTabTouch` event

## [0.3.3] - 2021-03-02

### Added

* Add scroll to tabs

## [0.3.2] - 2021-03-02

### Fixed

* Send message text with attachments

## [0.3.1] - 2021-02-20

### Fixed

* Support for attachments with names containing white spaces
* Height of Textarea component in ios
