import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersInMemoryRepository } from '../users-in-memory.repository';
import { UsersRepository } from './users.repository';
import { RegisterUserDto } from '../register-user.dto';
import { UsernameIsTakenError } from './errors/username-is-taken.error';
import { EmailIsTakenError } from './errors/email-is-taken.error';
import { PasswordIsMissingError } from './errors/password-is-missing.error';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: UsersRepository;
  const user: RegisterUserDto = {
    username: 'Jacob',
    email: 'jake@jake.jake',
    password: 'jakejake',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: 'UsersRepository', useClass: UsersInMemoryRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<UsersRepository>('UsersRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
});
