const express = require('express');
const path = require('path');
const app = express();

app.get('/hello', (req, res) => res.send({ hi: 'there' }))

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config.js');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig)
  app.use(webpackDevMiddleware(compiler));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(express.static('dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.set('port', process.env.PORT || 3050)
app.listen(app.get('port'), () => console.log(`Listening at http://localhost:${app.get('port')}`));
