#!/usr/bin/env node

/*
  Copyright Jesús Pérez <jesusprubio@gmail.com>

  This code may only be used under the GPLv3 license found at
  http://www.gnu.org/licenses/gpl-3.0.txt.
*/

'use strict';

// https://github.com/arturadib/shelljs
// They recommend to use it in this way, but we prefer pure JS
// require('shelljs/global');
// mkdir('-p', 'out/Release');
const shell = require('shelljs');

shell.exec(
  'ls',
  // Error exit code
  // 'lss',
  { silent: true },
  (code, output) => {
    console.log(`Exit code: ${code}`);
    console.log('Program output:');
    console.log(output);
  }
);
