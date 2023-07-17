import { User } from './domain/users.entity';

export class UsersInMemoryRepository {
  users: Record<string, User> = {};

  async save(user: User) {
    this.users[user.username] = user;
    return user;
  }

  async findByUsername(username: string) {
    return this.users[username];
  }
}
