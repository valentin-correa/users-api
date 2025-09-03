import { RoleEntity } from "src/entities/role.entity";

export interface UserI {
  firstname : string;
  lastname: string;
  email: string;
  password: string;
  role: RoleEntity;
}
