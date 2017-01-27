#! /usr/bin/env node

const generate = require('./generate.js');

console.log('asset-generator');

if (process.argv.length < 5) {
    console.log('\nuse with three commandline args:');
    console.log('asset-generator <files> <target-dir-android> <target-dir-ios>');
    console.log('\nexample:');
    console.log('#asset-generator *.png /my-android-project/app/src/main/res /my-ios-project/app/assets');
    return;
}

const glob = process.argv[2];
const targetAndroid = process.argv[3];
const targetIos = process.argv[4];

generate(glob, targetAndroid, targetIos);