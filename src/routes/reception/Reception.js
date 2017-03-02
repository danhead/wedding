import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Reception.css';
import Map from '../../components/Map';

const markers = [
  {
    title: 'Offley Place',
    lat: 51.9282,
    lng: -0.3332,
  },
];

class Reception extends React.Component {
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
            <h1>Offley Place</h1>
            <h2 className={s.subheading}>Kings Walden Road<br />
              Great Offley<br />
              Hitchin<br />
              SG5 3DX</h2>
          </div>
          <div className={s.content}>
            <h3>When</h3>
            <p>The Reception will begin at 3pm, Wedding breakfast at 5pm
              followed by music until late.</p>
            <h3>Where</h3>
            <p>The venue is approximately 30 minute drive from the Church.</p>
            <div className={s.map}>
              <Map
                defaultZoom={12}
                lat={markers[0].lat}
                lng={markers[0].lng}
                markers={markers}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Reception);
