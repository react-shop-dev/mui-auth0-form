import Typography from '@mui/material/Typography';

const email = (document.querySelector("input[name='email']") as HTMLInputElement)?.value;

const EmailHint = () => {
  return email ? (
    <Typography paragraph gutterBottom variant="subtitle2" textAlign="center">
      Enter a new password for <br />
      <Typography color="primary" component="span">
        {email}
      </Typography>
    </Typography>
  ) : null;
};

export default EmailHint;
