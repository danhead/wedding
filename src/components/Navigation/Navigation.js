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
        <Link className={[s.link, this.props.current === 'home' ? s.active : null].join(' ')} to="/">RSVP</Link>
        <Link className={[s.link, this.props.current === 'ceremony' ? s.active : null].join(' ')} to="/ceremony">Church</Link>
      </div>
    );
  }
}

export default withStyles(s)(Navigation);