import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Table_Name } from "../Constant_Table";
import { BaseModel } from "../Basemodel/basemodel";
import { nameOf } from "../../helpers/helper";

@Entity(Table_Name.salesmen)
@Unique([nameOf<SalesmenEntity>('SalesManTelNo'), nameOf<SalesmenEntity>('SalesManEmail')])

export class SalesmenEntity extends BaseModel {
    @PrimaryGeneratedColumn('uuid')
    SalesmanId: string

    @Column()
    SalesManName: string

    @Column()
    SalesManEmail: string

    @Column()
    SalesManTelNo: string

    @Column({nullable: true})
    SalesManAddress: string

    @Column({nullable: true})
    SalesManCity: string

    @CreateDateColumn()
    CreatedAt: Date

    @UpdateDateColumn()
    UpdatedAt: Date

    static async modify(data: Record<string, any>) { };
};