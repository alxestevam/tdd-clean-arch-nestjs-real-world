import { Module } from '@nestjs/common';
import { AuthService } from './domain/services/auth.service';
import { UsersController } from './application/users.controller';
import { InMemoryUsersRepository } from './infrastructure/in-memory-users.repository';

@Module({
  controllers: [UsersController],
  providers: [
    AuthService,
    { provide: 'UsersRepository', useClass: InMemoryUsersRepository },
  ],
})
export class AuthModule {}
