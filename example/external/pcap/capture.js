#!/usr/bin/env node

/*
  Copyright Jesús Pérez <jesusprubio@gmail.com>

  This code may only be used under the GPLv3 license found at
  http://www.gnu.org/licenses/gpl-3.0.txt.
*/

'use strict';

// Simple capture
// https://github.com/mranney/node_pcap
// Run with sudo
// - Dep: libpcap
// - Example: https://github.com/mranney/http_trace
// From devs: There is no real benefit to using this project to just to
// write out a pcap file, just use tcpdump or wireshark.
const pcap = require('pcap');

// params: iface, filter
// filters: http://www.tcpdump.org/manpages/pcap-filter.7.html
// All packets
const pcapSession = pcap.createSession('en0', '');
// Other examples
// const pcapSession = pcap.createSession('en0', 'udp');
// const pcapSession = pcap.createSession('en0', 'tcp port 80');

// To parse a existing PCAP file
// const pcapSession = pcap.createOfflineSession('./test.pcap');

pcapSession.on('packet', (rawPacket) => {
  console.log('-------------------------------------------------');
  console.log('RAW');
  console.log(rawPacket);

  // Decode: convert into a JS object
  const packet = pcap.decode.packet(rawPacket);

  // Options: play with colors, etc.
  console.log('Header:');
  console.log(packet.pcap_header);
  console.log('Payload:');
  console.log(packet.payload.toString());
});

// TODO: the module does not provide any error event
setTimeout(() => {
  console.log('Session stats:');
  console.log(pcapSession.stats());

  pcapSession.close();
  console.log('Session manually closed!');
}, 5000);
