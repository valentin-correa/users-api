import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { AuthGuard } from 'src/middlewares/auth.middleware';
import { Permissions } from 'src/middlewares/decorators/permissions.decorator';

@Controller('roles')
export class RolesController {

    constructor(private rolesService: RolesService) {}
    
      @UseGuards(AuthGuard)
      @Permissions(['create-role'])
      @Post()
      async createRole(@Body() name: string) {
        return await this.rolesService.create(name)
      }
}
