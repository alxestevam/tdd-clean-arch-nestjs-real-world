import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UserUpdateRequest } from '../domain/services/user-update.request';

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

export class UpdateUserDto implements UserUpdateRequest {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  bio?: string;
}
