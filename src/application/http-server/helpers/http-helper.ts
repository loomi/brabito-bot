import { ServerError } from '@/application/http-server/errors';
import { HttpResponse } from '@/application/http-server/protocols';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  // @ts-ignore
  body: new ServerError(error.stack),
});

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data,
});

export const ok = (data?: any, option?: string): HttpResponse => {
  if (option === 'list') {
    const formatedObject = Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        if (key.includes('total')) return ['totalItems', value];

        return ['data', value];
      })
    );

    return {
      statusCode: 200,
      body: formatedObject,
    };
  }

  if (option === 'dash') {
    return {
      statusCode: 200,
      body: { data: data },
    };
  }

  if (option === 'csv') {
    return {
      statusCode: 200,
      type: 'csv',
      body: { data: data },
    };
  }

  return {
    statusCode: 200,
    body: data,
  };
};

export const conflict = (error: any): HttpResponse => ({
  statusCode: 409,
  body: error,
});

export const updated = (data?: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const forbidden = (data?: any): HttpResponse => ({
  statusCode: 403,
  body: data,
});

export const unauthorized = (data?: any): HttpResponse => ({
  statusCode: 401,
  body: data,
});
