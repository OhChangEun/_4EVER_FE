'use client';

import { ReactNode, useEffect, useState } from 'react';
import { trySilentRefresh } from '@/lib/auth/refresh';
import { startAuthorization } from '@/lib/auth/startAuthorization';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '../(public)/callback/callback.api';
import { useAuthStore } from '@/store/authStore';
import Cookies from 'js-cookie';

export default function PrivateGuard({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const { userInfo, setUserInfo } = useAuthStore();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('access_token');
      const exp = Number(localStorage.getItem('access_token_expires_at'));

      if (!token || !exp || Date.now() > exp) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('access_token_expires_at');
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
      Cookies.set('role', data.userRole.toUpperCase(), { path: '/', sameSite: 'lax' });
    }
  }, [data, setUserInfo]);

  if (!ready) return <p>세션 확인 중...</p>;

  return <>{children}</>;
}
