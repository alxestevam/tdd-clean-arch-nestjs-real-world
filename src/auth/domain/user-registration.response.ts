import { User } from './users.entity';

export interface UserRegistrationResponse {
  user: User;
  token: string;
}
