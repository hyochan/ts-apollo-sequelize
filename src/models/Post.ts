import { BuildOptions, DECIMAL, Model, STRING, UUID, UUIDV4 } from 'sequelize';

import sequelize from '../db';

class Post extends Model {
  public id: string;
  public title: string;
  public content: string;
  public rating: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Post.init(
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: STRING,
    content: STRING,
    rating: {
      type: DECIMAL(2, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'post',
    timestamps: true,
    paranoid: true,
  },
);

export type PostModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): Post;
}

export default Post as PostModelStatic;
