# Chromatic Tuner
## Overview
Chromatic Tuner is a professional-grade mobile tuner for musicians, built with React Native and Expo. It supports alternative temperaments, custom calibration, historic and instrument-specific tunings. The interface includes an analog-style tuning needle for precise feedback and a drone generator for ear training.

This project demonstrates mobile architecture using Expo EAS, and a focus on both usability and accessibility.

## Features
### User Experience
* Alternative & Historic Temperaments: User preferences saved in local storage.
* Analog-Style Needle: Smooth, interactive tuning display.
* Custom Calibration – Adjustable A4 frequency (415–450 Hz).
* Drone Function – Continuous tone generator for practice and intonation.
* Wide Pitch Detection Range – Supports C1–C8.
* Accessible UI – Designed with inclusive navigation and contrast in mind.

## Technical Highlights
* **Pitch Detection**: High-accuracy input analysis with the Pitchy library.
* **Audio Processing**: Powered by Expo AV for real-time performance.
* **Drone Generator**: Implemented using Tone.js.
* **Native Deployment**: Expo EAS workflow and App Store distribution.

### Technology
* **Framework & Language**: React Native, TypeScript
* **Tooling & Deployment**: Expo, Expo EAS
* **Audio Libraries**: Expo AV, Pitchy, Tone.js
* **State & Storage**: Local storage for preferences and user settings
* **Distribution**: Expo builds, App Store
  
## Under Development
* Refined component architecture
* Test coverage with Jest and Playwright
* CI/CD pipelines 

## License
Please respect the intellectual property and don't use this code for commercial purposes without permission.

## Credits
Designed and developed by Daniel Molloy.