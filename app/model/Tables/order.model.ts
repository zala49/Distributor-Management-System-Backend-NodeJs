import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Table_Name } from "../Constant_Table";
import { nameOf } from "../../helpers/helper";

@Entity(Table_Name.orders)
@Unique([nameOf<OrdersEntity>('ProductId'), nameOf<OrdersEntity>('SalesMen'), nameOf<OrdersEntity>('ProductQuantity')])
export class OrdersEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    OrderId: string

    @Column({type: 'uuid'})
    ProductId: string

    @Column()
    MerchantDetails: string

    @Column()
    SalesMen: string

    @Column()
    ProductName: string

    @Column()
    ProductCategory: string

    @Column()
    ProductQuantity: string

    @Column()
    OrderDate: Date

    @Column({default: 'Pending'})
    Status: string
    
    @CreateDateColumn()
    CreatedAt: Date

    @UpdateDateColumn()
    UpdatedAt: Date

    static async modify(data: Record<string, any>) { };
};