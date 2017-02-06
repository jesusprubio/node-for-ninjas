#!/usr/bin/env node

/*
  Copyright Jesús Pérez <jesusprubio@gmail.com>

  This code may only be used under the GPLv3 license found at
  http://www.gnu.org/licenses/gpl-3.0.txt.
*/

'use strict';

// https://github.com/felixge/node-mysql
const mysql = require('mysql');

const conn = mysql.createConnection({
  host: '127.0.0.1',
  user: 'admin',
  password: 'admin',
  connectTimeout: 5000,
  // Only when secure
  // ssl: { rejectUnauthorized: false },
});
conn.connect((err, res) => {
  conn.destroy();
  if (err) {
    console.log('Error:');
    console.log(err);

    process.exit(1);
  }

  console.log('Result:');
  console.log(res);
});
