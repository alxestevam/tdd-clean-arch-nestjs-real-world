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

    if (!user.passwordMatches(signInRequest.password)) {
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
    await this.validatePassword(dto.password);

    const user = this.userFrom(dto);

    await this.validateUsername(dto.username);

    await this.validateEmail(dto.email);

    const saved = await this.usersRepository.save(user);

    return {
      user: saved,
      token: this.createTokenFor(user),
    };
  }

  private userFrom(dto: UserRegistrationRequest) {
    const user = new User();
    user.username = dto.username;
    user.email = dto.email;
    user.setPassword(dto.password);
    return user;
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
