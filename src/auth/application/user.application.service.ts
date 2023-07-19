import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '../domain/services/user.service';
import { UsersRepository } from '../domain/model/users.repository';
import constants from '../constants';

@Injectable()
export class UserApplicationService extends UserService {
  constructor(
    @Inject(constants.UsersRepository)
    usersRepository: UsersRepository,
  ) {
    super(usersRepository);
  }
}
