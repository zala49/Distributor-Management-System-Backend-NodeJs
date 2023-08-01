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
import { New1690628180145 } from "./migrations/1690628180145-new";
import { New1690628331083 } from "./migrations/1690628331083-new";
import { New1690628519973 } from "./migrations/1690628519973-new";
import { New1690628603208 } from "./migrations/1690628603208-new";
import { New1690628755612 } from "./migrations/1690628755612-new";
import { DistributorCityEntity } from "./model/Tables/distributorCity.model";
import { New1690629795083 } from "./migrations/1690629795083-new";
import { New1690631247522 } from "./migrations/1690631247522-new";
import { New1690638021109 } from "./migrations/1690638021109-new";
import { Start1690695345000 } from "./migrations/1690695345000-start";
import { Start1690697333199 } from "./migrations/1690697333199-start";

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
    migrations: [Start1690697333199],
    synchronize: false
});