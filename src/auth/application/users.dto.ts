import { Type } from 'class-transformer';
import { IsDefined, IsEmail, ValidateNested } from 'class-validator';

class UserDto {
  @IsDefined()
  username: string;

  @IsEmail()
  email: string;

  @IsDefined()
  password: string;
}

export class UserRegistrationDto {
  @Type(() => UserDto)
  @ValidateNested()
  user: UserDto;
}
