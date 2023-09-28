import Alert, { AlertProps } from '@mui/material/Alert';

const Feedback = ({ severity, message }: AlertProps & { message?: string }) => {
  return message ? <Alert severity={severity}>{message}</Alert> : null;
};

export default Feedback;
