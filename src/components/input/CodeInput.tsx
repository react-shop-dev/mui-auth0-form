import LockOpenIcon from '@mui/icons-material/LockOpen';
import TextInput, { TextInputProps } from './TextInput';

const CodeInput = (props: Partial<TextInputProps>) => {
  const {
    label = 'Verification Code',
    icon = LockOpenIcon,
    isRequired = true,
    name = 'verificationCode',
    ...rest
  } = props;

  return (
    <TextInput
      name={name}
      label={label}
      icon={icon}
      autoComplete="off"
      isRequired={isRequired}
      {...rest}
    />
  );
};

export default CodeInput;
