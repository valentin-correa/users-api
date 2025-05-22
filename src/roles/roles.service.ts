import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/entities/role.entity';
import { PermissionsService } from 'src/permissions/permissions.service';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {

    constructor(@InjectRepository(RoleEntity) private roleRepository: Repository<RoleEntity>,
                private readonly permissionsService: PermissionsService
            ) {}

    hasPermission(role:RoleEntity, permission:string){
        return role.permissions.some(p => p.name === permission)
    }
    async create(name:string):Promise<RoleEntity>{
            return await this.roleRepository.save({name});
    }
}
