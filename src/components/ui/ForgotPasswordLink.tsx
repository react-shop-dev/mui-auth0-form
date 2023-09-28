import Typography, { TypographyProps } from '@mui/material/Typography';

export interface ForgotPasswordLink extends TypographyProps {
  handleClick: () => void;
}

const ForgotPasswordLink = (props: ForgotPasswordLink) => {
  const {
    handleClick,
    title = 'Forgotten Password?',
    color = 'primary',
    variant = 'caption',
  } = props;

  return (
    <Typography variant={variant} color={color} onClick={handleClick} sx={{ cursor: 'pointer' }}>
      {title}
    </Typography>
  );
};

export default ForgotPasswordLink;
