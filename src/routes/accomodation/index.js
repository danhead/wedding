import React from 'react';
import Accomodation from './Accomodation';
import Layout from '../../components/Layout';

export default {

  path: '/hotels',

  action() {
    return {
      title: 'Hotels',
      component: <Layout current="accomodation"><Accomodation /></Layout>,
    };
  },
};
