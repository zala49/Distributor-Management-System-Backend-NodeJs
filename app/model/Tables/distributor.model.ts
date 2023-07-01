import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Table_Name } from "../Constant_Table";
import { BaseModel } from "../Basemodel/basemodel";
import { nameOf } from "../../helpers/helper";

@Entity(Table_Name.distributor)
@Unique([nameOf<DistributorEntity>('DistributorTelNo'), nameOf<DistributorEntity>('DistributorEmail')])

export class DistributorEntity extends BaseModel {
    @PrimaryGeneratedColumn('uuid')
    Id: string

    @Column()
    DistributorName: string

    @Column()
    DistributorEmail: string

    @Column()
    DistributorTelNo: string

    @Column()
    DistributorAddress: string

    @Column()
    DistributorCity: string

    @CreateDateColumn()
    CreatedAt: Date

    @UpdateDateColumn()
    UpdatedAt: Date
    
    static async modify(data: Record<string, any>) { };
};