import SecurityIcon from '@mui/icons-material/Security';
import CardView from '../ui/CardView';
import { brown } from '@mui/material/colors';
import Grow from '@mui/material/Grow';
import Box from '@mui/material/Box';
import FormHeader from '../ui/TopBar';
import { Form } from './Form';
import PasswordInput from '../input/PasswordInput';
import { changePasswordSchema } from '../../validation/schemas';
import { useAuth0 } from '../../auth/useAuth0';
import EmailHint from '../ui/EmailHint';

export type ChangePasswordData = {
  password: string;
  confirmNewPassword?: string;
};

const ChangePassword = () => {
  const { resetPassword } = useAuth0();

  return (
    <CardView>
      <FormHeader logo={SecurityIcon} sx={{ backgroundColor: brown[300] }} />
      <Grow in>
        <Box>
          <Form
            defaultValues={{
              password: '',
              confirmNewPassword: '',
            }}
            schema={changePasswordSchema}
            submit={resetPassword}
            buttonText="Update password"
            resetAfterSubmit
            successFeedback="Your password has been changed successfully"
          >
            <EmailHint />
            <PasswordInput />
            <PasswordInput name="confirmNewPassword" label="Confirm Password" />
          </Form>
        </Box>
      </Grow>
    </CardView>
  );
};

export default ChangePassword;
