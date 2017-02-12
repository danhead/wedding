import React, { PropTypes } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { MdCheck, MdError } from 'react-icons/lib/md';
import s from './RsvpCard.css';
import { starters, mains } from '../../config';

class RsvpCard extends React.Component {
  static propTypes = {
    focusCallback: PropTypes.func,
    className: PropTypes.string,
    person: PropTypes.shape({
      key: PropTypes.string,
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      email: PropTypes.string,
      password: PropTypes.string,
      completed: PropTypes.boolean,
      attending: PropTypes.boolean,
      dietary: PropTypes.string,
      starter: PropTypes.string,
      main: PropTypes.string,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      detailsVisible: this.props.person.attending,
      saveAttending: this.props.person.attending ? 'saved' : null,
      saveStarter: this.props.person.starter !== '-1' ? 'saved' : null,
      saveMain: this.props.person.main !== '-1' ? 'saved' : null,
      saveDietary: this.props.person.dietary ? 'saved' : null,
    };
  }

  isRSVPComplete(prop, value) {
    function isOK(str) {
      return (str === 'saved' || str === 'success');
    }

    if (prop === 'attending' && value === 'false') { return true; }

    return (isOK(this.state.saveAttending) &&
      isOK(this.state.saveStarter) &&
      isOK(this.state.saveMain));
  }

  saveData(prop, value) {
    const stateKey = `save${prop.charAt(0).toUpperCase()}${prop.slice(1)}`;
    const state = {};

    fetch('/rsvp/save', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: this.props.person.key,
        prop,
        value,
      }),
      credentials: 'include',
    }).then(res => res.json())
      .then(data => {
        state[stateKey] = data.success ? 'success' : 'error';
        this.setState(state);
        if (this.isRSVPComplete(prop, value)) {
          this.setState({
            summaryState: 'success',
            summary: `Thanks ${this.props.person.firstname}, your RSVP has been received`,
          });

          if (!this.state.saveCompleted) {
            this.setState({ saveSompleted: true });
            this.saveData('completed', true);
          }

          setTimeout(() => {
            this.setState({
              summaryState: null,
              summary: null,
            });
          }, 5000);
        }

        state[stateKey] = data.success ? 'saved' : 'error';
        setTimeout(() => {
          this.setState(state);
        }, 500);
      }).catch(() => {
        state[stateKey] = 'error';
      });
  }

  handleAttendingChange = (event) => {
    this.saveData('attending', event.target.value);
    this.setState({
      detailsVisible: event.target.value === 'true',
      attendingResponse: event.target.value === 'true' ? '👍' : '☹️',
    });
  };

  handleDietaryBlur = (event) => {
    this.saveData('dietary', event.target.value);
  };

  handleStarterChange = (event) => {
    this.saveData('starter', event.target.value);
  };

  handleMainChange = (event) => {
    this.saveData('main', event.target.value);
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <div className={cx(s.root, this.props.className)}>
        <h2>
          {this.props.person.firstname} {this.props.person.lastname}
          <span> {this.state.attendingResponse}</span>
        </h2>
        <form onSubmit={this.handleFormSubmit}>
          <div className={s.formGroup}>
            <label className={s.label} htmlFor="attending">
              Attending:
            </label>
            {this.props.person.attending === null ?
              <select
                className={[
                  s.input,
                  this.state.saveAttending === 'success' ? s.inputSuccess : null,
                  this.state.saveAttending === 'error' ? s.inputError : null,
                ].join(' ')}
                id="attending"
                name="attending"
                defaultValue="-1"
                onChange={this.handleAttendingChange}
                onFocus={this.props.focusCallback}
              >
                <option value="-1" disabled>Will you be attending?</option>
                <option value="true">
                  Yes
                </option>
                <option value="false">
                  No
                </option>
              </select>
            :
              <select
                className={[
                  s.input,
                  this.state.saveAttending === 'success' ? s.inputSuccess : null,
                  this.state.saveAttending === 'error' ? s.inputError : null,
                ].join(' ')}
                id="attending"
                name="attending"
                defaultValue={this.props.person.attending === true ? 'true' : 'false'}
                onChange={this.handleAttendingChange}
                onFocus={this.props.focusCallback}
              >
                <option value="true">
                  Yes
                </option>
                <option value="false">
                  No
                </option>
              </select>
            }
            <div className={s.iconContainer}>
              {this.state.saveAttending === 'saved' ? <MdCheck size={30} color="green" /> : null}
              {this.state.saveAttending === 'error' ? <MdError size={30} color="red" /> : null}
            </div>
          </div>
          <div className={[s.rsvpDetails, this.state.detailsVisible ? s.rsvpDetailsVisible : null].join(' ')}>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="starter">
                Starter:
              </label>
              <select
                className={[
                  s.input,
                  this.state.saveStarter === 'success' ? s.inputSuccess : null,
                  this.state.saveStarter === 'error' ? s.inputError : null,
                ].join(' ')}
                id="starter"
                name="starter"
                defaultValue={this.props.person.starter}
                onChange={this.handleStarterChange}
                onFocus={this.props.focusCallback}
              >
                {this.props.person.starter === '-1' ? <option value="-1" disabled>Please select a starter</option> : null}
                {starters.map((starter, index) => (
                  <option key={index} value={index}>{starter}</option>
                ))}
              </select>
              <div className={s.iconContainer}>
                {this.state.saveStarter === 'saved' ? <MdCheck size={30} color="green" /> : null}
                {this.state.saveStarter === 'error' ? <MdError size={30} color="red" /> : null}
              </div>
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="main">
                Main:
              </label>
              <select
                className={[
                  s.input,
                  this.state.saveMain === 'success' ? s.inputSuccess : null,
                  this.state.saveMain === 'error' ? s.inputError : null,
                ].join(' ')}
                id="main"
                name="main"
                defaultValue={this.props.person.main}
                onChange={this.handleMainChange}
                onFocus={this.props.focusCallback}
              >
                {this.props.person.main === '-1' ? <option value="-1" disabled>Please select a main course</option> : null}
                {mains.map((main, index) => (
                  <option key={index} value={index}>{main}</option>
                ))}
              </select>
              <div className={s.iconContainer}>
                {this.state.saveMain === 'saved' ? <MdCheck size={30} color="green" /> : null}
                {this.state.saveMain === 'error' ? <MdError size={30} color="red" /> : null}
              </div>
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="dietary">
                Dietary requirements (if any):
              </label>
              <input
                className={[
                  s.input,
                  this.state.saveDietary === 'success' ? s.inputSuccess : null,
                  this.state.saveDietary === 'error' ? s.inputError : null,
                ].join(' ')}
                id="dietary"
                type="text"
                name="dietary"
                autoComplete="off"
                defaultValue={this.props.person.dietary}
                onBlur={this.handleDietaryBlur}
                onFocus={this.props.focusCallback}
              />
              <div className={s.iconContainer}>
                {this.state.saveDietary === 'saved' ? <MdCheck size={30} color="green" /> : null}
                {this.state.saveDietary === 'error' ? <MdError size={30} color="red" /> : null}
              </div>
            </div>
          </div>
        </form>
        <div
          className={[
            s.rsvpSummary,
            this.state.summaryState === 'success' ? s.rsvpSummarySuccess : null,
          ].join(' ')}
        >
          {this.state.summary}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(RsvpCard);
