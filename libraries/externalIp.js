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

// https://github.com/mjhasbach/MOIRA

var moira = require('moira');

moira.getIP(function (err, ip, service) {
    if (err) {
        console.log('ERROR:');
        console.log(err);

        process.exit(1);

    } else {
        console.log('Result:');
        console.log(ip);
        console.log(service);

        process.exit(0);
    }
});
