import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout.css';
import Navigation from '../Navigation';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    current: PropTypes.string,
  };

  render() {
    return (
      <div>
        <Navigation current={this.props.current} />
        {this.props.children}
      </div>
    );
  }
}

export default withStyles(s)(Layout);
