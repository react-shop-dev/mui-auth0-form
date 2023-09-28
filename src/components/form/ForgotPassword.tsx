import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useAuth0 } from '../../auth/useAuth0';
import { emailSchema } from '../../validation';
import { Form } from './Form';
import { forwardRef } from 'react';
import EmailInput from '../input/EmailInput';
import Title from '../ui/Title';

export type ForgotPasswordData = {
  email: string;
};

const ForgotPassword = forwardRef((_props, ref) => {
  const { forgotPassword } = useAuth0();

  return (
    <Box ref={ref} sx={{ p: 3, pt: 0 }}>
      <Form
        schema={emailSchema}
        defaultValues={{ email: '' }}
        submit={forgotPassword}
        buttonText="Send Email"
        resetAfterSubmit
        successFeedback="We've just sent You an Email To Reset Your Password"
      >
        <Title title="Reset paswword" />
        <Typography gutterBottom paragraph variant="caption">
          Please enter your email address.
          <br /> We will send you an email to reset your password.
        </Typography>
        <EmailInput />
      </Form>
    </Box>
  );
});

ForgotPassword.displayName = 'ForgotPassword';

export default ForgotPassword;
