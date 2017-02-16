import React from 'react';
import Layout from '../../components/Layout';
import fetchQL from '../../core/fetchQL';

export default {

  path: '/admin/person/:key',

  async action({ params }) {
    if (!params.key) {
      return { redirect: '/admin' };
    }

    const resp = await fetchQL('{getPersonByKey{key,firstname,lastname,email,completed,password,ceremony,starter,main,dietary}}', {
      key: params.key,
    });

    let person = await resp.json();
    if (person.data && person.data.getPersonByKey && person.data.getPersonByKey.length === 1) {
      person = person.data.getPersonByKey[0];
    } else {
      return { redirect: '/admin' };
    }

    const AdminPerson = await new Promise((resolve) => {
      require.ensure([], (require) => resolve(require('./AdminPerson').default), 'adminPerson');
    });

    const title = `${person.firstname} ${person.lastname}`;

    return {
      title,
      chunk: 'admin',
      component: <Layout><AdminPerson title={title} person={person} /></Layout>,
    };
  },

};
