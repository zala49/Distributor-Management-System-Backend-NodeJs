import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Table_Name } from "../Constant_Table";
import { BaseModel } from "../Basemodel/basemodel";
import { nameOf } from "../../helpers/helper";
import { CityEntity } from "./city.model";
import { MerchantEntity } from "./merchant.model";

@Entity(Table_Name.distributor)
@Unique([nameOf<DistributorEntity>('CityId'), nameOf<DistributorEntity>('DistributorId')])

export class DistributorEntity extends BaseModel {
    @PrimaryGeneratedColumn('uuid')
    DistributorId: string

    @Column({type: 'uuid'})
    CityId: string

    @Column()
    DistributorName: string

    @Column({nullable: true})
    DistributorEmail: string

    @Column({nullable: true})
    DistributorTelNo: string

    @Column({nullable: true})
    DistributorAddress: string

    @Column({nullable: true})
    DistributorCity: string

    @CreateDateColumn()
    CreatedAt: Date

    @UpdateDateColumn()
    UpdatedAt: Date

    @ManyToOne( () => CityEntity)
    @JoinColumn([
        {
            name: nameOf<DistributorEntity>('CityId'),
            referencedColumnName: nameOf<CityEntity>('CityId')
        }
    ])
    city_details: CityEntity

    @OneToMany(() => MerchantEntity, (merchant)=> merchant.distributor_details)
    @JoinColumn([
        {
            name: nameOf<DistributorEntity>('DistributorId'),
            referencedColumnName: nameOf<MerchantEntity>('DistributorId')
        },
        {
            name: nameOf<DistributorEntity>('CityId'),
            referencedColumnName: nameOf<MerchantEntity>('CityId')
        }
    ])
    merchant_details: MerchantEntity
    
    static async modify(data: Record<string, any>) { };
};