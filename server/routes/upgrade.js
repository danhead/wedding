const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

const route = function(db) {
  router.post('/', function(req, res, next) {
    const currentUid = req.body.currentUid;
    const newUid = req.body.newUid;

    if (!currentUid || !newUid) {
      return res.json({
        success: false,
        error: 'currentUid or newUid missing',
      });
    }

    const currentRef = db.ref(`/users/${currentUid}`);
    const newRef = db.ref(`/users/${newUid}`);

    currentRef.once('value', function(s) {
      const currentData = s.val();
      // set data for new user
      newRef.set(currentData);
      // delete data for current user
      currentRef.remove().then(function() {
        // delete current user
        admin.auth().deleteUser(currentUid).then(function() {
          if (currentData.approved) {
            // TODO: Does this endpoint need more protection?
            // transfer approval to new user
            admin.auth().createCustomToken(newUid, {
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
          }
        }).catch(function(err) {
          console.error(err);
          return res.status(500).json({
            success: false,
            error: err,
          });
        });
      }).catch(function(err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          error: err,
        });
      });
    });
  });

  return router;
}

module.exports = route;
