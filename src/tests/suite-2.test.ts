import { server } from '../server';
import request from 'supertest';
import { testUser, updatedUser } from './data';
import { v4 as newUuidv4 } from 'uuid';
import { BASE_URL } from '../constants';

afterAll(() => {
  server.close();
});

describe('Test API methods with nonexistent user id', () => {
  const randomId = newUuidv4();

  test('Create new user', async () => {
    await request(server).post(BASE_URL).send(testUser).expect('Content-Type', /json/).expect(201);
  });

  test('Try to get nonexistent user', async () => {
    await request(server)
      .get(`${BASE_URL}/${randomId}`)
      .expect(404)
      .expect({ code: 404, msg: "User Id doesn't exist" });
  });

  test('Try to update nonexistent user', async () => {
    await request(server)
      .put(`${BASE_URL}/${randomId}`)
      .send(updatedUser)
      .expect(404)
      .expect({ code: 404, msg: "User Id doesn't exist" });
  });

  test('Try to delete nonexistent user', async () => {
    await request(server)
      .delete(`${BASE_URL}/${randomId}`)
      .expect(404)
      .expect({ code: 404, msg: "User Id doesn't exist" });
  });
});
