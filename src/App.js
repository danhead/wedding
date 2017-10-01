import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import BackgroundImage from './components/BackgroundImage';
import Menu from './components/Menu';
import Login from './components/Login';
import Albums from './components/Albums';

import { auth, bucket, db } from './rebase';

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
      bgImgUrl: null,
      user: {...emptyUser},
      albums: {},
    }
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
        if(!this.albumDataBinding) {
          this.albumDataBinding = db.bindToState('albums', {
            context: this,
            state: 'albums',
          });
        }
      } else if (this.userStateBinding) {
        db.removeBinding(this.userStateBinding);
        db.removeBinding(this.albumDataBinding);
        this.setState({
          user: {...emptyUser},
        });
      }
    });

    // Get BG Image URL
    bucket.ref('/public/images/background_loggedout.jpg').getDownloadURL().then(bgImgUrl => {
      this.setState({ bgImgUrl });
    });
  }

  renderLogin = () => {
    return (
      <div>
        <Login user={this.state.user} />
        <BackgroundImage url={this.state.bgImgUrl} />
      </div>
    )
  }

  render

  render() {
    if (this.state.user.uid) {
      return (
        <div>
          <BrowserRouter>
            <Route path="/" exact render={() => {
              return <Albums albums={this.state.albums} />
            }} />
          </BrowserRouter>
          <Menu user={this.state.user} />
        </div>
      )
    } else {
      return (
        <div>
          <Login user={this.state.user} />
          <BackgroundImage url={this.state.bgImgUrl} />
        </div>
      )
    }
  }
}

export default App;

