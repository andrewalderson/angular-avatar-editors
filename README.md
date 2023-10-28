# Angular Avatar Editors

[Storybook](https://andrewalderson.github.io/angular-avatar-editors/)

I am using this repository to explore different types of avatar editors I have encountered on the web. Most avatar/images editors I come across aren't concerned with accessiblity os this is the main focus of these projects.

#### Roadmap

This roadmap outlines the current and future goals for this repository.

- ✅ Complete
- 🟡 In progress
- 💤 Not started

## Basic Avatar Editor

A very basic avatar editor that uses a `img` element and a CSS Transform with a `DOMMatrix`. This implementation doesn't support rotation since there is not way to rotate the image with just the mouse. Rotation either requires a touch gesture of an external control.

- Features
  - ✅ Fit image on load
  - ✅ Zoom image with Mouse Wheel
  - 💤 Zoom image with Touch (Pinch Zoom)
  - 💤 Zoom image with Keyboard
  - ✅ Move image with Mouse
  - ✅ Move image with Touch
  - 💤 Move image with Keyboard
  - 💤 Accessiblity
    - 💤 Screen reader support

## Google Avatar Editor

A replication of the current Avatar Editor used by Google. It uses an `img` element to render the transformed image.

- Features
  - ✅ Fit image on load
  - ✅ Zoom image with Mouse Wheel
  - 💤 Zoom image with Touch (Pinch Zoom)
  - 💤 Zoom image with external controls
  - 💤 Zoom image with Keyboard
  - ✅ Move image with Mouse
  - ✅ Move image with Touch
  - 💤 Move image with Keyboard
  - ✅ Rotate image with external controls
  - 💤 Accessiblity
    - 💤 Screen reader support

## Microsoft Avatar Editor

A replication of the current Avatar Editor used by Microsoft. It uses a `canvas` element to render the transformed image.

- Features
  - ✅ Fit image on load
  - 🟡 Zoom image with Mouse Wheel
  - 💤 Zoom image with Touch (Pinch Zoom)
  - 💤 Zoom image with external controls
  - 💤 Zoom image with Keyboard
  - 💤 Move image with mouse / touch
  - 💤 Move image with Keyboard
  - 💤 Rotate image with external controls
  - 💤 Accessiblity
    - 💤 Screen reader support
