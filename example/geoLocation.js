#!/usr/bin/env node

/*
  Copyright Jesús Pérez <jesusprubio@gmail.com>
            Sergio Garcia <s3rgio.gr gmail com>

  This code may only be used under the GPLv3 license found at
  http://www.gnu.org/licenses/gpl-3.0.txt.
*/

'use strict';

// https://github.com/bluesmoon/node-geoip
// - All local -> no limit
const geoip = require('geoip-lite');

const geo = geoip.lookup('8.8.8.8');

if (!geo) {
  console.log('Error, geolocation not found');

  process.exit(1);
}

console.log('Result:');
console.log(geo);
