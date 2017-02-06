#!/usr/bin/env node

/*
  Copyright Jesús Pérez <jesusprubio@gmail.com>

  This code may only be used under the GPLv3 license found at
  http://www.gnu.org/licenses/gpl-3.0.txt.
*/

'use strict';

// This example is a simple TLS client, analogue to the TCP one

// To test it:
// - npm i -g http-server
// - openssl genrsa -out key.pem
// - openssl req -new -key key.pem -out csr.pem
// - openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
// - rm csr.pem
// - Not connecting: http-server -a 127.0.0.1
// - Connecting: http-server -a 127.0.0.1 -S

// http://nodejs.org/api/tls.html
const tls = require('tls');
// const fs = require('fs');

// http://nodejs.org/api/tls.html#tls_tls_connect_port_host_options_callback
// We could pass an existing socket here to upgrade it.
const opts = {
  port: 8080,
  host: '127.0.0.1',
//   localAddress: '192.168.1.3',
//   localPort: 9999,
//   family: 6,
  // The socket won't automatically send a FIN packet when the other end
  // of the socket sends a FIN packet. It becomes non-readable, but
  // still writable. You should call the end() method explicitly.
  // Interesting to flood/scan.
  // allowHalfOpen: true,
  rejectUnauthorized: false, // allow bad certs
  // https://www.openssl.org/docs/ssl/ssl.html#DEALING_WITH_PROTOCOL_METHODS
  secureProtocol: 'TLSv1_method',
  // secureProtocol: 'SSLv3_method',

  // These are necessary only if using the client certificate authentication
//   key: fs.readFileSync('client-key.pem'),
//   cert: fs.readFileSync('client-cert.pem'),

//   // This is necessary only if the server uses the self-signed certificate
//   ca: [fs.readFileSync('server-cert.pem')],
};


// Here we are also working in the socket layer
const socket = tls.connect(
  opts,
  () => {
    console.log('I\'m connected to server!');

    // It's not going to work with the server because we don't speak any
    // application layer protocol, so we're going to be discconected.
    socket.write('Hi world! :)');
  }
);

socket.on('data', (data) => {
  console.log('Message reveived:');
  console.log(data.toString());

  socket.end();
});

socket.on('end', () => {
  console.log('I\'ve been disconnected from the server :(');
  process.exit(1);
});

socket.on('error', (err) => {
  console.log('Error:');
  console.log(err);

  process.exit(1);
});
