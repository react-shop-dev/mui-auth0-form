import { useState } from 'react';
import { purple, blueGrey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import LockClockIcon from '@mui/icons-material/LockClock';
import LockIcon from '@mui/icons-material/Lock';
import CardView from '../../ui/CardView';
import FormHeader from '../../ui/TopBar';
import { useHasConnections } from '../../../client/useHasConnections';
import { usePasswordlessConnection } from '../../../client/usePasswordlessConnection';
import { PasswordlessStart } from './PasswordlessStart';
import { PasswordlessLogin } from './PasswordlessLogin';

const PasswordlessForm = () => {
  const [identifier, setIdentifier] = useState<string | null>(null);

  const passwordlessEnabled = useHasConnections('passwordless');

  if (!passwordlessEnabled) {
    console.error('Passwordless option is disabled!');
    return null;
  }

  const { strategy } = usePasswordlessConnection();
  const isPhoneStrategy = strategy === 'sms';
  const source = isPhoneStrategy ? 'phoneNumber' : 'email';

  return (
    <CardView>
      <FormHeader
        logo={identifier ? LockClockIcon : LockIcon}
        sx={{ backgroundColor: identifier ? blueGrey[500] : purple[400] }}
      />
      <Box>
        {identifier ? (
          <PasswordlessLogin source={source} identifier={identifier} />
        ) : (
          <PasswordlessStart
            source={source}
            isPhoneStrategy={isPhoneStrategy}
            successAction={event => {
              setIdentifier(event[source]);
            }}
          />
        )}
      </Box>
    </CardView>
  );
};

export interface PasswordlessData {
  email?: string;
  phoneNumber?: string;
}

export type PasswordlessSource = 'phoneNumber' | 'email';

export default PasswordlessForm;
