import Sequelize from "sequelize/types/sequelize";

export interface IDatabase {
  get sequlize(): Promise<Sequelize>;
}