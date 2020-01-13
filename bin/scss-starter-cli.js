#!/usr/bin/env node

const shell = require('shelljs');
const fs = require('fs');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}

if (shell.exec('git clone git@github.com:atolye15/scss-starter.git').code !== 0) {
  shell.echo('Error: git clone failed');
  shell.exit(1);
}

const basePath = process.cwd();
const filePath = path.join(basePath, argv._[0]);
const scssStarterPath = path.join(basePath, 'scss-starter');
const scssStarterScssPath = path.join(scssStarterPath, 'scss');

if (!fs.existsSync(filePath)) {
  shell.mkdir('-p', filePath);
}

shell.cp('-Rf', `${scssStarterScssPath}/*`, `${filePath}/`);
shell.rm('-rf', scssStarterPath);
