import { BaseModel } from "../Basemodel/basemodel";
import { Table_Name } from "../Constant_Table";
import { CityEntity } from "./city.model";
import { DistributorEntity } from "./distributor.model";
import { MerchantEntity } from "./merchant.model";
import { OrdersEntity } from "./order.model";
import { ProductEntity } from "./product.model";
import { ProductCategoryEntity } from "./productCategory.model";
import { SalesmenEntity } from "./salesment.model";
import { UserInfoEntity } from "./userInfo.model";

const repo: Partial<Record<keyof typeof Table_Name, typeof BaseModel>> = {
    [Table_Name.users_info]: UserInfoEntity,
    [Table_Name.orders]: OrdersEntity,
    [Table_Name.salesmen]: SalesmenEntity,
    ['distributor']: DistributorEntity,
    [Table_Name.merchant]: MerchantEntity,
    [Table_Name.citys]: CityEntity,
    [Table_Name.products]: ProductEntity,
    [Table_Name.products_Categorys]: ProductCategoryEntity
} as const;

export default repo;