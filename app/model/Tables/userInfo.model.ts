import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Table_Name } from "../Constant_Table";

@Entity(Table_Name.users_info)
export class UserInfoEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    UserId: string

    @Column()
    Name: string

    @Column({nullable: true})
    Email: string

    @Column({ nullable: true })
    Picture: string

    @Column({
        nullable: true
    })
    Role: string

    @Column()
    Password: string

    @CreateDateColumn()
    CreatedAt: Date

    @UpdateDateColumn()
    UpdatedAt: Date

    static async modify(data: Record<string, any>) { };
};