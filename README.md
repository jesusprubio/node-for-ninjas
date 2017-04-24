# Node for ninjas
A workshop for security experts who like JavaScript and javascripters who like (in)security.
>Don't Reinvent The Wheel, Unless You Plan on Learning More About Wheels
(by [@codinghorror](http://blog.codinghorror.com/dont-reinvent-the-wheel-unless-you-plan-on-learning-more-about-wheels/))


## 1 Introduction
This project is a *work in progress*. The most important observations are included through the source code.

### 1.1 Motivation
All we know [JavaScript is taking the world](http://githut.info/), moreover with the Node irruption the rules have changed and we can use the same language also in the server side. All kind of servers were written, specially those ones related with the web (ie: [Express](http://expressjs.com/)), and [are being succesfully used in the wild](http://nodejs.org/industry/). Two years ago we were using Node at work so, one day, we also started to use it to write our day to day security stuff, ie: [Bluebox-ng](https://github.com/jesusprubio/bluebox-ng).

Moreover, during this time, we met with [people doing the same](https://gist.github.com/jesusprubio/8f092af4ca252e252eab) so we would like to share some of what we learned and to contribute in this way to make the Node community still more awesome.

### 1.2 License & Copyright
- Code: [<img src="https://fsfe.org/graphics/gplv3-logo-red.png" height="40" alt="GPLv3">](https://www.gnu.org/copyleft/gpl.html)
<br><br>
- Contents: [<img src="http://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc-sa.eu.png" height="40" alt="CC BY-NC SA 3.0">](https://creativecommons.org/licenses/by-nc-sa/3.0/)

### 1.3 Why Node?
- One language to rule them all -> **Productivity**
- Performance
 - Asyncronous I/O -> **Fast** & Simple (vs. multithreading) (ie: scanner, brute-forcer, etc.)
  - All should be async, if only the http server, you0re always finding blocks (Ryab day)
 - Single thread -> **High performance**
 - Paypal: "Double number of req/s and reduced response time by 35% or 200 ms"
- [NPM](https://www.npmjs.com/): **385853	(478/day) packages** (at 26/01/2017, [today](http://www.modulecounts.com/))
- **Community driven**
 - [io.js](https://iojs.org/en/index.html) vs. [Node.js®](http://nodejs.org/), reconciliation: https://github.com/nodejs/io.js/issues/1664
 - [Node.js Foundation](https://nodejs.org/en/foundation)


## 2 Sharpen your knife
### 2.1 Resources
Must:
- [JavaScript For Cats](http://jsforcats.com/)
- [The art of Node](https://github.com/maxogden/art-of-node#the-art-of-node)
Bonus:
- [The Node Way](http://thenodeway.io/)
- [Ryan Dahl: Original Node.js presentation](https://www.youtube.com/watch?v=ztspvPYybIY)
- [NodeSchool](http://nodeschool.io/)
- [Philip Roberts: What the heck is the event loop anyway? | JSConf EU 2014](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
- [Learning JavaScript Design Patterns](addyosmani.com/resources/essentialjsdesignpatterns/book)
- [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS)

### 2.2 Basic concepts
- [How "require" works](http://thenodeway.io/posts/how-require-actually-works/)
- [Error-first callback](http://thenodeway.io/posts/understanding-error-first-callbacks/): CPS
- Modules selection: Those ones which we think to be the best option: stars, commiters, examples!, documentation, etc.
 - https://www.npmjs.com
 - http://npmsearch.com


## 3 Examples
- [Ping](./example/ping.js)
- [Ping TCP](./example/pingTcp.js)
- [Whois](./example/whois.js)
- [Traceroute](./example/traceroute.js)
- [System command](./example/external/command.js)
- [External IP](./example/externalIp.js)
- [Geolocate](./example/geoLocation.js)
- [Wifi APs scan](l./example/wifiScan.js)
- [Network mapping](./example/netMap.js)
- [Web banner grabbing](./example/httpScan.js)
- Auth:
 - [HTTP authentication](./example/auth/http.js)
 - [MongoDB authentication](./example/auth/mongo.js)
 - [MySQL authentication](./example/auth/mysql.js)
- DNS:
 - [Resolution (and reverse)](./example/dns/req.js)
 - [Zone transfer](./example/dns/axfr.js)
 - [Brute-force](./example/dns/brute.js)
- [SHODAN](https://github.com/jesusprubio/shodan-client.js/tree/master/example)
- [Exploit search](./example/exploitSearch.js)
- Fuzzing:
 - [Faker](./example/fuzz/faker.js)
 - [Mutator](./example/fuzz/mutator.js)
 - [Custom mutator](./example/fuzz/mutatorCustom.js)
- [Sockets](./async/sockets): UDP, TCP, TLS, WS(S).
- [HTTP proxy](./example/httpProxy.js)

### 3.1 External tools
All in this section need to be installed in the system.
- [Libpcap](http://www.tcpdump.org/)
 - [Capture](./example/external/pcap/capture.js)
 - [Injection](./example/external/pcap/inject.js)
- [Nmap](https://nmap.org/)
 - ["Speeding up Nmap"](http://zurb.com/forrst/posts/Speeding_up_nmap_with_node_js-GpQ)
 - [Scan](./example/external/nmap.js)
- [Radare](https://rada.re/) ([r2pipe](https://github.com/radare/radare2-bindings/tree/master/r2pipe/nodejs))
 - [Simple bynary analysis](./example/external/radare.js)
 - [Chita](https://github.com/jpenalbae/chita): TODO
- [Metasploit](https://www.metasploit.com/) ([msfnode](https://github.com/eviltik/msfnode))
 - https://github.com/eviltik/msfnode/commits/master


## 4 Asynchrony
Other languages need threads to fly. Node/JavaScript is async so it flies too much, then we need to limit it to avoid a break, ie: OS limit with file descriptors, OS limit for opened sockets, etc.

A common solution is to use a loop and the parameter **["maxSockets"](https://nodejs.org/api/http.html#http_agent_maxsockets)**. This is valid for servers but, in general, not for this kind of tools (the ["httpDoS"](./async/httpDoS.js) example is an exception which fits).
- Node core doesn't provide anything similar for TCP or UDP sockets (only HTTP).

### Multiple options
- **Pure event oriented** implementation: Make it only with much love :):
 - See the ["fuzzer"](./async/dumbFuzz.js) example.
 - A web path brute-forcer (by [@NighterMan](https://twitter.com/NighterMan)): https://gist.github.com/jpenalbae/46782408bebe8e61eb32
- **[async.js](https://github.com/caolan/async)**
 - New approach (also caloan): [Highland](http://highlandjs.org/) (streams)
- **Promises**: What we're going to use :). Deep explanation [here](https://nodesource.com/blog/enterprise-grade-node-js-promises-with-async-and-bluebird).
- **Generators**: Still knowing each other xD.
- **async/await**: Nice, in our TODO :). It uses generators under the hood and can be combined with promises, killing the complexiy.
 - http://pouchdb.com/2015/03/05/taming-the-async-beast-with-es7.html
 - http://rossboucher.com/await
- **Iterators**: To avoid a break due to a huge memory fingerprint.
  - [Example](./async/iterators.js)
  - https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Iterators_and_Generators

### Our choice
- Event oriented: We want performance, so we don't want libraries doing this part for us.
- Manually limiting the number of active connections.
- We also need to specify a delay -> "setInterval"
- Iterators: https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Iterators_and_Generators
- Promises: for convenience to develop.
- Example: https://github.com/jesusprubio/bluebox-ng/blob/master/lib/index/brute.js


## 5 A good NPM module
- [package.json](https://docs.npmjs.com/files/package.json)
- [__dirname](https://nodejs.org/docs/latest/api/globals.html#globals_dirname) vs [process.cwd](https://nodejs.org/api/process.html#process_process_cwd)
- Patterns:
 - [Singleton](http://thenodeway.io/posts/designing-singletons/)
 - [Custom Type](http://thenodeway.io/posts/designing-custom-types/)
- [ESLint](http://eslint.org/)
 - https://github.com/airbnb/javascript
- ["Why I Left Gulp and Grunt for npm Scripts"](https://medium.freecodecamp.com/why-i-left-gulp-and-grunt-for-npm-scripts-3d6853dd22b8#.stl6g5mjc)
- [Node Security](https://nodesecurity.io/advisories)
 - Client: https://github.com/nodesecurity/nsp
- Debugging:
 - :) https://github.com/visionmedia/debug, [example of use](https://code.visualstudio.com/Docs/runtimes/nodejs)
 - [VS Code](https://code.visualstudio.com/Docs/runtimes/nodejs#_debugging-hello-world). Now with [inline values support](http://code.visualstudio.com/updates/v1_9#_inline-variable-values-in-source-code)!.
- [Testing](https://github.com/tapjs/node-tap)
- [yarn](https://github.com/yarnpkg/yarn) :)
- Do not parse stuff manually:
 - [Path](https://nodejs.org/api/path.html) (Core): Path references
 - [URL](https://nodejs.org/api/url.html) (Core): URL parsing

### 5.1 CLI
- [Colors](https://github.com/marak/colors.js/)
- Printing big JSON: ["utils.inspect"](https://nodejs.org/api/util.html#util_util_inspect_object_options) vs. ["prettyjson"](https://github.com/rafeca/prettyjson)
- [Commander](https://github.com/tj/commander.js): Command line, most used
- [Minimist](https://github.com/substack/minimist): Really tiny
- [Vorpal](https://github.com/dthree/vorpal): Interactive
  - https://github.com/dthree/vorpal/wiki/FAQ#what-is-an-immersive-cli-app
  - https://github.com/vorpaljs/awesome-vorpal#vorpal-extensions
- [Emojis](https://github.com/omnidan/node-emoji)
- Doc:
 - https://github.com/jesusprubio/bluebox-ng/tree#use
 - https://github.com/jesusprubio/bluebox-ng/tree/doc
- Electron: https://github.com/electron/electron-quick-start
- Polymer: https://www.polymer-project.org/

### 5.2 Example
[Exploitsearch](https://github.com/jesusprubio/exploitsearch.js)


## 6 Bluebox-ng
"Pentesting framework using Node.js powers. Specially focused in VoIP/UC."
- [Demo](https://www.youtube.com/watch?v=M-6k4Md3qEQ) old version.
- Refactoring: https://github.com/jesusprubio/bluebox-ng
- [Ways of use](https://github.com/jesusprubio/bluebox-ng/tree/#use)

### 6.1 Examples
- Console CLI: bluebox-ng
- [Library (CLI)](https://github.com/jesusprubio/bluebox-ng/tree/v2#programatically)


## 7 More projects
- [Brosec](https://github.com/gabemarshall/Brosec)
- [NodeGoat](https://github.com/OWASP/NodeGoat)
