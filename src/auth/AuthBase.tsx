import {
  ReactElement,
  ComponentType,
  createElement,
  isValidElement,
  cloneElement,
  ReactNode,
} from 'react';
import DefaultSignIn from '../components/form/SignIn';
import DefaultSignUp from '../components/form/SignUp';
import DefaultForgotPassword from '../components/form/ForgotPassword';
import { useDatabaseConnection } from '../client/useDatabaseConnection';
import { DATABASE_CONNECTION } from './config';
import AuthView from '../components/ui/AuthView';

export interface AuthBaseProps {
  signInForm?: ReactElement | ComponentType;
  signUpForm?: ReactElement | ComponentType;
  fogotPasswordForm?: ReactElement | ComponentType;
}

const AuthBase = (props: AuthBaseProps) => {
  const {
    signInForm = DefaultSignIn,
    signUpForm = DefaultSignUp,
    fogotPasswordForm = DefaultForgotPassword,
  } = props;

  const database = useDatabaseConnection(DATABASE_CONNECTION);

  const { allowSignup, allowForgot, requiredUsername, validation } = database || {};

  return (
    <AuthView
      signIn={props =>
        createOrCloneElement(signInForm, {
          hasEmailPasswordAuth: !!database,
          allowForgot,
          ...props,
        })
      }
      signUp={() =>
        allowSignup
          ? createOrCloneElement(signUpForm, {
              requiredUsername,
              usernameValidation: validation?.username,
            })
          : null
      }
      forgotPassword={allowForgot ? createOrCloneElement(fogotPasswordForm) : null}
    />
  );
};

const createOrCloneElement = (element: any, props?: any, children?: ReactNode) =>
  isValidElement(element)
    ? cloneElement(element, props, children)
    : createElement(element, props, children);

export default AuthBase;
