import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../domain/auth.service';
import {
  UserRegistrationRequestDto,
  UserRegistrationResponseDto,
} from './users.dto';
import { UserRegistrationResponse } from '../domain/user-registration.response';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: AuthService) {}

  @Post()
  async register(
    @Body() dto: UserRegistrationRequestDto,
  ): Promise<UserRegistrationResponseDto> {
    const response = await this.usersService.register(dto.user);
    return this.mapFrom(response);
  }

  private mapFrom(
    response: UserRegistrationResponse,
  ): UserRegistrationResponseDto | PromiseLike<UserRegistrationResponseDto> {
    return {
      user: {
        email: response.user.email,
        username: response.user.username,
        token: response.token,
      },
    };
  }
}
