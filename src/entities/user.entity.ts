import { BaseEntity, Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({unique:true})
  @Column()
  email: string;

  @Column()
  password: string;
  
  @ManyToOne(() => RoleEntity, role => role.users,{ eager: true })
  role: RoleEntity;
}
