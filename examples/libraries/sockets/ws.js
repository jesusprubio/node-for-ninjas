#!/usr/bin/env node

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

// This example is a simple websocket (and secure) client
// https://github.com/theturtle32/WebSocket-Node

// To test this we can use the echo server included in this example:
// https://www.websocket.org/echo.html

'use strict';

var WebSocketClient  = require('websocket').client,

//    SERVER_URI = 'ws://echo.websocket.org',
    // If the port is different from 80 ( in this case "Timeout" is launched)
//    SERVER_URI = 'ws://echo.websocket.org:8080',
    // The library manages the TLS socket for us
    SERVER_URI = 'wss://echo.websocket.org',
    OPTIONS = {
        // Since this PR we can set the TLS options as in the TLS module
        // https://github.com/theturtle32/WebSocket-Node/pull/129
        tlsOptions: {
            rejectUnauthorized : false
        }
    },
    MSG = "Hi world! :)",
    TIMEOUT = 5000,

    // To avoid the launch of our timeout error
    connected = false,
    // To avoid returning multiple errors
    wsError = false,
    client;


function timeoutCb() {
    if (!connected) {
        console.log('Error: Timeout');

        process.exit(1);
    }

    // The client don't support any close function, we need this var to
    // avoid returning multiple errors
    wsError = true;
}

// https://github.com/theturtle32/WebSocket-Node/blob/master/docs/WebSocketClient.md
client = new WebSocketClient(OPTIONS);

client.on('connectFailed', function (err) {
    connected = true;
    if (!wsError) {
        console.log('Error: connectFailed:');
        console.log(err);

        process.exit(1);
    }
});

client.on('connect', function (connection) {
    connected = true;

    connection.on('error', function (err) {
        if (!wsError) {
            console.log('Error: connect():');
            console.log(err);

            process.exit(1);
        }
    });

    connection.on('close', function () {
        console.log('I\'ve been closed :(');

        process.exit(1);
    });

    connection.on('message', function (message) {
        console.log('Message reveived:');

        console.log(message.utf8Data);
        process.exit(0);
    });

    console.log('I\'m connected to server!');
    // https://github.com/theturtle32/WebSocket-Node/issues/132
    connection.sendUTF(MSG);
});

setTimeout(timeoutCb, TIMEOUT);
client.connect(SERVER_URI, null);
// Sometimes we need to specify the subprotocol, but not in this test sever
//client.connect(SERVER_URI, 'sip');
