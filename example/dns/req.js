#!/usr/bin/env node

/*
  Copyright Jesús Pérez <jesusprubio@gmail.com>

  This code may only be used under the GPLv3 license found at
  http://www.gnu.org/licenses/gpl-3.0.txt.
*/

'use strict';

// https://nodejs.org/api/dns.html
const dns = require('dns');


// Optional -> privacy
// https://nodejs.org/api/dns.html#dns_dns_setservers_servers
// "array of IPv4 or IPv6 addresses"
// https://use.opendns.com/
dns.setServers(['208.67.222.222', '208.67.220.220']);

// https://nodejs.org/api/dns.html#dns_dns_resolve_hostname_rrtype_callback
// Only one type per request allowed for now, please see how to implement it here:
// https://github.com/jesusprubio/bluebox-ng/blob/v2/lib/dns/resolve.js
const type = 'A'; // if param not passed this is the default anyway
// const type = 'AAAA';
// const type = 'MX';
// From here not present in this case.
// const type = 'SRV';
// const type = 'PTR';
dns.resolve('example.com', type, (err, res) => {
  if (err) {
    console.log('Error (resolve):');
    console.log(err);

    process.exit(1);
  }

  console.log('Response (resolve):');
  console.log(res);
});

// https://nodejs.org/api/dns.html#dns_dns_reverse_ip_callback
dns.reverse('8.8.8.8', type, (err, res) => {
  if (err) {
    console.log('Error (reverse):');
    console.log(err);

    process.exit(1);
  }

  console.log('Response (reverse):');
  console.log(res);
});
