#!/usr/bin/env node

'use strict';

/*
  Copyright Jesús Pérez <jesusprubio@gmail.com>

  This code may only be used under the GPLv3 license found at
  http://www.gnu.org/licenses/gpl-3.0.txt.
*/

// To test:
// - nc -l 1337
// - Answer with random strings a couple of times.
const SteroidsSocket = require('sip-fake-stack').SteroidsSocket;

const payload = 'A';
let answering = false;
let fuzzString = '';
let lastSent;
let metaSocket;

// Simply takes the current string and add another payload string
function mutate(oldPayload) { return oldPayload + payload; }

function send() {
  // Muting and sending the payload
  // We're doing it over the last mutated value
  // It's an iterator so we avoid to "pre-calculate" the mutations (infinity?),
  fuzzString = mutate(fuzzString);
  metaSocket.send(fuzzString);

  // The message which is being sent
  lastSent = fuzzString;
  // Omit printint to increase performance
  console.log('Packet sent:');
  console.log(fuzzString);
}


metaSocket = new SteroidsSocket({
  target: '127.0.0.1',
  port: 1337,
  transport: 'TCP',
  timeout: 5000,
});

// Sending initial request.
send();

// We reuse the same socket for now.
metaSocket.on('error', (err) => {
  if (!answering) {
    console.log('ERROR: Server seems not to answering (or offline)');

    process.exit(1);
  }

  console.log('Boom!, last packet sent:');
  console.log(lastSent);
  console.log('Error:');
  console.log(err);

  // Error is good in this case :)
  process.exit(0);
});

metaSocket.on('message', () => {
  answering = true;

  // Server is still answering, so keep muting and sending.
  send();
});
