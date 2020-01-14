import { BuildOptions, DECIMAL, Model, STRING, UUID, UUIDV4 } from 'sequelize';

import sequelize from '../db';

class Review extends Model {
  public id: string;
  public title: string;
  public content: string;
  public rating: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Review.init(
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
    modelName: 'review',
    timestamps: true,
    paranoid: true,
  },
);

export type ReviewModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): Review;
}

export default Review as ReviewModelStatic;
