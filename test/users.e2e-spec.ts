import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { configure } from '../src/config/bootstrap';
import { AuthModule } from '../src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          database: ':memory:',
          dropSchema: true,
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    configure(app);
    await app.init();
  });

  it('POST /api/users', () => {
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
});
