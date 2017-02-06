#!/usr/bin/env node

/*
  Copyright Jesús Pérez <jesusprubio@gmail.com>

  This code may only be used under the GPLv3 license found at
  http://www.gnu.org/licenses/gpl-3.0.txt.
*/

'use strict';

// Dep: Radare2: http://www.radare.org
// https://github.com/radare/radare2-bindings/tree/master/r2pipe/nodejs
// r2pipe preffered, reason here: https://github.com/radare/radare2-bindings/tree/master/r2pipe
const r2pipe = require('r2pipe');

function doStuff(err, r2) {
  if (err) {
    console.log(`Error (pipe): ${err.message}`);

    r2.quit();
    return;
  }

  console.log('Binary piped correctly, running a command ...');
  // "j" mandatory -> JSON
  // Info command.
  const r2Comm = 'ij';
  // Sections.
  // const r2Comm = 'iSj';
  // Linked libraries
  // const r2Comm = 'ilj';
  // Entry points
  // const r2Comm = 'iej';
  // r2.cmd(r2Comm, (errCmd, output) => {
  r2.cmdj(r2Comm, (errCmd, output) => {
    if (errCmd) {
      console.log(`Error (cmdj): ${err.message}`);
    } else {
      console.log('Command run correctly, output:');
      console.log(output);
    }

    r2.quit();
  });
}

r2pipe.pipe('/bin/ls', doStuff);

// "Automating bynary analysis with radare"
// https://rada.re/get/r2pipe-nn2015.pdf
