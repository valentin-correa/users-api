import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { AuthGuard } from 'src/middlewares/auth.middleware';
import { Permissions } from 'src/middlewares/decorators/permissions.decorator';
import { permission } from 'process';
import { AssignPermissionsDto, CreateRoleDto } from './rolesDto';

@Controller('roles')
export class RolesController {

    constructor(private rolesService: RolesService) {}
    
      @UseGuards(AuthGuard)
      @Permissions(['create-role'])
      @Post()
      async createRole(@Body() role: CreateRoleDto) {
        return await this.rolesService.create(role)
      }

      @UseGuards(AuthGuard)
      @Permissions(['assign-permission'])
      @Put(':name/addPermissions') // Este método va a asignarle nuevos permisos al rol. Si quisiera modificar los que tiene, debería usar assignPermissions.
      async assignPermissions(@Param('name') name:string, @Body() permissions:AssignPermissionsDto){
        return this.rolesService.assignNewPermissions(name, permissions)
      }
}
