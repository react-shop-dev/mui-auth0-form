import { Auth0Error } from 'auth0-js';

export interface AuthFormData {
  email: string;
  password: string;
  confirmNewPassword?: string;
  username?: string;
  verificationCode?: string;
  phoneNumber?: string;
}

export type AuthError = Auth0Error & Error;

export type StrategyType = 'email' | 'sms';

export type Strategy = {
  name: StrategyType;
  connections: any[];
};

export interface AuthClientArgs {
  id: string;
  tenant: string;
  subscription: string;
  callback: string;
  authorize: string;
  hasAllowedOrigins: boolean;
  strategies: Strategy[];
}

export type ConnectionName = 'database' | 'social' | 'passwordless' | 'unknown';

export type Connection = {
  [key: string]: any;
  name: ConnectionName;
  displayName?: string;
  strategy: StrategyType;
  type: string;
  allowForgot?: boolean;
  allowSignup?: boolean;
  requiredUsername?: boolean;
  validation?: any;
  domains?: any;
  passwordPolicy?: any;
};

export interface AuthClient {
  id: string;
  tenant: {
    name: string;
    subscription: string;
  };
  connections: { [key: string]: Connection[] };
}

export interface Policy {
  length: { minLength: number };
  contains?: {
    expressions?: string[];
  };
  containsAtLeast?: {
    atLeast?: number;
    expressions?: string[];
  };
  identicalChars?: { max?: number };
}
