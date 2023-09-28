import { useState } from 'react';
import KeyIcon from '@mui/icons-material/Key';
import TextInput, { TextInputProps } from './TextInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { usePasswordPolicy } from '../../validation/usePasswordPolicy';

const PasswordInput = (props: Partial<TextInputProps>) => {
  const { icon = KeyIcon, label = 'Password', name = 'password', ...rest } = props;

  const [visible, setVisible] = useState(false);

  const { handleValidation } = usePasswordPolicy();

  /** input level validation can be used if form level validation is undefined ( react-hook-form limitation ) */
  const validator = (value: string) => {
    const errors = handleValidation(value);
    return errors ? errors[0]?.message : null;
  };

  const handleClick = () => {
    setVisible(!visible);
  };

  return (
    <TextInput
      type={visible ? 'text' : 'password'}
      label={label}
      isRequired
      icon={icon}
      validator={validator}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleClick} size="small">
              {visible ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
        autoComplete: 'off',
      }}
      {...rest}
      name={name}
    />
  );
};

export default PasswordInput;
