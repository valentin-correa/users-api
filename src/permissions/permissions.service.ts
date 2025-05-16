import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionEntity } from 'src/entities/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionsService {

    constructor(@InjectRepository(PermissionEntity) private roleRepository: Repository<PermissionEntity>,
                ) {}

}
