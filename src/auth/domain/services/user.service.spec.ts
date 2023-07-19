import { TestingModule, Test } from '@nestjs/testing';
import { UsersRepository } from '../model/users.repository';
import { AuthService } from './auth.service';
import { InMemoryUsersRepository } from './in-memory-users.repository';
import constants from '../constants';
import { UserService } from './user.service';
import { UserUpdateRequest } from './user-update.request';

describe('UserService', () => {
  let service: UserService;
  let authService: AuthService;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService,
        {
          provide: constants.UsersRepository,
          useClass: InMemoryUsersRepository,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    service = module.get<UserService>(UserService);
    usersRepository = module.get<UsersRepository>(constants.UsersRepository);
  });

  it.each([
    {
      email: 'newEmail',
      username: 'newUsername',
      password: 'newPassword',
      image: 'newImage',
      bio: 'newBio',
    },
    {
      email: 'newEmail',
    },
    {
      username: 'newUsername',
    },
    {
      password: 'newPassword',
    },
    {
      image: 'newImage',
    },
    {
      bio: 'newBio',
    },
  ])('should update a user', async (dto: UserUpdateRequest) => {
    const user = await authService.register({
      username: 'username',
      email: 'email',
      password: 'password',
    });

    await service.update(user.user.username, dto);

    const updatedUser = await usersRepository.findByUsername(
      user.user.username,
    );

    expect(updatedUser).toEqual(expect.objectContaining(dto));
  });
});
