asset-generator
===============

This is a cheap asset resizer for Android and iOS. It takes an image in @3x or xxhdpi size and resize it:
* Android: mdpi, ldpi, hdpi, xhdpi, xxhdpi
* iOS: @1x, @2x, @3x

## Installation

```
npm install asset-generator -g
```

## Usage

```
asset-generator <files> --android <target-dir-android> --ios <target-dir-ios>
```

android or ios option is optional. Only use --android if you need only android assets.

example:
```
asset-generator *.png --android /my-android-project/app/src/main/res --ios /my-ios-project/app/assets
```

---
Originally created by [SSilence](https://github.com/SSilence/asset-generator)