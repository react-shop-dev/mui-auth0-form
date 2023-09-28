import MailIcon from '@mui/icons-material/Mail';
import TextInput, { TextInputProps } from './TextInput';

const EmailInput = (props: Partial<TextInputProps>) => {
  const { label = 'Email', icon = MailIcon, isRequired = true, name = 'email', ...rest } = props;

  return (
    <TextInput
      label={label}
      isRequired={isRequired}
      autoComplete="off"
      icon={icon}
      {...rest}
      name={name}
    />
  );
};

export default EmailInput;
