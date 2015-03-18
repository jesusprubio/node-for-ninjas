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

// In this case we avoid to "pre-calculate" the mutations (infinity?),
// so we don't need async. To test: nc -l 1337


var SteroidsSocket = require('sip-fake-stack').SteroidsSocket,

    SOCKET_CFG = {
        target: '127.0.0.1',
        port: 1337,
        transport: 'TCP',
        timeout: 5000
    },
    PAYLOAD = 'A',

    fuzzString = '',
    answering = false,

    lastSent, megaSocket;


// Simply takes the current string and add another payload string
function mutate(oldPayload) {
    return oldPayload + PAYLOAD;
}

function send() {
    // Muting and sending the payload
    // We're doing it over the last mutated value
    fuzzString = mutate(fuzzString);
    megaSocket.send(fuzzString);

    // The message which is being sent
    lastSent = fuzzString;
    // Omit printint to increase performance
    console.log('Packet sent:');
    console.log(fuzzString);
}


// ----- Starting here -----

megaSocket = new SteroidsSocket(SOCKET_CFG);
// Sending initial request
send();
// We reuse the same socket for now
megaSocket.on('error', function (err) {
    if (!answering) {
        console.log('ERROR: Server seems not to answering (or offline)');
    } else {
        console.log('Boom!, last packet sent:');
        console.log(lastSent);
        console.log(err);
    }
    // Error is good in this case :)
    process.exit(0);
});

//megaSocket.on('message', function (msg) {
megaSocket.on('message', function () {
    answering = true;

    // Server is still answering, so keep muting
    send();
});
