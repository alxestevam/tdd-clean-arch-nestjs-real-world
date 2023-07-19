import { Module } from '@nestjs/common';
import { AuthService } from './domain/services/auth.service';
import { UsersController } from './application/users.controller';
import { TypeOrmUsersRepository } from './infrastructure/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './infrastructure/user.schema';
import { UserController } from './application/user.controller';
import { JwtStrategy } from './application/jwt.strategy';
import { DefaultAuthGuard } from './application/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  controllers: [UsersController, UserController],
  providers: [
    AuthService,
    { provide: 'UsersRepository', useClass: TypeOrmUsersRepository },
    JwtStrategy,
    DefaultAuthGuard,
  ],
})
export class AuthModule {}
