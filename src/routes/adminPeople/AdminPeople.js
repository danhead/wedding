import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminPeople.css';
import Link from '../../components/Link';
import Button from '../../components/Button';

class AdminPeople extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    people: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      completed: PropTypes.boolean,
      ceremony: PropTypes.boolean,
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

          {this.props.people.length === 0 ? <p> No people yet ☹️</p> :
          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Email</td>
                <td>Password</td>
                <td>Ceremony</td>
                <td>Responded</td>
              </tr>
            </thead>
            <tbody>
              {this.props.people.map(person => (
                <tr key={person.key}>
                  <td><Link to={`/admin/person/${person.key}`}>{person.firstname} {person.lastname}</Link></td>
                  <td>{person.email}</td>
                  <td><Link to={`/rsvp/${person.password}`}>{person.password}</Link></td>
                  <td>{person.ceremony ? 'Full day' : 'Evening only'}</td>
                  <td>{person.completed ? 'Yes' : 'No'}</td>
                  <td>
                    <form method="post" action="/admin/person/delete">
                      <input type="hidden" name="key" value={person.key} />
                      <Button type="submit">
                        Delete
                      </Button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          }
          <h2>Add Person</h2>
          <form method="post" action="/admin/person">
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="firstname">
                First name:
              </label>
              <input
                className={s.input}
                id="firstname"
                type="text"
                name="firstname"
              />
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="lastname">
                Last name:
              </label>
              <input
                className={s.input}
                id="lastname"
                type="text"
                name="lastname"
              />
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="email">
                Email:
              </label>
              <input
                className={s.input}
                id="email"
                type="text"
                name="email"
              />
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="ceremony">
                Invite type:
              </label>
              <select
                className={s.input}
                id="cermony"
                name="ceremony"
              >
                <option value="true">Full day</option>
                <option value="false">Evening only</option>
              </select>
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="password">
                Password (blank will autogenerate):
              </label>
              <input
                className={s.input}
                id="password"
                type="text"
                name="password"
              />
            </div>
            <div className={s.formGroup}>
              <Button type="submit">
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(AdminPeople);
