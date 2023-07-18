import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { UserRegistrationRequest } from '../auth/domain/services/user-registration.request';

export const register =
  (app: INestApplication) => async (req: UserRegistrationRequest) => {
    const body: UserRegistrationRequest = {
      email: req.email,
      username: req.username,
      password: req.password,
    };

    return request(app.getHttpServer())
      .post('/api/users')
      .send({ user: body })
      .expect(201);
  };
