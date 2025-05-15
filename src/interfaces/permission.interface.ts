import { RoleEntity } from "src/entities/role.entity";

export interface PermissionsI {
    name: string;
    roles: RoleEntity[]
}