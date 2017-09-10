import React from 'react';
import { auth } from '../rebase';
import firebase from 'firebase';
import axios from 'axios';
//import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  authWithTwitter = () => {
    const currentUid = this.props.user.uid;
    const provider = new firebase.auth.TwitterAuthProvider();
    auth.signInWithPopup(provider).then(res => {
      const newUid = res.user.uid;
      if (newUid) {
        setTimeout(() => {
        console.log('upgrading', { currentUid, newUid });
        axios.post('/api/upgrade', {
          currentUid,
          newUid,
        }).then(res => {
          auth.signInWithCustomToken(res.data.token)
            .catch((err) => {
              console.error(err);
            });
        }).catch(err => console.error(err));
        },500);
      }
    }).catch(err => console.error(err));
  }

  authWithFacebook = () => {
    if (this.props.user.uid) {
      auth.signOut();
    }
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('email');
    auth.signInWithPopup(provider).catch(err => console.error(err));
  }

  render() {
//    if (this.props.user.uid) {
//      return <Redirect to={{ pathname: '/' }} />
//    }
    return (
      <div>
        <h1>Login</h1>
        <h2>You need to sign in</h2>
        <button onClick={this.authWithFacebook}>Log in with Facebook</button>
        <button onClick={this.authWithTwitter}>Log in with Twitter</button>
        <p>Your UID is: {this.props.user.uid}</p>
      </div>
    )
  }
}

export default Login;
