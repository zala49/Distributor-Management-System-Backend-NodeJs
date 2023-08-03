import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Table_Name } from "../Constant_Table";
import { BaseModel } from "../Basemodel/basemodel";
import { nameOf } from "../../helpers/helper";
import { CityEntity } from "./city.model";
import { MerchantEntity } from "./merchant.model";
import { DistributorCityEntity } from "./distributorCity.model";

@Entity(Table_Name.distributor)
@Unique([nameOf<DistributorEntity>('DistributorId')])

export class DistributorEntity extends BaseModel {
    @PrimaryGeneratedColumn('uuid')
    DistributorId: string

    // @Column({type: 'uuid'})
    // CityId: string

    @Column()
    DistributorName: string

    @Column({nullable: true})
    DistributorEmail: string

    @Column({nullable: true})
    DistributorTelNo: string

    @Column({nullable: true})
    DistributorAddress: string

    @Column({nullable: true})
    FirmName: string

    @Column({nullable: true})
    IFSCCode: string

    @Column({ nullable: true})
    BankName: string

    @Column({nullable: true})
    ChequeNumber1: string

    @Column({nullable: true})
    ChequeNumber2: string
    
    @CreateDateColumn()
    CreatedAt: Date

    @UpdateDateColumn()
    UpdatedAt: Date

    @OneToMany(() => DistributorCityEntity, (dis_city)=> dis_city.dis_details)
    @JoinColumn([
        {
            name: nameOf<DistributorEntity>('DistributorId'),
            referencedColumnName: nameOf<DistributorCityEntity>('DistributorId')
        }
    ])
    dist_details: DistributorCityEntity
    
    static async modify(data: Record<string, any>) { };
};