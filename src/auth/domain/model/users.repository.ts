import { User } from './users.entity';

export interface UsersRepository {
  findByEmail(email: string): Promise<User>;
  save(user: User): Promise<User>;
  findByUsername(username: string): Promise<User | undefined>;
}
