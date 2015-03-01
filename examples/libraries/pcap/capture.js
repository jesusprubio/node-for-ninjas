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

// Simple capture
// https://github.com/mranney/node_pcap
// Run with sudo
// - Dep: libpcap
// - Example: https://github.com/mranney/http_trace
// From devs: There is no real benefit to using this project to just to
// write out a pcap file, just use tcpdump or wireshark

'use strict';

var pcap = require('pcap'),

    pcapSession;

// params: iface, filter
// filters: http://www.tcpdump.org/manpages/pcap-filter.7.html
// All packets
pcapSession = pcap.createSession('en0', '');
// Other examples
//pcapSession = pcap.createSession('en0', 'udp');
//pcapSession = pcap.createSession('en0', 'tcp port 80');

// To parse an existing PCAP file
//pcapSession = pcap.createOfflineSession('./test.pcap');

pcapSession.on('packet', function (rawPacket) {
    var packet;

    console.log('-------------------------------------------------');
//    console.log('RAW');
//    console.log(rawPacket);
    // Decode: convert into a JS object
    packet = pcap.decode.packet(rawPacket);
    // Options: play with colors, etc.
    console.log('Header:');
    console.log(packet.pcap_header);
    console.log('Payload:');
    console.log(packet.payload.toString());
});

// TODO: the module does not provide any error event

setTimeout(function () {
    var stats = pcapSession.stats();

    pcapSession.close();
    console.log('Session manually closed!');
    console.log('Session stats:');
    console.log(stats);

    process.exit(0);
}, 5000);
