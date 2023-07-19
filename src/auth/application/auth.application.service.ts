import { Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../domain/services/auth.service';
import { UsersRepository } from '../domain/model/users.repository';
import constants from '../constants';

@Injectable()
export class AuthApplicationService extends AuthService {
  constructor(
    @Inject(constants.UsersRepository)
    usersRepository: UsersRepository,
  ) {
    super(usersRepository);
  }
}
