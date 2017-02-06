#!/usr/bin/env node

/*
  Copyright Jesús Pérez <jesusprubio@gmail.com>

  This code may only be used under the GPLv3 license found at
  http://www.gnu.org/licenses/gpl-3.0.txt.
*/

'use strict';

// https://github.com/jas-/node-libnmap
const nmap = require('libnmap');

nmap.discover({}, (err, report) => {
  if (err) {
    console.log('Error:');
    console.log(err);

    process.exit(1);
  }

  console.log('Report:');
  console.log(report);

  // "Sub-objects" not printed, fix:
  // console.log(JSON.stringify(report, null, 2));
});


nmap.scan(
  {
    // range: ['192.168.1.1', '192.168.1.2'],
    range: ['172.20.0.1'],
    ports: '21-23,80,443',
    // To force the fail, see "uncaughtException"
    // nmap: '/aaaa',
  },
  (err, report) => {
    if (err) {
      console.log('Error:');
      console.log(err);

      process.exit(1);
    }

    console.log(JSON.stringify(report, null, 2));
  }
);

// If nmap binary not present in the path, or if no nmap option present,
// "uncaughtException" to the rescue
process.on('uncaughtException', (err) => {
  console.log('ERROR: "uncaughtException" found:');
  console.log(err);

  process.exit(1);
});

