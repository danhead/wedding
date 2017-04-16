import React from 'react';
import Layout from '../../components/Layout';
import fetchQL from '../../core/fetchQL';
import Rsvp from './Rsvp';
import NotFound from '../notFound/NotFound';
import { prettifyDate } from '../../config';

let title = 'RSVP';
export default {

  path: '/rsvp/:password',

  isEditable(date) {
    return new Date() < new Date(date);
  },

  async action({ params }) {
    if (!params.password) {
      return { redirect: '/' };
    }

    const resp = await fetchQL('{getPersonsByPassword{key,firstname,lastname,attending,ceremony,dietary,starter,main,enddate}}', {
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

    // Assuming all connected guests have the same invite
    const firstDate = people[0].enddate;

    return {
      title,
      component: (
        <Layout current="home">
          <Rsvp
            title={title}
            people={people}
            rsvpEnd={prettifyDate(firstDate)}
            isEditable={this.isEditable(firstDate)}
          />
        </Layout>
      ),
    };
  },

};
