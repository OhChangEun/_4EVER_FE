'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Cookies from 'js-cookie';
import { clearAccessToken, readStoredToken } from '@/lib/auth/tokenStorage';
import { buildMockUser, readLoginId } from '@/lib/auth/simpleLogin';

export default function PrivateGuard({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const { userInfo, setUserInfo } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { token, expiresAt } = readStoredToken();

      if (!token || !expiresAt || Date.now() > expiresAt) {
        clearAccessToken();
        setRedirecting(true);
        try {
          localStorage.setItem('oauth_return_to', window.location.pathname);
        } catch {
          // Ignore storage errors and continue redirect.
        }
        router.replace('/login');
        return;
      }

      setReady(true);
    })();
  }, [router, setReady]);

  useEffect(() => {
    if (!ready) return;

    if (!userInfo) {
      const loginId = readLoginId();
      const fallbackUser = buildMockUser(loginId ?? undefined);
      setUserInfo(fallbackUser);
      Cookies.set('role', fallbackUser.role.toUpperCase(), { path: '/', sameSite: 'lax' });
      return;
    }

    Cookies.set('role', userInfo.role.toUpperCase(), { path: '/', sameSite: 'lax' });
  }, [ready, userInfo, setUserInfo]);

  if (!ready) {
    return null;
  }

  return <>{children}</>;
}
