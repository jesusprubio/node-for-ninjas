#!/usr/bin/env node

'use strict';

/*
  Copyright Jesús Pérez <jesusprubio@gmail.com>

  This code may only be used under the GPLv3 license found at
  http://www.gnu.org/licenses/gpl-3.0.txt.
*/

// http://nodejs.org/api/http.html
// http://nodejs.org/api/https.html
const http = require('http');
// const https = require('https');

const target = 'http://127.0.0.1:8080';
// const target = 'http://127.0.0.1:8080/index.html',

// By default set to Infinity. Determines how many concurrent sockets the
// agent can have open per origin. Origin is either a 'host:port' or
// 'host:port:localAddress' combination.
// http://nodejs.org/api/http.html#http_agent_maxsockets
// Default: Infinity. -> Error: Too many open files in system"
// http.globalAgent.maxSockets = 20;
// "agent"" vs "globalAgent": different setup per instance, ie:
// http.agent.maxSockets = 20;

// We don't want the "console.log" trailing \n
process.stdout.write('Sending .');

// We don't wan't to lose time:
// - Minimal printing
// - Omit errors
// - We don't want to control the timing ( vs promise.map with concurrency)

function send() {
  http.get(target);
  process.stdout.write('.');
}
send();

// function send() {
//   process.nextTick(() => {
//     http.get(target);
//     process.stdout.write('.');
//   });
// }

// function send() {
//   http.get(target);
//   process.stdout.write('.');
//   send();
// }

// function send() {
//   http.get(target);
//   process.stdout.write('.');
//   process.nextTick(() => send());
// }

// function send() {
//   process.stdout.write('.');
//   http.get(target, () => {
//     process.nextTick(() => send());
//   });
// }


// const numReq = 50000;
// const numReq = 10000000000000000000000000;

// I like more "forEach" than "for" but less performance:
// http://jsperf.com/for-vs-foreach/9

// No one reaches the targed, why?
// while (true) {
// // for (;;) {
// for (let i = 0; i < numReq; i += 1) {
  // send();
// // setTimeout(() => send(), 1000);
// }


// Always KISS:
// setInterval(send, 0);


// More complete tool
// https://github.com/mlazarov/ddos-stress
// const Stress = require('ddos-stress');
// // Create new instance of DDoS Stress
// const stress = new Stress();

// // Run stress on server
// stress.run(target, 10);

// DDoS:
// cd node_modules/ddos-stress
// yarn
// nano etc/config.js (optional)
// node ./server.js
// open http://localhost:3000/
// (change the target: http://127.0.0.1:8080)
// (new session, multiple times)
// cd Src/node-for-ninjas/node_modules/ddos-stress
// node ./node.js
