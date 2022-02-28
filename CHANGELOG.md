# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

*

### Changed

*

### Fixed

*

## [0.19.0] - 2022-02-25

### Added

* Support for `Profile` key value action buttons - [ripe-id-mobile/#58](https://github.com/ripe-tech/ripe-id-mobile/issues/58)

### Changed

* Update `Profile` and bring it closer to the design - [ripe-id-mobile/#58](https://github.com/ripe-tech/ripe-id-mobile/issues/58)

### Fixed

* Use index of current route to choose the selected tab in `Tabs` component - [#301](https://github.com/ripe-tech/ripe-components-react-native/issues/301)
* Use the same margin horizontal in `Item` as the one being used in other components
* Align expand buttons in `KeyValues` to the center in tablet screens
* Align images in chat to the left and fix text wrap
* Horizontal padding for button group in `Profile`

## [0.18.0] - 2022-02-21

### Changed

* Bumped dependencies and dropped support for Node 10

## [0.17.0] - 2022-02-15

### Changed

* Bumped dependency versions

## [0.16.0] - 2022-02-11

### Added

* Added `source` prop to `Lightbox`

### Changed

* Added new variant to `TabsText` and `ButtonTabText` to reflect the new design - [ripe-robin-revamp/#315](https://github.com/ripe-tech/ripe-robin-revamp/issues/315)
* Scroll on tab selected in `TabsText` now tries to show all tabs next to the one selected - [ripe-robin-revamp/#315](https://github.com/ripe-tech/ripe-robin-revamp/issues/315)

### Fixed

* Remove margin for iOS for profile specific key values
* Box shadow mismatch between iOS and Android for `Item`

## [0.15.0] - 2022-02-04

### Changed

* Added props specific to the image in `Lightbox`

## [0.14.0] - 2022-02-04

### Changed

* Added support for different icon and icon properties when `ButtonTab` is selected - [ripe-robin-revamp/#314](https://github.com/ripe-tech/ripe-robin-revamp/issues/314)
* `Tabs` now can change icon when selected and can show an animated bar that moves when a new tab is selected - [ripe-robin-revamp/#314](https://github.com/ripe-tech/ripe-robin-revamp/issues/314)

## [0.13.0] - 2022-02-04

### Added

* Added URL prefix for some fields of the profile component
* Support for modal-like image viewing and zooming - [#286](https://github.com/ripe-tech/ripe-components-react-native/issues/286)

### Fixed

* Apply padding horizontal to button group in profile component
* Made button horizontal padding similar to the key-value padding

## [0.12.0] - 2021-12-10

### Added

* Added `GradientAnimated` component, which is an animated linear gradient

### Fixed

* ImageCarrousel 'isTabletSize' import [#284](https://github.com/ripe-tech/ripe-components-react-native/pull/284)

## [0.11.0] - 2021-10-11

### Added

* Added loading indicator positioning in button

### Changed

* Increase keyboard key spacing
* Improved icon support for keyboard

## [0.10.0] - 2021-08-31

### Added

* Add new keyboard component [#274](https://github.com/ripe-tech/ripe-components-react-native/pull/274#issuecomment-906492859)

### Changed

* Button icon support for external icons

## [0.9.0] - 2021-08-23

### Added

* Button support for style override
* Button support for left and right icons as well as left and right slots
* Ability to override the entiry stylesheet in any component

### Changed

* Button alignment changed to keywords `left`, `right`, `center` and `spacing`

## [0.8.0] - 2021-08-04

### Added

* Applications list component responsible for listing all mobile applications and allows navigation to them

## [0.7.0] - 2021-08-04

### Added

* Screen mixin responsible for changing the StatusBar color - [#259](https://github.com/ripe-tech/ripe-components-react-native/pull/259)
* Chat displays an icon when it has no messages - [#258](https://github.com/ripe-tech/ripe-components-react-native/pull/258)

## [0.6.0] - 2021-07-30

### Added

* Add new profile component
* Add `onEndReachedThreshold`, `refreshing`, `loading` and `onFilter` props to listing
* Add message info in chat when there is no messages to display

### Changed

* Better color for the tabs text, removed the bold font on selected
* Add right padding in select to account for the arrow icon space
* Listing filter selects adapting for the available space
* Add right padding in select to account for the arrow icon space

### Fixed

* Touchable area not being fully covered on select
* Avoid chat scrolling when being opened for the first time

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
