import DataType from 'sequelize';
import Model from '../sequelize';

const passwordChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'm', 'n', 'p', 'q', 'r', 't', 'u',
  'w', 'x', 'y', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'M', 'N', 'P', 'Q', 'R', 'T', 'U', 'W',
  'X', 'Y', '2', '3', '4', '6', '7', '8', '9'];

function generatePassword() {
  let pwd = '';
  for (let i = 0; i < 4; i += 1) {
    pwd += passwordChars[Math.floor(Math.random() * passwordChars.length)];
  }
  return pwd;
}

const Person = Model.define('Person', {
  key: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },

  password: {
    type: DataType.STRING(4),
    defaultValue() {
      return generatePassword();
    },
  },

  firstname: {
    type: DataType.STRING(50),
  },

  lastname: {
    type: DataType.STRING(50),
  },

  email: {
    type: DataType.STRING(255),
  },

  completed: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },

  attending: {
    type: DataType.BOOLEAN,
  },

  dietary: {
    type: DataType.STRING(255),
  },

  starter: {
    type: DataType.INTEGER,
    defaultValue: -1,
  },

  main: {
    type: DataType.INTEGER,
    defaultValue: -1,
  },

}, {

  indexes: [
    { fields: ['email'] },
  ],

});

export default Person;
