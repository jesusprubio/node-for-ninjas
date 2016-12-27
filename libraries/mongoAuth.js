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

// https://github.com/mongodb/node-mongodb-native


var mongo = require('mongodb'),
    client = mongo.MongoClient,

    HOST = '127.0.0.1',
    PORT = 27017,
//    USER = 'admin',
//    PASS = 'admin',
    TIMEOUT = 5000;


client.connect(
    // Without auth
    'mongodb://' + HOST + ':' + PORT +
    '/admin?autoReconnect=false&connectTimeoutMS=' + TIMEOUT,
    // With auth
//    'mongodb://' + USER + ':' + PASS + '@' + HOST + ':' + PORT +
//    '/admin?autoReconnect=false&connectTimeoutMS=' + TIMEOUT,

    // By default the client tries 5 times
    {
        numberOfRetries  : 0,
        retryMiliSeconds : 0 // Just in case
    },
    function (err, res) {
        // TODO: Destroy/close client, not supported by the module
        if (err) {
            console.log('Error:');
            console.log(err);

            process.exit(1);
        } else {
            console.log('Result:');
            console.log(res);

            process.exit(0);
        }
    }
);
