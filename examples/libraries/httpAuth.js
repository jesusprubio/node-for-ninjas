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

// https://github.com/request/request
// - easier: TLS, redirection, etc.

// Does not work with Node v0.12.x!! (they're working on it)


var request = require('request'),

    TIMEOUT = 5000,
    AUTH_CFG = {
        user: 'admin',
        pass: 'admin',
        // the request will retry with a proper authentication header after
        // receiving a 401 (which must contain a WWW-Authenticate header
        // indicating the required authentication method)
        sendImmediately: false
    },
    // to avoid blocking
    HEADERS = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0)' +
            'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/' +
            '31.0.1650.63 Safari/537.36'
    },
    CFG = {
        uri       : 'http://127.0.0.1',
//        uri       : 'http://127.0.0.1:8080',
        method    : 'GET',
        headers   : HEADERS,
        json      : false,
        timeout   : TIMEOUT,
        strictSSL : false,
        auth      : AUTH_CFG
    };

request.get(CFG, function (err, res, body) {
    // TODO: Destroy/close client, not supported by the module
    if (err) {
        console.log('Error:');
        console.log(err);

        process.exit(1);
    } else {
        console.log('Result:');
        console.log(res);
        console.log('Body:');
        console.log(body);

        process.exit(0);
    }
});
