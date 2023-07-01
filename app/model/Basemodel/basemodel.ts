import { BaseEntity } from "typeorm";

export abstract class BaseModel extends BaseEntity {
    static modify?(data: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
};