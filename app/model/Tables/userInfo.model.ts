import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Table_Name } from "../Constant_Table";

@Entity(Table_Name.users_info)
export class UserInfoEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    UserId: string

    @Column({
        unique: true
    })
    Auth0UserId: string

    @Column()
    Name: string

    @Column()
    Email: string

    @Column()
    EmailVerified: boolean

    @Column()
    Nickname: string

    @Column()
    Picture: string

    @Column({
        nullable: true
    })
    Role: string

    @Column({
        nullable: true
    })
    Auth0RoleId: string

    @CreateDateColumn()
    CreatedAt: Date

    @UpdateDateColumn()
    UpdatedAt: Date

    static async modify(data: Record<string, any>) { };
};