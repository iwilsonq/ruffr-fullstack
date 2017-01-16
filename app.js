import React from 'react';
const express = require('express');
const path = require('path');
const fs = require('fs');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);
const app = express();

const multer  = require('multer');
const upload = multer({
  dest:'./public/uploads/',
  limits: { fileSize: 1000000, files:1 }
});

const config = require('./server/config/config.js');
mongoose.connect(config.url);
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});
require('./server/config/passport.js')(passport);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: 'ruffrnextbigthing',
  saveUninitialized: true,
  resave: true,
  //store session on MongoDB using express-session + connect mongo
  store: new MongoStore({
    url: config.url,
    collection : 'sessions'
  })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config.js');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig)
  app.use(webpackDevMiddleware(compiler));
  app.use(webpackHotMiddleware(compiler));
  app.use(express.static('public'));
} else {
  app.use(express.static('dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}


// Server-side rendering
const { renderToString } = require('react-dom/server');
const { match, RouterContext } = require('react-router');
import routes from './src/routes';
app.get('*', (req, res) => {

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const css = new Set();
      const context = {
        insertCss: (...styles) =>
        styles.forEach(style =>
        css.add(style._getCss()))
      };
      const body = renderToString(<RouterContext {...renderProps} />);
      const html = `<!doctype html>
          <html>
            <head>
              <script async src="/bundle.js"></script>
              <style type="text/css">${[...css].join('')}</style>
            </head>
            <body>
              <div id="root">${body}</div>
            </body>
          </html>`;
      res.status(200).send(html);
    } else {
      res.status(404).send('Not found')
    }
  })
});


app.post('/login', passport.authenticate('local-login', {
  successRedirect : '/',
  failureRedirect : '/login',
  failureFlash : true
}));

app.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/',
  failureRedirect : '/signup',
  failureFlash : true
}));

app.get('/logout', function(req, res) {
  req.logout();
  res.send('Logged out!');
});

app.get('/profile', (req, res) => {
  if (req.isAuthenticated())
    res.send('Welcome to profile!')
  res.send('Not authorized to view profile.');
});

const Images = require('./server/models/images.js');

app.get('/images', (req, res) => {
  Images.find().sort('-created').populate('user',
  'local.email').exec(function(error, images) {
      if (error) {
        return res.status(400).send({
          message: error
        });
      }
      return res.send(images);
    });
});

app.post('/images', upload.single('image'), (req, res) => {
  const IMAGE_TYPES = ['image/jpeg','image/jpg', 'image/png'];
  let src,
      dest,
      targetPath,
      targetName,
      tempPath = req.file.path,
      type = req.file.mimetype;

  if (IMAGE_TYPES.indexOf(type) === -1) {
    return res.status(415).send('Supported image formats: jpeg, jpg, png.');
  }

  targetPath = './public/images/' + req.file.originalname;
  src = fs.createReadStream(tempPath);
  dest = fs.createWriteStream(targetPath);
  src.pipe(dest);

  src.on('error', err => {
    if (err) return res.status(500).send({ message: err });
  });

  src.on('end', () => {
    const image = new Images(req.body);
    image.imageName = req.file.originalname;
    image.user = req.user;
    image.save(err => {
      if (err) {
        return res.status(400).send({ message: err });
      }
    });

    fs.unlink(tempPath, err => {
      if (err) {
        return res.status(500).send('Woh, something bad happened here');
      }

      res.send('Image uploaded');
    });
  });

});
// app.get('/images-gallery', images.hasAuthorization, images.show);

app.get('/comments', (req, res) => res.send({ hi: 'there' }));

app.set('port', process.env.PORT || 3050)
app.listen(app.get('port'), () => console.log(`Listening at http://localhost:${app.get('port')}`));
