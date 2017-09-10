import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import Home from './routes/Home';
import Login from './routes/Login';
import Admin from './routes/Admin';
import NotFound from './routes/NotFound';

import { auth, db } from './rebase';

import './App.css';

const emptyUser = {
  uid: null,
  displayName: null,
  photoURL: null,
  data: {},
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {...emptyUser},
    }
    this.authStateEvents = {};
  }

  componentWillMount() {
    this.registerAuthStateChange('main', (user) => {
      console.log('mainevent', user);
      if (user) {
        this.setState({
          user: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
        });
        this.userStateBinding = db.bindToState(`users/${user.uid}`, {
          context: this,
          state: 'user.data',
        });
      } else if (this.userStateBinding) {
        db.removeBinding(this.userStateBinding);
        this.setState({
          user: {...emptyUser},
        });
      }
    });

    // Set up auth state observer
    auth.onAuthStateChanged((user) => {
      // loop through all registered auth state events
      Object.values(this.authStateEvents).forEach((fn) => fn(user));
    });
  }

  registerAuthStateChange = (key, fn) => {
    this.authStateEvents[key] = fn;
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <Switch>
            <Route exact path="/" render={() => <Home
              user={this.state.user}
              registerAuthStateChange={this.registerAuthStateChange}
            />} />
             <Route path="/login" render={() => <Login
              user={this.state.user}
            />} />
            <Route path="/admin" render={() => <Admin
              user={this.state.user}
            />} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
