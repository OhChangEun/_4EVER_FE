'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { startAuthorization } from '@/lib/auth/startAuthorization';
import { USER_ENDPOINTS } from '@/app/types/api';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from './callback.api';
import { useAuthStore } from '@/store/authStore';

// const REDIRECT_URI = 'http://localhost:3000/callback'; // 배포용
const REDIRECT_URI = 'https://everp.co.kr/callback'; // 서버용

function saveAccessToken(at: string, expiresIn: number) {
  const expiresAtMs = Date.now() + expiresIn * 1000; // 밀리초 타임스탬프
  const expiresDays = expiresIn / (60 * 60 * 24);
  console.log(at);
  Cookies.set('access_token', at, {
    expires: expiresDays,
    secure: true,
    sameSite: 'strict',
    path: '/',
  });
  Cookies.set('access_token_expires_at', String(expiresAtMs), {
    expires: expiresDays,
    secure: true,
    sameSite: 'strict',
    path: '/',
  });
}

function cleanupPkce() {
  localStorage.removeItem('pkce_verifier');
  localStorage.removeItem('oauth_state');
}

export default function CallbackPage() {
  const [isTokenReady, setIsTokenReady] = useState(false);
  const { setUserInfo } = useAuthStore();
  const {
    data: userInfoRes,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    enabled: isTokenReady,
  });

  useEffect(() => {
    if (isSuccess && userInfoRes) {
      setUserInfo(userInfoRes);
    }
  }, [isSuccess, userInfoRes, setUserInfo]);
  useEffect(() => {
    (async () => {
      try {
        const q = new URLSearchParams(window.location.search);
        const code = q.get('code');
        const state = q.get('state');
        const expected = localStorage.getItem('oauth_state');

        console.log('state', state);
        console.log('expected', expected);
        console.log(localStorage.getItem('oauth_state'));

        if (!code || !state || !expected || state !== expected) {
          cleanupPkce();
          throw new Error('Invalid state or code');
        }

        const verifier = localStorage.getItem('pkce_verifier');
        console.log('verify', verifier);
        if (!verifier) throw new Error('Missing PKCE verifier');

        const body = new URLSearchParams({
          grant_type: 'authorization_code',
          // client_id: 'everp-spa', // 로컬용
          client_id: 'everp', // 배포용
          redirect_uri: REDIRECT_URI,
          code,
          code_verifier: verifier,
        });

        const res = await axios.post(USER_ENDPOINTS.LOGIN, body.toString(), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            // Authorization: 'Basic ZXZIcnA6c3VwZXItc2VjcmV0',
          },
        });

        const { access_token, expires_in } = res.data;

        saveAccessToken(access_token, expires_in);
        setIsTokenReady(true);
        // cleanupPkce();

        const returnTo = localStorage.getItem('oauth_return_to') || '/';
        localStorage.removeItem('oauth_return_to');
        localStorage.removeItem('oauth_state');

        window.history.replaceState({}, '', new URL(returnTo, window.location.origin).toString());
        window.location.replace(returnTo);
      } catch (error: unknown) {
        let errMessage = 'token_exchange_failed';
        alert(error);
        if (axios.isAxiosError(error)) {
          errMessage =
            error.response?.data?.error ||
            error.response?.data?.message ||
            error.message ||
            'token_exchange_failed';
        } else if (error instanceof Error) {
          errMessage = error.message;
        }

        // cleanupPkce();

        if (errMessage === 'invalid_grant') {
          // startAuthorization('/');
          return;
        }

        throw new Error(errMessage);
      }
    })();
  }, []);

  return <p>Signing you in…</p>;
}
