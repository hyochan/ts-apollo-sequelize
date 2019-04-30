import { DataTypes } from 'sequelize';

import sequelize from './index';
import models from './index';

const { STRING, BOOLEAN, INTEGER, BIGINT, TEXT, UUID, UUIDV1 } = DataTypes;

const User: any = sequelize.define('user', {
  id: {
    type: UUID,
    defaultValue: UUIDV1,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: STRING,
    unique: true,
  },
  password: STRING,
  name: {
    type: STRING,
  },
});

export default User;
