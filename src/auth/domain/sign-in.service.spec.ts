import { TestingModule, Test } from '@nestjs/testing';
import { InMemoryUsersRepository } from '../infrastructure/in-memory-users.repository';
import { AuthService } from './auth.service';
import { InvalidCredentialsError } from './errors/invalid-credentials.error';
import { SignInService } from './sign-in.service';
import { UserBuilder } from './tests/user.builder';

describe('SignInService', () => {
  let sut: SignInService;
  let authService: AuthService;

  const user = UserBuilder.aUser().build();

  const signInRequest = {
    username: 'username',
    password: 'password',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        SignInService,
        { provide: 'UsersRepository', useClass: InMemoryUsersRepository },
      ],
    }).compile();

    sut = module.get(SignInService);
    authService = module.get(AuthService);
  });

  it('should return a token in user sign-in', async () => {
    await authService.register(user);
    const response = await sut.signIn(signInRequest);

    expect(response).toHaveProperty('token');
  });

  it('should throw an error if invalid credentials are provided', async () => {
    await expect(sut.signIn(signInRequest)).rejects.toThrowError(
      InvalidCredentialsError,
    );
  });
});
