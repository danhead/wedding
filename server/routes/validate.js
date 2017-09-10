const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

const route = function(db) {
  router.post('/', function(req, res, next) {
    const passcode = req.body.passcode;
    const uid = req.body.uid;
    const passcodeRef = db.ref('server/passcode');
    passcodeRef.once('value', function(s) {
      if (!uid) {
        return res.status(400).json({
          error: 'No UID',
        });
      }
      const valid = passcode === s.val();
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
    });
  });

  return router;
}

module.exports = route;
