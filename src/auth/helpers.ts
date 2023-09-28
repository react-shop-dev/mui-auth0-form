import { Auth0Error } from 'auth0-js';
import { webAuth } from './config';

export const handleRequest = <Args extends object>(fn: any, args: Args) => {
  return new Promise((resolve, reject) => {
    return fn.call(webAuth, { ...args }, <T, E = Auth0Error>(error: null | E, result: T) => {
      if (error) {
        if (import.meta.env.DEV) {
          console.error(error);
        }
        reject(error);
      }
      resolve(result);
    });
  });
};

export const fetchWithCatchError = (url: string, requestOptions: RequestInit) =>
  fetch(url, requestOptions).then((response: Response) => {
    if (response.status >= 400) {
      return response.json().then(error => {
        throw error;
      });
    }
    return Promise.resolve('Success!');
  });

export const getRequiredProp = (data: any, source: string) => {
  if (!data[source]) {
    throw new Error(`Missing property ${source} in ${JSON.stringify(data)}`);
  }
  return data[source];
};
