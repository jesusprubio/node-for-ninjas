#!/usr/bin/env node

/*
  Copyright Sergio Garcia <s3rgio.gr gmail com>
            Jesus Perez <jesusprubio gmail com>

  This code may only be used under the GPLv3 license found at
  http://www.gnu.org/licenses/gpl-3.0.txt.
*/

'use strict';

// https://github.com/danielzzz/node-ping
const ping = require('ping');

ping.sys.probe('8.8.8.8', (isAlive) => {
  if (isAlive) {
    console.log('Host alive!');
  } else {
    console.log('Host down :(');
  }
});
