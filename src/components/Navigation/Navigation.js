import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Link';

class Navigation extends React.Component {
  static propTypes = {
    current: PropTypes.string,
  };

  render() {
    if (!this.props.current) {
      return null;
    }
    return (
      <div className={s.root} role="navigation">
        <div className={s.container}>
          <Link className={[s.link, this.props.current === 'home' ? s.active : null].join(' ')} to="/">RSVP</Link>
          <Link className={[s.link, this.props.current === 'ceremony' ? s.active : null].join(' ')} to="/ceremony">Church</Link>
          <Link className={[s.link, this.props.current === 'reception' ? s.active : null].join(' ')} to="/reception">Venue</Link>
          <Link className={[s.link, this.props.current === 'accomodation' ? s.active : null].join(' ')} to="/accomodation">Hotels</Link>
          <Link className={[s.link, this.props.current === 'transport' ? s.active : null].join(' ')} to="/transport">Transport</Link>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Navigation);
