import { Module } from '@nestjs/common';
import { AuthService } from './domain/services/auth.service';
import { UsersController } from './application/users.controller';
import { TypeOrmUsersRepository } from './infrastructure/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User as UserEntity } from './infrastructure/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    AuthService,
    { provide: 'UsersRepository', useClass: TypeOrmUsersRepository },
  ],
})
export class AuthModule {}
