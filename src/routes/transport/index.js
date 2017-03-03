import React from 'react';
import Transport from './Transport';
import Layout from '../../components/Layout';

export default {

  path: '/transport',

  action() {
    return {
      title: 'Transport',
      component: <Layout current="transport"><Transport /></Layout>,
    };
  },
};
