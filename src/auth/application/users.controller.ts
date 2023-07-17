import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../domain/auth.service';
import {
  UserRegistrationRequestDto,
  UserRegistrationResponseDto,
} from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: AuthService) {}

  @Post()
  async register(
    @Body() dto: UserRegistrationRequestDto,
  ): Promise<UserRegistrationResponseDto> {
    const { user, token } = await this.usersService.register(dto.user);
    return {
      user: {
        email: user.email,
        username: user.username,
        token: token,
      },
    };
  }
}
