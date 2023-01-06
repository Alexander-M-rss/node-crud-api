import { createServer, IncomingMessage } from 'http';
import { Methods, StatusCode, ErrMsg } from './constants';
import { getUser, postUser } from './controllers/userController';
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

export const runServer = (port: number) => {
  const server = createServer(async (req, res) => {
    let resp: Response = { code: StatusCode.SERVER_ERROR, msg: ErrMsg.InternalServerError };

    res.setHeader('Content-Type', 'application/json');

    try {
      const method = <Methods>req.method;
      const url = req.url || '';

      const userId = urlValidator(url, method);

      let data: IUserReqData;
      let code: number;

      switch (method) {
        case Methods.GET:
          code = StatusCode.SUCCESS_200;
          resp = getUser(userId);
          break;
        case Methods.POST:
          data = await getReqData(req);
          code = StatusCode.SUCCESS_201;
          resp = postUser(data);
          break;
        default:
          code = StatusCode.NOT_FOUND;
          resp = { code, msg: ErrMsg.NonexistentEndpoint };
      }
      res.writeHead(code);
    } catch (err) {
      const msg = <ErrMsg>(
        (err instanceof Error && Object.values<string>(ErrMsg).includes(err.message)
          ? err.message
          : ErrMsg.InternalServerError)
      );

      const code = getErrStatusCode(msg);

      resp = { code, msg };

      res.writeHead(code);
    } finally {
      res.end(JSON.stringify(resp));
    }
  });

  server.listen(port, () => {
    console.log(`Server started on ${port} port`);
  });
};
