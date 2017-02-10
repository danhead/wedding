import Sequelize from 'sequelize';
import { databasePath } from '../config';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: databasePath,
  define: {
    freezeTableName: true,
  },
});

export default sequelize;
