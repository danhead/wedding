import React from 'react';
import styled from 'styled-components';

class BackgroundImage extends React.Component {

  render() {
    return (
      <BackgroundImg url={this.props.url} />
    )
  }
}

const BackgroundImg = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: ${props => props.url ? `url(${props.url}) no-repeat center center` : ''};
  background-size: cover;
  filter: blur(5px);
`;

export default BackgroundImage;
