import React from 'react';
import Accomodation from './Accomodation';
import Layout from '../../components/Layout';

export default {

  path: '/accomodation',

  action() {
    return {
      title: 'Accomodation',
      component: <Layout current="accomodation"><Accomodation /></Layout>,
    };
  },
};
