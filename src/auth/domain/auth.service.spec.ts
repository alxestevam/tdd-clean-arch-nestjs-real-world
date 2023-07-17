import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { InMemoryUsersRepository } from '../infrastructure/in-memory-users.repository';
import { UsersRepository } from './users.repository';
import { UserRegistrationRequest } from './user-registration.request';
import { UsernameIsTakenError } from './errors/username-is-taken.error';
import { EmailIsTakenError } from './errors/email-is-taken.error';
import { PasswordIsMissingError } from './errors/password-is-missing.error';

describe('AuthService', () => {
  let service: AuthService;
  let usersRepository: UsersRepository;
  const user: UserRegistrationRequest = {
    username: 'Jacob',
    email: 'jake@jake.jake',
    password: 'jakejake',
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
    const signInRequest = {
      username: 'Jacob',
      password: 'jakejake',
    };

    const user = await service.signIn(signInRequest);

    expect(user).toHaveProperty('token');
  });
});
