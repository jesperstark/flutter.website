import path from 'path';
import express from 'express';
import compression from 'compression';
import request from 'request';
import hogan from 'hogan.js';
import logger from 'morgan';

const app = new express();

app.use(logger('dev'))
  .use(compression())
  .set('view engine', 'html')
  .set('layout', 'flutter-website')
  .enable('view cache')
  .engine('html', require('hogan-express'))
  .set('views', __dirname + '/');

const relative = fp => path.join(__dirname, fp);

app.use('/css', express.static(relative('/node_modules/reveal.js/css')))
  .use('/lib', express.static(relative('/node_modules/reveal.js/lib')))
  .use('/js', express.static(relative('/node_modules/reveal.js/js')))
  .use('/plugin', express.static(relative('/node_modules/reveal.js/plugin')))
  .use('/md', express.static(relative('/md')))
  .use('/resources', express.static(relative('/resources')));

app.get('/', (req, res) => {
  res.render('flutter-website', {
    location: ''
  });
});

var server = app.listen(8000, function () {
  console.log('Server started: http://localhost:%s/', server.address().port);
});