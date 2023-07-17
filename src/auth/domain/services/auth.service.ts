import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from '../model/users.repository';
import { UserRegistrationRequest } from './user-registration.request';
import { UsernameIsTakenError } from '../model/errors/username-is-taken.error';
import { EmailIsTakenError } from '../model/errors/email-is-taken.error';
import { PasswordIsMissingError } from '../model/errors/password-is-missing.error';
import { UserSignInRequest } from './user-sign-in.request';
import { InvalidCredentialsError } from '../model/errors/invalid-credentials.error';
import { User } from '../model/users.entity';
import jwt from 'jsonwebtoken';
import { UserRegistrationResponse } from './user-registration.response';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: UsersRepository,
  ) {}

  async signIn(signInRequest: UserSignInRequest) {
    const user = await this.usersRepository.findByEmail(signInRequest.email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
      token: this.createTokenFor(user),
    };
  }

  async register(
    dto: UserRegistrationRequest,
  ): Promise<UserRegistrationResponse> {
    await this.validateUsername(dto.username);

    await this.validateEmail(dto.email);

    await this.validatePassword(dto.password);

    const user = await this.usersRepository.save(dto);

    return {
      user,
      token: this.createTokenFor(user),
    };
  }

  private createTokenFor(user: User) {
    return jwt.sign({ sub: user.username }, 'secret');
  }

  private async validatePassword(password: string) {
    if (!password) {
      throw new PasswordIsMissingError();
    }
  }

  private async validateEmail(email: string) {
    const userByEmail = await this.usersRepository.findByEmail(email);

    if (userByEmail) {
      throw new EmailIsTakenError();
    }
  }

  private async validateUsername(username: string) {
    const userByUsername = await this.usersRepository.findByUsername(username);

    if (userByUsername) {
      throw new UsernameIsTakenError();
    }
  }
}
