import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { UserRegistrationRequest } from '../auth/domain/services/user-registration.request';
import { User } from '../auth/domain/model/users.entity';

export const register = (app: INestApplication) => async (user: User) => {
  const body: UserRegistrationRequest = {
    email: user.email,
    username: user.username,
    password: user.password,
  };

  return request(app.getHttpServer())
    .post('/api/users')
    .send({ user: body })
    .expect(201);
};
