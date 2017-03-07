import React from 'react';
import Giftlist from './Giftlist';
import Layout from '../../components/Layout';

export default {

  path: '/giftlist',

  action() {
    return {
      title: 'Gift list',
      component: <Layout current="giftlist"><Giftlist /></Layout>,
    };
  },
};
