import { GraphQLList as List } from 'graphql';
import PersonItemType from '../types/PersonItemType';
import Person from '../models/Person';
import admin from '../../core/admin';

const person = {
  type: new List(PersonItemType),
  resolve({ request }) {
    const params = request.body.params;
    const user = request.user || {};
    const isAdmin = admin(user.email);

    if (params && params.code) {
      return Person.findAll({
        where: {
          password: params.code,
        },
      });
    }
    return isAdmin && Person.findAll();
  },
};

export default person;

