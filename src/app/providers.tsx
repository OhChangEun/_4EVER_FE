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
  const [mswStatus, setMswStatus] = useState<string>('initializing');

  useEffect(() => {
    // 즉시 실행되는 환경 변수 체크
    const envCheck = {
      NEXT_PUBLIC_API_MOCKING: process.env.NEXT_PUBLIC_API_MOCKING,
      NODE_ENV: process.env.NODE_ENV,
    };
    
    console.log('=== [Providers] useEffect 실행됨 ===');
    console.log('[Providers] 환경 변수:', envCheck);
    setMswStatus(`env: ${JSON.stringify(envCheck)}`);
    
    import('@/mocks')
      .then(({ setupMocks }) => {
        console.log('[Providers] setupMocks 함수 로드 성공');
        return setupMocks();
      })
      .then(() => {
        console.log('[Providers] setupMocks 완료');
        setMswStatus('MSW setup completed');
      })
      .catch((err) => {
        console.error('[Providers] MSW setup 실패:', err);
        setMswStatus(`MSW setup failed: ${err.message}`);
      });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {process.env.NODE_ENV === 'development' && (
        <div
          style={{
            position: 'fixed',
            bottom: 10,
            right: 10,
            background: 'black',
            color: 'white',
            padding: '8px',
            fontSize: '12px',
            zIndex: 9999,
            maxWidth: '300px',
            wordBreak: 'break-all',
          }}
        >
          MSW: {mswStatus}
        </div>
      )}
      <HydrationBoundary state={dehydratedState}>
        <ModalProvider>{children}</ModalProvider>
      </HydrationBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
