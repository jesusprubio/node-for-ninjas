'use strict';

var http = require('http'),
    https = require('https'),
    httpProxy = require('http-proxy'),
    url = require('url'),

    PROXY_PORT = 8000,

	proxy, server;

// Create a proxy server with custom application logic
proxy = httpProxy.createProxy({
    // secure: false,
    // hostRewrite: true,
    // autoRewrite: true,
    // protocolRewrite: true
    // xfwd : true
});

// console.log(parsedUrl);
proxy.on('error', function (err) {
    console.log('ERRORRR');
    console.log(err);
});

server = http.createServer(function (req, res) {
    var finalUrl = req.url,
    // var finalUrl = 'https://nodejs.org',
    // var finalUrl = 'http://nodejs.org',
        finalAgent = http.globalAgent,
        parsedUrl = url.parse(finalUrl);

    if (parsedUrl.protocol === 'https:') {
        finalAgent = https.globalAgent;
    }

    console.log('URL');
    console.log(finalUrl);
    console.log('RES, STATUSCODE');
    console.log(res.statusCode);

    proxy.web(req, res, {
        target: finalUrl,
        agent: finalAgent,
        headers: { host: parsedUrl.hostname }
        // xfwd : true,
        // secure: false,
        // hostRewrite: true,
        // autoRewrite: true,
        // protocolRewrite: true
    });
    // proxy.close();
});

console.log('listening on port ' + PROXY_PORT);
server.listen(PROXY_PORT);
