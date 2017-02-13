import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Button.css';

class Button extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
  };

  handleClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };

  render() {
    const { children, ...props } = this.props;
    return <button className={s.root} {...props} onClick={this.handleClick}>{children}</button>;
  }
}

export default withStyles(s)(Button);
