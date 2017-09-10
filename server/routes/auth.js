const express = require('express');
const OAuth = require('oauth');

const router = express.Router();

const route = function () {
  router.get('/', function(req, res, next) {
    res.json({ error: 'Provider required' });
  });
  router.get('/:provider', function(req, res, next) {
    const provider = req.params.provider;
    if (provider === 'twitter') {
      const oauth = new OAuth.OAuth(
        'https://api.twitter.com/oauth/request_token',
        'https://api.twitter.com/oauth/access_token',
        'DTODqeC3HjKXF0fttqkq30BcD',
        'gkZZNajvdzK9GeIHAByMtQZqj7DOAv3z3iitq3YtNH7wAZ1YyC',
        '1.0A',
        null,
        'HMAC-SHA1',
      );
      oauth.getOAuthRequestToken(function(err, token, secret) {
        if (err) {
          return res.status(500).json({ success: false, error: err });
        }
        return res.json({
          success: true,
          token: token,
          secret: secret,
        });
      });
    }
  });
  return router;
}

module.exports = route;
