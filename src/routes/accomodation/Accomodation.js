import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Accomodation.css';
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

const hotels = [
  {
    title: 'Hilton Garden Inn',
    url: 'http://hiltongardeninn3.hilton.com/en/hotels/united-kingdom/hilton-garden-inn-luton-north-LTNNOGI/index.html',
    position: {
      lat: 51.9116,
      lng: -0.3883,
    },
  },
  {
    title: 'Premier Inn',
    url: 'http://www.premierinn.com/gb/en/hotels/england/hertfordshire/hitchin/hitchin-town-centre.html',
    position: {
      lat: 51.9493,
      lng: -0.2762,
    },
  },
  {
    title: 'Lodge Farm House',
    url: 'http://lodgefarmbandb.co.uk',
    position: {
      lat: 51.9054,
      lng: -0.3354,
    },
  },
  {
    title: 'Red Lion Inn',
    url: 'http://www.theredliongreatoffley.co.uk',
    position: {
      lat: 51.9266,
      lng: -0.3348,
    },
  },
];

class Accomodation extends React.Component {
  constructor(props) {
    super(props);
    this.markers = [offley].concat(hotels);
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.bgImage} />
        <div className={s.container}>
          <div className={s.headings}>
            <h1>Local hotels</h1>
          </div>
          <div className={s.content}>
            <h3>The following hotels are near Offley Place:</h3>
            <ul>
              {hotels.map((hotel, index) => (
                <li key={index}><a className={s.hotelLink} href={hotel.url}>{hotel.title}</a></li>
              ))}
            </ul>
            <Map
              defaultZoom={12}
              defaultCenter={offley.position}
              markers={this.markers}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Accomodation);
