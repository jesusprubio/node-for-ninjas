#!/usr/bin/env node

/*
  Copyright Jesús Pérez <jesusprubio@gmail.com>

  This code may only be used under the GPLv3 license found at
  http://www.gnu.org/licenses/gpl-3.0.txt.
*/

'use strict';

// https://github.com/eviltik/evilscan
// evilscan 192.168.0.0/24 --port=21-23,80
const Evilscan = require('evilscan');

// UDP and IPv& still not supported: https://github.com/eviltik/evilscan/issues
const scanner = new Evilscan({
  target: '192.168.1.1',
  port: '21,22,80,443',
  status: 'TROU', // Timeout, Refused, Open, Unreachable
  timeout: 5000,
  banner: true,
  geo: false,
});

// Fired in any match
scanner.on('result', data => console.log(data));

scanner.on('error', (err) => {
  console.log('Error:');
  console.log(err);

  process.exit(1);
});

scanner.on('done', () => console.log('Done'));

scanner.run();
