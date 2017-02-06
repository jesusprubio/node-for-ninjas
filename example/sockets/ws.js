#!/usr/bin/env node

/*
  Copyright Jesús Pérez <jesusprubio@gmail.com>

  This code may only be used under the GPLv3 license found at
  http://www.gnu.org/licenses/gpl-3.0.txt.
*/

'use strict';

// Simple websocket client.

// https://github.com/theturtle32/WebSocket-Node
const WebSocketClient = require('websocket').client;

// const  server = 'ws://echo.websocket.org:8080';
// https://github.com/theturtle32/WebSocket-Node/blob/master/docs/WebSocketClient.md
// Since this PR we can set the TLS options as in the TLS module
// https://github.com/theturtle32/WebSocket-Node/pull/129
const client = new WebSocketClient({ tlsOptions: { rejectUnauthorized: false } });

client.on('connectFailed', (err) => {
  console.log('Error: connectFailed:');
  console.log(err);

  process.exit(1);
});


client.on('connect', (conn) => {
  conn.on('error', (err) => {
    console.log('Error: connect():');
    console.log(err);

    process.exit(1);
  });

  conn.on('close', () => {
    console.log('I\'ve been closed :(');

    process.exit(1);
  });

  conn.on('message', (msg) => {
    console.log('Message reveived:');

    // "utf8Data" vs "binaryData"
    // https://github.com/theturtle32/WebSocket-Node/issues/132
    console.log(msg.utf8Data);
    process.exit(0);
  });

  console.log('I\'m connected to server!');

  // text -> sendUTF, binary -> sendBytes
  conn.sendUTF('Hi world! :)');
});

// The library manages the TLS socket for us
// Public echo WS server.
const server = 'wss://echo.websocket.org';
client.connect(server, null);
// Sometimes we need to specify the subprotocol, but not in this test sever
// client.connect(server, 'sip');
