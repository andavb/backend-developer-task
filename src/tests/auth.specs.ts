require('dotenv').config();
import app from '../app';
import { Connection, createConnection } from 'typeorm';
import { Config } from '../config/config';

const request = require('supertest');

describe('Authentication', () => {
  let conn: Connection;
  beforeAll(async () => {
    conn = await createConnection(Config.DatabaseORM());
    await conn.runMigrations();
  });

  afterAll(() => {
    conn.close();
  });

  let access_token: string;
  let user = {
    username: 'admin',
    password: 'admin',
  };
  let refresh_token: string;

  /**
   * Login & Logout
   */
  describe('1. User login & logout', () => {
    test('should login user', async () => {
      const res = await request(app).post('/auth/login').send({
        username: user.username,
        password: user.password,
      });

      access_token = res.body.data.access_token;
      refresh_token = res.body.data.refresh_token;

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('isSuccess');
      expect(res.body).toHaveProperty('data');
    });

    test('should fail with wrong username', async () => {
      const res = await request(app).post('/auth/login').send({
        username: 'User',
        password: user.password,
      });

      expect(res.statusCode).toEqual(422);
    });

    test('should fail with wrong password', async () => {
      const res = await request(app).post('/auth/login').send({
        username: user.username,
        password: 'nekineki',
      });

      expect(res.statusCode).toEqual(422);
    });

    test('should logout user', async () => {
      const res = await request(app).post('/auth/logout').send({
        credentials: {
          refresh_token,
        },
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('isSuccess');
      expect(res.body).toHaveProperty('data');
    });

    test('should fail logging out user with invalid token', async () => {
      const res = await request(app)
        .post('/auth/logout')
        .send({
          credentials: {
            refresh_token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ4OGIzMGE5LWY1NTUtNDQxMS05MmY0LTIxMjk3MmQ0NjA3MiIsImVtYWlsIjoicnIucnJAZ21haWwuY29tIiwiaWF0IjoxNjM5MTQ2NjA4LCJleHAiOjE2NDE3Mzg2MDh9.hQNDMQKVjncubkNQ66kcSI9mlPzmGQjpro_D8-wSrrk',
          },
        });

      expect(res.statusCode).toEqual(422);
      expect(res.body.msg).toMatch('Invalid Refresh Token');
    });

    test('should fail logging out user with missing token', async () => {
      const res = await request(app).post('/auth/logout').send({
        credentials: {},
      });
      expect(res.body.msg).toMatch('Invalid Refresh Token');
      expect(res.statusCode).toEqual(422);
    });

    test('should fail logging out user with missing credentials', async () => {
      const res = await request(app).post('/auth/logout').send({});
      expect(res.body.msg).toMatch('Missing credentials');
      expect(res.statusCode).toEqual(422);
    });
  });
});
