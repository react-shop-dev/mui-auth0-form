import { useAuthClient } from '.';
import { ConnectionName } from '../interfaces';

export const useHasConnections = (connectionName?: ConnectionName) => {
  const client = useAuthClient();

  const connections: string[] = [];
  Object.keys(client.connections).forEach(key => {
    if (client.connections[key].length > 0) {
      connections.push(key);
    }
  });

  if (connectionName) {
    return connections.includes(connectionName);
  }

  return connections;
};
