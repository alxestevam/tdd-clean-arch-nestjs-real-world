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

export class UserRegistrationRequestDto {
  @Type(() => UserDto)
  @ValidateNested()
  user: UserDto;
}

export class UserRegistrationResponseDto {
  user: {
    username: string;
    email: string;
    token: string;
  };
}

export class UserCredentialsDto {
  @IsDefined()
  email: string;

  @IsDefined()
  password: string;
}

export class UserSignInRequestDto {
  @Type(() => UserCredentialsDto)
  @ValidateNested()
  user: UserCredentialsDto;
}
