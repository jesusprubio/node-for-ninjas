# Node for pentesters
A handbook for security experts who like JavaScript and javascripters who like (in)security.
>Don't Reinvent The Wheel, Unless You Plan on Learning More About Wheels
(by [@codinghorror](http://blog.codinghorror.com/dont-reinvent-the-wheel-unless-you-plan-on-learning-more-about-wheels/))

## About this document
*Work in progress*

### Motivation
All we know [JavaScript is taking the world](http://githut.info/), moreover with the Node irruption the rules have changed and we can use the same language also in the server side. All kind of servers were written, specially those ones related with the web (ie: [Express](http://expressjs.com/)), and [are being succesfully used in the wild](http://nodejs.org/industry/). Two years ago we were using Node at work so, one day, we also started to use it to write our day to day security stuff. During this time we met with people doing the same and we started a [community](https://assaultjs.github.io/) around this idea. Furthermore since we started to write [Bluebox-ng](https://github.com/jesusprubio/bluebox-ng) we've been tracking the different security projects we found written in Node. Once we've finished the first stable version we decided to write this document to share what we learn. We think it's the better way to contribute to make the Node community still more awesome. Security guys are really curious and pragmatic, and most of them already know how to write (and break) JavaScript. So we're pretty sure they're going to enjoy the Node community ;).

### Authors
- [@jesusprubio](https://twitter.com/jesusprubio)
- [@sergiogr](https://twitter.com/sergiogr)

### License & Copyright
- Code: [<img src="https://fsfe.org/graphics/gplv3-logo-red.png" height="40" alt="GPLv3">](https://www.gnu.org/copyleft/gpl.html)
<br><br>
- Contents: [<img src="http://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc-sa.eu.png" height="40" alt="CC BY-NC SA 3.0">](https://creativecommons.org/licenses/by-nc-sa/3.0/)

## Why Node?
- One language to rule them all -> **Productivity**
- Performance
 - Asyncronous I/O -> **Fast** & Simple (vs. multithreading) (ie: scanner, brute-forcer, etc.)
 - Single thread -> **High performance**
 - Paypal: "Double number of req/s and reduced response time by 35% or 200 ms"
- [NPM](https://www.npmjs.com/): **126.258 packages** (at 17/02/2015)
- **Community driven**
 - [io.js](https://iojs.org/en/index.html) vs. [Node.js®](http://nodejs.org/)

## Sharpen your knife
- Must:
 - [JavaScript For Cats](http://jsforcats.com/)
 - [The art of Node](https://github.com/maxogden/art-of-node#the-art-of-node)
- Bonus:
 - [Node.js for Beginners](http://code.tutsplus.com/tutorials/node-js-for-beginners--net-26314)
 - [NodeSchool](http://nodeschool.io/)
 - [Ryan Dahl: Original Node.js presentation](https://www.youtube.com/watch?v=ztspvPYybIY)
 - [Mixu's Node book](http://book.mixu.net/node/)
 - [The Node Way](http://thenodeway.io/)
 - [Eloquent JavaScript](http://eloquentjavascript.net/)
 - [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS/)
 - [Learn JavaScript Essentials](https://medium.com/javascript-scene/learn-javascript-b631a4af11f2)

## Usefull modules
- [How "require" works](http://thenodeway.io/posts/how-require-actually-works/)
- [Error-first callback](http://thenodeway.io/posts/understanding-error-first-callbacks/): CPS

### Examples
- Sockets
 - UDP
 - TCP
 - TLS
 - WS(S)
- HTTP(S)
- Request (redirection, etc)
- Ping
- Ping TCP
- Whois
- Traceroute
- External IP
- Geolocate
- Wifi scanning
- DNS resolve (dns-axfr)
- DNS reverse
- HTTP banner grabbing
- Host/Port scanning (Evilscan vs. node-portscanner)
- Nmap (libnmap)
- DNS brute-force (Subquest)
- Exploit searching (Exploitsearch)
- SHODAN API
- Fuzzing (Faker, Surku)
- Metasploit (msfnode)
- Radare (radare2-bindings)
- SIP ping
- SIP authentication
- MongoDB authentication
- HTTP authentication
- Capturing packets

## Owning the asynchrony
- for + maxSockets
- [Async](https://github.com/caolan/async)
 - Streams: [Highland](http://highlandjs.org/)

### Examples
- HTTP DoS
- Web path brute-force
- TCP DoS

## Writing our modules
- Boilerplate (Exploitsearch):
 - package.json
 - Patterns: [Singleton](http://thenodeway.io/posts/designing-singletons/) and [Custom Type](http://thenodeway.io/posts/designing-custom-types/)
 - Node inspector
 - Grunt :) vs. Gulp (streams)
 - JSHint+JSCS
 - Retire.js

### Examples
- Scanner
 - Arrays and objects powers
 - Complexity kills, careful
 - Lazy evaluation (Underscore vs. Lodash vs. Lazy.js)
- Brute-forcer
- Fuzzer
- Continuous pentesting

## Finishing touches
### Examples
- Cli
 - Manual implementation
 - Commander: Command line
 - Celeri: Command line and interactive
- Reporting: JSON
- Database: [Mongoose](https://www.youtube.com/playlist?list=PL5wy-Ijp__A2-ZSePUHXPMwpV19MqcNUX)

## Assaultjs
- Pentesting and exploiting stuff in Node
 - **Community**
 - Site: https://assaultjs.github.io/
 - IRC: #assaultjs
 - Twitter: @assaultjs
- **Framework**
 - Demo still not available, by the way the [Bluebox-ng demo](https://www.youtube.com/watch?v=M-6k4Md3qEQ) is similar for now
 - [Design](https://github.com/assaultjs/assaultjs)