import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './users.entity';
import { RegisterUserDto } from '../register-user.dto';
import { UsernameIsTakenError } from './username-is-taken.error';

@Injectable()
export class UsersService {
  @Inject('UsersRepository')
  private readonly usersRepository: UsersRepository;

  async register(dto: RegisterUserDto) {
    const user = await this.usersRepository.findByUsername(dto.username);

    if (user) {
      throw new UsernameIsTakenError();
    }

    return this.usersRepository.save(dto);
  }
}
