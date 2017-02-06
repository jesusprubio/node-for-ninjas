#!/usr/bin/env node

/*
  Copyright Jesús Pérez <jesusprubio@gmail.com>

  This code may only be used under the GPLv3 license found at
  http://www.gnu.org/licenses/gpl-3.0.txt.
*/

// RUNNING THIS FILE IS NOT LEGAL IN SOME COUNTRIES

'use strict';

// https://github.com/skepticfx/subquest
// subquest ea.com -s 4.2.2.2 -r 4 -d top_50
const subquest = require('subquest');

console.log('Scanning the sub domains of ea.com with 4 requests at a time.');
subquest
  .getSubDomains({
    host: 'ea.com', // required -> why not "getSubDomains('domain', options)"
    rateLimit: '4', // 4 request at a time, please keep it low for!
    // Ref: http://superuser.com/a/708782
    dnsServer: '4.2.2.2', // http://www.tummy.com/articles/famous-dns-server/
    dictionary: 'top_50', // top_50, top_100 ...
  })
  .on('end', (res) => {
    console.log('Result:');
    console.log(res);
  })
  .on('error', (err) => {
    console.log('Error:');
    console.log(err);

    process.exit(1);
  });

