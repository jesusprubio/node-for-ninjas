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

// Generating fake common data
// https://github.com/marak/Faker.js


var faker = require('faker');

console.log('IP: ' + faker.internet.ip());
console.log('User-Agent: ' + faker.internet.userAgent());
console.log('Color: ' + faker.internet.color());
console.log('Password: ' + faker.internet.password());

console.log('\nImage (sports): ' + faker.image.sports());
console.log('Image (cats): ' + faker.image.cats());
console.log('Image (avatar): ' + faker.image.avatar());

console.log('\nHacker (abbreviation): ' + faker.hacker.abbreviation());
console.log('Hacker (adjective): ' + faker.hacker.adjective());
console.log('Hacker (noun): ' + faker.hacker.noun());
console.log('Hacker (verb): ' + faker.hacker.verb());
console.log('Hacker (ingverb): ' + faker.hacker.ingverb());
console.log('Hacker (phrase): ' + faker.hacker.phrase());

console.log('\nName: ' + faker.name.findName());
console.log('Email: ' + faker.internet.email());
console.log('Street address: ' + faker.address.streetAddress());
console.log('Phone number: ' + faker.phone.phoneNumber());
//console.log('Card:');
//console.log(faker.helpers.createCard());

// 27 language definition packs
faker.locale = 'es';
console.log('\nLocale changed to "es"\n');

console.log('Name: ' + faker.name.findName());
console.log('Email: ' + faker.internet.email());
console.log('Street address: ' + faker.address.streetAddress());
console.log('Phone number: ' + faker.phone.phoneNumber());
//console.log('Card:');
//console.log(faker.helpers.createCard());



process.exit(0);
