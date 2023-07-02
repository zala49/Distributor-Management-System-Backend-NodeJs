import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Table_Name } from "../Constant_Table";
import { BaseModel } from "../Basemodel/basemodel";
import { nameOf } from "../../helpers/helper";

@Entity(Table_Name.products)
@Unique([nameOf<ProductEntity>('ProductName'), nameOf<ProductEntity>('ProductCategory')])

export class ProductEntity extends BaseModel {
    @PrimaryGeneratedColumn('uuid')
    ProductId: string

    @Column()
    ProductName: string

    @Column()
    ProductCategory: string

    @CreateDateColumn()
    CreatedAt: Date

    @UpdateDateColumn()
    UpdatedAt: Date

    static async modify(data: Record<string, any>) { };
};