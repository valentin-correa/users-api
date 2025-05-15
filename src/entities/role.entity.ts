import { RoleI } from "src/interfaces/role.interface";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Index, Column, ManyToMany, JoinTable, OneToMany  } from "typeorm";
import { PermissionEntity } from "./permission.entity";
import { UserEntity } from "./user.entity";

@Entity('roles')
export class RoleEntity extends BaseEntity implements RoleI {
    @PrimaryGeneratedColumn()
    id: number;

    @Index({unique:true})
    @Column()
    name: string;

    @ManyToMany(() => PermissionEntity, permission => permission.roles)
    @JoinTable()
    permissions: PermissionEntity[];

    @OneToMany(() => UserEntity, user => user.role)
    users: UserEntity[]
}