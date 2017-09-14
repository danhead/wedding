import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Menu from './components/Menu';
import Login from './components/Login';
import Admin from './routes/Admin';

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
    // Set up auth state observer
    auth.onAuthStateChanged((res) => {
      if (res) {
        const user = {...this.state.user};
        user.uid = res.uid;
        user.displayName = res.displayName;
        user.photoURL = res.photoURL;
        user.data = {};
        this.setState({ user });
        if (!this.userStateBinding) {
          this.userStateBinding = db.bindToState(`users/${user.uid}`, {
            context: this,
            state: 'user.data',
          });
        }
      } else if (this.userStateBinding) {
        db.removeBinding(this.userStateBinding);
        this.setState({
          user: {...emptyUser},
        });
      }
    });
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            {this.state.user.uid && this.state.user.data.approved
              ? ''
              : <Login user={this.state.user} />
            }
            {this.state.user.data.isAdmin
              ? <Admin user={this.state.user} />
              : ''
            }
          </div>
        </BrowserRouter>
        <Menu user={this.state.user} />
      </div>
    );
  }
}

export default App;
