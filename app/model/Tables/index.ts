import { BaseModel } from "../Basemodel/basemodel";
import { Table_Name } from "../Constant_Table";
import { DistributorEntity } from "./distributor.model";
import { MerchantEntity } from "./merchant.model";
import { MetaDataEntity } from "./metaData.model";
import { OrdersEntity } from "./order.model";
import { SalesmenEntity } from "./salesment.model";
import { UserInfoEntity } from "./userInfo.model";

const repo: Partial<Record<keyof typeof Table_Name, typeof BaseModel>> = {
    [Table_Name.users_info]: UserInfoEntity,
    [Table_Name.meta_data]: MetaDataEntity,
    [Table_Name.orders]: OrdersEntity,
    [Table_Name.salesmen]: SalesmenEntity,
    ['distributor']: DistributorEntity,
    [Table_Name.merchant]: MerchantEntity
} as const;

export default repo;