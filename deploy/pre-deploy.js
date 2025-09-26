/* eslint-disable @typescript-eslint/no-var-requires,unicorn/prefer-module */
const fsExtra = require('fs-extra');
const { name, version } = require('./../package.json');

fsExtra.move(
  //'./../.next/static',
  './../__static__',
  `./../assets/${name}/${version}/_next/static`
);
