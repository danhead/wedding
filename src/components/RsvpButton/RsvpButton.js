import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RsvpButton.css';

class RsvpButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  showRsvpForm = () => {
    this.setState({ showRsvpForm: true });
    setTimeout(() => {
      this.rsvpInput.focus();
    }, 250);
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
          <form method="post" action="/rsvp">
            <div className={[s.formGroup, s.rsvpGroup].join(' ')}>
              <label className={s.label} htmlFor="code">
                Enter your RSVP code
              </label>
              <input
                className={s.input}
                ref={(input) => { this.rsvpInput = input; }}
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
        </div>
      </div>
    );
  }
}

export default withStyles(s)(RsvpButton);
