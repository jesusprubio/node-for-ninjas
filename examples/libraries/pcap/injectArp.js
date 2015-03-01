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

// ARP injection
// https://github.com/mranney/node_pcap
// - Dep: libpcap
// To watch the sent packet you can watch for all ARP frames:
// - "tcpdump -i en0 arp"


var pcap = require('pcap'),

    session = pcap.createSession('en0', ''),
    arpRequest = new Buffer([
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
        0x0a, 0x00, 0x00, 0x02  // pdst 10.0.0.2
    ]);

console.log('Sending ARP request ...');
session.inject(arpRequest);

// Just in case (no callbacks)
// Once the current event loop turn runs to completion, call the callback.
// This is not a simple alias to setTimeout(fn, 0), it's much more efficient.
// It runs before any additional I/O events (including timers) fire in
// subsequent ticks of the event loop
process.nextTick(process.exit(0));
