import React from 'react';
import Ceremony from './Ceremony';
import Layout from '../../components/Layout';

export default {

  path: '/ceremony',

  action() {
    return {
      title: 'Ceremony',
      component: <Layout current="ceremony"><Ceremony /></Layout>,
    };
  },
};
