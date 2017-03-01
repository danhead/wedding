import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Ceremony.css';
import CeremonyMap from '../../components/CeremonyMap';

class Ceremony extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  focusBgImage = (focus) => {
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
          <div className={s.headings}>
            <h1>All Saints&#8217; Church</h1>
            <h2 className={s.subheading}>Church Lane<br />Kings Langley<br />WD4 8JS</h2>
          </div>
          <div className={s.content}>
            <h3>When</h3>
            <p>The Ceremony begins at 1pm</p>
            <h3>Where</h3>
            <p>The Church is located at the southern end of Kings Langley high street.
              Parking is available across the road at the Rose and Crown pub
              (Dan may be there before 1pm 😉).</p>
            <div className={s.map}>
              <CeremonyMap />
            </div>
            <h3>About the church</h3>
            <p>All Saints Church is a medieval church with parts dating from the 13th century.
              The main features of the body of the Church are the beautiful reredos, depicting
              The Last Supper, and the fine Jacobean pulpit with its intricate carvings.
              The Tower has a peal of 8 bells that are regularly rung before Services.</p>
            <p>The church was chosen because it is Dan&#8217;s family church.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Ceremony);
