import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLBoolean as BooleanType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const SettingsItemType = new ObjectType({
  name: 'SettingsItem',
  fields: {
    key: { type: new NonNull(ID) },
    slack: { type: BooleanType },
    email: { type: BooleanType },
  },
});

export default SettingsItemType;
