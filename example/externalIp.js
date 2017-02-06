#!/usr/bin/env node

/*
  Copyright Sergio Garcia <s3rgio.gr gmail com>
            Jesus Perez <jesusprubio gmail com>

  This code may only be used under the GPLv3 license found at
  http://www.gnu.org/licenses/gpl-3.0.txt.
*/

'use strict';

// https://github.com/mjhasbach/MOIRA
// - Multiple providers support.
const moira = require('moira');

moira.getIP((err, ip, service) => {
  if (err) {
    console.log('Error:');
    console.log(err);

    process.exit(1);
  }

  console.log('Result:');
  console.log(ip);
  console.log(service);
});
