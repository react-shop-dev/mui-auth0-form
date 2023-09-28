import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { clientInit } from './client/init.ts';
import { AuthClient } from './interfaces.ts';

export const changePasswordRoot = document.querySelector('#change_pass');
const loginRoot = document.querySelector('#login');

if (!changePasswordRoot && !loginRoot) {
  throw new Error('Root element not found');
}

const mount = () => {
  const element = changePasswordRoot ?? loginRoot;

  const root = ReactDOM.createRoot(element as HTMLElement);

  clientInit((response: AuthClient | Error) => {
    root.render(<React.StrictMode>{<App response={response} />}</React.StrictMode>);
  });
};

export { mount };
