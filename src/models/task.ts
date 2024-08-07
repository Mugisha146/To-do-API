import { Model, DataTypes } from "sequelize";
import sequelize from "../config/dbConfig";

class Task extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public completed!: boolean;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Task",
  }
);

export default Task;
