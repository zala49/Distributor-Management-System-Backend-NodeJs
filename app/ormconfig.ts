import { DataSource } from "typeorm";
import dbConfig from '../config/db.config';
import { UserInfoEntity } from "./model/Tables/userInfo.model";
import { MetaDataEntity } from "./model/Tables/metaData.model";
import { OrdersEntity } from "./model/Tables/order.model";
import { SalesmenEntity } from "./model/Tables/salesment.model";
import { DistributorEntity } from "./model/Tables/distributor.model";
import { MerchantEntity } from "./model/Tables/merchant.model";
import { CityEntity } from "./model/Tables/city.model";
import { ProductEntity } from "./model/Tables/product.model";

export const AppDataSource: DataSource = new DataSource({
    type:'postgres',
    host: dbConfig.HOST,
    port: 5432,
    username: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    poolSize: dbConfig.pool.max,
    entities: [
        UserInfoEntity,
        MetaDataEntity,
        OrdersEntity,
        SalesmenEntity,
        DistributorEntity,
        MerchantEntity,
        CityEntity,
        ProductEntity
    ],
    migrations: [`${__dirname}/migrations/*.{js,ts}`],
    logging: false,
    synchronize: true
});