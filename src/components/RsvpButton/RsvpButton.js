import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RsvpButton.css';
import fetch from '../../core/fetch';
import Button from '../Button';

class RsvpButton extends React.Component {
  static propTypes = {
    focusCallback: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  showRsvpForm = () => {
    this.setState({ showRsvpForm: true });
    setTimeout(() => {
      this.rsvpInput.focus();
    }, 500);
  }

  handleRsvpFocus = () => {
    if (this.props.focusCallback) {
      this.props.focusCallback(true);
    }
    this.setState({ inputError: false });
  }

  handleRsvpBlur = () => {
    this.setState({ inputInvalidMsg: null });
    if (this.props.focusCallback) {
      this.props.focusCallback(false);
    }
  }

  handleRsvpChange = () => {
    this.setState({ inputInvalidMsg: null });
    if (this.rsvpInput.value && this.rsvpInput.value.length === 4) {
      this.validateRsvp();
    }
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.validateRsvp();
  }

  validateRsvp = () => {
    fetch(`rsvp/${this.rsvpInput.value}`, {
      method: 'get',
      credentials: 'include',
    }).then(data => {
      if (data.status === 200) {
        location.href = data.url;
      } else {
        this.setState({
          inputInvalid: true,
          inputInvalidMsg: 'Sorry, that RSVP code is invalid.',
        });
        setTimeout(() => {
          this.setState({
            inputInvalid: false,
          });
        }, 500);
      }
    }).catch(() => {
      this.setState({
        inputInvalid: true,
        inputInvalidMsg: 'Sorry, there was a problem validating your RSVP code, please try again later.',
      });
    });
  }

  render() {
    return (
      <div className={s.root}>
        <div
          className={[
            s.rsvp,
            !this.state.showRsvpForm ? s.rsvpVisible : null,
          ].join(' ')}
        >
          <Button onClick={this.showRsvpForm}>
            RSVP
          </Button>
        </div>
        <div
          className={[
            s.rsvpForm,
            this.state.showRsvpForm ? s.rsvpFormVisible : null,
          ].join(' ')}
        >
          <form
            method="post"
            action="/rsvp"
            ref={(form) => { this.rsvpForm = form; }}
            onSubmit={this.handleFormSubmit}
          >
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="code">
                Enter your RSVP code
              </label>
              <input
                className={[
                  s.input,
                  this.state.inputInvalid ? s.inputInvalid : null,
                ].join(' ')}
                ref={(input) => { this.rsvpInput = input; }}
                onFocus={this.handleRsvpFocus}
                onBlur={this.handleRsvpBlur}
                onChange={this.handleRsvpChange}
                id="code"
                type="text"
                name="code"
                minLength="4"
                maxLength="4"
                placeholder="Enter your RSVP code"
                autoComplete="off"
              />
            </div>
          </form>
          <div
            className={[
              s.invalidMsg,
              this.state.inputInvalidMsg ? s.invalidMsgVisible : null,
            ].join(' ')}
            role="alert"
          >
            {this.state.inputInvalidMsg}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(RsvpButton);
