import { AppDataSource } from "../ormconfig";
import { DataSource } from 'typeorm';

export const connectToDatabase = async (): Promise<DataSource> => {
    if (AppDataSource.isInitialized === false) {
        await AppDataSource.initialize();
    }
    return AppDataSource;
};