import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class CeremonyMap extends React.Component {
  render() {
    const CeremonyGoogleMap = withGoogleMap(() => (
      <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: 51.7109, lng: -0.4479 }}
      >
        <Marker
          title="All Saints' Church"
          position={{ lat: 51.7109, lng: -0.4479 }}
          key="0"
        />
      </GoogleMap>
    ));
    return (
      <CeremonyGoogleMap
        containerElement={
          <div style={{ height: '360px', width: '360px' }} />
        }
        mapElement={
          <div style={{ height: '360px', width: '360px' }} />
        }
      />
    );
  }
}

export default CeremonyMap;
