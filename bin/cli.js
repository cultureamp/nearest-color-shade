#!/usr/bin/env node
const findConfig = require('find-config');
const nearest = require('..');
const Color = require('color');
const pkgName = require('../package.json').name;

const config = findConfig.require('nearest-color.json', { cwd: __dirname });
if (!config) {
  console.log(pkgName + ' configuration not found');
  process.exit(-1);
}

const brandColors = Object.keys(config).reduce(
  (colors, key) => Object.assign(colors, { [key]: Color(config[key]) }),
  {}
);

if (process.argv.length <= 2) {
  console.log('Usage: ' + pkgName + ' <color>');
  process.exit(-1);
}

console.log(nearest(brandColors, Color(process.argv[2])));
