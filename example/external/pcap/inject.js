#!/usr/bin/env node

/*
  Copyright Jesús Pérez <jesusprubio@gmail.com>

  This code may only be used under the GPLv3 license found at
  http://www.gnu.org/licenses/gpl-3.0.txt.
*/

'use strict';

// ARP injection
// https://github.com/mranney/node_pcap
// - Dep: libpcap
// To watch the sent packet you can watch for all ARP frames:
// - "tcpdump -i en0 arp"
const pcap = require('pcap');

const session = pcap.createSession('en0', '');
const arpRequest = new Buffer([
  0xff, 0xff, 0xff, 0xff, 0xff, 0xff, // dst
  0xf6, 0xb5, 0xc6, 0x9b, 0x43, 0x35, // src
  0x08, 0x06, // type - arp
  0x00, 0x01, // htype - 0x0001 (ethernet)
  0x08, 0x00, // ptype - 0x8000 (ip)
  0x06, // hlen
  0x04, // plen
  0x00, 0x01, // op - (reply)
  0xf6, 0xb5, 0xc6, 0x9b, 0x43, 0x35, // hsrc
  0x0a, 0x00, 0x00, 0x01, // psrc 10.0.0.1
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // hdst
  0x0a, 0x00, 0x00, 0x02,  // pdst 10.0.0.2
]);

console.log('Sending ARP request ...');
session.inject(arpRequest);

// NOTE: Once the current event loop turn runs to completion, call the callback.
// This is not a simple alias to setTimeout(fn, 0), it's much more efficient.
// It runs before any additional I/O events (including timers) fire in
// subsequent ticks of the event loop.
// http://nodejs.org/api/process.html
process.nextTick();
