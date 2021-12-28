const port = process.env.PORT || 3001;
var express = require('express')
  , Primus = require('primus.io')
  , http = require('http')
  , app = express()
  , server = http.createServer(app);

// Primus server
var primus = new Primus(server);

primus.on('connection', function (spark) {
  spark.send('news', { hello: 'world' });
  spark.on('my other event', function (data) {
    console.log(data);
  });
});

// serve index.html
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

server.listen(port);
