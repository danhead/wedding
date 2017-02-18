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

  constructor(props) {
    super(props);
    this.state = {
      people: this.props.people,
      personFormVisible: false,
      sortDirection: false,
    };
  }

  sortPeople = (event, sortedBy) => {
    event.preventDefault();
    const sortDirection = (sortedBy === this.state.sortedBy) ? !this.state.sortDirection : true;
    this.setState({
      sortedBy,
      sortDirection,
      people: this.props.people.sort((a, b) => {
        if (a[sortedBy] > b[sortedBy]) {
          return sortDirection ? 1 : -1;
        }
        return sortDirection ? -1 : 1;
      }),
    });
  }

  togglePersonForm = (event) => {
    event.preventDefault();
    this.setState({ personFormVisible: !this.state.personFormVisible });
  }

  openImportForm = (event) => {
    event.preventDefault();
    this.setState({ openImportForm: true });
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>

          {this.state.people.length === 0 ? <p> No people yet ☹️</p> :
          <table>
            <thead>
              <tr>
                <td>
                  <span
                    className={[
                      s.sortIcon,
                      this.state.sortedBy === 'firstname' && this.state.sortDirection ? s.showSortIcon : null,
                    ].join(' ')}
                  >⬇</span>
                  <span
                    className={[
                      s.sortIcon,
                      this.state.sortedBy === 'firstname' && !this.state.sortDirection ? s.showSortIcon : null,
                    ].join(' ')}
                  >⬆</span>
                  <a href="#sortcolumn" onClick={event => this.sortPeople(event, 'firstname')}>First name</a>
                </td>
                <td>
                  <span
                    className={[
                      s.sortIcon,
                      this.state.sortedBy === 'lastname' && this.state.sortDirection ? s.showSortIcon : null,
                    ].join(' ')}
                  >⬇</span>
                  <span
                    className={[
                      s.sortIcon,
                      this.state.sortedBy === 'lastname' && !this.state.sortDirection ? s.showSortIcon : null,
                    ].join(' ')}
                  >⬆</span>
                  <a href="#sortcolumn" onClick={event => this.sortPeople(event, 'lastname')}>Last name</a>
                </td>
                <td>
                  <span
                    className={[
                      s.sortIcon,
                      this.state.sortedBy === 'email' && this.state.sortDirection ? s.showSortIcon : null,
                    ].join(' ')}
                  >⬇</span>
                  <span
                    className={[
                      s.sortIcon,
                      this.state.sortedBy === 'email' && !this.state.sortDirection ? s.showSortIcon : null,
                    ].join(' ')}
                  >⬆</span>
                  <a href="#sortcolumn" onClick={event => this.sortPeople(event, 'email')}>Email</a>
                </td>
                <td>
                  <span
                    className={[
                      s.sortIcon,
                      this.state.sortedBy === 'password' && this.state.sortDirection ? s.showSortIcon : null,
                    ].join(' ')}
                  >⬇</span>
                  <span
                    className={[
                      s.sortIcon,
                      this.state.sortedBy === 'password' && !this.state.sortDirection ? s.showSortIcon : null,
                    ].join(' ')}
                  >⬆</span>
                  <a href="#sortcolumn" onClick={event => this.sortPeople(event, 'password')}>Password</a>
                </td>
                <td>
                  <span
                    className={[
                      s.sortIcon,
                      this.state.sortedBy === 'ceremony' && this.state.sortDirection ? s.showSortIcon : null,
                    ].join(' ')}
                  >⬇</span>
                  <span
                    className={[
                      s.sortIcon,
                      this.state.sortedBy === 'ceremony' && !this.state.sortDirection ? s.showSortIcon : null,
                    ].join(' ')}
                  >⬆</span>
                  <a href="#sortcolumn" onClick={event => this.sortPeople(event, 'ceremony')}>Ceremony</a>
                </td>
                <td>
                  <span
                    className={[
                      s.sortIcon,
                      this.state.sortedBy === 'completed' && this.state.sortDirection ? s.showSortIcon : null,
                    ].join(' ')}
                  >⬇</span>
                  <span
                    className={[
                      s.sortIcon,
                      this.state.sortedBy === 'completed' && !this.state.sortDirection ? s.showSortIcon : null,
                    ].join(' ')}
                  >⬆</span>
                  <a href="#sortcolumn" onClick={event => this.sortPeople(event, 'completed')}>Responded</a>
                </td>
              </tr>
            </thead>
            <tbody>
              {this.state.people.map(person => (
                <tr key={person.key}>
                  <td>{person.firstname}</td>
                  <td>{person.lastname}</td>
                  <td>{person.email}</td>
                  <td><Link to={`/rsvp/${person.password}`}>{person.password}</Link></td>
                  <td>{person.ceremony ? 'Full day' : 'Evening only'}</td>
                  <td>{person.completed ? 'Yes' : 'No'}</td>
                  <td>
                    <Button to={`/admin/person/${person.key}`}>Edit</Button>
                  </td>
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
          <h2>
            <a href="#openpersonform" onClick={this.togglePersonForm}>
              <span>{this.state.personFormVisible ? '-' : '+'}</span> Add Person
            </a>
          </h2>
          <form
            method="post"
            action="/admin/person"
            className={[
              s.personForm,
              this.state.personFormVisible ? s.personFormVisible : null,
            ].join(' ')}
          >
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
          <div>
            <a href="#openimportform" onClick={this.openImportForm}>Import data</a>
            {!this.state.openImportForm ? ' / ' : null}
            {!this.state.openImportForm ? <a href="/admin/people/export">Export data</a> : null}
          </div>
          <form
            method="post"
            action="/admin/people/import"
            className={[
              s.importForm,
              this.state.openImportForm ? s.importFormVisible : null,
            ].join(' ')}
          >
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="importdata">
                Enter JSON:
              </label>
              <textarea
                className={s.input}
                id="importdata"
                type="text"
                name="importdata"
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
