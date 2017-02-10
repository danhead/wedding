import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';

class Home extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.formContainer}>
          <form method="post" action="/rsvp">
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="code">
                Enter your RSVP code:
              </label>
              <input
                className={s.input}
                id="code"
                type="text"
                name="code"
                autoFocus
              />
            </div>
            <div className={s.formGroup}>
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

export default withStyles(s)(Home);
