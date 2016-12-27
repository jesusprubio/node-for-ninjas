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

// Simple example
// https://github.com/attekett/Surku


var Surku = require('surku'),

    TO_MUTATE = 'Hi world! :)',

    fuzzer = new Surku(),
    i;

for (i = 0; i <= 2; i += 1) {
    console.log(fuzzer.generateTestCase(TO_MUTATE));
    console.log('\n\n');
}

process.exit(0);
