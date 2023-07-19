import { Module } from '@nestjs/common';
import { AuthService } from './domain/services/auth.service';
import { UsersController } from './application/users.controller';
import { TypeOrmUsersRepository } from './infrastructure/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './infrastructure/user.schema';
import { UserController } from './application/user.controller';
import { JwtStrategy } from './application/jwt.strategy';
import { DefaultAuthGuard } from './application/auth.guard';
import constants from './constants';
import { UserApplicationService } from './application/user.application.service';
import { AuthApplicationService } from './application/auth.application.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  controllers: [UsersController, UserController],
  providers: [
    JwtStrategy,
    DefaultAuthGuard,
    { provide: constants.AuthService, useClass: AuthApplicationService },
    { provide: constants.UsersRepository, useClass: TypeOrmUsersRepository },
    { provide: constants.UserService, useClass: UserApplicationService },
  ],
})
export class AuthModule {}
