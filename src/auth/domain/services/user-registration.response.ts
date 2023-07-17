import { User } from '../model/users.entity';

export interface UserRegistrationResponse {
  user: User;
  token: string;
}
