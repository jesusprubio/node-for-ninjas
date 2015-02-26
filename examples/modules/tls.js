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

// This example is a simple TLS client, analogue to the TCP one
// http://nodejs.org/api/tls.html

// To test this we can use the module "http-server"
// https://github.com/nodeapps/http-server
// Steps:
// - npm i -g http-server
// - openssl genrsa -out key.pem
// - openssl req -new -key key.pem -out csr.pem
// - openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
// - rm csr.pem
// - Not connecting: http-server -a 127.0.0.1
// - Connecting: http-server -a 127.0.0.1 -S
'use strict';

var tls = require('tls'),
//    fs = require('fs'),

//    options = {
//        // These are necessary only if using the client certificate authentication
//        key: fs.readFileSync('client-key.pem'),
//        cert: fs.readFileSync('client-cert.pem'),
//
//        // This is necessary only if the server uses the self-signed certificate
//        ca: [ fs.readFileSync('server-cert.pem') ]
//    };

    // http://nodejs.org/api/tls.html#tls_tls_connect_port_host_options_callback
	// We could pass an existing socket here to upgrade it
    OPTIONS = {
        port: 8080,
        host: '127.0.0.1',
//        localAddress: '192.168.1.3',
//        localPort: 9999,
//        family: 6
        rejectUnauthorized: false,
        // https://www.openssl.org/docs/ssl/ssl.html#DEALING_WITH_PROTOCOL_METHODS
        secureProtocol: 'TLSv1_method'
//        secureProtocol: 'SSLv3_method'
    },
    MSG = 'Hi world! :)',

    socket;

// Here we're also working in the socket layer
socket = tls.connect(
    OPTIONS,
    function () {
        console.log('I\'m connected to server!');

        // It's not going to work with the server because we don't speak any
        // application layer protocol, so we're going to be discconected
        socket.write(MSG);
    }
);

socket.on('data', function (data) {
    console.log('Message reveived:');
    console.log(data.toString());

    socket.end();
});

socket.on('end', function () {
    console.log('I\'ve been disconnected from the server :(');
});

socket.on('error', function (err) {
    console.log('Error:');
    console.log(err);

    process.exit(1);
});
