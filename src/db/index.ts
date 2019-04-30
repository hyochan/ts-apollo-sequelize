import { Sequelize, Options } from 'sequelize';

const options: Options = {
  // dialect: process.env.DB_CONNECTOR ? process.env.DB_CONNECTOR : 'mysql',
  host: process.env.DB_HOST ? process.env.DB_HOST : 'localhost',
  dialect: 'mysql',
  define: {
    underscored: false,
  },
};

const sequelize = new Sequelize(
  process.env.DB_DATABASE ? process.env.DB_DATABASE : 'testdb',
  process.env.DB_USER ? process.env.DB_USER : 'root',
  process.env.DB_PASSWORD ? process.env.DB_PASSWORD : 'dooboolab0!',
  options,
);

sequelize.sync();

export default sequelize;
