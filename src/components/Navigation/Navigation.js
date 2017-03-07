import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Link';

class Navigation extends React.Component {
  static propTypes = {
    current: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      scrollAtTop: true,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (event) => {
    const scrollTop = event.srcElement.body.scrollTop;
    this.setState({
      scrollAtTop: scrollTop < 10,
    });
  };

  render() {
    if (!this.props.current) {
      return null;
    }
    return (
      <div
        className={[
          s.root,
          this.state.scrollAtTop ? null : s.navDark,
        ].join(' ')}
        role="navigation"
      >
        <div className={s.container}>
          <Link className={[s.link, this.props.current === 'home' ? s.active : null].join(' ')} to="/">RSVP</Link>
          <Link className={[s.link, this.props.current === 'ceremony' ? s.active : null].join(' ')} to="/church">Church</Link>
          <Link className={[s.link, this.props.current === 'reception' ? s.active : null].join(' ')} to="/venue">Venue</Link>
          <Link className={[s.link, this.props.current === 'accomodation' ? s.active : null].join(' ')} to="/hotels">Hotels</Link>
          <Link className={[s.link, this.props.current === 'transport' ? s.active : null].join(' ')} to="/transport">Transport</Link>
          <Link className={[s.link, this.props.current === 'giftlist' ? s.active : null].join(' ')} to="/giftlist">Gift list</Link>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Navigation);
