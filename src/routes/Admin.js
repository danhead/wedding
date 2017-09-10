import React from 'react';
import { Redirect } from 'react-router-dom';
import { auth } from '../rebase';

class Admin extends React.Component {
  renderInsufficientAccess = () => {
    return (
      <div>
        <p>You have insufficient access.</p>
        <p>Click <a onClick={this.logout}>Here</a> to log in again.</p>
      </div>
    )
  }

  logout = () => {
    auth.signOut();
  }

  render() {
    const logout = <button onClick={this.logout}>Logout</button>;

    if (!this.props.user.uid) {
      return <Redirect to={{ pathname: '/login' }} />
    }
    if (!this.props.user.data.isAdmin) {
      return this.renderInsufficientAccess();
    }

    return (
      <div>
        <h1>Admin</h1>
        <img src={this.props.user.photoURL} alt={this.props.user.displayName} />
        <p>Hello, {this.props.user.displayName}</p>
        {logout}
      </div>
    )
  }
}

export default Admin;
