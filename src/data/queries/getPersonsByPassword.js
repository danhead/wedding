import { GraphQLList as List } from 'graphql';
import PersonItemType from '../types/PersonItemType';
import Person from '../models/Person';

const getPersonsByPassword = {
  type: new List(PersonItemType),
  resolve({ request }) {
    const params = request.body.params;

    if (params && params.password) {
      return Person.findAll({
        where: {
          password: params.password,
        },
      });
    }
    return false;
  },
};

export default getPersonsByPassword;

