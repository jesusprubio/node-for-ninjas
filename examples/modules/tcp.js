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

// This example sends a message "to himslef" and its response through TCP
// (Server and client)
// http://nodejs.org/api/net.html

'use strict';

var net = require('net'),
    portfinder = require('portfinder'),

    MSG_CLIENT = 'Hi world! :)',
    MSG_SERVER = 'Hi luser! :P',
    TIMEOUT = 5000,

    // Here we've a "connected" event, so we use it to check the timeout
    connected = false,
    server, socket;


function timeoutCb() {
    if (!connected) {
        console.log('Error: Timeout');

        process.exit(1);
    }

    // We need this to avoid errors
    socket.close();
}


// SERVER

// We also have sockets here, but we prefer to use an upper layer now
// http://nodejs.org/api/net.html#net_class_net_socket
server = net.createServer(
    {
        // The socket won't automatically send a FIN packet when the other end
        // of the socket sends a FIN packetThe socket becomes non-readable, but
        // still writable. You should call the end() method explicitly.
        // - Useful to flood
        allowHalfOpen: true
        // No data will be read from the socket until call "resume()"
        // It allows to pass the socket between process
//        pauseOnConnect: true
    },
    function (client) { // "connection" listener
        console.log('SERVER: Client connected');

        client.on('connect', function () {
            console.log('SERVER: Client connected');
        });

        client.on('data', function (dataServer) {
            console.log('SERVER: Data received:');
            // In this case we could use "setEncoding" in the client
            // to avoid this
            // http://nodejs.org/api/net.html#net_socket_setencoding_encoding
            console.log(dataServer.toString());

        });

        // When the other end of the socket sends a FIN packet
        client.on('end', function () {
            console.log('SERVER: Client disconnected');
        });

        client.write(MSG_SERVER);
        // Echo server
//        clientServer.pipe(clientServer);
    }
);

portfinder.getPort(function (err, port) {
    if (err) {
        console.log('SERVER: Error: getPort():');
        console.log(err);

        process.exit(1);
    }

    server.listen(port, function () { // "listening" listener

        console.log('SERVER: I\'m listening ... in the port ' + port);

        // To test the server you can use: telnet localhost PORT


        // CLIENT

        // We're using the socket directly here

        // We always prefer to pass the whole object options!
        // (JSHint "maxparams")
        socket = net.connect(
            {
                port: port
                // defaults to localhost
        //        host: '192.168.1.6',
        //        localAddress: '192.168.1.3',
        //        localPort: 9999,
        //        family: 6
            },
            function () { // "connect" listener
                connected = true;
                console.log('CLIENT: I\'m connected to server!');
                socket.write(MSG_CLIENT);
            }
        );
        setTimeout(timeoutCb, TIMEOUT);

        socket.on('data', function (data) {
            console.log('CLIENT: Message reveived:');
            console.log(data.toString());

            // Closing the the client side socket, we're exiting but it is
            // really dangerous not to close them in real apps (OS erros, etc.)
            socket.end();

            process.exit(0);
        });

        socket.on('end', function () {
            console.log('CLIENT: I\'ve been disconnected from the server :(');

            process.exit(1);
        });

        socket.on('error', function (err) {
            connected = true;
            console.log('CLIENT: Error:');
            console.log(err);

            process.exit(1);
        });
    });

});
