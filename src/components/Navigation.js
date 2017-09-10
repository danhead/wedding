import React from 'react';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {
  render() {
    return (
      <ul>
        <li>
          <Link to="/">Home</Link>
          <Link to="/admin">Admin</Link>
        </li>
      </ul>
    )
  }
}

export default Navigation;
