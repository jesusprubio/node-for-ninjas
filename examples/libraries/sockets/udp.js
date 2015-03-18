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

// This example sends a message "to himslef" through UDP (Server and client)
// http://nodejs.org/api/dgram.html


var dgram = require('dgram'),
    portfinder = require('portfinder'),

    // PROBLEM: How do you guarantee that it's free?
    // - [Iterate](https://gist.github.com/mikeal/1840641)
    // We do not reinvent the wheel! So we prefer to use a module
    // - https://github.com/indexzero/node-portfinder
//    SERVER_PORT = 4444,
    MSG = new Buffer('Hi world! :)'),
    TIMEOUT = 5000,

    socket = dgram.createSocket('udp4'),
    // IPv6
//    socket = dgram.createSocket('udp6'),
    // The client don't support any close function, so we need this callback
    // to emulate it. This var is to control of our timeout error
    received = false;


function timeoutCb() {
    if (!received) {
        console.log('Error: Timeout');

        process.exit(1);
    }

    // We need this to avoid errors
    socket.close();
}


// SERVER

socket.on('message', function (msg, rinfo) {
    received = true;
    console.log('SERVER: Message reveived from ' + rinfo.address + ':' + rinfo.port);
    // It's a Buffer and we need a String to print
    console.log(msg.toString());

    // Not needed, we're exiting right now, but in real apps be careful!
//    socket.close();
//     debugger; // used in the chapter 4
    process.exit(0);
});

socket.on('listening', function () {
    var address = socket.address();

    console.log('SERVER: I\'m listening ... (' + address.address +
                ':' + address.port + ')');
});

socket.on('close', function () {
    console.log('SERVER: I\'ve been closed :(');

    process.exit(1);
});

socket.on('error', function (err) {
    // We also set it in this case to avoid returning multiple errors (Timeout)
    received = true;
    console.log('SERVER: Error:');
    console.log(err);

    process.exit(1);
});

portfinder.getPort(function (err, port) {
    // Only use sync stuff when mandatory
    if (err) {
        console.log('SERVER: Error: getPort():');
        console.log(err);

        process.exit(1);
    }

    // http://nodejs.org/api/dgram.html#dgram_socket_bind_options_callback
    socket.bind(port);


    // CLIENT

    // It could be in a different file but we're reusing the socket
    // and including here for simplicity
    socket.send(MSG, 0, MSG.length, port, 'localhost', function (err) {
        // To test the timeout an wasy way it to target an online
        // (non compatible) host/port (ie: The "http-server" module)
        // https://github.com/nodeapps/http-server (default setup)
        // Check the differences between them (and with the server down)
//    socket.send(MSG, 0, MSG.length, 8080, "localhost", function (err) {
        if (err) {
            console.log('CLIENT: Error: send():');
            console.log(err);

            process.exit(1);
        } else {
            console.log('CLIENT: Message sent');
        }
    });
    // The UDP module doesn't provide a "connected" event so
    // we look for a timeout when we sent the packet
    setTimeout(timeoutCb, TIMEOUT);

});
