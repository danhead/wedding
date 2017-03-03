import React from 'react';
import Ceremony from './Ceremony';
import Layout from '../../components/Layout';

export default {

  path: '/church',

  action() {
    return {
      title: 'All Saints\' Church',
      component: <Layout current="ceremony"><Ceremony /></Layout>,
    };
  },
};
