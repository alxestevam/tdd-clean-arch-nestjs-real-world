import { Repository } from 'typeorm';
import { User as UserEntity } from './user.entity';
import { UsersRepository } from '../domain/model/users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../domain/model/users.entity';

export class TypeOrmUsersRepository implements UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
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