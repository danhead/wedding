import React from 'react';
import Layout from '../../components/Layout';
import fetchQL from '../../core/fetchQL';
import Rsvp from './Rsvp';
import NotFound from '../notFound/NotFound';
import { rsvpEndDate } from '../../config';

let title = 'RSVP';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default {

  path: '/rsvp/:password',

  getRsvpEnd() {
    const date = rsvpEndDate.getDate();
    let dateSuffix = 'th';
    if (date === 1 || date === 21 || date === 31) { dateSuffix = 'st'; }
    if (date === 2 || date === 22) { dateSuffix = 'nd'; }
    if (date === 3 || date === 23) { dateSuffix = 'rd'; }
    const month = months[rsvpEndDate.getMonth()];
    const year = rsvpEndDate.getFullYear();
    return `${date}${dateSuffix} ${month} ${year}`;
  },

  isEditable() {
    return new Date() < rsvpEndDate;
  },

  async action({ params }) {
    if (!params.password) {
      return { redirect: '/' };
    }

    const resp = await fetchQL('{getPersonsByPassword{key,firstname,lastname,attending,ceremony,dietary,starter,main}}', {
      password: params.password,
    });

    const { data } = await resp.json();
    const people = data && data.getPersonsByPassword;
    if (!people || people.length === 0) {
      title = 'RSVP Not Found';
      return {
        title,
        component: <Layout><NotFound title={title} /></Layout>,
        status: 404,
      };
    }

    return {
      title,
      component: (
        <Layout>
          <Rsvp
            title={title}
            people={people}
            rsvpEnd={this.getRsvpEnd()}
            isEditable={this.isEditable()}
          />
        </Layout>
      ),
    };
  },

};
