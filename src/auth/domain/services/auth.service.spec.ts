import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { InMemoryUsersRepository } from './in-memory-users.repository';
import { UsersRepository } from '../model/users.repository';
import { UsernameIsTakenError } from '../model/errors/username-is-taken.error';
import { EmailIsTakenError } from '../model/errors/email-is-taken.error';
import { PasswordIsMissingError } from '../model/errors/password-is-missing.error';
import { UserBuilder } from './user.builder';
import { InvalidCredentialsError } from '../model/errors/invalid-credentials.error';
import { isJWT } from 'class-validator';

describe('AuthService', () => {
  let service: AuthService;
  let usersRepository: UsersRepository;
  const user = UserBuilder.aUser().build();
  const signInRequest = {
    username: 'username',
    password: 'password',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: 'UsersRepository', useClass: InMemoryUsersRepository },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersRepository = module.get<UsersRepository>('UsersRepository');
  });

  it('should register a user', async () => {
    await service.register(user);

    await expect(
      usersRepository.findByUsername(user.username),
    ).resolves.toEqual(
      expect.objectContaining({
        username: user.username,
        email: user.email,
      }),
    );
  });

  it('should throw an error if the username is taken', async () => {
    await service.register(user);

    await expect(service.register(user)).rejects.toThrowError(
      UsernameIsTakenError,
    );
  });

  it('should throw an error if the email is taken', async () => {
    await service.register(user);

    await expect(
      service.register({
        ...user,
        username: 'Another Jacob',
      }),
    ).rejects.toThrowError(EmailIsTakenError);
  });

  it('should throw an error if the user does not provide a password', async () => {
    await expect(
      service.register({
        ...user,
        password: undefined,
      }),
    ).rejects.toThrowError(PasswordIsMissingError);
  });

  it('should return a token in user sign-in', async () => {
    await service.register(user);
    const response = await service.signIn(signInRequest);

    expect(response).toHaveProperty('token');
  });

  it('should throw an error if invalid credentials are provided', async () => {
    await expect(service.signIn(signInRequest)).rejects.toThrowError(
      InvalidCredentialsError,
    );
  });

  it('should return a token in user registration', async () => {
    const response = await service.register(user);

    expect(response).toHaveProperty('token');
  });

  it('should return a token with jwt format in user registration', async () => {
    const response = await service.register(user);
    expect(isJWT(response.token)).toBeTruthy();
  });
});
