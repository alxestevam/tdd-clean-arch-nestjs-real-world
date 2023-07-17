import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersInMemoryRepository } from '../users-in-memory.repository';
import { UsersRepository } from './users.repository';
import { async } from 'rxjs';
import { RegisterUserDto } from '../register-user.dto';
import { UsernameIsTakenError } from './username-is-taken.error';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: UsersRepository;
  let user: RegisterUserDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: 'UsersRepository', useClass: UsersInMemoryRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<UsersRepository>('UsersRepository');

    user = {
      username: 'Jacob',
      email: 'jake@jake.jake',
      password: 'jakejake',
    };
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

  it.todo('should throw an error if the email is taken');
});
