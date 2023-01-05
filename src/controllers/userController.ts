import { IUser, IUserReqData } from '../types';
import { createUser } from '../models/userModel';
import { reqDataValidator } from '../validators';

export const postUser = (data: IUserReqData): IUser => {
  reqDataValidator(data);

  return createUser(data);
};
