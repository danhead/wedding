import React from 'react';
import Reception from './Reception';
import Layout from '../../components/Layout';

export default {

  path: '/venue',

  action() {
    return {
      title: 'Offley Place',
      component: <Layout current="reception"><Reception /></Layout>,
    };
  },
};
