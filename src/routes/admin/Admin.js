import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Admin.css';
import Link from '../../components/Link';
import Button from '../../components/Button';

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
    starters: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      total: PropTypes.integer,
    })).isRequired,
    mains: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      total: PropTypes.integer,
    })).isRequired,
    build: PropTypes.shape({
      hash: PropTypes.string,
      time: PropTypes.string,
    }),
    settings: PropTypes.shape({
      slack: PropTypes.boolean,
      email: PropTypes.boolean,
    }),
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
          <div>
            <h2>Food</h2>
            <h3>Starters</h3>
            <ul>
              {this.props.starters.map((starter, index) => (
                <li key={index}>{starter.name} - {starter.total}</li>
              ))}
            </ul>
            <h3>Mains</h3>
            <ul>
              {this.props.mains.map((main, index) => (
                <li key={index}>{main.name} - {main.total}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Settings</h3>
            <form method="post" action="/admin/settings">
              <div className={s.formGroup}>
                <label className={s.label} htmlFor="slack">
                  Send slack messages on RSVP:
                </label>
                <input
                  className={s.input}
                  type="checkbox"
                  name="slack"
                  defaultChecked={this.props.settings.slack}
                />
              </div>
              <div className={s.formGroup}>
                <label className={s.label} htmlFor="email">
                  Send confirmation emails on RSVP:
                </label>
                <input
                  className={s.input}
                  type="checkbox"
                  name="email"
                  defaultChecked={this.props.settings.email}
                />
              </div>
              <div className={s.formGroup}>
                <Button type="submit">
                  Save
                </Button>
              </div>
            </form>
          </div>
          <div>
            Build hash: <a href={`https://bitbucket.org/dan_head/wedding/commits/${this.props.build.hash}`}>{this.props.build.hash}</a>
          </div>
          <div>
            Build time: {this.props.build.time}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Admin);
