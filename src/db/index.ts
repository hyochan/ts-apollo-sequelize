import { Sequelize, Options, Op } from 'sequelize';

const options: Options = {
  // dialect: process.env.DB_CONNECTOR ? process.env.DB_CONNECTOR : 'mysql',
  host: process.env.DB_HOST ? process.env.DB_HOST : '127.0.0.1',
  dialect: 'mysql',
  define: {
    underscored: false,
  },
  operatorsAliases: {
    $gt: Op.gt, // use Op
    $gte: Op.gte,
    $lt: Op.lt,
    $lte: Op.lte,
    $ne: Op.ne,
    $eq: Op.eq,
    $and: Op.and,
    $or: Op.or,
    $not: Op.not,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $in: Op.in,
    $notIn: Op.notIn,
    $like: Op.like,
    $notLike: Op.notLike,
  },
};

const sequelize = new Sequelize(
  process.env.DB_DATABASE ? process.env.DB_DATABASE : 'test_db',
  process.env.DB_USER ? process.env.DB_USER : 'hyochan',
  process.env.DB_PASSWORD ? process.env.DB_PASSWORD : 'password',
  options,
);

if (process.env.NODE_ENV !== 'test') {
  sequelize.sync();
}

export default sequelize;
