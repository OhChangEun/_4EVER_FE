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
    const shouldMock =
      process.env.NEXT_PUBLIC_API_MOCKING === 'enabled' ||
      process.env.NODE_ENV === 'development';

    if (shouldMock) {
      import('@/mocks').then(({ setupMocks }) => setupMocks());
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* 서버에서 미리 받아온 데이터를 클라이언트에서 다시 불러오지 않고 hydrate */}
      <HydrationBoundary state={dehydratedState}>
        <ModalProvider>{children}</ModalProvider>
      </HydrationBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
