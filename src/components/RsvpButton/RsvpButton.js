import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RsvpButton.css';
import fetch from '../../core/fetch';

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
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    fetch(`rsvp/${this.rsvpInput.value}`)
      .then(data => {
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
          <button className={s.button} onClick={this.showRsvpForm}>
            RSVP
          </button>
        </div>
        <div
          className={[
            s.rsvpForm,
            this.state.showRsvpForm ? s.rsvpFormVisible : null,
          ].join(' ')}
        >
          <form method="post" action="/rsvp" onSubmit={this.handleFormSubmit}>
            <div className={[s.formGroup, s.rsvpGroup].join(' ')}>
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
                placeholder="Enter your RSVP code"
              />
            </div>
            <div className={[s.formGroup, s.rsvpButtonGroup].join(' ')}>
              <button className={s.button} type="submit">
                RSVP
              </button>
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
