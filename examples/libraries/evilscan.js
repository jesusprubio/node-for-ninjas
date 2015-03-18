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

// https://github.com/eviltik/evilscan

var Evilscan = require('evilscan'),

    OPTIONS = {
        target: '192.168.1.1',
        port: '21,22,80,443',
        status: 'TROU', // Timeout, Refused, Open, Unreachable
        timeout: 5000,
        banner: true,
        geo: true
    },

    scanner;

scanner = new Evilscan(OPTIONS);

// Fired in any match
scanner.on('result', function (data) {
    console.log(data);
});

scanner.on('error', function (err) {
    console.log('ERROR:');
    console.log(err);

    process.exit(1);
});

scanner.on('done', function () {
    console.log('Done');

    process.exit(0);
});

scanner.run();
