import React from 'react';
import Layout from '../../components/Layout';
import fetchQL from '../../core/fetchQL';
import { starters, mains } from '../../config';

const title = 'Admin';

export default {

  path: '/admin',

  async action() {
    const resp = await fetchQL('{getAllPersons{key,firstname,lastname,email,password,completed,starter,main}}');

    const food = {
      starters: starters.map(name => ({ name, total: 0 })),
      mains: mains.map(name => ({ name, total: 0 })),
    };
    let people = await resp.json();
    if (people.data && people.data.getAllPersons) {
      people = people.data.getAllPersons;
    } else {
      people = [];
    }

    const Admin = await new Promise((resolve) => {
      require.ensure([], (require) => resolve(require('./Admin').default), 'admin');
    });

    return {
      title,
      chunk: 'admin',
      component: <Layout><Admin
        title={title}
        people={people}
        food={food}
      /></Layout>,
    };
  },

};
