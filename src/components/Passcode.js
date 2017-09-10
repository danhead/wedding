import React from 'react';
import { auth } from '../rebase';
import axios from 'axios';
import style from 'styled-components';

const Input = style.input`
  border: 1px solid black;
`;
const Button = style.button`
  border: 1px solid black;
`

class Passcode extends React.Component {
  componentWillMount() {
    this.props.registerAuthStateChange('passcode', (user) => {
      console.log('passcode register state change');
      if (user && !user.allowed && this.passcode.value) {
        this.postData();
      }
    });
  }

  postData = () => {
    axios.post('/api/validate', {
      passcode: this.passcode.value,
      uid: this.props.user.uid,
    }).then((res) => {
      this.form.reset();
      if (res.data.valid) {
        auth.signInWithCustomToken(res.data.token)
          .catch((err) => {
            console.error(err);
          });
      } else {
        this.handleFail();
      }
    }).catch((err) => {
      console.error(err);
      this.form.reset();
      this.handleFail();
    });
  }

  submitForm = (e) => {
    e.preventDefault();
    if (this.props.user.uid) {
      this.postData();
    } else {
      // Create anon account
      auth.signInAnonymously();
    }
  }

  handleSuccess = () => {

  }

  handleFail = () => {

  }

  render() {
    return (
      <div>
        <form ref={(el) => this.form = el} onSubmit={(e) => this.submitForm(e)}>
          <Input type="text" innerRef={(el) => this.passcode = el} placeholder="Passcode" />
          <Button type="submit">Go!</Button>
        </form>
      </div>
    )
  }
}

export default Passcode;
