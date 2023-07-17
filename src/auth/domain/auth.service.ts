import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserRegistrationRequest } from './user-registration.request';
import { UsernameIsTakenError } from './errors/username-is-taken.error';
import { EmailIsTakenError } from './errors/email-is-taken.error';
import { PasswordIsMissingError } from './errors/password-is-missing.error';
import { UserSignInRequest } from './user-sign-in.request';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: UsersRepository,
  ) {}

  async signIn(signInRequest: UserSignInRequest) {
    return {
      token: 'token',
    };
  }

  async register(dto: UserRegistrationRequest) {
    await this.validateUsername(dto.username);

    await this.validateEmail(dto.email);

    await this.validatePassword(dto.password);

    return this.usersRepository.save(dto);
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