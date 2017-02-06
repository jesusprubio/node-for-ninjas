#!/usr/bin/env node

/*
  Copyright Jesús Pérez <jesusprubio@gmail.com>

  This code may only be used under the GPLv3 license found at
  http://www.gnu.org/licenses/gpl-3.0.txt.
*/

'use strict';

// To test: telnet localhost PORT.

// http://nodejs.org/api/net.html
const net = require('net');

const portfinder = require('portfinder');


// We also have sockets here, but we prefer to use an upper layer now
// http://nodejs.org/api/net.html#net_class_net_socket
const server = net.createServer(
  {},
  // "connection" listener
  (client) => {
    console.log('Server connected');

    client.on('connect', () => console.log('Client connected'));

    client.on('data', (dataServer) => {
      console.log('Data received:');
      // In this case we could use "setEncoding" in the client
      // to avoid this:
      // http://nodejs.org/api/net.html#net_socket_setencoding_encoding
      console.log(dataServer.toString());
      // If we wanted an echo server;
      // client.write(dataServer);
    });

    // When the other end of the socket sends a FIN packet
    client.on('end', () => console.log('Client disconnected'));

    // Answering to the client.
    client.write('Hi luser! :P');
  }
);

// Problem: How do you guarantee that it's free?
// - [Iterate](https://gist.github.com/mikeal/1840641)
// - We do not reinvent the wheel! So we prefer to use a module:
// https://github.com/indexzero/node-portfinder
// Important for local apps (like most of security related)
portfinder.getPort((err, port) => {
  if (err) {
    console.log('Error: getPort():');
    console.log(err);

    process.exit(1);
  }

  server.listen(port, () => console.log(`I'm listening ... in the port ${port}`));
});
