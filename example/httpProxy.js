#!/usr/bin/env node

/*
  Copyright Jesús Pérez <jesusprubio@gmail.com>
            Sergio Garcia <s3rgio.gr gmail com>

  This code may only be used under the GPLv3 license found at
  http://www.gnu.org/licenses/gpl-3.0.txt.
*/

'use strict';

// https://github.com/greim/hoxy
const hoxy = require('hoxy');

const proxy = new hoxy.Proxy();

proxy.intercept({
  // Intercept during the response phase.
  phase: 'response',
  // Only HTML pages.
  mimeType: 'text/html',
  // Expose the response body as a cheerio (jQuery clone) object.
  as: '$',
}, (req, resp) => {
  resp.$('title').text('Unicorns.');
  resp.$('#titulo-589790dc468aebb31f8b45da').text('OLAKASE');
});

// Simulate a 500-1000ms delay on every request.
// proxy.intercept({
//   phase: 'response',
//   hostname: 'www.marca.com',
// }, (req, resp) => { resp.slow({ rate: 10000 }); });

// A NON HTTP site to test:
// http://www.marca.com/futbol/real-madrid/2017/02/06/589790dc468aebb31f8b45da.html
// For dev: http://greim.github.io/hoxy/#intercept-https
// For attacks it's not going to work, you would need to add
// the created certs to the victim's browser.
proxy.listen(8000);

