import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminPerson.css';
import Button from '../../components/Button';

class AdminPerson extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    person: PropTypes.shape({
      key: PropTypes.string.isRequired,
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      completed: PropTypes.boolean,
      email: PropTypes.string,
      password: PropTypes.string,
      attending: PropTypes.boolean,
      ceremony: PropTypes.boolean,
    }).isRequired,
  };

  state = {
    firstname: this.props.person.firstname,
    lastname: this.props.person.lastname,
  };

  handleFirstnameChange = (event) => {
    this.setState({ firstname: event.target.value });
  }

  handleLastnameChange = (event) => {
    this.setState({ lastname: event.target.value });
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.state.firstname} {this.state.lastname}</h1>
          <form method="post" action="/admin/person">
            <input
              type="hidden"
              name="key"
              value={this.props.person.key}
            />
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="firstname">
                First name:
              </label>
              <input
                className={s.input}
                id="firstname"
                type="text"
                name="firstname"
                defaultValue={this.props.person.firstname}
                onChange={this.handleFirstnameChange}
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
                defaultValue={this.props.person.lastname}
                onChange={this.handleLastnameChange}
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
                defaultValue={this.props.person.email}
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
                defaultValue={this.props.person.ceremony ? 'true' : 'false'}
              >
                <option value="true">Full day</option>
                <option value="false">Evening only</option>
              </select>
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="password">
                Password:
              </label>
              <input
                className={s.input}
                id="password"
                type="text"
                name="password"
                defaultValue={this.props.person.password}
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

export default withStyles(s)(AdminPerson);
