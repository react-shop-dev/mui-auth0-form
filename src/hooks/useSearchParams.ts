import { useMemo } from 'react';

export const useSearchParams = () => useMemo(() => new URLSearchParams(window.location.search), []);
