import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import me from './queries/me';
import getAllPersons from './queries/getAllPersons';
import getPersonByKey from './queries/getPersonByKey';
import getPersonsByPassword from './queries/getPersonsByPassword';
import settings from './queries/settings';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      me,
      getAllPersons,
      getPersonByKey,
      getPersonsByPassword,
      settings,
    },
  }),
});

export default schema;
