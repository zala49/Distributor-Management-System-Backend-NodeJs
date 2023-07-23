import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Table_Name } from "../Constant_Table";
import { BaseModel } from "../Basemodel/basemodel";
import { nameOf } from "../../helpers/helper";
import { DistributorEntity } from "./distributor.model";

@Entity(Table_Name.merchant)
@Unique([nameOf<MerchantEntity>('CityId'), nameOf<MerchantEntity>('DistributorId'), nameOf<MerchantEntity>('MerchantName')])

export class MerchantEntity extends BaseModel {
    @PrimaryGeneratedColumn('uuid')
    MerchantId: string

    @Column({type: 'uuid'})
    DistributorId: string

    @Column({type: 'uuid'})
    CityId: string

    @Column()
    MerchantName: string

    @Column({nullable: true})
    MerchantGSTNumber: string

    @Column({nullable: true})
    MerchantEmail: string

    @Column({nullable: true})
    MerchantTelNo: string

    @Column({nullable: true})
    MerchantAddress: string

    @Column({nullable: true})
    MerchantCity: string

    @CreateDateColumn()
    CreatedAt: Date

    @UpdateDateColumn()
    UpdatedAt: Date

    @ManyToOne( () => DistributorEntity)
    @JoinColumn([
        {
            name: nameOf<MerchantEntity>('DistributorId'),
            referencedColumnName: nameOf<DistributorEntity>('DistributorId')
        },
        {
            name: nameOf<MerchantEntity>('CityId'),
            referencedColumnName: nameOf<DistributorEntity>('CityId')
        }
    ])
    distributor_details: DistributorEntity

    static async modify(data: Record<string, any>) { };
};