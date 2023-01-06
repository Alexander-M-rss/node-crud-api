import { IUser, IUserReqData } from '../types';
import { v4 as newUuidV4 } from 'uuid';

const db: IUser[] = [];

export const createUser = (user: IUserReqData) => {
  const newUser: IUser = { id: newUuidV4(), ...user };

  db.push(newUser);

  return newUser;
};

export const getAllUser = () => {
  return db;
};

export const findUser = (id: string) => {
  return db.find((user) => user.id === id);
};

export const updateUser = (id: string, user: IUserReqData) => {
  const idx = db.findIndex((user) => user.id === id);

  if (idx < 0) {
    return null;
  }

  const updatedUser = { id, ...user };
  db[idx] = updatedUser;
  return updatedUser;
};

export const removeUser = (id: string) => {
  const idx = db.findIndex((user) => user.id === id);

  if (idx < 0) {
    return false;
  }

  db.splice(idx, 1);
  return true;
};
