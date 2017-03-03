import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Transport.css';
import Map from '../../components/Map';

const offley = [
  {
    title: 'Offley Place',
    url: 'http://www.offleyplace.com/',
    lat: 51.9282,
    lng: -0.3332,
  },
];

const stations = [
  {
    title: 'Hitchin',
    lat: 51.9532,
    lng: -0.2655,
  },
  {
    title: 'Luton',
    lat: 51.8820,
    lng: -0.4171,
  },
  {
    title: 'Luton Airport Parkway',
    lat: 51.8724,
    lng: -0.3984,
  },
];

class Transport extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.bgImage} />
        <div className={s.container}>
          <div className={s.headings}>
            <h1>Transport</h1>
          </div>
          <div className={s.content}>
            <h3>Train</h3>
            <p>There are 3 stations nearby, Hitchin, Luton and Luton Parkway (airport).
              All trains terminate at London St Pancras or London Kings Cross</p>
            <Map
              defaultZoom={11}
              lat={offley[0].lat}
              lng={offley[0].lng}
              markers={stations}
            />
            <h3>Car</h3>
            <p>Offley Place has secure parking facilities.</p>
            <p>The following taxi companies are recommended:</p>
            <ul>
              <li>
                Circuit Cars &ndash; <a className={s.tel} href="tel:+441582454545">01582454545</a>
              </li>
              <li>
                Tiny&#8217;s Taxis (Hitchin) &ndash; <a className={s.tel} href="tel:+441462434743">01462434743</a>
              </li>
              <li>
                Area Cars (Luton) &ndash; <a className={s.tel} href="tel:+441582404040">01582404040</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Transport);
