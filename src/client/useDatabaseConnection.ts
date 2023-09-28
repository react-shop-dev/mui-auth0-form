import { useAuthClient } from './AuthClientProvider';

export const useDatabaseConnection = (databaseConnectionName: string) => {
  const client = useAuthClient();

  return client.connections?.database.find(
    connection => connection.name === databaseConnectionName,
  );
};
