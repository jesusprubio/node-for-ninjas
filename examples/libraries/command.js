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

// https://github.com/arturadib/shelljs
// They recommend to use it in this way, but we prefer pure JS
//require('shelljs/global');
//mkdir('-p', 'out/Release');

var shell = require('shelljs');

shell.exec(
    'ls',
    // Error exit code
//    'lss',
    {
        silent: true
    },
    function (code, output) {
        console.log('Exit code: ' + code);
        console.log('Program output:');
        console.log(output);

        process.exit(0);
    }
);
