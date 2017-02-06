#!/usr/bin/env node

/*
  Copyright Jesús Pérez <jesusprubio@gmail.com>

  This code may only be used under the GPLv3 license found at
  http://www.gnu.org/licenses/gpl-3.0.txt.
*/

'use strict';

// Simple example.
// https://github.com/attekett/Surku
// echo "Hello Fuzz..." > test.txt
// surku -Mm 2 -mm 1 ./test.txt

const Surku = require('surku');

const fuzzer = new Surku();

for (let i = 0; i <= 2; i += 1) { console.log(fuzzer.generateTestCase('Hi fuzz world! :)')); }

process.exit(0);
