'use client';

import { ReactNode, useEffect, useState } from 'react';
import { trySilentRefresh } from '@/lib/auth/refresh';
import { startAuthorization } from '@/lib/auth/startAuthorization';
import Cookies from 'js-cookie';

export default function PrivateGuard({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const token = Cookies.get('access_token');
      const exp = Number(Cookies.get('access_token_expires_at'));

      if (!token || !exp || Date.now() > exp) {
        Cookies.remove('access_token');
        Cookies.remove('access_token_expires_at');

        try {
          // await trySilentRefresh();
          startAuthorization(window.location.pathname);
        } catch {
          startAuthorization(window.location.pathname);
          return;
        }
      }

      setReady(true);
    })();
  }, [setReady]);

  if (!ready) return <p>세션 확인 중...</p>;

  return <>{children}</>;
}
