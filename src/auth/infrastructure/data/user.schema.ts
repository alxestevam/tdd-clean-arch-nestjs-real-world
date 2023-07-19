import { EntitySchema } from 'typeorm';
import { User } from '../../domain/model/users.entity';

export const UserSchema = new EntitySchema<User & { id: number }>({
  name: 'User',
  target: User,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
  },
});
