import auth0 from 'auth0-js';

export const DATABASE_CONNECTION = 'Username-Password-Authentication';

export const domain = import.meta.env.VITE_AUTH0_DOMAIN;
export const clientID = import.meta.env.VITE_AUTH0_CLIENT_ID;
export const redirectUri = import.meta.env.VITE_AUTH0_REDIRECT_URI;

export const webAuth = new auth0.WebAuth({
  domain,
  clientID,
  redirectUri,
  responseType: 'code',
});
