import { ReactNode, useState, FormEvent } from 'react';
import { UseFormProps, FormProvider, useForm } from 'react-hook-form';
import { ObjectSchema } from 'yup';
import { styled, SxProps } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { AuthError } from '../../interfaces';
import Feedback from '../ui/Feedback';

export interface FormProps extends Omit<UseFormProps, 'onSubmit'> {
  isValid?: boolean;
  children: ReactNode;
  buttonText?: string;
  resetErrorAfterOnChange?: boolean;
  successFeedback?: string;
  onSuccessAction?: SuccessAction;
  onErrorAction?: (error: unknown) => void;
  schema?: ObjectSchema<any>;
  defaultValues: any;
  resetAfterSubmit?: boolean;
  sx?: SxProps;
  submit: (data: any) => Promise<string | void> | undefined;
}

export type SuccessAction = (event: any, response?: any) => void;

export const Form = (props: FormProps) => {
  const {
    children,
    buttonText = 'Submit',
    submit,
    successFeedback,
    resetErrorAfterOnChange = true,
    schema,
    defaultValues,
    sx,
    mode = 'onBlur',
    resetAfterSubmit,
    onSuccessAction,
    onErrorAction,
    ...rest
  } = props;

  const form = useForm({
    mode,
    defaultValues,
    resolver: schema ? yupResolver(schema) : undefined,
    ...rest,
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = form;

  const [loading, setLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<AuthError | undefined>(undefined);
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setLoading(true);

    try {
      const response = await submit(event);
      successFeedback && setMessage(successFeedback);
      if (resetAfterSubmit) {
        reset();
      }
      if (typeof onSuccessAction === 'function') {
        onSuccessAction(event, response);
      }
    } catch (error) {
      if (typeof onErrorAction === 'function') {
        onErrorAction(error);
      }
      setAuthError(error as AuthError);
    } finally {
      setLoading(false);
    }
  };

  const renderFeedback = () =>
    message ? (
      <Feedback severity="success" message={message} />
    ) : authError ? (
      <Feedback
        severity="error"
        message={
          authError.message || authError.error || authError.description || 'Authentication failed'
        }
      />
    ) : null;

  return (
    <FormProvider {...form}>
      <StyledForm
        sx={sx}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        onChange={() => {
          if (authError && resetErrorAfterOnChange) {
            setAuthError(undefined);
          }
        }}
      >
        <>
          {children}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading || !isValid}
            className={LoginFormClasses.submit}
          >
            {loading ? <CircularProgress size={24} thickness={3} /> : buttonText}
          </Button>
        </>
        {renderFeedback()}
      </StyledForm>
    </FormProvider>
  );
};

const PREFIX = 'RsStyledForm';

export const LoginFormClasses = {
  row: `${PREFIX}-row`,
  icon: `${PREFIX}-icon`,
  submit: `${PREFIX}-submit`,
};

export const StyledForm = styled('form', {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  [`& .${LoginFormClasses.submit}`]: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
}));
