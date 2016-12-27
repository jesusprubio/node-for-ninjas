#!/usr/bin/env node

'use strict';

/*
    Copyright Jesus Perez <jesusprubio gmail com>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// http://nodejs.org/api/http.html
// http://nodejs.org/api/https.html


var http = require('http'),
//    https = require('https'),
//    http2 = require('http'),

    TARGET = 'http://localhost:8080',
//    TARGET = 'http://localhost:8080/index.html',
//    NUM_REQUESTS = 1000; // works
//    NUM_REQUESTS = 2000; // errors
//    NUM_REQUESTS = 5000; // breaks the server! xD
    NUM_REQUESTS = 10000, // all crazy

    i;


// By default set to Infinity. Determines how many concurrent sockets the
// agent can have open per origin. Origin is either a 'host:port' or
// 'host:port:localAddress' combination.
// http://nodejs.org/api/http.html#http_agent_maxsockets
http.globalAgent.maxSockets = 20;
//https.globalAgent.maxSockets = 25;

// Different setup per instance
//http.Agent.maxSockets = 10;
//http2.Agent.maxSockets = 15;

// We don't want the "console.log" trailing \n
process.stdout.write('Sending .');

//function doNothing(res) {
//    console.log('RESPONSE:');
//    console.log(res);
//}
//
//function cbError(err) {
//    console.log('ERROR:');
//    console.log(err);
//}

// We don't wan't to lose time here in this case
// - Minimal printing
// - Omit errors
// I like more foreach but less performance:
// http://jsperf.com/for-vs-foreach/9
// Do not use while for this! No one reaches the targed, the event loop
// only queues more and more tasks but it doesn't have time for anymore
// (including to check the events)
//while (true) {
for (i = 0; i < NUM_REQUESTS; i += 1) {
    process.stdout.write('.');
    // Enough fot this case, we don't want to check the error/response,
    // the event loop is able to manage this since it doesn't have too much work
    http.get(TARGET);
    // This works but too much time (really huge!) between batches.
    // The event loop keeps alive but could be considered saturated
//    http.get(TARGET, doNothing).on('error', cbError);
}
