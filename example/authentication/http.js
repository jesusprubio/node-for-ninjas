#!/usr/bin/env node

/*
  Copyright Jesús Pérez <jesusprubio@gmail.com>

  This code may only be used under the GPLv3 license found at
  http://www.gnu.org/licenses/gpl-3.0.txt.
*/

'use strict';

// To test it:
// npm i -g http-server-with-auth
// http-server-with-auth --username test --password demo

// https://github.com/request/request
// - easier: TLS/SSL, redirection, OAuth, etc.
const request = require('request');

request.get(
  {
    uri: 'http://127.0.0.1:8080',
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0)' +
        'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/' +
        '31.0.1650.63 Safari/537.36',
    },
    json: false, // auto-json support
    timeout: 5000,
    strictSSL: false, // auto-ssl, allow bad certs
    auth: {
      user: 'test',
      // Incorrect pass.
      pass: 'admin',
      // Correct pass.
    //   pass: 'demo',
      // the request will retry with a proper authentication header after
      // receiving a 401 (which must contain a WWW-Authenticate header
      // indicating the required authentication method)
      sendImmediately: false,
    },
  },
 (err, res, body) => {
   // TODO: Destroy/close client, not supported by the module
   if (err) {
     console.log('Error:');
     console.log(err);

     process.exit(1);
   }

   console.log('Result (headers):');
   // Too big, only some interesting fields
//    console.log(res);
   console.log(res.headers);
   console.log('Body:');
   console.log(body);
 }
);
