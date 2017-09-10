import Rebase from 're-base';
import {
  initializeApp,
  database,
  storage,
} from 'firebase';

const app = initializeApp({
  apiKey: 'AIzaSyDqLp9avIq0qG1lTH4sdzX-fysLyZOlRX4',
  authDomain: 'daniel-hana-wedding.firebaseapp.com',
  databaseURL: 'https://daniel-hana-wedding.firebaseio.com',
  projectId: 'daniel-hana-wedding',
  storageBucket: 'daniel-hana-wedding.appspot.com',
  messagingSenderId: '1066658152850',

});

const auth = app.auth();
const bucket = storage();
const db = Rebase.createClass(database(app));

export {
  auth,
  bucket,
  db,
};
