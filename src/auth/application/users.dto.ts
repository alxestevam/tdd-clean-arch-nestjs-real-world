import { Type } from 'class-transformer';
import { IsDefined, IsEmail, ValidateNested } from 'class-validator';

class UserRegistrationDto {
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
  user: UserRegistrationDto;
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

export class UserDto {
  email: string;
  username: string;
  token: string;
}

export interface AuthenticatedUser {
  username: string;
  token: string;
}
