import { AuthService } from './auth.service';
import { InMemoryUsersRepository } from './in-memory-users.repository';
import { UsersRepository } from '../model/users.repository';
import { UsernameIsTakenError } from '../model/errors/username-is-taken.error';
import { EmailIsTakenError } from '../model/errors/email-is-taken.error';
import { PasswordIsMissingError } from '../model/errors/password-is-missing.error';
import { InvalidCredentialsError } from '../model/errors/invalid-credentials.error';
import { isJWT } from 'class-validator';

describe('AuthService', () => {
  const jwtConfig = { secret: 'secretKey' };
  let service: AuthService;
  let usersRepository: UsersRepository;
  const userRegistrationRequest = {
    username: 'username',
    email: 'test@email.com',
    password: 'password',
  };

  const signInRequest = {
    email: 'test@email.com',
    password: 'password',
  };

  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    service = new AuthService(usersRepository, jwtConfig);
  });

  it('should register a user', async () => {
    await service.register(userRegistrationRequest);

    await expect(
      usersRepository.findByUsername(userRegistrationRequest.username),
    ).resolves.toEqual(
      expect.objectContaining({
        username: userRegistrationRequest.username,
        email: userRegistrationRequest.email,
      }),
    );
  });

  it('should throw an error if the username is taken', async () => {
    await service.register(userRegistrationRequest);

    await expect(
      service.register(userRegistrationRequest),
    ).rejects.toThrowError(UsernameIsTakenError);
  });

  it('should throw an error if the email is taken', async () => {
    await service.register(userRegistrationRequest);

    await expect(
      service.register({
        email: userRegistrationRequest.email,
        password: 'password',
        username: 'Another Jacob',
      }),
    ).rejects.toThrowError(EmailIsTakenError);
  });

  it('should throw an error if the user does not provide a password', async () => {
    await expect(
      service.register({
        ...userRegistrationRequest,
        password: undefined,
      }),
    ).rejects.toThrowError(PasswordIsMissingError);
  });

  it('should return a token and a user in user sign-in', async () => {
    await service.register({
      ...userRegistrationRequest,
      username: 'username',
    });
    const response = await service.signIn(signInRequest);

    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('user');
  });

  it('should throw InvalidCredentialsError when trying to signIn with an unknown user', async () => {
    await expect(service.signIn(signInRequest)).rejects.toThrowError(
      InvalidCredentialsError,
    );
  });

  it('should throw InvalidCredentialsError when the password does not match', async () => {
    await service.register(userRegistrationRequest);
    await expect(
      service.signIn({
        ...signInRequest,
        password: 'wrong password',
      }),
    ).rejects.toThrowError(InvalidCredentialsError);
  });

  it('should return a token in user registration', async () => {
    const response = await service.register(userRegistrationRequest);

    expect(response).toHaveProperty('token');
  });

  it('should return a token with jwt format in user registration', async () => {
    const response = await service.register(userRegistrationRequest);
    expect(isJWT(response.token)).toBeTruthy();
  });

  it('should not store plain text password in the database', async () => {
    await service.register(userRegistrationRequest);
    const savedUser = await usersRepository.findByUsername(
      userRegistrationRequest.username,
    );

    expect(savedUser.password).not.toEqual(userRegistrationRequest.password);
  });
});
