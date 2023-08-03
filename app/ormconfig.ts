import { DataSource } from "typeorm";
import { UserInfoEntity } from "./model/Tables/userInfo.model";
import { OrdersEntity } from "./model/Tables/order.model";
import { SalesmenEntity } from "./model/Tables/salesment.model";
import { DistributorEntity } from "./model/Tables/distributor.model";
import { MerchantEntity } from "./model/Tables/merchant.model";
import { CityEntity } from "./model/Tables/city.model";
import { ProductEntity } from "./model/Tables/product.model";
import { development } from "../config/environment";
import { ProductCategoryEntity } from "./model/Tables/productCategory.model";
import { DistributorCityEntity } from "./model/Tables/distributorCity.model";
import { New1691082118392 } from "./migrations/1691082118392-new";


export const AppDataSource: DataSource = new DataSource({
    type:'postgres',
    host: development.host,
    port: development.port,
    username: development.username,
    password: development.password,
    database: development.database,
    poolSize: 5,
    ssl: development.dev ? false : true,
    entities: [
        UserInfoEntity,
        OrdersEntity,
        SalesmenEntity,
        DistributorEntity,
        MerchantEntity,
        CityEntity,
        ProductEntity,
        ProductCategoryEntity,
        DistributorCityEntity
    ],
    migrations: [New1691082118392],
    synchronize: false
});