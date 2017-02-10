import React from 'react';
import Layout from '../../components/Layout';
import fetchQL from '../../core/fetchQL';
import Rsvp from './Rsvp';
import NotFound from '../notFound/NotFound';

let title = 'RSVP';

export default {

  path: '/rsvp/:password',

  async action({ params }) {
    if (!params.password) {
      return { redirect: '/' };
    }

    const resp = await fetchQL('{getPersonsByPassword{key,firstname,lastname,attending,dietary,starter,main}}', {
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
      component: <Layout><Rsvp title={title} people={people} /></Layout>,
    };
  },

};
