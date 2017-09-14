import React from 'react';
import firebase from 'firebase';
import axios from 'axios';
import styled from 'styled-components';
import { auth } from '../rebase';
import Colours from '../Colours';

class Login extends React.Component {
  state = {
    authProvider: null,
    password: null,
    passwordValid: false,
  }

  componentWillUpdate(prev, next) {
    const authProvider = next.authProvider;
    if (!this.props.user.uid && next.passwordValid && authProvider) {
      const password = this.state.password;
      if (authProvider === 'anonymous') {
        auth.signInAnonymously().then(res => {
          this.submitUid(res.uid, password);
        }).catch(this.handleError);
      } else if (authProvider === 'twitter') {
        const provider = new firebase.auth.TwitterAuthProvider();
        auth.signInWithPopup(provider).then(res => {
          this.submitUid(res.user.uid, password);
        }).catch(this.handleError);
      } else if (authProvider === 'facebook') {
        const provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('email');
        auth.signInWithPopup(provider).then(res => {
          this.submitUid(res.user.uid, password);
        }).catch(err => console.error(err));
      }
    }
  }

  handleError = (err) => {
    console.error(err);
  }

  submitPassword = (e) => {
    e.preventDefault();
    const password = this.password.value;
    if (this.props.user.uid) {
      return this.submitUid(this.props.user.uid, password);
    }
    this.form.reset();
    axios.post('/api/validate', { password }).then((res) => {
      if (res.data.valid) {
        this.setState({
          password,
          passwordValid: true,
        });
      }
    }).catch(this.handleError);
  }

  submitUid = (uid, password) => {
    if (uid && password) {
      axios.post('/api/validate/uid', { uid, password }).then(res => {
        auth.signInWithCustomToken(res.data.token)
          .catch(this.handleError);
      }).catch(this.handleError);
    }
  }
/*
  authWithTwitterUpgrade = () => {
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
*/

  authAnonymously = (e) => {
    e.preventDefault();
    this.setState({ authProvider: 'anonymous' });
  }

  authWithProvider = (authProvider) => {
    this.setState({ authProvider });
  }

  renderPasswordInput = () => {
    return (
      <div>
        <p>Please enter the password to continue</p>
        <form ref={(el) => this.form = el} onSubmit={(e) => this.submitPassword(e)}>
          <Input type="text" innerRef={(el) => this.password = el} placeholder="Password" />
          <Button type="submit">Go!</Button>
        </form>
      </div>
    )
  }

  renderIntro = () => {
    return (
      <div>
        <h2>Sign in</h2>
        <Link href="" onClick={this.authAnonymously}>Sign in anonymously</Link>
        <p>or</p>
        <p>Sign in with:</p>
        <button onClick={() => this.authWithProvider('facebook')}>Log in with Facebook</button>
        <button onClick={() => this.authWithProvider('twitter')}>Log in with Twitter</button>
      </div>
    )
  }

  render() {
    const authProvider = this.state.authProvider;
    const isAuthed = this.props.user.uid !== null;
    const isApproved = this.props.user.data.approved;
    const isAnonymous = this.props.user.data.isAnonymous;
    const isValid = this.state.passwordValid;
    console.log({ authProvider, isAuthed, isApproved, isAnonymous, isValid });

    let state;
    if (!isAuthed && !authProvider) {
      state = 'intro';
    } else if ((!isAuthed && !isValid) || !isApproved) {
      state = 'password';
    }
    return (
      <div>
        <LoginOverlay />
        <LoginContainer>
          { state === 'intro' ? this.renderIntro() : '' }
          { state === 'password' ? this.renderPasswordInput() : '' }
        </LoginContainer>
      </div>
    )
  }
}

const LoginOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index:24;
  background-color: ${Colours.white};
  opacity: .6;
`;
const LoginContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  padding: 5%;
  text-align: center;
  z-index: 25;
  background-color: ${Colours.white};
`
const Link = styled.a`
  text-decoration: none;
`
const Input = styled.input`
  border: 1px solid black;
`;
const Button = styled.button`
  border: 1px solid black;
`

export default Login;
