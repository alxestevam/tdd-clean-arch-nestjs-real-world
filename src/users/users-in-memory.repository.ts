import { User } from './domain/users.entity';
import { UsersRepository } from './domain/users.repository';

export class UsersInMemoryRepository implements UsersRepository {
  usernameToUser: Record<string, User> = {};
  emailToUser: Record<string, User> = {};

  async save(user: User) {
    this.usernameToUser[user.username] = user;
    this.emailToUser[user.email] = user;
    return user;
  }

  async findByUsername(username: string) {
    return this.usernameToUser[username];
  }

  async findByEmail(email: string): Promise<User> {
    return this.emailToUser[email];
  }
}
