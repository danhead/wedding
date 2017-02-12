import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import RsvpButton from '../../components/RsvpButton';

class Home extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.churchImage} />
        <div className={s.container}>
          <div className={s.headings}>
            <h1>Daniel and Hana</h1>
            <h2>are getting married</h2>
            <h3>- 27th July 2017 -</h3>
          </div>
          <div className={s.rsvp}>
            <RsvpButton />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
