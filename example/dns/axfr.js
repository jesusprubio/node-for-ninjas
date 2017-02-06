#!/usr/bin/env node

/*
  Copyright Jesús Pérez <jesusprubio@gmail.com>

  This code may only be used under the GPLv3 license found at
  http://www.gnu.org/licenses/gpl-3.0.txt.
*/

// RUNNING THIS FILE IS NOT LEGAL IN SOME COUNTRIES

'use strict';

// https://github.com/jpenalbae/dns-axfr
const dns = require('dns-axfr');

// Extended function
// TODO: Not working for this domains
dns.resolveAxfr('dns01.acme.com', 'acme.com', (err, res) => {
  if (err) {
    console.log('Error:');
    console.log(err);

    process.exit(1);
  }

  console.log('Result:');
  console.log(res);
});

// "It extends the core dns module, so you can access the
// original module without "requiring" it again".
// You can use it as in "dndReq.js"
// dns.resolve('example.com' ... )
