import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './users.entity';
import { RegisterUserDto } from '../register-user.dto';
import { UsernameIsTakenError } from './errors/username-is-taken.error';
import { EmailIsTakenError } from './errors/email-is-taken.error';

@Injectable()
export class UsersService {
  @Inject('UsersRepository')
  private readonly usersRepository: UsersRepository;

  async register(dto: RegisterUserDto) {
    const user = await this.usersRepository.findByUsername(dto.username);

    if (user) {
      throw new UsernameIsTakenError();
    }

    const userWithEmail = await this.usersRepository.findByEmail(dto.email);

    if (userWithEmail) {
      throw new EmailIsTakenError();
    }

    return this.usersRepository.save(dto);
  }
}
