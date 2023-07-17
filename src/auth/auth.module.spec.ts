import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { configure } from '../config/bootstrap';
import { AuthModule } from './auth.module';
import { UserBuilder } from './domain/services/user.builder';
import { register } from '../test/register';
import { TypeormSqliteModule } from '../test/typeorm-sqlite.module';

describe('UsersController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, TypeormSqliteModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    configure(app);
    await app.init();
  });

  test('POST /api/users', () => {
    const body = {
      user: {
        username: 'Jacob',
        email: 'jake@jake.jake',
        password: 'jakejake',
      },
    };

    return request(app.getHttpServer())
      .post('/api/users')
      .send(body)
      .expect(201)
      .expect((res) => {
        const response = {
          user: {
            email: 'jake@jake.jake',
            token: expect.any(String),
            username: 'Jacob',
          },
        };
        expect(res.body.user).toEqual(expect.objectContaining(response.user));
      });
  });

  test('POST /api/users/login', async () => {
    const user = UserBuilder.aUser().build();
    await register(app)(user);

    const body = {
      user: {
        email: user.email,
        password: user.password,
      },
    };

    return request(app.getHttpServer())
      .post('/api/users/login')
      .send(body)
      .expect(201)
      .expect((res) => {
        const response = {
          user: {
            email: body.user.email,
            token: expect.any(String),
          },
        };
        expect(res.body.user).toEqual(expect.objectContaining(response.user));
      });
  });
});
