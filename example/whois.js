#!/usr/bin/env node

/*
  Copyright Sergio Garcia <s3rgio.gr gmail com>
            Jesus Perez <jesusprubio gmail com>

  This code may only be used under the GPLv3 license found at
  http://www.gnu.org/licenses/gpl-3.0.txt.
*/

'use strict';

// https://github.com/hjr265/node-whois
const whois = require('whois');

const opts = {
  // Can be a string ("host:port") or an object with host and port
  // as its keys; leaving it empty makes lookup rely on servers.json
  // server: '',
  // follow: 2, // number of times to follow redirects
  // timeout: 5000,  // socket timeout
  // verbose: false, // true returns an array of responses from all servers
};

whois.lookup('example.com', opts, (err, res) => {
  if (err) {
    console.log('Error:');
    console.log(err);

    process.exit(1);
  }

  console.log('Result:');
  console.log(res);
});
