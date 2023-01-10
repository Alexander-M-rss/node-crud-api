import { server } from '../server';
import request from 'supertest';
import { testUser } from './data';
import { IUserReqData } from '../types';
import { BASE_URL } from '../constants';

afterAll(() => {
  server.close();
});

describe('Test API methods with valid user data', () => {
  let id = '';
  let invalidId = '';
  const invalidUserData: Partial<IUserReqData>[] = [
    {
      username: testUser.username,
      age: testUser.age,
    },
    {
      username: testUser.username,
      hobbies: testUser.hobbies,
    },
    {
      age: testUser.age,
      hobbies: testUser.hobbies,
    },
  ];

  test('Create new user', async () => {
    const response = await request(server)
      .post(BASE_URL)
      .send(testUser)
      .expect('Content-Type', /json/)
      .expect(201);

    id = response.body.id;
  });

  test('Try to get user with invalid id', async () => {
    invalidId = `inv${id}alid`;
    await request(server)
      .get(`${BASE_URL}/${invalidId}`)
      .expect(400)
      .expect({ code: 400, msg: 'User Id is not valid uuid' });
  });

  test('Try to add user with invalid user data', async () => {
    invalidUserData.forEach(async (invalidUser) => {
      await request(server).post(`/api/users`).send(invalidUser).expect(400).expect({
        code: 400,
        msg: 'Request data is invalid',
      });
    });
  });

  test('Try to update user with invalid id', async () => {
    invalidId = `inv${id}alid`;
    await request(server)
      .put(`${BASE_URL}/${invalidId}`)
      .send(testUser)
      .expect(400)
      .expect({ code: 400, msg: 'User Id is not valid uuid' });
  });

  test('Try to update user with invalid user data', async () => {
    invalidUserData.forEach(async (invalidUser) => {
      await request(server).put(`${BASE_URL}/${id}`).send(invalidUser).expect(400).expect({
        code: 400,
        msg: 'Request data is invalid',
      });
    });
  });

  test('Try to delete user with invalid id', async () => {
    await request(server)
      .delete(`${BASE_URL}/${invalidId}`)
      .expect(400)
      .expect({ code: 400, msg: 'User Id is not valid uuid' });
  });
});
