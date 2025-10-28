'use client';

import { useEffect } from 'react';
import axios from 'axios';
import { startAuthorization } from '@/lib/auth/startAuthorization';

const TOKEN_URL = process.env.NEXT_PUBLIC_TOKEN_URL!;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI!;

function saveAccessToken(at: string, expiresIn: number) {
  const expiresAt = Date.now() + expiresIn * 1000;
  localStorage.setItem('access_token', at);
  localStorage.setItem('access_token_expires_at', String(expiresAt));
}

function cleanupPkce() {
  sessionStorage.removeItem('pkce_verifier');
  sessionStorage.removeItem('oauth_state');
}

export default function CallbackPage() {
  useEffect(() => {
    (async () => {
      try {
        const q = new URLSearchParams(window.location.search);
        const code = q.get('code');
        const state = q.get('state');
        const expected = sessionStorage.getItem('oauth_state');

        if (!code || !state || !expected || state !== expected) {
          cleanupPkce();
          throw new Error('Invalid state or code');
        }

        const verifier = sessionStorage.getItem('pkce_verifier');
        if (!verifier) throw new Error('Missing PKCE verifier');

        const body = new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: REDIRECT_URI,
          client_id: CLIENT_ID,
          code_verifier: verifier,
        });

        const res = await axios.post(TOKEN_URL, body.toString(), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        const data = res.data;
        saveAccessToken(data.access_token, data.expires_in);
        cleanupPkce();

        const returnTo = sessionStorage.getItem('oauth_return_to') || '/';
        sessionStorage.removeItem('oauth_return_to');

        window.history.replaceState({}, '', new URL(returnTo, window.location.origin).toString());
        window.location.replace(returnTo);
      } catch (error: unknown) {
        let errMessage = 'token_exchange_failed';

        if (axios.isAxiosError(error)) {
          errMessage =
            error.response?.data?.error ||
            error.response?.data?.message ||
            error.message ||
            'token_exchange_failed';
        } else if (error instanceof Error) {
          errMessage = error.message;
        }

        cleanupPkce();

        if (errMessage === 'invalid_grant') {
          startAuthorization('/');
          return;
        }

        throw new Error(errMessage);
      }
    })();
  }, []);

  return <p>Signing you in…</p>;
}
