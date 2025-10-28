'use client';

import { ReactNode, useEffect, useState } from 'react';
import { trySilentRefresh } from '@/lib/auth/refresh';
import { startAuthorization } from '@/lib/auth/startAuthorization';

export default function PrivateGuard({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('access_token');
      const exp = Number(localStorage.getItem('access_token_expires_at'));

      // 토큰이 없거나 만료되었을때
      if (!token || Date.now() > exp) {
        try {
          await trySilentRefresh();
        } catch {
          startAuthorization(window.location.pathname);
          return;
        }
      }

      setReady(true);
    })();
  }, []);

  if (!ready) return <p>세션 확인 중...</p>;

  return <>{children}</>;
}
