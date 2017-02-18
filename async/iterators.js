#!/usr/bin/env node

'use strict';

/*
  Copyright Jesús Pérez <jesusprubio@gmail.com>

  This code may only be used under the GPLv3 license found at
  http://www.gnu.org/licenses/gpl-3.0.txt.
*/

// http://nodejs.org/api/fs.html
const path = require('path');
const fs = require('fs');
// <3 Lodash
const lodash = require('lodash');


// 1st iter
// "path" to work in different OSs.
// const path = path.resolve(__dirname, '..', 'artifacts', 'john.txt');
const dicPath = path.resolve(__dirname, '..', 'artifacts', 'superBigDirs.txt');

const dic = fs.readFileSync(dicPath);
// We use the same for convenience, enough to show what we want.
const dic2 = fs.readFileSync(dicPath);

const list1 = dic.toString().split('\n');
const list2 = dic2.toString().split('\n');

console.log('List 1\n');
console.log(list1);
console.log('\nList 1 lenght');
console.log(list1.length);
console.log('\nList 2 lenght');
console.log(list2.length);

const pairsList = [];

// Common need.
const userAssPass = false;

lodash.each(list1, (str1) => {
  if (userAssPass) { pairsList.push([str1, str1]); }
  lodash.each(list2, (str2) => {
    pairsList.push([str1, str2]);
  });
});

console.log('\nPairs list lenght');
console.log(pairsList);

console.log('\nPairs list lenght');
console.log(list2.length);


// Error of the last code: "JavaScript heap out of memory"
// - Array too huge to fit in memory (pairsList)

// https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Iterators_and_Generators
// const LineByLine = require('n-readlines');

// function iterFile(filePath) {
//   let liner = new LineByLine(filePath);

//   return {
//     // The "reset" method included in the library is not valid for our case
//     // because it doesn't work when the iterator has finished.
//     reset: () => { liner = new LineByLine(filePath); },
//     next: () => {
//       const line = liner.next();
//       if (line !== false) {
//         return {
//           value: line.toString(),
//           done: false,
//         };
//       }

//       return { done: true };
//     },
//   };
// }


// const iter1 = iterFile(dicPath);
// console.log(iter1.next().value);
// console.log(iter1.next().value);
// console.log(iter1.next().value);
// // To let it ready for this example.
// console.log(iter1.reset());


// const iter2 = iterFile(dicPath);
// let stop = false;

// while (!stop) {
//   const nextStr1 = iter1.next();

//   if (userAssPass) {
//     console.log('New pair:');
//     console.log([nextStr1.value, nextStr1.value]);
//   }

//   if (nextStr1.done) {
//     stop = true;
//     break;
//   }

//   while (!stop) {
//     const nextStr2 = iter2.next();

//     if (nextStr2.done) {
//       iter2.reset();
//       break;
//     }

//     console.log('New pair:');
//     console.log([nextStr1.value, nextStr2.value]);
//   }
// }
