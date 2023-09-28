import { ComponentType } from 'react';
import { styled } from '@mui/material/styles';
import { Controller, useFormContext } from 'react-hook-form';
import Box from '@mui/material/Box';
import { SvgIconProps } from '@mui/material/SvgIcon';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { AuthFormData } from '../../interfaces';

export type TextInputProps = Omit<TextFieldProps, 'error'> & {
  name: keyof AuthFormData;
  label?: string;
  icon?: ComponentType<SvgIconProps>;
  isRequired?: boolean;
  validator?: Validator;
};

const TextInput = (props: TextInputProps) => {
  const { type = 'text', name, label = '', isRequired, validator, icon: Icon, ...rest } = props;

  const { getFieldState, formState, control } = useFormContext();
  const { error } = getFieldState(name, formState);

  return (
    <Root>
      {Icon ? <Icon className={LoginInputClasses.icon} /> : null}
      <Controller
        control={control}
        name={name}
        rules={{
          validate: async (value: string) => {
            if (!validator) {
              return true;
            }
            const error = await validator(value);
            if (!error) return true;
            return error;
          },
        }}
        render={({ field }) => (
          <TextField
            type={type}
            fullWidth
            size="small"
            label={`${label} ${isRequired ? '*' : ''}`}
            {...field}
            helperText={
              error ? error.message : <span dangerouslySetInnerHTML={{ __html: '&#8203;' }} />
            }
            error={!!error}
            {...rest}
          />
        )}
      />
    </Root>
  );
};

export type Validator = (
  value: string,
) => string | null | undefined | Promise<string | null | undefined>;

const PREFIX = 'RsLoginTextInput';

export const LoginInputClasses = {
  icon: `${PREFIX}-icon`,
};

const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  [`& .${LoginInputClasses.icon}`]: {
    margin: '0.4em 0.5em 0 0',
    color: theme.palette.action.active,
  },
}));

export default TextInput;
