#!/usr/bin/env node

/*
  Copyright Jesús Pérez <jesusprubio@gmail.com>

  This code may only be used under the GPLv3 license found at
  http://www.gnu.org/licenses/gpl-3.0.txt.
*/

'use strict';

// http://nodejs.org/api/http.html
const http = require('http');

http.get('http://www.marca.com', (res) => {
  console.log('Headers:');
  console.log(res.headers);

  console.log('\nWeb server:');
  console.log(res.headers.server);

  process.exit(0);
})
.on('error', (err) => {
  console.log('Error:');
  console.log(err);
});
