import DataType from 'sequelize';
import Model from '../sequelize';

const Settings = Model.define('Settings', {
  key: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },

  slack: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },

  email: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },

});

export default Settings;
