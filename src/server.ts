import { createServer, IncomingMessage } from 'http';
import { Methods, StatusCode, ErrMsg } from './constants';
import { deleteUser, getUser, postUser, putUser } from './controllers/userController';
import { IUserReqData, Response } from './types';
import { urlValidator } from './validators';

import { jsonValidator } from './validators';

export const getReqData = async (req: IncomingMessage) => {
  const buffer = [];

  for await (const chunk of req) {
    buffer.push(chunk);
  }

  return jsonValidator(Buffer.concat(buffer).toString());
};

export const getErrStatusCode = (err: ErrMsg) => {
  switch (err) {
    case ErrMsg.InvalidUserId:
    case ErrMsg.InvalidReqData:
      return StatusCode.INVALID_DATA;

    case ErrMsg.NonexistentUserId:
    case ErrMsg.NonexistentEndpoint:
      return StatusCode.NOT_FOUND;

    case ErrMsg.InternalServerError:
    default:
      return StatusCode.SERVER_ERROR;
  }
};

export const server = createServer(async (req, res) => {
  let resp: Response = '';
  let code = StatusCode.SUCCESS_200;

  res.setHeader('Content-Type', 'application/json');

  try {
    const method = <Methods>req.method;
    const url = req.url || '';

    const userId = urlValidator(url, method);

    let data: IUserReqData;

    switch (method) {
      case Methods.GET:
        resp = getUser(userId);
        break;
      case Methods.POST:
        data = await getReqData(req);
        code = StatusCode.SUCCESS_201;
        resp = postUser(data);
        break;
      case Methods.PUT:
        data = await getReqData(req);
        resp = putUser(userId, data);
        break;
      case Methods.DELETE:
        code = StatusCode.SUCCESS_204;
        deleteUser(userId);
        break;
      default:
        code = StatusCode.NOT_FOUND;
        resp = { code, msg: ErrMsg.NonexistentEndpoint };
    }
  } catch (err) {
    const msg = <ErrMsg>(
      (err instanceof Error && Object.values<string>(ErrMsg).includes(err.message)
        ? err.message
        : ErrMsg.InternalServerError)
    );

    code = getErrStatusCode(msg);

    resp = { code, msg };
  } finally {
    res.writeHead(code);
    if (resp) {
      res.end(JSON.stringify(resp));
    } else {
      res.end();
    }
  }
});

export const runServer = (port: number) => {
  server.listen(port, () => {
    console.log(`Server started on ${port} port`);
  });
};
