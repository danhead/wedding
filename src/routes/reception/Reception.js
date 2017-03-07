import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Reception.css';
import Map from '../../components/Map';

const offley = {
  title: 'Offley Place',
  url: 'http://www.offleyplace.com/',
  position: {
    lat: 51.9282,
    lng: -0.3332,
  },
  showInfo: true,
};

class Reception extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div
          className={s.bgImage}
        />
        <div className={s.container}>
          <div className={s.headings}>
            <h1>Offley Place</h1>
            <h2 className={s.subheading}>Kings Walden Road<br />
              Great Offley<br />
              Hitchin<br />
              SG5 3DX</h2>
          </div>
          <div className={s.content}>
            <h3>When</h3>
            <p>The Reception will begin at 3pm, Wedding Breakfast at 5pm
              followed by music until late.</p>
            <h3>Where</h3>
            <p>The venue is approximately a 30 minute drive from the Church.</p>
            <Map
              defaultZoom={12}
              defaultCenter={offley.position}
              markers={[offley]}
            />
            <h3>About Offley Place</h3>
            <p>Legend has it that in the 8th century, King Offa discovered the bones of
              Saint Alban and set about creating St Albans Abbey in a tribute to him.
              While it was being completed he looked for a place to call home and
              discovered the local area. After building a grand palace the village is
              thought to have become known as Great Off Lee.</p>
            <p>Great Offley Place was first built in the 17th century.  Rebuilt in 1810
              but still retaining a Tudor porch and a 17th century wing, the grand house
              has a long history which has seen the same family line keep ownership for
              an impressive 350 years.</p>
            <p>In 1929 the family ownership was brought to an end when the last owner,
              Guy George, sold the estate to a director of WH Smith who was well liked
              in the village and built a cricket pavilion and pitch.</p>
            <p>When World War II broke out it was sold again, this time to become a
              teacher training college, and then finally in 2003 it was taken over again
              and transformed into the luxury hotel, wedding venue and restaurant it
              is today.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Reception);
