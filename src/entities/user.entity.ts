import { UserI } from '../interfaces/user.interface';
import { BaseEntity, Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity('users')
export class UserEntity extends BaseEntity implements UserI {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Index({unique:true})
  @Column()
  email: string;

  @Column()
  password: string;
  
  @ManyToOne(() => RoleEntity, role => role.users)
  role: RoleEntity;
}
