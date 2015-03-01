#!/usr/bin/env node

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

// http://nodejs.org/api/http.html

'use strict';

var http = require('http');


http.get('http://www.google.com/index.html', function (res) {
    console.log('Result:');
//    console.log(res);
    // Google web server: GFE/2.0
    // https://en.wikipedia.org/wiki/Gmail
    console.log(res.headers.server);

    process.exit(0);
}).on('error', function (err) {
    console.log('Error:');
    console.log(err);

    process.exit(1);
});
