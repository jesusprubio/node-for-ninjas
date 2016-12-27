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

// New mutator adition
// https://github.com/attekett/Surku


var Surku = require('surku'),

    TO_MUTATE = 'Sweet dreams! :)',
    // maxMutations: How many mutations at max per test case (defaults to 20)
    // minMutations: Indicates how many mutations at least are done per test
    // case (defaults to 2)
    // useOnly: Specifies what mutators are used, must contain an array of
    // mutator names. (default "undefined")
    // seed: Defines seed which with the random generator is initialized with (default "undefined")
    // if not set, (new Date().getTime())+Math.floor(Math.random()*100000) is used
    // verbose: With integer with max value 5
    OPTIONS = {
        maxMutations: 1,
        minMutations: 1,
        useOnly: []
    },

    fuzzer = new Surku(OPTIONS);

// params: name, weight, mutatorFunction
fuzzer.mutators.addNewMutator('demoMutator', 5, function (input) {
    var where = Math.floor(Math.random() * input.length);

    return input.slice(0, where) + 'Ananda' + input.slice(where, input.length);
});

console.log(fuzzer.generateTestCase(TO_MUTATE));

process.exit(0);

