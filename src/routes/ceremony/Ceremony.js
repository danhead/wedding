import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Ceremony.css';
import Map from '../../components/Map';

const church = {
  title: 'All Saints\' Church',
  position: {
    lat: 51.7109,
    lng: -0.4479,
  },
  showInfo: true,
};

const carPark = {
  title: 'Langley Hill Car Park',
  position: {
    lat: 51.7121,
    lng: -0.4507,
  },
  showInfo: true,
};

class Ceremony extends React.Component {
  constructor(props) {
    super(props);
    this.markers = [church, carPark];
  }

  render() {
    return (
      <div className={s.root}>
        <div
          className={s.bgImage}
        />
        <div className={s.container}>
          <div className={s.headings}>
            <h1>All Saints&#8217; Church</h1>
            <h2 className={s.subheading}>Church Lane<br />Kings Langley<br />WD4 8JS</h2>
          </div>
          <div className={s.content}>
            <h3>When</h3>
            <p>The ceremony begins at 1pm</p>
            <h3>Where</h3>
            <p>The church is located at the southern end of Kings Langley high street.
              Free parking is available on Langley Hill.</p>
            <Map
              defaultZoom={15}
              defaultCenter={church.position}
              markers={this.markers}
            />
            <h3>About the church</h3>
            <p>All Saints Church is a medieval church with parts dating from the 13th century.
              The main features of the church are the beautiful reredos, depicting
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
