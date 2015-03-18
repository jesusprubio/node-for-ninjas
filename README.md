# Node for ninjas
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
- https://github.com/jesusprubio/node-for-pentesters/graphs/contributors

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
- [NPM](https://www.npmjs.com/): **133.297 packages** (at 18/03/2015)
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
 - [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS)
 - [Learning JavaScript Design Patterns](addyosmani.com/resources/essentialjsdesignpatterns/book)
 - [Learn JavaScript Essentials](https://medium.com/javascript-scene/learn-javascript-b631a4af11f2)


## 2. Useful libraries
- [How "require" works](http://thenodeway.io/posts/how-require-actually-works/)
- [Error-first callback](http://thenodeway.io/posts/understanding-error-first-callbacks/): CPS
 - ie: https://github.com/jesusprubio/bluebox-ng/blob/master/modules/geolocation.js
- Those ones which we think to be the best option: stars, commiters, examples!, documentation, etc.
- Dependencies installed globally for now (ie: `npm i -g ping`)

### Examples
- Ping
- Ping TCP
- Whois
- Traceroute
- External IP
- Geolocate
- Wifi scanning
- [Web banner grabbing](examples/libraries/httpScan.js)
- DNS resolve
- DNS reverse
- DNS zone transfer
- DNS brute-force (Subquest)
- Host/Port scanning
 - [Evilscan](examples/libraries/evilscan.js)
 - [Nmap](examples/libraries/nmap.js)
  - [Speeding up Nmap](http://zurb.com/forrst/posts/Speeding_up_nmap_with_node_js-GpQ)
- [Exploit search](https://github.com/jesusprubio/node-exploitsearch-client/blob/master/examples/use.js)
- [SHODAN](https://github.com/jesusprubio/node-shodan-client/tree/master/examples)
- [SIP ping](https://github.com/jesusprubio/sip-fake-stack/blob/master/examples/request.js)
- [SIP authentication](https://github.com/jesusprubio/sip-fake-stack/blob/master/examples/authenticate.js)
- [MongoDB authentication](examples/libraries/mongolAuth.js)
- [MySQL authentication](examples/libraries/mysqlAuth.js)
- [HTTP authentication](examples/libraries/httpAuth.js)
- [Pcap](examples/libraries/pcap.js)
- [Fuzzing](examples/libraries/fuzzing.js)
- [Sockets](examples/libraries/sockets.js)
 - [Meta-socket](https://github.com/jesusprubio/sip-fake-stack/blob/master/src/steroidsSocket.js): Client only, the full object exposed
- Metasploit ([msfnode](https://github.com/eviltik/msfnode))
 - Last commit 10 Jun 2013! :(
- Radare ([r2pipe](https://github.com/radare/radare2-bindings/tree/master/r2pipe/nodejs) module)
- [System command](examples/libraries/command.js)

## 3. P0wning the asynchrony
for + maxSockets, valid for servers but:
 - In general, not for this kind of tools (see httpDoS).
 - Node doesn't provide nothing similar for regular sockets.
- Options:
 - Manual implementation (pure event oriented, make it only with much love :):
  - See the fuzzer example
  - A web path brute-forcer (by @jpenalbae): https://gist.github.com/jpenalbae/46782408bebe8e61eb32
 - [Async](https://github.com/caolan/async)
  - Mew approach (also caloan): [Highland](http://highlandjs.org/) (streams)
 - Promises, Generators, ES7 async, etc. : http://pouchdb.com/2015/03/05/taming-the-async-beast-with-es7.html

### Examples
- [HTTP DoS](examples/asynchrony/httpDoS.js)
- [Fuzzer](examples/asynchrony/dumbFuzz.js)
- [Web path brute-force](examples/asynchrony/httpBrutePath.js)
- Slow attacks
- Host/port scanner
- Credentials brute-forcer
- Continuous pentesting

## 4. A good NPM module
- [package.json](package.json)
- Patterns:
 - [Singleton](http://thenodeway.io/posts/designing-singletons/)
 - [Custom Type](http://thenodeway.io/posts/designing-custom-types/)
- [JSHint](http://jshint.com/docs/options/) + [JSCS](http://jscs.info/rules.html)
 - https://github.com/gruntjs/grunt-contrib-jshint#reporter
 - https://github.com/gonsfx/gulp-jscs-stylish
- [Grunt](http://gruntjs.com/) :) vs. [Gulp](http://gulpjs.com/) (streams)
 - [time-grunt](https://github.com/sindresorhus/time-grunt)
- [Retire.js](https://github.com/bekk/retire.js)
 - [grunt-retire](https://github.com/bekk/grunt-retire)
- [time-require](https://github.com/jaguard/time-require)
- Debugging: Node-inspector (external to the package)
 - Install: `npm install -g node-inspector`
 - Use: `node-debug examples/libraries/sockets/udp.js`

### Example
 - [Exploitsearch](https://github.com/jesusprubio/node-exploitsearch-client)

## 5. Performance
TODO

## 6. Finishing touches

### Examples
- Path references
- Cli
 - Colors
 - Commander: Command line
 - https://github.com/SBoudrias/Inquirer.js
 - Celeri: Command line and interactive
 - [Manual implementation](https://github.com/assaultjs/assaultjs/blob/master/bin/client.js)
- Reporting: JSON (Bluebox-ng report)
- Database: [Mongoose](https://www.youtube.com/playlist?list=PL5wy-Ijp__A2-ZSePUHXPMwpV19MqcNUX)
 - Conectors (Memory, DB, etc.)
- Logging (Winston)
- Documentation

## 7. Bluebox-ng
- Demo [video](https://www.youtube.com/watch?v=M-6k4Md3qEQ)
 - [Design](https://github.com/jesusprubio/bluebox-ng)
- Assaultjs: Pentesting and exploiting stuff in Node
 - **Community**
 - Site: https://assaultjs.github.io/
 - IRC: #assaultjs
 - **Framework**