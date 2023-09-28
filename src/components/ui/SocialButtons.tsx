import { useState, BaseSyntheticEvent } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { AuthError } from '../../interfaces';
import { useSocialConnections } from '../../client/useSocialConnection';
import { Icons } from '../../social/icons';
import { useAuth0 } from '../../auth';
import Feedback from './Feedback';

export interface SocialButtonsProps extends ButtonProps {
  prefix?: string;
}

const SocialButtons = (props: SocialButtonsProps) => {
  const { prefix, ...rest } = props;

  const { loginWithSocial } = useAuth0();

  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<AuthError | undefined>(undefined);

  const connections = useSocialConnections();

  const handleSocialConnection = async (event: BaseSyntheticEvent, connection: string) => {
    event.preventDefault();
    setLoading(true);
    try {
      loginWithSocial(connection);
    } catch (error) {
      setAuthError(error as AuthError);
    }
  };

  const renderIcon = (connectionName: string) => Icons[connectionName];

  if (connections.length === 0) {
    return null;
  }

  return (
    <Root>
      {connections.map(connection => (
        <Button
          key={connection.name}
          className={`social-${connection.name}`}
          disabled={loading}
          variant="outlined"
          fullWidth
          onClick={event => handleSocialConnection(event, connection.name)}
          startIcon={renderIcon(connection.name)}
          {...rest}
        >
          {prefix} {connection.displayName}
        </Button>
      ))}
      <Feedback message={authError?.message || authError?.error} />
    </Root>
  );
};

export const Root = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2.5),
  ['& button']: {
    marginBottom: theme.spacing(1),
  },
  ['& .social-google-oauth2']: {
    color: 'gray',
    border: '1px solid lightgray',
  },
}));

export default SocialButtons;
