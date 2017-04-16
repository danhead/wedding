import React from 'react';
import Layout from '../../components/Layout';
import fetchQL from '../../core/fetchQL';

const title = 'People';

export default {

  path: '/admin/people',

  async action() {
    const resp = await fetchQL('{getAllPersons{key,firstname,lastname,email,ceremony,completed,password,enddate}}');

    let people = await resp.json();
    if (people.data && people.data.getAllPersons) {
      people = people.data.getAllPersons;
    } else {
      people = [];
    }

    const AdminPeople = await new Promise((resolve) => {
      require.ensure([], (require) => resolve(require('./AdminPeople').default), 'adminPeople');
    });

    return {
      title,
      chunk: 'admin',
      component: <Layout><AdminPeople title={title} people={people} /></Layout>,
    };
  },

};
