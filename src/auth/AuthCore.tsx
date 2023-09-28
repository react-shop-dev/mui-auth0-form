import { useHasConnections } from '../client/useHasConnections';
import AuthBase, { AuthBaseProps } from './AuthBase';
import ChangePassword from '../components/form/ChangePassword';
import PasswordlessForm from '../components/form/passwordless/Paswordless';
import { changePasswordRoot } from '../bootstrap';

// Or using lazy load <ChangePassword /> form component
// const ChangePassword = lazy(() => import('../components/form/ChangePassword'));

export type AuthCoreProps = AuthBaseProps;

const AuthCore = (props: AuthCoreProps) => {
  const connections = useHasConnections() as Array<string>;

  if (connections.length === 0) {
    return 'No connections available';
  }

  if (changePasswordRoot) {
    return <ChangePassword />;
  }

  const isPasswordless = connections.includes('passwordless');

  return isPasswordless ? <PasswordlessForm /> : <AuthBase {...props} />;
};

export default AuthCore;
