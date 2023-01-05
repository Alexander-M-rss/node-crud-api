import { ErrMsg } from './constants';

export interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export type IUserReqData = Omit<IUser, 'id'>;

export interface IError {
  code: number;
  msg: ErrMsg;
}

export type Response = IUser | IUser[] | IError;
