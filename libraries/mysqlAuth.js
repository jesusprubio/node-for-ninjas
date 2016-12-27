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

// https://github.com/felixge/node-mysql


var mysql = require('mysql'),

    TIMEOUT = 5000,
    CFG = {
        host: '127.0.0.1',
        user: 'admin',
        password: 'admin',
        connectTimeout: TIMEOUT
        // Only when secure
//        ssl: { rejectUnauthorized: false }
    },

    conn;

conn = mysql.createConnection(CFG);
conn.connect(function (err, data) {
    conn.destroy();
    if (err) {
        console.log('Error:');
        console.log(err);

        process.exit(1);
    } else {
        console.log('Result:');
        console.log(data);

        process.exit(0);
    }
});
