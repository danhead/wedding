import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Rsvp.css';
import RsvpCard from '../../components/RsvpCard';

class Rsvp extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    people: PropTypes.arrayOf(PropTypes.shape({
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      email: PropTypes.string,
      dietary: PropTypes.string,
      starter: PropTypes.string,
      main: PropTypes.string,
    })).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  focusCallback = () => {
    this.setState({ focusBgImage: focus });
  }

  render() {
    return (
      <div className={s.root}>
        <div
          className={[
            s.bgImage,
            this.state.focusBgImage ? s.bgImageFocus : null,
          ].join(' ')}
        />
        <div className={s.container}>
          <h1 className={s.heading}>Répondez, s&#39;il vous plaît</h1>
          <div className={s.flexContainer}>
            {this.props.people.map(person => (
              <RsvpCard key={person.key} person={person} focusCallback={this.focusCallback} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Rsvp);
