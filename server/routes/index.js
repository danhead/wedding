const routes = function(app, db) {
  app.use('/api/validate', require('./validate')(db))
  app.use('/api/upgrade', require('./upgrade')(db))
  app.use('/api/delete-all-users', require('./deleteallusers')(db));
  app.use('/api/approve-uid', require('./approveuid')(db));
//  app.use('/api/auth', require('./auth')());
}

module.exports = routes;
