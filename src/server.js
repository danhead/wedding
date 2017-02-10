import 'babel-polyfill';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
import expressGraphQL from 'express-graphql';
import jwt from 'jsonwebtoken';
import React from 'react';
import ReactDOM from 'react-dom/server';
import UniversalRouter from 'universal-router';
import PrettyError from 'pretty-error';
import Rollbar from 'rollbar';
import App from './components/App';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import passport from './core/passport';
import admin from './core/admin';
import models from './data/models';
import schema from './data/schema';
import routes from './routes';
import assets from './assets'; // eslint-disable-line import/no-unresolved
import { port, auth, analytics } from './config';
import Person from './data/models/Person';

const app = express();

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// Authentication
// -----------------------------------------------------------------------------
app.use(expressJwt({
  secret: auth.jwt.secret,
  credentialsRequired: false,
  getToken: req => req.cookies.id_token,
}));
app.use(passport.initialize());

if (process.env.NODE_ENV !== 'production') {
  app.enable('trust proxy');
}
app.get('/login/facebook',
  passport.authenticate('facebook', { scope: ['email', 'user_location'], session: false }),
);
app.get('/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/login', session: false }),
  (req, res) => {
    const expiresIn = 60 * 60 * 24 * 180; // 180 days
    const token = jwt.sign(req.user, auth.jwt.secret, { expiresIn });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    res.redirect('/');
  },
);

//
// Register API middleware
// -----------------------------------------------------------------------------
app.use('/graphql', expressGraphQL(req => ({
  schema,
  graphiql: process.env.NODE_ENV !== 'production',
  rootValue: { request: req },
  pretty: process.env.NODE_ENV !== 'production',
})));

//
// Register RSVP routes
// -----------------------------------------------------------------------------
//

app.get('/:password', (req, res, next) => {
  if (req.params.password.length !== 4) {
    // Not a password
    next();
  } else {
    Person.findAll({ where: { password: req.params.password } })
      .then(data => {
        if (data.length > 0) {
          res.redirect(`/rsvp/${req.params.password}`);
        } else {
          next();
        }
      }).catch((err) => {
        Rollbar.handleError(err);
        next(err);
      });
  }
});

app.post('/rsvp', (req, res) => {
  res.redirect(`/rsvp/${req.body.code}`);
});

app.post('/rsvp/save', (req, res) => {
  try {
    const update = {};
    update[req.body.prop] = req.body.value;
    Person.update(update, {
      where: {
        key: req.body.key,
      },
    }).then(() => {
      res.json({
        success: true,
        prop: req.body.prop,
      });
    }).catch(err => {
      Rollbar.handleError(err);
      res.json({
        success: false,
        err,
      });
    });
  } catch (err) {
    Rollbar.handleError(err);
    res.json({
      success: false,
      err,
    });
  }
});

//
// Register Admin routes
// -----------------------------------------------------------------------------
//

app.get('/login', (req, res, next) => {
  try {
    if (req.user && admin(req.user.email)) {
      res.redirect('/admin');
    } else {
      next();
    }
  } catch (err) {
    Rollbar.handleError(err);
    next(err);
  }
});

app.use('/admin*', (req, res, next) => {
  try {
    if (!req.user || !admin(req.user.email)) {
      res.redirect(401, '/login');
    } else {
      next();
    }
  } catch (err) {
    Rollbar.handleError(err);
    next(err);
  }
});

app.post('/admin/person', (req, res, next) => {
  try {
    if (!req.user || !admin(req.user.email)) {
      res.redirect(401, '/login');
    }

    const data = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
    };

    if (req.body.password && req.body.password !== '') {
      data.password = req.body.password;
    }

    Person.create(data);
    res.redirect('/admin/people');
  } catch (err) {
    Rollbar.handleError(err);
    next(err);
  }
});

app.post('/admin/person/delete', (req, res, next) => {
  try {
    if (!req.user || !admin(req.user.email)) {
      res.redirect(401, '/login');
    }

    if (req.body.key) {
      Person.destroy({
        where: { key: req.body.key },
      }).then(() => {
        res.redirect('/admin/people');
      });
    }
  } catch (err) {
    Rollbar.handleError(err);
    next(err);
  }
});


//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    const css = new Set();
    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      // Enables critical path CSS rendering
      // https://github.com/kriasoft/isomorphic-style-loader
      insertCss: (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        styles.forEach(style => css.add(style._getCss()));
      },
    };
    const route = await UniversalRouter.resolve(routes, {
      path: req.path,
      query: req.query,
      agent: req.headers['user-agent'],
    });

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const data = { ...route };
    data.children = ReactDOM.renderToString(<App context={context}>{route.component}</App>);
    data.style = [...css].join('');
    data.scripts = [
      assets.vendor.js,
      assets.client.js,
    ];
    if (assets[route.chunk]) {
      data.scripts.push(assets[route.chunk].js);
    }

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(route.status || 200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    Rollbar.handleError(err);
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
Rollbar.init(analytics.rollbar.serverToken);
Rollbar.handleUncaughtExceptionsAndRejections(analytics.rollbar.serverToken, {
  exitOnUncaughtException: true,
});
app.use(Rollbar.errorHandler(analytics.rollbar.serverToken));
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(pe.render(err)); // eslint-disable-line no-console
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      style={errorPageStyle._getCss()} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
/* eslint-disable no-console */
models.sync().catch(err => console.error(err.stack)).then(() => {
  app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}/`);
  });
});
/* eslint-enable no-console */
