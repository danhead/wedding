import React from 'react';
import Passcode from '../components/Passcode';
import { bucket } from '../rebase';

class Home extends React.Component {
  state = {
    image: null,
  }
  componentDidMount() {
    this.getImage('IMG_1197');
  }

  getImage = (name) => {
    const imageRef = bucket.ref(`images/proms/${name}.JPG`);
    imageRef.getDownloadURL().then((url) => {
      this.setState({ image: url });
    }).catch((err) => console.error(err));
  }
  render() {
    return (
      <div>
        <h1>Home</h1>
        <Passcode
          user={this.props.user}
          registerAuthStateChange={this.props.registerAuthStateChange}
        />
        <div>{this.state.image
          ? <img src={this.state.image} alt="test" />
          : <div>Insufficient stuff</div>
        }</div>
      </div>
    )
  }
}

export default Home;
