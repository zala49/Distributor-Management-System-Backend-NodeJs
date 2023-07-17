import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Table_Name } from "../Constant_Table";
import { BaseModel } from "../Basemodel/basemodel";
import { nameOf } from "../../helpers/helper";
import { ProductCategoryEntity } from "./productCategory.model";

@Entity(Table_Name.products)
@Unique([nameOf<ProductEntity>('ProductId')])

export class ProductEntity extends BaseModel {
    @PrimaryGeneratedColumn('uuid')
    ProductId: string

    @Column()
    ProductName: string

    @CreateDateColumn()
    CreatedAt: Date

    @UpdateDateColumn()
    UpdatedAt: Date

    @OneToMany(() => ProductCategoryEntity, (product_category)=> product_category.product_details)
    @JoinColumn([
        {
            name: nameOf<ProductEntity>('ProductId'),
            referencedColumnName: nameOf<ProductCategoryEntity>('ProductId')
        }
    ])
    product_category: ProductCategoryEntity

    static async modify(data: Record<string, any>) { };
};