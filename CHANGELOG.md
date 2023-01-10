# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

* Add pagination to `chat` by integrating the use of the `listing` component - [#340](https://github.com/ripe-tech/ripe-robin-revamp/issues/340)
* Add and adapt to newest chat message placeholder refresh component - [#340](https://github.com/ripe-tech/ripe-robin-revamp/issues/340)

### Changed

* Small style improvements to be consistent with the original design
* Small change in the alias used in listing filter components - [#340](https://github.com/ripe-tech/ripe-robin-revamp/issues/340)

### Fixed

* Fix tab visibility undesired extra padding - [ripe-robin-revamp/#472](https://github.com/ripe-tech/ripe-robin-revamp/issues/472])
* Fix spam and error icons - [ripe-robin-revamp/#464](https://github.com/ripe-tech/ripe-robin-revamp/issues/464)
* Fix send-alt icon viewport and size - [ripe-robin-revamp/#464](https://github.com/ripe-tech/ripe-robin-revamp/issues/464)

## [0.27.7] - 2022-10-21

### Changed

* Add sections to `key-values` components - [ripe-robin-revamp/#330](https://github.com/ripe-tech/ripe-robin-revamp/issues/330)
* Changed position of loading indicator for `listing` component
* Add `send-alt` icon - [ripe-robin-revamp/#464](https://github.com/ripe-tech/ripe-robin-revamp/issues/464)

### Fixed

* Fix `spam` icon with missing dot - [ripe-robin-revamp/#464](https://github.com/ripe-tech/ripe-robin-revamp/issues/464)

## [0.27.6] - 2022-09-20

### Changed

* Changed default loading indicator color to gray

## [0.27.5] - 2022-09-19

### Added

* Add and adapt to use new prop `inputIOSStyle` to override `select` color in `listing`

## [0.27.4] - 2022-09-19

### Fixed

* Including `*.svga` files in `package.json`


## [0.27.3] - 2022-09-14

### Changed

* Updated volume and mute icons

### Fixed

* Fixed not showing none messages animation in `chat` component

## [0.27.2] - 2022-09-14

### Added

* Allow to use a different border color when search input is focused

## [0.27.1] - 2022-09-10

### Fixed

* Dependency issues

## [0.27.0] - 2022-09-10

### Changed

* Adapt component labels to come from props allowing for label translations - [ripe-robin-revamp/#377](https://github.com/ripe-tech/ripe-robin-revamp/issues/377)
* Bumped dependency versions

## [0.26.0] - 2022-08-29

### Changed

* Bump react-native version to `0.68.3`

## [0.25.0] - 2022-08-03

### Added

* Add details prop to `Profile` to override account profile details - [ripe-robin-revamp/#351](https://github.com/ripe-tech/ripe-robin-revamp/issues/351)
* Add more color scheme props to `Chat` and `Listing` components - [ripe-robin-revamp/#372](https://github.com/ripe-tech/ripe-robin-revamp/issues/372)

### Changed

* Adapt to latest profile buttons design - [#392](https://github.com/ripe-tech/ripe-robin-revamp/issues/392)

## [0.24.0] - 2022-06-20

### Added

* Add `textStyle` prop to `ToastMessage`
* Add border to `Search` component
* Add `renderContentRefreshing` prop to `Listing` allowing content override when refreshing - [ripe-robin-revamp/#360](https://github.com/ripe-tech/ripe-robin-revamp/issues/360)
* Add more styling props for `tabs`, `key-values` and `profile` components - [ripe-robin-revamp/#372](https://github.com/ripe-tech/ripe-robin-revamp/issues/372)

### Changed

* Add node versions `17` and `18` to the Github workflow
* Add animation instead of `no-message` icon in `chat.js` - [ripe-robin-revamp/#380](https://github.com/ripe-tech/ripe-robin-revamp/issues/380)

### Fixed

* Increase top padding in `ChatMessage` content
* Fix misalignment in replies text in `ChatMessage`
* Fix the placeholder text appearance in search input expand animation - [ripe-robin-revamp/#329](https://github.com/ripe-tech/ripe-robin-revamp/issues/329)
* Fix problem with `@react-native-community/eslint-config@3.0.2` that causes the `lint` command to fail
* Switch deprecated svgo config

## [0.23.0] - 2022-04-29

### Changed

* Allow gesture movements on the whole container of `ContainerOpenable`, controllable by prop
* Prop that controls if the `ContainerOpenable` closes on tap

## [0.22.0] - 2022-04-21

### Added

* New `beforeMessages` prop to `Chat` component - [ripe-robin-revamp/#346](https://github.com/ripe-tech/ripe-robin-revamp/issues/346)

### Changed

* Decrease `ButtonTabText` text size and increase `ButtonTab` icon size
* Remove default border from `StatusEntry`, increase padding and change font
* Add new `Tag` medium size and change default font to bold
* Increase spacing between element in `ChatMessage`
* Increase font size of `View More` text in `KeyValues`
* Increase font size for iOS in `Select`
* Make buttons round for touch feedback for Android
* Support for no overlay and height control from parent in `ContainerOpenable`

## [0.21.0] - 2022-04-08

### Added

* New component `Attachment` that shows a file info and works as a link - [ripe-robin-revamp/#347](https://github.com/ripe-tech/ripe-robin-revamp/issues/347)
* New component `StatusEntry` that shows the status change entry in a chat - [ripe-robin-revamp/#345](https://github.com/ripe-tech/ripe-robin-revamp/issues/345)
* New component `AvatarList` that shows avatars in list form - [ripe-robin-revamp/#347](https://github.com/ripe-tech/ripe-robin-revamp/issues/347)
* New loading indicator by prop for `ButtonIcon` - [ripe-robin-revamp/#343](https://github.com/ripe-tech/ripe-robin-revamp/issues/343)
* Extra style props to listing component - [ripe-robin-revamp/#329](https://github.com/ripe-tech/ripe-robin-revamp/issues/329)
* Listing component header "horizontal" and "vertical" layouts - [ripe-robin-revamp/#329](https://github.com/ripe-tech/ripe-robin-revamp/issues/329)
* Listing animated expandable search bar - [ripe-robin-revamp/#329](https://github.com/ripe-tech/ripe-robin-revamp/issues/329)

### Changed

* Tweak avatar positioning in `ChatMessage` to match new design - [ripe-robin-revamp/#347](https://github.com/ripe-tech/ripe-robin-revamp/issues/347)
* Use new component `Attachment` in `ChatMessage` - [ripe-robin-revamp/#347](https://github.com/ripe-tech/ripe-robin-revamp/issues/347)
* Change `ChatMessage` so that the message date appears below the name - [ripe-robin-revamp/#345](https://github.com/ripe-tech/ripe-robin-revamp/issues/345)
* Update `ChatMessage` and `Chat` to match the new design - [ripe-robin-revamp/#345](https://github.com/ripe-tech/ripe-robin-revamp/issues/345)
* Change chat messages aggregation threshold to 1 hour - [ripe-robin-revamp/#345](https://github.com/ripe-tech/ripe-robin-revamp/issues/345)
* Use new component `StatusEntry` in `ChatMessage` - [ripe-robin-revamp/#345](https://github.com/ripe-tech/ripe-robin-revamp/issues/345)
* Adapt `ChatMessage` and `Chat` styling to better adapt to the available size - [ripe-robin-revamp/#345](https://github.com/ripe-tech/ripe-robin-revamp/issues/345)
* Use new component `AvatarList` in `ChatMessage` and modify `Chat` to use it - [ripe-robin-revamp/#347](https://github.com/ripe-tech/ripe-robin-revamp/issues/347)
* Improve button press animation in item and button tab - [ripe-robin-revamp/#343](https://github.com/ripe-tech/ripe-robin-revamp/issues/343)
* `Tag` does not allow text breaking and shows ellipsis when there is no enough space - [ripe-robin-revamp/#316](https://github.com/ripe-tech/ripe-robin-revamp/issues/316)
* Adapt components to newer chat design - [ripe-robin-revamp/#346](https://github.com/ripe-tech/ripe-robin-revamp/issues/346)
* Add `hideOnKeyboard` to `Tabs` to allow visibility toggling when keyboard is visible - [ripe-robin-revamp/#346](https://github.com/ripe-tech/ripe-robin-revamp/issues/346)

### Fixed

* Fix image link in `ChatMessage` story
* Fix iOS flicker of `ImageLoading` - [ripe-robin-revamp/#343](https://github.com/ripe-tech/ripe-robin-revamp/issues/343)
* Fix iOS flicker of `Listing` on refresh - [ripe-robin-revamp/#343](https://github.com/ripe-tech/ripe-robin-revamp/issues/343)

## [0.20.0] - 2022-03-03

### Added

* New component `ImageLoading` that shows a placeholder while the image is loading - [ripe-robin-revamp/#337](https://github.com/ripe-tech/ripe-robin-revamp/issues/337)

### Changed

* Support `TouchableHighlight` use in `Touchable` if `underlayColor` is passed as prop
* Default to touchable with highlight when using variant `flat` of `ButtonToggle`

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
