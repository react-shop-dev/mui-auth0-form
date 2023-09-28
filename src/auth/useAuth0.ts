import { useCallback } from 'react';
import { webAuth, DATABASE_CONNECTION, domain } from './config';
import { handleRequest, fetchWithCatchError, getRequiredProp } from './helpers';
import { ForgotPasswordData } from '../components/form/ForgotPassword';
import { AuthFormData } from '../interfaces';
import { ChangePasswordData } from '../components/form/ChangePassword';
import { useSearchParams } from '../hooks/useSearchParams';
import { useFormData } from '../hooks/useFormData';
import { usePasswordlessConnection } from '../client/usePasswordlessConnection';
import {
  PasswordlessSource,
  PasswordlessData,
} from './../components/form/passwordless/Paswordless';

export const useAuth0 = () => {
  const urlParams = useSearchParams();

  const login = useCallback(async (data: AuthFormData) => {
    const { email, password } = data;

    const stateParam = urlParams.get('state');

    await handleRequest(webAuth.login, {
      username: email,
      password,
      realm: DATABASE_CONNECTION,
      state: stateParam,
    });
  }, []);

  const loginWithSocial = useCallback((connection: string) => {
    webAuth.authorize({
      connection,
    });
  }, []);

  const signUp = useCallback(async (data: AuthFormData) => {
    const { password, email, username } = data;

    await handleRequest(webAuth.signup, {
      connection: DATABASE_CONNECTION,
      password,
      email,
      username,
    });
  }, []);

  const forgotPassword = useCallback(async (data: ForgotPasswordData) => {
    const { email } = data;

    await handleRequest(webAuth.changePassword, { connection: DATABASE_CONNECTION, email });
  }, []);

  const resetPassword = useCallback(async (data: ChangePasswordData) => {
    const { password, confirmNewPassword } = data;
    // MOCK_TICKET for dev testing only
    const ticket = urlParams.get('ticket') || import.meta.env.VITE_MOCK_TICKET;

    // Auth0 doesn't have a public API for creating a custom password reset.
    // The Auth0 /lo/reset endpoint is considered a private API and is subject to change at any time and is not documented API
    const url = `https://${domain}/lo/reset`;
    const csrfToken = (document.querySelector("input[name='_csrf']") as HTMLInputElement)?.value;

    if (!ticket || !csrfToken || !confirmNewPassword) {
      throw new Error('Cannot change password. Missing required params');
    }

    const body = useFormData({
      newPassword: password,
      confirmNewPassword,
      _csrf: csrfToken,
      ticket: ticket,
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    };

    return fetchWithCatchError(url, requestOptions);
  }, []);

  const passwordlessConnection = usePasswordlessConnection();
  const connection = passwordlessConnection?.strategy;

  const passwordlessStart = useCallback(
    (source: PasswordlessSource, send = 'code') =>
      async (data: PasswordlessData) => {
        const value = getRequiredProp(data, source);

        await handleRequest(webAuth.passwordlessStart, {
          connection,
          send,
          [source]: value,
        });
      },
    [],
  );

  const passwordlessLogin = useCallback(
    (source: PasswordlessSource) =>
      async (data: PasswordlessData & { verificationCode: string }) => {
        const { verificationCode } = data;
        const value = getRequiredProp(data, source);

        await handleRequest(webAuth.passwordlessLogin, {
          connection,
          verificationCode,
          [source]: value,
        });
      },
    [],
  );

  return {
    login,
    loginWithSocial,
    signUp,
    forgotPassword,
    resetPassword,
    passwordlessStart,
    passwordlessLogin,
  };
};
