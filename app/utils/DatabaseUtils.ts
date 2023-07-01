import { AppDataSource } from "../ormconfig";
import { DataSource } from 'typeorm';



export const connectToDatabase = async (): Promise<DataSource> => {
    // console.debug('Connect to Database');
    if (AppDataSource.isInitialized === false) {
        // console.debug('Initializing database');
        await AppDataSource.initialize();
    } else {
        // console.debug('Already connected to database');
    }
    // console.debug('Done connecting to Database');
    return AppDataSource;
};