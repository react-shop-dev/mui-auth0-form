import { AuthClient, AuthClientArgs, Connection, StrategyType, Strategy } from '../interfaces';
import { STRATEGIES as SOCIAL_STRATEGIES } from '../social/providers';
import passwordPolicies from 'auth0-password-policies';
import { formatConnectionValidation } from '../validation/formatConnectionValifation';

export const formatClient = (client: AuthClientArgs) => {
  return {
    id: client.id,
    tenant: {
      name: client.tenant,
      subscription: client.subscription,
    },
    connections: formatClientConnections(client.strategies),
  };
};

const strategyNameToConnectionType = (connection: string) => {
  if (['oauth1', 'oauth2', ...Object.keys(SOCIAL_STRATEGIES)].includes(connection)) {
    return 'social';
  }

  switch (connection) {
    case 'auth0':
      return 'database';
    case 'email':
    case 'sms':
      return 'passwordless';
    default:
      return 'unknown';
  }
};

const initialConnections = {
  database: [],
  social: [],
  passwordless: [],
  unknown: [],
};

const formatClientConnections = (strategies: Strategy[]) => {
  const result: AuthClient['connections'] = JSON.parse(JSON.stringify(initialConnections));

  strategies.forEach(strategy => {
    const connectionType = strategyNameToConnectionType(strategy.name);
    const connections = strategy.connections.map(connection =>
      formatClientConnection(connectionType, strategy.name, connection),
    );
    result[connectionType].push(...connections);
  });

  return result;
};

const formatClientConnection = (
  connectionType: string,
  strategyName: StrategyType,
  connection: any,
) => {
  const result: Connection = {
    name: connection.name,
    strategy: strategyName,
    type: connectionType,
    displayName: connection.display_name || SOCIAL_STRATEGIES[strategyName],
  };

  if (connectionType === 'database') {
    result.passwordPolicy = passwordPolicies[connection.passwordPolicy || 'none'];

    if (
      connection.password_complexity_options &&
      connection.password_complexity_options.min_length
    ) {
      result.passwordPolicy.length.minLength = connection.password_complexity_options.min_length;
    }

    result.allowForgot = typeof connection.showForgot === 'boolean' ? connection.showForgot : true;
    result.allowSignup = typeof connection.showSignup === 'boolean' ? connection.showSignup : true;

    result.requiredUsername =
      typeof connection.requires_username === 'boolean' ? connection.requires_username : false;

    result.validation = formatConnectionValidation(connection.validation);
  }

  return result;
};
