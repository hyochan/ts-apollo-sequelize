import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_HOST ? process.env.DB_HOST : 'localhost',
  process.env.DB_USER ? process.env.DB_USER : 'root',
  process.env.DB_PASSWORD ? process.env.DB_PASSWORD : '',
  {
    dialect: process.env.DB_CONNECTOR ? process.env.DB_CONNECTOR : 'mysql',
    define: {
      underscored: true,
    },
  }
);

const models: any = {
  User: sequelize.import('./user'),
  Message: sequelize.import('./message'),
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
