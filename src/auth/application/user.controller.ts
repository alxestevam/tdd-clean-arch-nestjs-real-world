import {
  Body,
  Controller,
  Get,
  Inject,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { User } from '../domain/model/users.entity';
import { UserDto } from './users.dto';
import { UsersRepository } from '../domain/model/users.repository';
import { AuthenticatedUser, CurrentUser } from './user.decorator';
import { DefaultAuthGuard } from './auth.guard';
import Express from 'express';
import { ExtractJwt } from 'passport-jwt';
import constants from '../domain/constants';
import { UserService } from '../domain/services/user.service';
import { UserUpdateRequest } from '../domain/services/user-update.request';

@Controller('user')
export class UserController {
  constructor(
    @Inject(constants.UsersRepository)
    private readonly usersRepository: UsersRepository,
    private readonly userService: UserService,
  ) {}

  @Get()
  @UseGuards(DefaultAuthGuard)
  async getCurrentUser(
    @CurrentUser()
    authenticatedUser: AuthenticatedUser,
    @Request() req: Express.Request,
  ): Promise<UserDto> {
    const token = ExtractJwt.fromAuthHeaderWithScheme('Token')(req);
    const user = await this.usersRepository.findByUsername(
      authenticatedUser.sub,
    );
    return this.mapFrom(user, token);
  }

  @Put()
  @UseGuards(DefaultAuthGuard)
  async updateCurrentUser(
    @CurrentUser()
    authenticatedUser: AuthenticatedUser,
    @Body() dto: UserUpdateRequest,
  ) {
    await this.userService.update(authenticatedUser.sub, dto);
  }

  private mapFrom(user: User, token: string): UserDto {
    return {
      email: user.email,
      username: user.username,
      token,
    };
  }
}
