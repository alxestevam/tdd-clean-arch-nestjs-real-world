import { UsersRepository } from '../model/users.repository';
import { AuthService } from './auth.service';
import { InMemoryUsersRepository } from './in-memory-users.repository';
import { UserService } from './user.service';
import { UserUpdateRequest } from './user-update.request';

describe('UserService', () => {
  let service: UserService;
  let authService: AuthService;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    service = new UserService(usersRepository);
    authService = new AuthService(usersRepository);
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
