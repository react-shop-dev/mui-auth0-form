import * as yup from 'yup';
import { DEFAULT_CONNECTION_VALIDATION, UsernameValidation } from './formatConnectionValifation';
import { passwordSchema } from './passwordSchema';

export const emailSchema = yup.object().shape({
  email: yup.string().required('Please enter your email address').email('Please enter valid email'),
});

export const loginSchema = emailSchema.concat(passwordSchema);

export const signUpSchema = (
  usernameRequired = false,
  validation: UsernameValidation = DEFAULT_CONNECTION_VALIDATION.username,
) =>
  usernameRequired
    ? loginSchema.concat(
        yup.object({
          username: yup
            .string()
            .required('Please enter your username')
            .min(validation.min, `At least ${validation.min} characters`)
            .max(validation.max, `Must be ${validation.max} characters or less`),
        }),
      )
    : loginSchema;

export const changePasswordSchema = passwordSchema.concat(
  yup.object({
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref('password'), undefined], 'Passwords must match'),
  }),
);

export const codeSchema = yup.object().shape({
  verificationCode: yup.string().required('Please enter your verification code'),
});

const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

export const phoneSchema = yup.object().shape({
  phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
});
