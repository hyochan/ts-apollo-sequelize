import { DataTypes } from 'sequelize';

import sequelize from './index';
import User from './user';

const Message: any = sequelize.define('message', {
  text: DataTypes.STRING,
});

Message.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    field: 'userid',
  },
});

export default Message;
