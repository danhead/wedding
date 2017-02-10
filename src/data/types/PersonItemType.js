import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLBoolean as BooleanType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const PersonItemType = new ObjectType({
  name: 'PersonItem',
  fields: {
    key: { type: new NonNull(ID) },
    password: { type: StringType },
    firstname: { type: StringType },
    lastname: { type: StringType },
    email: { type: StringType },
    completed: { type: BooleanType },
    attending: { type: BooleanType },
    dietary: { type: StringType },
    starter: { type: StringType },
    main: { type: StringType },
  },
});

export default PersonItemType;
