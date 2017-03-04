import { GraphQLList as List } from 'graphql';
import SettingsItemType from '../types/SettingsItemType';
import Settings from '../models/Settings';

const settings = {
  type: new List(SettingsItemType),
  resolve() {
    return Settings.findAll();
  },
};

export default settings;
