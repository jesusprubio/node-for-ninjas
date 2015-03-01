# Node for pentesters
A handbook for security experts who like JavaScript and javascripters who like (in)security.
>Don't Reinvent The Wheel, Unless You Plan on Learning More About Wheels
(by [@codinghorror](http://blog.codinghorror.com/dont-reinvent-the-wheel-unless-you-plan-on-learning-more-about-wheels/))


## 1. Introduction
*Work in progress*

### Motivation
All we know [JavaScript is taking the world](http://githut.info/), moreover with the Node irruption the rules have changed and we can use the same language also in the server side. All kind of servers were written, specially those ones related with the web (ie: [Express](http://expressjs.com/)), and [are being succesfully used in the wild](http://nodejs.org/industry/). Two years ago we were using Node at work so, one day, we also started to use it to write our day to day security stuff.

During this time we met with people doing the same and we started a [community](https://assaultjs.github.io/) around this idea. Furthermore since we started to write [Bluebox-ng](https://github.com/jesusprubio/bluebox-ng) we've been tracking the different security projects we found written in Node. Once we've finished the first stable version we decided to write this document to share what we learn.

We think it's the better way to contribute to make the Node community still more awesome. Security guys are really curious and pragmatic, and most of them already know how to write (and break) JavaScript. So we're pretty sure they're going to enjoy the Node community ;).

### Authors
- [@jesusprubio](https://twitter.com/jesusprubio)
- [@sergiogr](https://twitter.com/sergiogr)

### License & Copyright
- Code: [<img src="https://fsfe.org/graphics/gplv3-logo-red.png" height="40" alt="GPLv3">](https://www.gnu.org/copyleft/gpl.html)
<br><br>
- Contents: [<img src="http://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc-sa.eu.png" height="40" alt="CC BY-NC SA 3.0">](https://creativecommons.org/licenses/by-nc-sa/3.0/)

### Why Node?
- One language to rule them all -> **Productivity**
- Performance
 - Asyncronous I/O -> **Fast** & Simple (vs. multithreading) (ie: scanner, brute-forcer, etc.)
 - Single thread -> **High performance**
 - Paypal: "Double number of req/s and reduced response time by 35% or 200 ms"
- [NPM](https://www.npmjs.com/): **126.258 packages** (at 17/02/2015)
- **Community driven**
 - [io.js](https://iojs.org/en/index.html) vs. [Node.js®](http://nodejs.org/)
 - Reconciliation?: https://github.com/iojs/io.js/issues/978#issuecomment-76328274

### Sharpen your knife
- Must:
 - [JavaScript For Cats](http://jsforcats.com/)
 - [The art of Node](https://github.com/maxogden/art-of-node#the-art-of-node)
- Bonus:
 - [Node.js for Beginners](http://code.tutsplus.com/tutorials/node-js-for-beginners--net-26314)
 - [NodeSchool](http://nodeschool.io/)
 - [Ryan Dahl: Original Node.js presentation](https://www.youtube.com/watch?v=ztspvPYybIY)
 - [Mixu's Node book](http://book.mixu.net/node/)
 - [The Node Way](http://thenodeway.io/)
 - [Awesome Node.js](https://github.com/sindresorhus/awesome-nodejs)
 - [Eloquent JavaScript](http://eloquentjavascript.net/)
 - [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS/)
 - [Learn JavaScript Essentials](https://medium.com/javascript-scene/learn-javascript-b631a4af11f2)


## 2. Useful libraries
- [How "require" works](http://thenodeway.io/posts/how-require-actually-works/)
- [Error-first callback](http://thenodeway.io/posts/understanding-error-first-callbacks/): CPS
- Those ones which we think to be the best option
- Dependencies installed globally for now (ie: npm i -g ping)

### Examples
- Ping
- Ping TCP
- Whois
- Traceroute
- External IP
- Geolocate
- Wifi scanning
- [Web banner grabbing](examples/modules/httpScan.js)
- DNS resolve (dns-axfr)
- DNS reverse
- Host/Port scanning (node-portscanner)
- Speeding up Nmap (libnmap - http://zurb.com/forrst/posts/Speeding_up_nmap_with_node_js-GpQ)
- DNS brute-force (Subquest)
- [Exploit search](https://github.com/jesusprubio/node-exploitsearch-client/blob/master/examples/use.js)
- [SHODAN](https://github.com/jesusprubio/node-shodan-client/tree/master/examples)
- [SIP ping](examples/modules/sip/sipPing.js)
- [SIP authentication](examples/modules/sip/sipAuthentication.js)
- [MongoDB authentication](examples/modules/mongolAuth.js)
- [MySQL authentication](examples/modules/mysqlAuth.js)
- [HTTP authentication](examples/modules/httpAuth.js)
- [Pcap](examples/modules/pcap)
- [Fuzzing](examples/modules/fuzzing)
 - Faker
 - Surku
- [Sockets](examples/modules/sockets)
 - [Meta-socket](https://github.com/jesusprubio/sip-fake-stack/blob/master/src/steroidsSocket.js): Client only, the full object exposed
- Metasploit ([msfnode](https://github.com/eviltik/msfnode))
 - Last commit 10 Jun 2013! :(
- Radare (radare2-bindings)


## 3. P0wning the asynchrony
- for + maxSockets
- [Async](https://github.com/caolan/async)
 - Streams: [Highland](http://highlandjs.org/)

### Examples
- HTTP DoS
- Web path brute-force
- TCP DoS
- TFTP brute-force
- Scanner
 - Arrays and objects powers
 - Complexity kills, careful -> Lazy evaluation (Underscore vs. Lodash vs. Lazy)
- Brute-forcer
- Fuzzer
- Continuous pentesting


## 4. Performance
TODO


## 5. A good NPM module
- package.json
- Patterns:
 - [Singleton](http://thenodeway.io/posts/designing-singletons/)
 - [Custom Type](http://thenodeway.io/posts/designing-custom-types/)
- Node inspector
- Grunt :) vs. Gulp (streams)
- grunt-time
- JSHint+JSCS
- Retire.js
- time?

### Example
 - Exploitsearch


## 6. Finishing touches

### Examples
- Cli
 - [Manual implementation](https://github.com/assaultjs/assaultjs/blob/master/bin/client.js)
 - Commander: Command line
 - Celeri: Command line and interactive
- Reporting: JSON (Bluebox-ng report)
- Database: [Mongoose](https://www.youtube.com/playlist?list=PL5wy-Ijp__A2-ZSePUHXPMwpV19MqcNUX)
 - Conectors (Memory, DB, etc.)
- Logging (Winston)
- Documentation


## 7. Assaultjs
- Pentesting and exploiting stuff in Node
 - **Community**
 - Site: https://assaultjs.github.io/
 - IRC: #assaultjs
 - Twitter: @assaultjs
- **Framework**
 - Demo still not available, by the way the [Bluebox-ng one](https://www.youtube.com/watch?v=M-6k4Md3qEQ) is similar for now
 - [Design](https://github.com/assaultjs/assaultjs)