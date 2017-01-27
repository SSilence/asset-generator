asset-generator
===============

This is a cheap asset resizer for Android and iOS. It takes an image in @3x or xxhdpi size and resize it:
* Android: mdpi, ldpi, hdpi, xhdpi, xxhdpi
* iOS: @1x, @2x, @3x

use with three commandline args:
```
asset-generator <files> <target-dir-android> <target-dir-ios>');
```

example:
```
#asset-generator *.png /my-android-project/app/src/main/res /my-ios-project/app/assets
```

---
Copyright (c) Tobias Zeising, tobias.zeising@aditu.de  
http://www.aditu.de  
Licensed under the MIT license 