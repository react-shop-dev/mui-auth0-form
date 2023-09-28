import SmartphoneIcon from '@mui/icons-material/Smartphone';
import TextInput, { TextInputProps } from './TextInput';

const PhoneInput = (props: Partial<TextInputProps>) => {
  const {
    label = 'Phone',
    icon = SmartphoneIcon,
    isRequired = true,
    name = 'phoneNumber',
    ...rest
  } = props;

  return (
    <TextInput type="tel" label={label} isRequired={isRequired} icon={icon} {...rest} name={name} />
  );
};

export default PhoneInput;
