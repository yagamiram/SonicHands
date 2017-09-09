var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var webpack = require('webpack');
var config = require('./config/webpack.dev');

var app = express();
var compiler = webpack(config);
var port = process.env.PORT || 3000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, '0.0.0.0', err => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${port}`);
});

// POST http://localhost:8080/api/users
// parameters sent with
app.post('*', function(req, res) {
  console.log('POST /');
  console.log(req.body);
  var xCordinate = req.body.xValue;
  var yCordinate = req.body.yValue;
  console.log(xCordinate);
  console.log(yCordinate);
  res.writeHead(200, {'Content-Type':'text/html'});
  res.end('thanks');
});
