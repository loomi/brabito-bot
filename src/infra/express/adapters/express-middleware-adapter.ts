import { Middleware } from '@/application/http-server/protocols';

import { NextFunction, Request, Response } from 'express';

export const adaptMiddleware = (middleware: Middleware): any => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const request = {
      accessToken: req.headers?.authorization,
      ...(req.headers || {}),
    };

    const httpResponse = await middleware.handle(request);

    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body);
      next();
    } else {
      res
        .status(httpResponse.statusCode)
        .json({ error: httpResponse.body?.message });
    }
  };
};
