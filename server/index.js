const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://daniel-hana-wedding.firebaseio.com',
});

const db = admin.database();

const app = express();
const PORT = process.env.PORT || 3001;

const routes = require('./routes');

app.use(bodyParser.json());

// Prioritise static assets
app.use(express.static(path.resolve(__dirname, '../build')));

// Load server side routes
routes(app, db);

// Return React app for all other GET requests
app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.listen(PORT, function() {
  console.log(`Listening on port ${PORT}`);
});
