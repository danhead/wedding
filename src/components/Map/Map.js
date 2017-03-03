import React, { PropTypes } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class Map extends React.Component {
  static propTypes = {
    defaultZoom: PropTypes.number.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    markers: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    })).isRequired,
  };

  render() {
    const GMap = withGoogleMap(() => (
      <GoogleMap
        defaultZoom={this.props.defaultZoom}
        defaultCenter={{ lat: this.props.lat, lng: this.props.lng }}
      >
        {this.props.markers.map((props, index) => (
          <Marker
            title={props.title}
            position={{ lat: props.lat, lng: props.lng }}
            key={index}
          />
        ))}
      </GoogleMap>
    ));
    return (
      <GMap
        containerElement={
          <div
            style={{
              height: '360px',
              width: '100%',
              'max-width': '480px',
              overflow: 'hidden',
            }}
          />
        }
        mapElement={
          <div
            style={{
              height: '360px',
              width: '100%',
              'max-width': '480px',
            }}
          />
        }
      />
    );
  }
}

export default Map;
