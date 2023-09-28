import { createContext, useContext, ReactNode } from 'react';
import { AuthClient } from '../interfaces';

const AuthClientContext = createContext({} as AuthClient);

export const useAuthClient = (): AuthClient => useContext(AuthClientContext);

const AuthClientProvider = ({ value, children }: { value: AuthClient; children: ReactNode }) => (
  <AuthClientContext.Provider value={value}>{children}</AuthClientContext.Provider>
);

export default AuthClientProvider;
