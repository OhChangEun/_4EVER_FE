'use client';

import { QueryClientProvider, HydrationBoundary, DehydratedState } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect, useState } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { ModalProvider } from './components/common/modal/ModalProvider';

export default function Providers({
  children,
  dehydratedState,
}: {
  children: React.ReactNode;
  dehydratedState?: DehydratedState | null;
}) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
      import('@/mocks')
        .then(({ setupMocks }) => setupMocks())
        .catch((err) => console.error('[MSW] Setup failed:', err));
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <ModalProvider>{children}</ModalProvider>
      </HydrationBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
