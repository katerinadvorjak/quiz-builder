import path from 'path';
import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';

const storage = process.env.SQLITE_PATH || path.resolve(__dirname, '../data/quiz-builder.sqlite');

export const sequelize = new Sequelize({ dialect: 'sqlite', storage, logging: false });

export class QuizModel extends Model<InferAttributes<QuizModel>, InferCreationAttributes<QuizModel>> {
  declare id: string;
  declare title: string;
  declare description: string;
  declare questionsJson: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

QuizModel.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false, defaultValue: '' },
    questionsJson: { type: DataTypes.TEXT, allowNull: false, defaultValue: '[]' },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false }
  },
  { sequelize, tableName: 'quizzes' }
);

export async function initDb() {
  await sequelize.authenticate();
  await sequelize.sync();
}
