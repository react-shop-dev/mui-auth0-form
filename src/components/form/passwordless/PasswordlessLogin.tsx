import { useAuth0 } from '../../../auth/useAuth0';
import { Form } from '../Form';
import { codeSchema } from '../../../validation/schemas';
import CodeInput from '../../input/CodeInput';
import Title from '../../ui/Title';
import { PasswordlessSource } from './Paswordless';

export interface PasswordlessLoginProps {
  source: PasswordlessSource;
  identifier: string;
}

export const PasswordlessLogin = ({ source, identifier }: PasswordlessLoginProps) => {
  const { passwordlessLogin } = useAuth0();

  return (
    <Form
      defaultValues={{
        verificationCode: '',
        [source]: identifier,
      }}
      schema={codeSchema}
      submit={passwordlessLogin(source)}
      buttonText="Send"
      resetAfterSubmit
    >
      <Title title="Enter your code" sx={{ mb: 3 }} />
      <CodeInput />
    </Form>
  );
};
