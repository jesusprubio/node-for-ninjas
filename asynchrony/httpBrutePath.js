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

// We use the "request" module again this time
// time node examples/asynchrony/httpBrutePath.js


var fs = require('fs'),
    request = require('request'),
    async = require('async'),
    lodash = require('lodash'),
    faker = require('faker'),

    BASE_URI = 'http://172.16.190.136', // BadStore
    PASS_FILE = 'artifacts/john.txt',
    TIMEOUT = 5000,
    // low value to avoid problems (too much opened sockets, etc.)
    LIMIT = 100, // good
//    LIMIT = 1000, // not as good, even slower

    cfg = {
        method: 'GET',
        headers: {
            // to avoid blocking
            'User-Agent': faker.internet.userAgent()
        },
        json: false,
        timeout: TIMEOUT,
        strictSSL: false
    },
    finalUris = [],
    result = [],
    baseUri;


function exitError(err) {
    console.log('Error:');
    console.log(err);

    process.exit(1);
}


// ----- Starting here -----

// Removing the trailing "/" (if any)
if (BASE_URI.substr(BASE_URI.length - 1) === '/') {
    baseUri = BASE_URI.slice(0, -1);
} else {
    baseUri = BASE_URI;
}

// Avoid the Sync methods (readFileSync)!!! They pause the event loop :(
// http://nodejs.org/api/fs.html#fs_fs_readfile_filename_options_callback
fs.readFile(PASS_FILE, function (err, data) {
    var paths;

    if (err) {
        exitError(err);

        return;
    }
    // Splitting in an array
    paths = data.toString().split('\n');

    // This way of "if/else" preferred to avoid the callback hell

    // It's considered a good practice to "pre-calculate" the needed values
    // (final targets in this case) and to store them in Arrays/Objects before
    // to start
    // NOTE: Complexity kills the event loop! -> Lazy evaluation
    // - Underscore:
    //  - Not supported
    //  - http://underscorejs.org/
    // - Lazy.js:
    //  - Supported (main idea of the project)
    //  - http://danieltao.com/lazy.js/
    // - Lodash:
    //  - Same API than Underscore but better performance since its born
    //  - Now it supports lazy evaluation
    //   - http://filimanjaro.com/blog/2014/introducing-lazy-evaluation/
    //   - https://github.com/lodash/lodash/issues/274
    //   - http://jsperf.com/lodash-lazy#chart=bar

    lodash.each(paths, function (actualPath) {
        finalUris.push(baseUri + '/' + actualPath);
    });


    // Slower
//    async.eachSeries(finalUris, function (finalUri, asyncCb) {
    async.eachLimit(finalUris, LIMIT, function (finalUri, asyncCb) {
    // Use at your own risk!
//    async.each(finalUris, function (finalUri, asyncCb) {

        // Reusing the object
        cfg.uri = finalUri;
        request.get(cfg, function (err, res, body) {
            // TODO: Destroy/close client, not supported by the module
            if (err) {
                asyncCb(err);
            } else if (!err && res.statusCode !== 404) {
                // Adding the iteration result to the final list
                result.push({
                    path : finalUri,
                    code : res.statusCode,
                    body : body // same as res.body
                });
                // We print info to avoid the user waiting
                console.log('Valid path found: ' + finalUri);
                asyncCb();
            } else {
                console.log('Valid path NOT found: ' + finalUri);
                asyncCb();
            }
        });
    }, function (err) {
        if (err) {
            exitError(err);
        } else {
            console.log('RESULT, valid paths:');
            console.log(result);

            process.exit(0);
        }
    });
});

// To avoid any other possible break of the event-loop, only useful in production
//process.on('uncaughtException', function (err) {
//    printer.error('"uncaughtException" found:');
//    printer.error(err);
//});
