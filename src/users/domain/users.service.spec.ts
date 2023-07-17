import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersInMemoryRepository } from '../users-in-memory.repository';
import { UsersRepository } from './users.repository';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: UsersRepository;

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
    const user = {
      username: 'Jacob',
      email: 'jake@jake.jake',
      password: 'jakejake',
    };

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

  it.todo('should throw an error if the username is taken');
  it.todo('should throw an error if the email is taken');
});
