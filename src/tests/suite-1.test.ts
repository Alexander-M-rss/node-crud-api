import { server } from '../server';
import request from 'supertest';
import { testUser, updatedUser } from './data';
import { BASE_URL } from '../constants';

afterAll(() => {
  server.close();
});

describe('Test API methods with valid user data', () => {
  let id = '';
  let testUserWithId = {};
  let updatedUserWithId = {};

  test('Get empty list of users', async () => {
    await request(server).get(BASE_URL).expect('Content-Type', /json/).expect(200).expect([]);
  });

  test('Create new user', async () => {
    const response = await request(server)
      .post(BASE_URL)
      .send(testUser)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body).toMatchObject(testUser);
    id = response.body.id;
    testUserWithId = {
      ...response.body,
    };
    expect(response.body).toEqual(testUserWithId);
  });

  test('Get created user', async () => {
    await request(server)
      .get(`${BASE_URL}/${id}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(testUserWithId);
  });

  test('Update user', async () => {
    const response = await request(server)
      .put(`${BASE_URL}/${id}`)
      .send(updatedUser)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toMatchObject(updatedUser);
    updatedUserWithId = {
      ...response.body,
    };
    expect(response.body).toEqual(updatedUserWithId);
  });

  test('Get updated user', async () => {
    await request(server)
      .get(`${BASE_URL}/${id}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(updatedUserWithId);
  });

  test('Delete user', async () => {
    await request(server).delete(`${BASE_URL}/${id}`).expect(204);
  });

  test('Try to get a deleted user', async () => {
    await request(server)
      .get(`${BASE_URL}/${id}`)
      .expect(404)
      .expect({ code: 404, msg: "User Id doesn't exist" });
  });
});
