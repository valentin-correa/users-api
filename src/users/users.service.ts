import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDTO } from 'src/interfaces/login.dto';
import { RegisterDTO } from 'src/interfaces/register.dto';
import { UserEntity } from '../entities/user.entity';
import { hashSync, compareSync } from 'bcrypt';
import { JwtService } from 'src/jwt/jwt.service';
import * as dayjs from 'dayjs';
import { RolesService } from 'src/roles/roles.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssignRoleDto } from './user.Dto';
import { retry } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(private jwtService: JwtService,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    private readonly rolesService: RolesService
  ) { }
  async refreshToken(refreshToken: string) {
    return this.jwtService.refreshToken(refreshToken);
  }
  canDo(user: UserEntity, permission: string): boolean {
    if (!this.rolesService.hasPermission(user.role, permission)) {
      throw new UnauthorizedException();
    }
    return true;
  }

  async register(body: RegisterDTO) {
    try {
      const user = new UserEntity();
      Object.assign(user, body);
      user.password = hashSync(user.password, 10);
      await this.userRepository.save(user);
      await this.assignRole(user.id, { roleName: 'user' }) //Por defecto se le pone el rol de usuario
      return { status: 'created' };
    } catch (error) {
      throw new HttpException('User creation failed', 500);
    }
  }

  async login(body: LoginDTO) {
    const user = await this.findByEmail(body.email);
    if (user == null) {
      throw new UnauthorizedException();
    }
    const compareResult = compareSync(body.password, user.password);
    if (!compareResult) {
      throw new UnauthorizedException();
    }
    return {
      accessToken: this.jwtService.generateToken({ email: user.email }, 'auth'),
      refreshToken: this.jwtService.generateToken(
        { email: user.email },
        'refresh',
      )
    };
  }
  async findByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ email });
  }

  async assignRole(id: number, assignRoleDto: AssignRoleDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    const role = await this.rolesService.findRoleByName(assignRoleDto.roleName);
    user.role = role;
    return await this.userRepository.save(user)
  }
}
