import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import me from './queries/me';
import getAllPersons from './queries/getAllPersons';
import getPersonByKey from './queries/getPersonByKey';
import getPersonsByPassword from './queries/getPersonsByPassword';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      me,
      getAllPersons,
      getPersonByKey,
      getPersonsByPassword,
    },
  }),
});

export default schema;
