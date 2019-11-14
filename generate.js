const fse = require("fs-extra");
const jimp = require("jimp");
const glob = require("glob");
const path = require("path");

function ensureTrailingSlash(path) {
  return path.endsWith("/") === false ? path + "/" : path;
}

function resizeAndSave(factor, source, target) {
  jimp.read(source, function(err, image) {
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

function generate(files, targetAndroid, targetIos) {
  for (let file of files) {
    let filename = path.basename(file);
    let filetype = filename.substr(filename.lastIndexOf("."), filename.length);

    filename = filename.substr(0, filename.lastIndexOf("."));
    if (filename.indexOf("@3x") !== -1) {
      filename = filename.substr(0, filename.lastIndexOf("@"));
    }

    console.info("process " + filename + filetype);

    if (typeof targetAndroid !== "undefined") {
      resizeAndSave(
        0.5,
        file,
        `${filename}/` +
          targetAndroid +
          filename.toLowerCase() +
          "-hdpi" +
          filetype
      );
      resizeAndSave(
        0.25,
        file,
        `${filename}/` +
          targetAndroid +
          filename.toLowerCase() +
          "-ldpi" +
          filetype
      );
      resizeAndSave(
        1 / 3,
        file,
        `${filename}/` +
          targetAndroid +
          filename.toLowerCase() +
          "-mdpi" +
          filetype
      );
      resizeAndSave(
        2 / 3,
        file,
        `${filename}/` +
          targetAndroid +
          filename.toLowerCase() +
          "-xdpi" +
          filetype
      );
      resizeAndSave(
        1,
        file,
        `${filename}/` +
          targetAndroid +
          filename.toLowerCase() +
          "-xxdpi" +
          filetype
      );
    }

    if (typeof targetIos !== "undefined") {
      resizeAndSave(
        1 / 3,
        file,
        `${filename}/` + targetIos + filename + filetype
      );
      resizeAndSave(
        2 / 3,
        file,
        `${filename}/` + targetIos + filename + "@2x" + filetype
      );
      resizeAndSave(
        1,
        file,
        `${filename}/` + targetIos + filename + "@3x" + filetype
      );
    }
  }
}

module.exports = (q, targetAndroid, targetIos) => {
  if (typeof targetAndroid !== "undefined") {
    targetAndroid = ensureTrailingSlash(targetAndroid);
  }

  if (typeof targetIos !== "undefined") {
    targetIos = ensureTrailingSlash(targetIos);
  }

  if (q.length == 1 && q[0].indexOf("*") !== -1) {
    glob(q[0], {}, (er, files) => generate(files, targetAndroid, targetIos));
  } else {
    generate(q, targetAndroid, targetIos);
  }
};
