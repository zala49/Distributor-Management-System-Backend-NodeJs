import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Table_Name } from "../Constant_Table";
import { BaseModel } from "../Basemodel/basemodel";
import { nameOf } from "../../helpers/helper";
import { MerchantEntity } from "./merchant.model";

@Entity(Table_Name.citys)
@Unique([nameOf<CityEntity>('State'), nameOf<CityEntity>('CityName'), nameOf<CityEntity>('CityArea'), nameOf<CityEntity>("CityId")])

export class CityEntity extends BaseModel {
    @PrimaryGeneratedColumn('uuid')
    CityId: string

    @Column()
    State: string

    @Column()
    CityArea: string

    @Column()
    CityName: string

    @CreateDateColumn()
    CreatedAt: Date

    @UpdateDateColumn()
    UpdatedAt: Date

    @OneToMany(() => MerchantEntity, (merchant) => merchant.city_details)
    @JoinColumn([
        {
            name: nameOf<CityEntity>('CityId'),
            referencedColumnName: nameOf<MerchantEntity>('CityId')
        }
    ])
    merchant_details: MerchantEntity

    static async modify(data: Record<string, any>) { };
};