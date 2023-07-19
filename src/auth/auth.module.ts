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
import { UsersRepository } from './domain/model/users.repository';
import { UserService } from './domain/services/user.service';
import jwtConfig from '../config/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  controllers: [UsersController, UserController],
  providers: [
    JwtStrategy,
    DefaultAuthGuard,
    {
      provide: constants.UsersRepository,
      useClass: TypeOrmUsersRepository,
    },
    {
      provide: constants.AuthService,
      useFactory: (usersRepository: UsersRepository) =>
        new AuthService(usersRepository, jwtConfig),
      inject: [constants.UsersRepository],
    },
    {
      provide: constants.UserService,
      useFactory: (usersRepository: UsersRepository) =>
        new UserService(usersRepository),
      inject: [constants.UsersRepository],
    },
  ],
})
export class AuthModule {}
