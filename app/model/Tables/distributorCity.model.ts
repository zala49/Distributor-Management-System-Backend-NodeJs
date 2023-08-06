import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Table_Name } from "../Constant_Table";
import { BaseModel } from "../Basemodel/basemodel";
import { nameOf } from "../../helpers/helper";
import { DistributorEntity } from "./distributor.model";

@Entity(Table_Name.distributor_city)
@Unique([nameOf<DistributorCityEntity>('DistributorId'), nameOf<DistributorCityEntity>('DistributorCityName'), nameOf<DistributorCityEntity>('DistributorCityId')])

export class DistributorCityEntity extends BaseModel {
    @PrimaryGeneratedColumn('uuid')
    DCityPrimary: string

    @Column('uuid')
    DistributorCityId: string

    @Column('uuid')
    DistributorId: string

    @Column()
    DistributorCityName: string

    @CreateDateColumn()
    CreatedAt: Date

    @UpdateDateColumn()
    UpdatedAt: Date

    @ManyToOne( () => DistributorEntity)
    @JoinColumn([
        {
            name: nameOf<DistributorCityEntity>('DistributorId'),
            referencedColumnName: nameOf<DistributorEntity>('DistributorId')
        }
    ])
    dis_details: DistributorEntity

    static async modify(data: Record<string, any>) { };
};