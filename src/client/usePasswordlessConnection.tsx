import { useAuthClient } from '.';

export const usePasswordlessConnection = () => {
  const client = useAuthClient();

  return (client.connections?.passwordless || [])[0];
};
