import { Module } from '@nestjs/common';
import { AuthService } from './domain/services/auth.service';
import { UsersController } from './application/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './infrastructure/data/user.schema';
import { UserController } from './application/user.controller';
import { JwtStrategy } from './application/jwt.strategy';
import { DefaultAuthGuard } from './application/auth.guard';
import constants from './infrastructure/config/constants';
import { UsersRepository } from './domain/model/users.repository';
import { UserService } from './domain/services/user.service';
import jwtConfig from './infrastructure/config/jwt';
import { TypeOrmUsersRepository } from './infrastructure/data/users.repository';

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
