import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import s from './Map.css';

class Map extends React.Component {
  static propTypes = {
    defaultZoom: PropTypes.number.isRequired,
    defaultCenter: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
    markers: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      position: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
      }).isRequired,
      showInfo: PropTypes.boolean,
      infoContent: PropTypes.string,
    })).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      markers: this.props.markers,
    };
  }

  handleMarkerClick = (targetMarker) => {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: true,
          };
        }
        return marker;
      }),
    });
  };

  handleMarkerClose = (targetMarker) => {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: false,
          };
        }
        return marker;
      }),
    });
  }

  render() {
    const GMap = withGoogleMap(() => (
      <GoogleMap
        defaultZoom={this.props.defaultZoom}
        defaultCenter={this.props.defaultCenter}
      >
        {this.state.markers.map((marker, index) => (
          <Marker
            key={index}
            defaultAnimation="2"
            {...marker}
            onClick={() => this.handleMarkerClick(marker)}
          >
            {marker.showInfo && (
              <InfoWindow
                onCloseClick={() => this.handleMarkerClose(marker)}
              >
                <div className={s.info}>
                  <h6 className={s.infoTitle}>
                    {marker.url ? (
                      <a href={marker.url}>{marker.title}</a>
                    ) : marker.title }
                  </h6>
                  {marker.infoContent}
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    ));
    return (
      <GMap
        containerElement={
          <div className={s.root} />
        }
        mapElement={
          <div className={s.map} />
        }
      />
    );
  }
}

export default withStyles(s)(Map);
