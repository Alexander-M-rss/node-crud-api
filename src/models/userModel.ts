import { IUser, IUserReqData } from '../types';
import { v4 as newUuidV4 } from 'uuid';

const db: IUser[] = [];

export const createUser = (user: IUserReqData) => {
  const newUser: IUser = { id: newUuidV4(), ...user };

  db.push(newUser);

  return newUser;
};
