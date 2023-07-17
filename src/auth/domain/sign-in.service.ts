import { Inject } from '@nestjs/common';
import { InvalidCredentialsError } from './errors/invalid-credentials.error';
import { UserSignInRequest } from './user-sign-in.request';
import { UsersRepository } from './users.repository';

export class SignInService {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: UsersRepository,
  ) {}

  async signIn(signInRequest: UserSignInRequest) {
    const user = await this.usersRepository.findByUsername(
      signInRequest.username,
    );

    if (!user) {
      throw new InvalidCredentialsError();
    }

    return {
      token: 'token',
    };
  }
}
