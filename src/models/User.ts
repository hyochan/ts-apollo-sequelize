import { BuildOptions, DATEONLY, DataTypes, Model } from 'sequelize';

import Notification from './Notification';
import Review from './Review';
import moment from 'moment';
import sequelize from '../db';

const { STRING, BOOLEAN, UUID, UUIDV1, ENUM } = DataTypes;

enum Gender {
  Male = 'MALE',
  Female = 'FEMALE'
}

export class User extends Model {
  public id!: string;
  public email: string;
  public password: string;
  public name: string;
  public nickname: string;
  public photo: string;
  public gender: Gender;
  public social: string;
  public verified: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt: Date;
}

User.init(
  {
    id: {
      type: UUID,
      defaultValue: UUIDV1,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: STRING,
    },
    password: {
      type: STRING,
      allowNull: true,
    },
    name: STRING,
    nickname: STRING,
    gender: ENUM('MALE', 'FEMALE'),
    thumbUrl: STRING,
    photoURL: STRING,
    birthday: {
      type: DATEONLY,
      get: function(): string {
        return moment.utc(this.getDataValue('regDate')).format('YYYY-MM-DD');
      },
    },
    socialId: STRING,
    authType: ENUM('EMAIL', 'FACEBOOK', 'GOOGLE', 'APPLE'),
    verified: {
      type: BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'user',
    timestamps: true,
    paranoid: true,
  },
);

User.hasMany(Notification);
Notification.belongsTo(User);
User.hasMany(Review);
Review.belongsTo(User);

export type UserModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): User;
}

export default User as UserModelStatic;
