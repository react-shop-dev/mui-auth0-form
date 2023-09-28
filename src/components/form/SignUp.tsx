import { Form } from './Form';
import TextInput from '../input/TextInput';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useAuth0 } from '../../auth/useAuth0';
import { signUpSchema } from '../../validation/schemas';
import EmailInput from '../input/EmailInput';
import PasswordInput from '../input/PasswordInput';
import { UsernameValidation } from '../../validation/formatConnectionValifation';

export interface SignUpProps {
  requiredUsername?: boolean;
  usernameValidation?: UsernameValidation;
}

const SignUp = (props: SignUpProps) => {
  const { requiredUsername = false, usernameValidation } = props;

  if (usernameValidation && !requiredUsername) {
    throw new Error('In order to use validation settings you need enable requires Username');
  }

  const { signUp } = useAuth0();

  return (
    <Form
      submit={signUp}
      defaultValues={{ username: '', password: '', email: '' }}
      schema={signUpSchema(requiredUsername, usernameValidation)}
      buttonText="Sign Up"
    >
      <TextInput
        name="username"
        label="Username"
        icon={AccountCircle}
        autoComplete="off"
        isRequired={requiredUsername}
      />
      <EmailInput />
      <PasswordInput />
    </Form>
  );
};

export default SignUp;
