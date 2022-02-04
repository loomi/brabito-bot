import { Controller } from '@/application/http-server/protocols';

import { Request, Response } from 'express';
import { convertProperties } from './express-query-converter';

export const adaptRoute = (controller: Controller) => {
  // @ts-ignore
  return async (req: Request, res: Response) => {
    const httRequest = {
      // @ts-ignore
      userRequester: req.userRequester || null,
      ...req.body,
      ...convertProperties({ ...req.params, ...req.query }),
    };

    const httpResponse = await controller.handle(httRequest);

    if (httpResponse.type === 'csv') {
      res.setHeader('Content-Type', 'text/csv');
      return res.status(httpResponse.statusCode).send(httpResponse.body.data);
    }

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      res
        .status(httpResponse.statusCode)
        .json({ error: httpResponse.body.message });
    }
  };
};
