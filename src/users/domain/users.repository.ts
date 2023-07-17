import { User } from './users.entity';

export interface UsersRepository {
  save(user: User): Promise<User>;
  findByUsername(username: string): Promise<User | undefined>;
}
