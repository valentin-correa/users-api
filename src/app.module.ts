import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities';
import { AuthGuard } from './middlewares/auth.middleware';
import { JwtService } from './jwt/jwt.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { RolesController } from './roles/roles.controller';
import { PermissionsController } from './permissions/permissions.controller';
import { PermissionsService } from './permissions/permissions.service';
import { RolesService } from './roles/roles.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      database: 'db.sql',
      entities,
      type: 'sqlite',
      synchronize: true,
    }),
    TypeOrmModule.forFeature(entities),
  ],
  controllers: [AppController,UsersController, RolesController, PermissionsController],
  providers: [AuthGuard, JwtService, UsersService, PermissionsService, RolesService],
})
export class AppModule {}
