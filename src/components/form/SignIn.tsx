import { SetStateAction } from 'react';
import { useAuth0 } from '../../auth/useAuth0';
import { loginSchema } from '../../validation/schemas';
import { Form } from './Form';
import EmailInput from '../input/EmailInput';
import PasswordInput from '../input/PasswordInput';
import SocialButtons from '../ui/SocialButtons';
import ForgotPasswordLink from '../ui/ForgotPasswordLink';

export interface SignInFormProps {
  allowForgot?: boolean;
  hasEmailPasswordAuth?: boolean;
  redirectToForgotPassword: () => SetStateAction<void>;
}

const SignInForm = (props: SignInFormProps) => {
  const { allowForgot = true, hasEmailPasswordAuth = true, redirectToForgotPassword } = props;

  const { login } = useAuth0();

  return (
    <>
      {hasEmailPasswordAuth ? (
        <Form
          defaultValues={{ email: '', password: '' }}
          schema={loginSchema}
          submit={login}
          buttonText="Sign In"
        >
          <EmailInput />
          <PasswordInput />
          {allowForgot ? (
            <div>
              <ForgotPasswordLink handleClick={redirectToForgotPassword} />
            </div>
          ) : null}
        </Form>
      ) : null}
      <SocialButtons prefix={'Sign In with'} />
    </>
  );
};

export default SignInForm;
