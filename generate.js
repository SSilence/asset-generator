const fse = require('fs-extra');
const jimp = require('jimp');
const glob = require('glob');
const path = require('path');

function ensureTrailingSlash(path) {
    return (path.endsWith('/') === false) ? path + "/" : path;
}

function getDirectoryPrefix(skipPrefix, directoryPrefix) {
  if(skipPrefix) {
    return '';
  } else {
    return (typeof directoryPrefix !== "undefined") ? directoryPrefix + '-' : 'drawable-';
  }
}

function resizeAndSave(factor, source, target) {
    jimp.read(source, function (err, image) {
        image.resize(image.bitmap.width * factor, jimp.AUTO);
        image.write(target, err => {
            if (err) {
                console.error(target + " ERROR: " + error);
            } else {
                console.log(target + " generated");
            }
        });
    });
}

function generate(files, targetAndroid, targetIos, skipPrefix, directoryPrefix) {
    for (let file of files) {
        let filename = path.basename(file);
        let filetype = filename.substr(filename.lastIndexOf('.'), filename.length);

        filename = filename.substr(0, filename.lastIndexOf('.'));
        if (filename.indexOf("@3x")!==-1) {
            filename = filename.substr(0, filename.lastIndexOf('@'));
        }

        console.info("process " + filename + filetype);

        if (typeof targetAndroid !== "undefined") {
            resizeAndSave(0.5, file, targetAndroid + getDirectoryPrefix(skipPrefix, directoryPrefix) + 'hdpi/' + filename.toLowerCase() + filetype);
            resizeAndSave(0.25, file, targetAndroid + getDirectoryPrefix(skipPrefix, directoryPrefix) + 'ldpi/' + filename.toLowerCase() + filetype);
            resizeAndSave(1/3, file, targetAndroid + getDirectoryPrefix(skipPrefix, directoryPrefix) + 'mdpi/' + filename.toLowerCase() + filetype);
            resizeAndSave(2/3, file, targetAndroid + getDirectoryPrefix(skipPrefix, directoryPrefix) + 'xhdpi/' + filename.toLowerCase() + filetype);
            resizeAndSave(1, file, targetAndroid + getDirectoryPrefix(skipPrefix, directoryPrefix) + 'xxhdpi/' + filename.toLowerCase() + filetype);
        }

        if (typeof targetIos !== "undefined") {
            resizeAndSave(1/3, file, targetIos + filename + filetype);
            resizeAndSave(2/3, file, targetIos + filename + '@2x' + filetype);
            resizeAndSave(1, file, targetIos + filename + '@3x' + filetype);
        }
    }
}

module.exports = (q, targetAndroid, targetIos, skipPrefix, directoryPrefix) => {

    if (typeof targetAndroid !== "undefined") {
        targetAndroid = ensureTrailingSlash(targetAndroid);
        fse.ensureDirSync(targetAndroid + getDirectoryPrefix(skipPrefix, directoryPrefix) + 'hdpi');
        fse.ensureDirSync(targetAndroid + getDirectoryPrefix(skipPrefix, directoryPrefix) + 'ldpi');
        fse.ensureDirSync(targetAndroid + getDirectoryPrefix(skipPrefix, directoryPrefix) + 'mdpi');
        fse.ensureDirSync(targetAndroid + getDirectoryPrefix(skipPrefix, directoryPrefix) + 'xhdpi');
        fse.ensureDirSync(targetAndroid + getDirectoryPrefix(skipPrefix, directoryPrefix) + 'xxhdpi');
    }

    if (typeof targetIos !== "undefined") {
        targetIos = ensureTrailingSlash(targetIos);
        fse.ensureDirSync(targetIos);
    }

    if (q.length == 1 && q[0].indexOf("*") !== -1) {
        glob(q[0], {}, (er, files) => generate(files, targetAndroid, targetIos, skipPrefix, directoryPrefix));
    } else {
        generate(q, targetAndroid, targetIos, skipPrefix, directoryPrefix);
    }
}
