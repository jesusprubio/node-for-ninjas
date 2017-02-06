#!/usr/bin/env node

/*
  Copyright Jesús Pérez <jesusprubio@gmail.com>

  This code may only be used under the GPLv3 license found at
  http://www.gnu.org/licenses/gpl-3.0.txt.
*/

'use strict';

// Generating fake common data
// https://github.com/marak/Faker.js
const faker = require('faker');

console.log(`IP: ${faker.internet.ip()}`);
console.log(`User-Agent: ${faker.internet.userAgent()}`);
console.log(`Color: ${faker.internet.color()}`);
console.log(`Password: ${faker.internet.password()}`);

console.log(`\nImage (sports): ${faker.image.sports()}`);
console.log(`Image (cats): ${faker.image.cats()}`);
console.log(`Image (avatar): ${faker.image.avatar()}`);

console.log(`\nHacker (abbreviation): ${faker.hacker.abbreviation()}`);
console.log(`Hacker (adjective): ${faker.hacker.adjective()}`);
console.log(`Hacker (noun): ${faker.hacker.noun()}`);
console.log(`Hacker (verb): ${faker.hacker.verb()}`);
console.log(`Hacker (ingverb): ${faker.hacker.ingverb()}`);
console.log(`Hacker (phrase): ${faker.hacker.phrase()}`);

console.log(`\nName: ${faker.name.findName()}`);
console.log(`Email: ${faker.internet.email()}`);
console.log(`Street address: ${faker.address.streetAddress()}`);
console.log(`Phone number: ${faker.phone.phoneNumber()}`);
// console.log(`Card:`);
// console.log(faker.helpers.createCard());

// 27 language definition packs
faker.locale = 'es';
console.log('\nLocale changed to "es"');

console.log(`\nName: ${faker.name.findName()}`);
console.log(`Email: ${faker.internet.email()}`);
console.log(`Street address: ${faker.address.streetAddress()}`);
console.log(`Phone number: ${faker.phone.phoneNumber()}`);

process.exit(0);
