import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../domain/auth.service';
import { UserRegistrationDto } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: AuthService) {}

  @Post()
  async register(@Body() dto: UserRegistrationDto) {
    const user = await this.usersService.register(dto.user);
    return { user };
  }
}
