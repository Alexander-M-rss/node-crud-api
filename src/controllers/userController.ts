import { IUser, IUserReqData } from '../types';
import { createUser, findUser, getAllUser, removeUser, updateUser } from '../models/userModel';
import { reqDataValidator, uuidValidator } from '../validators';
import { ErrMsg } from '../constants';

export const getUser = (id: string): IUser | IUser[] => {
  if (id) {
    uuidValidator(id);

    const user = findUser(id);

    if (!user) {
      throw new Error(ErrMsg.NonexistentUserId);
    }

    return user;
  }

  return getAllUser();
};

export const postUser = (data: IUserReqData): IUser => {
  reqDataValidator(data);

  return createUser(data);
};

export const putUser = (id: string, data: IUserReqData): IUser => {
  uuidValidator(id);
  reqDataValidator(data);

  const user = updateUser(id, data);

  if (!user) {
    throw new Error(ErrMsg.NonexistentUserId);
  }

  return user;
};

export const deleteUser = (id: string) => {
  uuidValidator(id);

  if (!removeUser(id)) {
    throw new Error(ErrMsg.NonexistentUserId);
  }
};
