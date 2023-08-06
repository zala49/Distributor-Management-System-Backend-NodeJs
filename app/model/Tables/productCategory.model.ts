import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Table_Name } from "../Constant_Table";
import { BaseModel } from "../Basemodel/basemodel";
import { nameOf } from "../../helpers/helper";
import { ProductEntity } from "./product.model";

@Entity(Table_Name.products_Categorys)
@Unique([nameOf<ProductCategoryEntity>('ProductId'), nameOf<ProductCategoryEntity>('ProductCategory')])

export class ProductCategoryEntity extends BaseModel {
    @PrimaryGeneratedColumn('uuid')
    ProductCategoryId: string

    @Column('uuid')
    ProductId: string

    @Column()
    ProductCategory: string

    @CreateDateColumn()
    CreatedAt: Date

    @UpdateDateColumn()
    UpdatedAt: Date

    @ManyToOne( () => ProductEntity)
    @JoinColumn([
        {
            name: nameOf<ProductCategoryEntity>('ProductId'),
            referencedColumnName: nameOf<ProductEntity>('ProductId')
        }
    ])
    product_details: ProductEntity

    static async modify(data: Record<string, any>) { };
};