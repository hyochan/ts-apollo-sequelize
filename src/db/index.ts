import { Sequelize, Options, Op } from 'sequelize';
import * as path from 'path';

require('dotenv').config();

const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col,
};

const options: Options = {
  // dialect: process.env.DB_CONNECTOR ? process.env.DB_CONNECTOR : 'mysql',
  host: process.env.DB_HOST ? process.env.DB_HOST : '127.0.0.1',
  dialect: 'mysql',
  define: {
    underscored: false,
  },
  // operatorsAliases: false,
};

const sequelize = new Sequelize(
  process.env.DB_DATABASE ? process.env.DB_DATABASE : 'test_db',
  process.env.DB_USER ? process.env.DB_USER : 'hyochan',
  process.env.DB_PASSWORD ? process.env.DB_PASSWORD : 'password',
  options,
);

sequelize.sync();

export default sequelize;
