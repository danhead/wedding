const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

const route = function (db) {
  router.get('/', function(req, res, next) {
    res.sendStatus(404);
  });
  router.get('/:uid', function(req, res, next) {
    const uid = req.params.uid;
    const userRef = db.ref(`/users/${uid}`);
    userRef.set({
      approved: true,
    });
    admin.auth().createCustomToken(uid, {
      approved: true,
    }).then(function(customToken) {
      return res.json({
        success: true,
        token: customToken,
      });
    }).catch(function(err) {
      console.error('Error creating custom token', err);
      return res.status(500).json({
        success: false,
        error: err,
      });
    });
  });
  return router;
}

module.exports = route;
