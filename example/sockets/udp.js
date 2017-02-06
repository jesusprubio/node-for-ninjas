#!/usr/bin/env node

/*
  Copyright Jesús Pérez <jesusprubio@gmail.com>

  This code may only be used under the GPLv3 license found at
  http://www.gnu.org/licenses/gpl-3.0.txt.
*/

'use strict';

// This sends a message "to himslef" through UDP (Server and client)
// http://nodejs.org/api/dgram.html
const dgram = require('dgram');

const portfinder = require('portfinder');

const socket = dgram.createSocket('udp4');
// IPv6
// const socket = dgram.createSocket('udp6');

// The UDP module doesn't provide a "connected" event so
// we have to implement if manually (see next variable and method).
let received = false;

function timeoutCb() {
  if (!received) {
    console.log('Error: Timeout');

    process.exit(1);
  }

  // We need this to avoid errors
  socket.close();
}


// SERVER

socket.on('message', (msg, rinfo) => {
  received = true;

  console.log(`SERVER: Message reveived from ${rinfo.address}:${rinfo.port}`);
  // It's a Buffer and we need a String to print
  console.log(msg.toString());

  // Not needed, we're exiting right now, but in real apps be careful!
  // socket.close();
  process.exit(0);
});

socket.on('listening', () => {
  const address = socket.address();
  console.log(`SERVER: I'm listening ... (${address.address}:${address.port}`);
});

socket.on('close', () => {
  console.log('SERVER: I\'ve been closed :(');

  process.exit(1);
});

socket.on('error', (err) => {
  // We also set it in this case to avoid returning multiple errors (Timeout)
  received = true;
  console.log('SERVER: Error:');
  console.log(err);

  process.exit(1);
});

portfinder.getPort((err, port) => {
  // Only use sync stuff when mandatory
  if (err) {
    console.log('Error: getPort():');
    console.log(err);

    process.exit(1);
  }

  // http://nodejs.org/api/dgram.html#dgram_socket_bind_options_callback
  socket.bind(port);

  // CLIENT

  // It could be in a different file but we're reusing the socket
  // and including here for simplicity
  const msg2send = new Buffer('Hi world! :)');
  socket.send(msg2send, 0, msg2send.length, port, 'localhost', (errSend) => {
  // To test the timeout an wasy way it to target an online
  // (non compatible) host/port, ie:
  // https://github.com/nodeapps/http-server (default setup)
  // socket.send(msg2send, 0, msg2send.length, 8080, "localhost", (errSend) => {
    if (errSend) {
      console.log('CLIENT: Error: send():');
      console.log(errSend);

      process.exit(1);
    }

    console.log('CLIENT: Message sent');
  });
});

setTimeout(timeoutCb, 5000);
