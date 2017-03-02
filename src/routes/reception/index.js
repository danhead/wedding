import React from 'react';
import Reception from './Reception';
import Layout from '../../components/Layout';

export default {

  path: '/reception',

  action() {
    return {
      title: 'Reception',
      component: <Layout current="reception"><Reception /></Layout>,
    };
  },
};
