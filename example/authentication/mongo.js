#!/usr/bin/env node

/*
  Copyright Jesús Pérez <jesusprubio@gmail.com>

  This code may only be used under the GPLv3 license found at
  http://www.gnu.org/licenses/gpl-3.0.txt.
*/

'use strict';

// https://github.com/mongodb/node-mongodb-native
const mongo = require('mongodb');

const client = mongo.MongoClient;

const host = '127.0.0.1';
const port = 27017;
const timeout = 5000;
// const user = 'admin';
// const pass = 'admin';


client.connect(
  // Without auth
  `mongodb://${host}:${port}/admin?autoReconnect=false&connectTimeoutMS=${timeout}`,
  // With auth
  // `mongodb://${user}:${pass}@${host}:${port}/admin?` +
     `autoReconnect=false&connectTimeoutMS=${timeout}`,
  // By default the client tries 5 times
  {
    numberOfRetries: 0,
    retryMiliSeconds: 0, // Just in case
  },
  (err, res) => {
    // TODO: Destroy/close client, not supported by the module
    if (err) {
      console.log('Error:');
      console.log(err);

      process.exit(1);
    }

    console.log('Result:');
    console.log(res);
  }
);
