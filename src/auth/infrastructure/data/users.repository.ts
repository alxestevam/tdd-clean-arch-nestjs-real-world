import { Repository } from 'typeorm';
import { UserSchema as UserEntity } from './user.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '../../domain/model/users.repository';
import { User } from '../../domain/model/users.entity';

export class TypeOrmUsersRepository implements UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<User>,
  ) {}

  findByEmail(email: string): Promise<User> {
    return this.repo.findOneBy({
      email,
    });
  }

  findByUsername(username: string): Promise<User> {
    return this.repo.findOneBy({
      username,
    });
  }

  save(user: User): Promise<User> {
    return this.repo.save(user);
  }
}
