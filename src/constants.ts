export const BASE_URL = '/api/users';
export const MAX_URL_LENGTH = BASE_URL.split('/').length;

export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum StatusCode {
  SUCCESS_200 = 200,
  SUCCESS_201 = 201,
  SUCCESS_204 = 204,
  INVALID_DATA = 400,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export enum ErrMsg {
  InvalidUserId = 'User Id is not valid uuid',
  NonexistentUserId = "User Id doesn't exist",
  InvalidReqData = 'Request data is invalid',
  NonexistentEndpoint = "API endpoint doesn't exist",
  InternalServerError = 'Internal server error has occured',
}
