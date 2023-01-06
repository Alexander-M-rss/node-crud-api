import { BASE_URL, ErrMsg, MAX_URL_LENGTH, Methods } from './constants';
import { IUserReqData } from './types';
import { validate as isUuidValid, version as uuidVersion } from 'uuid';

export const urlValidator = (url: string, method: Methods): string => {
  if (url.startsWith(BASE_URL)) {
    const parsedUrl = url.split('/').filter((x) => x !== '');

    if (
      parsedUrl.length > MAX_URL_LENGTH ||
      (parsedUrl.length !== MAX_URL_LENGTH && (method === Methods.PUT || method === Methods.DELETE))
    ) {
      throw new Error(ErrMsg.NonexistentEndpoint);
    }

    return parsedUrl[2] || '';
  }
  throw new Error(ErrMsg.NonexistentEndpoint);
};

export const jsonValidator = (json: string) => {
  try {
    const data = JSON.parse(json);
    return data;
  } catch (_) {
    throw new Error(ErrMsg.InvalidReqData);
  }
};

export const reqDataValidator = (data: IUserReqData): void => {
  if (Object.keys(data).length === 3) {
    const isUsernameValid =
      'username' in data && typeof data['username'] === 'string' && data['username'];

    if (isUsernameValid) {
      const isAgeValid = 'age' in data && typeof data['age'] === 'number' && data['age'] >= 0;

      if (isAgeValid) {
        const isHobbiesValid =
          'hobbies' in data &&
          data['hobbies'] instanceof Array &&
          data['hobbies'].every((x) => typeof x === 'string');

        if (isHobbiesValid) {
          return;
        }
      }
    }
  }

  throw new Error(ErrMsg.InvalidReqData);
};

export const uuidValidator = (id: string) => {
  if (!isUuidValid(id) || uuidVersion(id) != 4) {
    throw new Error(ErrMsg.InvalidUserId);
  }
};
