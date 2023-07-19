import { Controller, Get, Inject, Request, UseGuards } from '@nestjs/common';
import { User } from '../domain/model/users.entity';
import { UserDto } from './users.dto';
import { UsersRepository } from '../domain/model/users.repository';
import { AuthenticatedUser, CurrentUser } from './user.decorator';
import { DefaultAuthGuard } from './auth.guard';
import Express from 'express';
import { ExtractJwt } from 'passport-jwt';

@Controller('user')
export class UserController {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: UsersRepository,
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
    return this.mapUserFrom(user, token);
  }

  private mapUserFrom(user: User, token: string): UserDto {
    return {
      email: user.email,
      username: user.username,
      token,
    };
  }
}
