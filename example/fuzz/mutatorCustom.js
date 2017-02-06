#!/usr/bin/env node

/*
  Copyright Jesús Pérez <jesusprubio@gmail.com>

  This code may only be used under the GPLv3 license found at
  http://www.gnu.org/licenses/gpl-3.0.txt.
*/

'use strict';

// New mutator adition.
// https://github.com/attekett/Surku
const Surku = require('surku');

// maxMutations: How many mutations at max per test case (defaults to 20)
// minMutations: Indicates how many mutations at least are done per test
// case (defaults to 2)
// useOnly: Specifies what mutators are used, must contain an array of
// mutator names. (default "undefined")
// seed: Defines seed which with the random generator is initialized with (default "undefined")
// if not set, (new Date().getTime())+Math.floor(Math.random()*100000) is used
// verbose: With integer with max value 5
const fuzzer = new Surku({
  maxMutations: 1,
  minMutations: 1,
  useOnly: [],
});

// params: name, weight, mutatorFunction
fuzzer.mutators.addNewMutator('demoMutator', 5, (input) => {
  const where = Math.floor(Math.random() * input.length);

  return `${input.slice(0, where)}Ananda${input.slice(where, input.length)}`;
});

console.log(fuzzer.generateTestCase('Sweet dreams! :)'));

process.exit(0);

