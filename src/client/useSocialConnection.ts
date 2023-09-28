import { useAuthClient } from './AuthClientProvider';

export const useSocialConnections = () => {
  const client = useAuthClient();

  return client.connections?.social || [];
};
