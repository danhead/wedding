const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

const route = function (db) {
  router.get('/', function(req, res, next) {
    const usersRef = db.ref('/users');
    usersRef.once('value', function(s) {
      const users = s.val();
      Object.keys(users).forEach(function(user) {
        const delRef = db.ref(`/users/${user}`);
        delRef.remove()
          .then(function() {
            admin.auth().deleteUser(user);
          }).catch(function(err) {
            console.error(err);
          });
      });
      return res.json({
        deleted: true,
        users: users,
      });
    });
  });
  return router;
}

module.exports = route;
