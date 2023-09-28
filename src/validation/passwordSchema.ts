import * as yup from 'yup';

const specialCharacters = [
  ' ',
  '!',
  '"',
  '#',
  '\\$',
  '%',
  '&',
  "'",
  '\\(',
  '\\)',
  '\\*',
  '\\+',
  ',',
  '-',
  '\\.',
  '/',
  ':',
  ';',
  '<',
  '=',
  '>',
  '\\?',
  '@',
  '\\[',
  '\\\\',
  '\\]',
  '\\^',
  '_',
  '`',
  '{',
  '\\|',
  '}',
  '~',
].join('|');

const specialCharactersRegexp = new RegExp(specialCharacters);

export const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .required('Please enter your password')
    .min(8, 'At least 8 characters')
    .matches(/\d/, 'Should contain numbers')
    .matches(/[a-z]/, 'Should contain lowercase letters')
    .matches(/[A-Z]/, 'Should contain uppercase letters')
    .matches(specialCharactersRegexp, 'Should contain special characters'),
});
