const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

const route = function(db) {
  router.post('/', function(req, res, next) {
    const password = req.body.password;
    const passwordRef = db.ref('server/password');
    passwordRef.once('value', function(s) {
      res.json({
        valid: password === s.val(),
      });
    });
  });

  router.post('/uid', function(req, res, next) {
    const password = req.body.password;
    const uid = req.body.uid;
    const passwordRef = db.ref('server/password');
    passwordRef.once('value', function(s) {
      if (!uid) {
        return res.status(400).json({
          error: 'No UID',
        });
      }
      const valid = password === s.val();
      admin.auth().getUser(uid).then(function() {
        const userRef = db.ref(`users/${uid}`)
          .set({
            isAdmin: false,
            isAnonymous: true,
            approved: valid,
          });
        if (valid) {
          admin.auth().createCustomToken(uid, {
            approved: true,
          }).then(function(customToken) {
            return res.json({
              valid: true,
              token: customToken,
            });
          }).catch(function(err) {
            console.error('Error creating custom token', err);
            return res.status(500).json({
              error: 'Internal server error',
            });
          });
        } else {
          return res.json({
            valid: false,
          });
        }
      }).catch(function(err) {
        return res.json({
          valid: false,
          error: err,
        });
      });
    });
  });

  return router;
}

module.exports = route;
