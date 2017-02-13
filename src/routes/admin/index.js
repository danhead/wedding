import React from 'react';
import Layout from '../../components/Layout';
import fetchQL from '../../core/fetchQL';
import { starters, mains } from '../../config';

const title = 'Admin';

export default {

  path: '/admin',

  async action() {
    const resp = await fetchQL('{getAllPersons{key,firstname,lastname,email,password,completed,starter,main}}');
    const { data } = await resp.json();
    const people = data.getAllPersons || [];

    const food = {
      starters: starters.map((name, index) => {
        const total = people.filter(person => person.starter === `${index}`).length;
        return { name, total };
      }),
      mains: mains.map((name, index) => {
        const total = people.filter(person => person.main === `${index}`).length;
        return { name, total };
      }),
    };

    const Admin = await new Promise((resolve) => {
      require.ensure([], (require) => resolve(require('./Admin').default), 'admin');
    });

    return {
      title,
      chunk: 'admin',
      component: <Layout><Admin
        title={title}
        people={people}
        starters={food.starters}
        mains={food.mains}
      /></Layout>,
    };
  },

};
