import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Admin.css';
import Link from '../../components/Link';

class Admin extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    people: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      email: PropTypes.string,
      password: PropTypes.string,
      attending: PropTypes.boolean,
    })).isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <div>
            <h2>People</h2>
            <p>{this.props.people.length} people</p>
            <p>{this.props.people.filter(person => person.completed).length} responses</p>
            <Link to="/admin/people">Manage people</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Admin);
