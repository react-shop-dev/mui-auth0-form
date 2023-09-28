import Typography from '@mui/material/Typography';
import { useAuth0 } from '../../../auth/useAuth0';
import { Form, SuccessAction } from '../Form';
import EmailInput from '../../input/EmailInput';
import PhoneInput from '../../input/PhoneInput';
import { emailSchema, phoneSchema } from '../../../validation/schemas';
import Title from '../../ui/Title';
import { PasswordlessSource } from './Paswordless';

/**
 * TIP:
 * If you are receiving CORS error after submitting e-mail, add your url to Applications -> Settings -> Cross-Origin Authentication -> Allowed Origins (CORS)
 */

export interface PasswordlessStartProps {
  source: PasswordlessSource;
  isPhoneStrategy: boolean;
  successAction: SuccessAction;
  helperText?: string;
}

export const PasswordlessStart = ({
  source,
  isPhoneStrategy,
  successAction,
  helperText = `A verification code will be sent to the specified ${
    isPhoneStrategy ? 'phone number' : 'email address'
  }.`,
}: PasswordlessStartProps) => {
  const { passwordlessStart } = useAuth0();

  const schema: any = isPhoneStrategy ? phoneSchema : emailSchema;

  return (
    <Form
      defaultValues={{
        [source]: '',
      }}
      schema={schema}
      submit={passwordlessStart(source)}
      buttonText="Continue"
      resetAfterSubmit
      successFeedback={`We sent code to your ${isPhoneStrategy ? 'Phone' : 'E-mail'}, please check`}
      onSuccessAction={successAction}
    >
      <Title title="Welcome" />
      <Typography gutterBottom textAlign="center" paragraph variant="caption" sx={{ mb: 3 }}>
        {helperText}
      </Typography>
      {isPhoneStrategy ? <PhoneInput name={source} /> : <EmailInput name={source} />}
    </Form>
  );
};
