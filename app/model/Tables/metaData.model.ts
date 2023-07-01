import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Table_Name } from "../Constant_Table";
import { nameOf } from "../../helpers/helper";

@Entity(Table_Name.meta_data)
@Unique([nameOf<MetaDataEntity>('Type'), nameOf<MetaDataEntity>('Value')])

export class MetaDataEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    Id: string

    @Column()
    Type: string
    
    @Column()
    Value: string

    @CreateDateColumn()
    CreatedAt: Date

    @UpdateDateColumn()
    UpdatedAt: Date

    static async modify(data: Record<string, any>) {};
};