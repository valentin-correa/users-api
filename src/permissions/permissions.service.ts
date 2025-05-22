import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionEntity } from 'src/entities/permission.entity';
import { Repository, In } from 'typeorm';

@Injectable()
export class PermissionsService {

    constructor(@InjectRepository(PermissionEntity) private repository: Repository<PermissionEntity>,
                ) {}
    async findPermissionsByNames(permissionNames: string[]): Promise<PermissionEntity[]> {
        return await this.repository.find({ where: { name: In(permissionNames), },
    });
}
}