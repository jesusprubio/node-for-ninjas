#!/usr/bin/env node

/*
  Copyright Sergio Garcia <s3rgio.gr gmail com>
            Jesus Perez <jesusprubio gmail com>

  This code may only be used under the GPLv3 license found at
  http://www.gnu.org/licenses/gpl-3.0.txt.
*/

'use strict';

// https://github.com/wesolyromek/tcp-ping
const ping = require('tcp-ping');

ping.ping({
  address: '192.168.1.77',
  port: 888,
  timeout: 5000,
  attempts: 3,
}, (err, res) => {
  if (err) {
    console.log('Error:');
    console.log(err);

    process.exit(1);
  }

  console.log('Result:');
  console.log(res);
});
