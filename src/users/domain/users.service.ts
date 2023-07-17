import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  @Inject('UsersRepository')
  private readonly usersRepository: UsersRepository;

  async register(user: User) {
    return this.usersRepository.save(user);
  }
}
