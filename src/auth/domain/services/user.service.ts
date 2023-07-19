import { Inject, Injectable } from '@nestjs/common';
import { UserUpdateRequest } from './user-update.request';
import { UsersRepository } from '../model/users.repository';
import constants from '../constants';

@Injectable()
export class UserService {
  constructor(
    @Inject(constants.UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async update(username: string, dto: UserUpdateRequest) {
    const user = await this.usersRepository.findByUsername(username);
    user.email = dto.email || user.email;
    user.username = dto.username || user.username;
    user.password = dto.password || user.password;
    user.image = dto.image || user.image;
    user.bio = dto.bio || user.bio;
    await this.usersRepository.save(user);
  }
}
