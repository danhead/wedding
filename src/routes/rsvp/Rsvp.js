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
      ceremony: PropTypes.boolean,
      dietary: PropTypes.string,
      starter: PropTypes.string,
      main: PropTypes.string,
      enddate: PropTypes.string,
    })).isRequired,
    rsvpEnd: PropTypes.string.isRequired,
    isEditable: PropTypes.bool.isRequired,
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
          <h1 className={s.heading}>Odpovezte prosím</h1>
          <div className={s.flexContainer}>
            {this.props.people.map(person => (
              <RsvpCard
                key={person.key}
                person={person}
                focusCallback={this.focusCallback}
                isEditable={this.props.isEditable}
              />
            ))}
          </div>
          <div className={s.notes}>
            <p>Changes are automatically saved.
              You can modify the above details up until {this.props.rsvpEnd}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Rsvp);
