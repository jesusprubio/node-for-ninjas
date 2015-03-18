#!/usr/bin/env node

'use strict';

/*
    Copyright Sergio Garcia <s3rgio.gr gmail com>

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


var ping = require('tcp-ping'),

    CFG = {
        address: '46.28.246.123',
        port: 80,
        timeout: 5000,
        attempts: 3
    };

ping.ping(CFG, function (err, res) {
    if (err) {
        console.log('Error:');
        console.log(err);

        process.exit(1);
    } else {
        console.log('Result:');
        console.log(res);

        process.exit(0);
    }
});