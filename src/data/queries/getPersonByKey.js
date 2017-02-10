import { GraphQLList as List } from 'graphql';
import PersonItemType from '../types/PersonItemType';
import Person from '../models/Person';

const getPersonByKey = {
  type: new List(PersonItemType),
  resolve({ request }) {
    const params = request.body.params;

    if (params && params.key) {
      return Person.findAll({
        where: {
          key: params.key,
        },
        limit: 1,
      });
    }
    return false;
  },
};

export default getPersonByKey;
