'use client';

import { ReactNode, useEffect, useState } from 'react';
import { trySilentRefresh } from '@/lib/auth/refresh';
import { startAuthorization } from '@/lib/auth/startAuthorization';
import Cookies from 'js-cookie';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '../(public)/callback/callback.api';
import { useAuthStore } from '@/store/authStore';

export default function PrivateGuard({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const { userInfo, setUserInfo } = useAuthStore();

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
  const { data } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    enabled: ready && !userInfo, // 스토어에 값이 없고 가드가 준비된 경우에만 호출
  });

  useEffect(() => {
    if (data) {
      setUserInfo(data);
    }
  }, [data, setUserInfo]);

  if (!ready) return <p>세션 확인 중...</p>;

  return <>{children}</>;
}
