export type UsernameValidation = { min: number; max: number };

export const DEFAULT_CONNECTION_VALIDATION = { username: { min: 1, max: 15 } };

export const formatConnectionValidation = (
  connectionValidation: { username?: UsernameValidation } = {},
) => {
  if (connectionValidation.username == null) {
    return null;
  }

  const validation = { ...DEFAULT_CONNECTION_VALIDATION, ...connectionValidation };
  const defaultMin = DEFAULT_CONNECTION_VALIDATION.username.min;
  const defaultMax = DEFAULT_CONNECTION_VALIDATION.username.max;

  validation.username.min = Number(validation.username.min) || defaultMin;
  validation.username.max = Number(validation.username.max) || defaultMax;

  if (validation.username.min > validation.username.max) {
    validation.username.min = defaultMin;
    validation.username.max = defaultMax;
  }

  return validation;
};
