import React from 'react';

class Albums extends React.Component {

  renderCard = (key) => {
    return (
      <div>
        Card - {key}
      </div>
    )
  }

  render() {
    console.log(this.props.albums);
    return (
      <div className="hello">
      {Object.keys(this.props.albums).map(this.renderCard)}
      </div>
    )
  }
}

export default Albums;
