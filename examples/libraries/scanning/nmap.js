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

// https://github.com/jas-/node-libnmap
// Examples of the README not working -> TODO: PR

var nmap = require('node-libnmap').nmap,

    OPTIONS = {
        range: ['192.168.1.1', '192.168.1.2'],
        ports: '21-23,80,443',
        nmap: '/usr/local/bin/nmap'
    };
//    OPTIONS_DISCOVER = {
//        nmap: '/usr/local/bin/nmap'
//    };
//nmap('discover', OPTIONS_DISCOVER, function (err, report){
//    if (err) {
//        console.log('ERROR');
//        console.log(err);
//
//        process.exit(1);
//    } else {
//        console.log('Report:');
//        console.log(report);
//
//        process.exit(0);
//    }
//});

// TODO: Not working if nmap binary not present in the path,
// or if no nmap option present, "uncaughtException" to the rescue
try {
    nmap('scan', OPTIONS, function (err, report) {
        if (err) {
            console.log('ERROR');
            console.log(err);

            process.exit(1);
        } else {
            console.log('Report:');
            // "Sub-objects" not printed
            //            console.log(report);
            // Fix:
            console.log(JSON.stringify(report, null, 2));

            process.exit(0);
        }
    });
} catch (err) {
    console.log('Catched ERROR:');
    console.log(err);

    process.exit(1);
}

process.on('uncaughtException', function (err) {
    console.log('ERROR: "uncaughtException" found:');
    console.log(err);

    process.exit(1);
});
