# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

* Add new profile component

### Changed

* Better color for the tabs text, removed the bold font on selected
* Add right padding in select to account for the arrow icon space.
* Improve listing filter selects to adapt available space.

### Fixed

*

## [0.5.1] - 2021-07-26

### Changed

* Adapt select left padding to be consistent among other components

## [0.5.0] - 2021-07-20

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
* Image carrousel component
* Input animated component
* Added `animateScrollBottom` prop to chat
* `onScroll` and `onScrollBottom` props in chat component
* Radio group component
* Added three types of borders to key value sections: `"none"`, `"soft"` (default) or `"hard"`
* Textarea support for background color, horizontal padding and font size as props
* Input keyboard type support
* Input Form component
* Possibility to override icon props in `tabs` and `button-tab`
* Checkbox group component
* Support for `Avatar`'s image change
* Support for `View more` button in key-values
* Date Input support for margin and border overriding as props
* Form component
* Support for URI and SVG direct import option for `Icon`

### Changed

* `ContainerOpenable` knob visibility controlled by props
* `ContainerOpenable` overlay opacity controlled by props

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
