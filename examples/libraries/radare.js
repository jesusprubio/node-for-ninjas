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

// https://github.com/radare/radare2-bindings/tree/master/r2pipe/nodejs


var r2pipe = require('r2pipe');

function doSomeStuff(r2) {
    r2.cmd('iS', function (output) {
        console.log (output);
        process.exit(0);
    });
}

r2pipe.launch ('/bin/ls', doSomeStuff);
