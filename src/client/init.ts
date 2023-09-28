import { clientID, domain } from '../auth/config';
import { AuthClient, AuthClientArgs } from '../interfaces';
import { formatClient } from './format';

const API_URL = `https://${domain}/client/${clientID}.js?t${+new Date()}`;

declare global {
  interface Window {
    Auth0: {
      setClient: (args: AuthClientArgs) => void;
    };
  }
}

export const clientInit = (cb: (args: AuthClient | Error) => void) => {
  if (typeof window !== 'undefined' && !window.Auth0) {
    window.Auth0 = {
      setClient: args => {
        cb(formatClient(args));
      },
    };
  }

  const script = window.document.createElement('script');
  script.src = API_URL;
  window.document.getElementsByTagName('head')[0].appendChild(script);

  const handleError = (error: Error) => {
    setTimeout(() => cb(error), 0);
  };

  script.addEventListener('error', () => {
    handleError(new Error(`Auth client script could not be loaded`));
  });
};
