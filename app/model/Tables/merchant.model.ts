import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Table_Name } from "../Constant_Table";
import { BaseModel } from "../Basemodel/basemodel";
import { nameOf } from "../../helpers/helper";

@Entity(Table_Name.merchant)
@Unique([nameOf<MerchantEntity>('MerchantTelNo'), nameOf<MerchantEntity>('MerchantEmail')])

export class MerchantEntity extends BaseModel {
    @PrimaryGeneratedColumn('uuid')
    Id: string

    @Column()
    MerchantName: string

    @Column()
    MerchantEmail: string

    @Column()
    MerchantTelNo: string

    @Column()
    MerchantAddress: string

    @Column()
    MerchantCity: string

    @CreateDateColumn()
    CreatedAt: Date

    @UpdateDateColumn()
    UpdatedAt: Date

    static async modify(data: Record<string, any>) { };
};