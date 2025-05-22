import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { AuthGuard } from 'src/middlewares/auth.middleware';
import { Permissions } from 'src/middlewares/decorators/permissions.decorator'; 
@Controller('permissions')
export class PermissionsController {
constructor(private permissionService: PermissionsService) {}

  @UseGuards(AuthGuard)
  @Permissions(['create-permission'])
  @Post()
  async createPermission(@Body() name: string) {
    return await this.permissionService.create(name)
  }


}
