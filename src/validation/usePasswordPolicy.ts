import PasswordPolicy from 'password-sheriff/lib/policy';
import { useDatabaseConnection } from '../client';
import { DATABASE_CONNECTION } from '../auth/config';
import { formatMessages } from './formatMessage';

export const usePasswordPolicy = () => {
  const database = useDatabaseConnection(DATABASE_CONNECTION);

  const policy = new PasswordPolicy(database?.passwordPolicy);

  const handleValidation = (value: string): ValidationError[] | null => {
    const analysis = policy.missing(value);

    const errors: any = {};

    const prepareMessages = (items = [], message?: string) => {
      items.forEach((item: any) => {
        if (!item.verified && !errors[item.code]) {
          if (item.items) {
            prepareMessages(item.items, formatMessages(item.message, item.format));
          } else {
            errors[item.code] = {
              message: formatMessages(
                message ? `${message} ${item.message}` : item.message,
                item.format,
              ),
            };
          }
        }
      });
    };

    prepareMessages(analysis.rules);

    // @ts-ignore unknown types
    return errors ? Object.values(errors) : null;
  };

  return { policy: database?.passwordPolicy, handleValidation };
};

export interface ValidationError {
  message: string;
}
