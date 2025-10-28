'use client';

import { useEffect } from 'react';
import axios from 'axios';
import { startAuthorization } from '@/lib/auth/startAuthorization';

const REDIRECT_URI = 'http://localhost:3000/callback';
// const REDIRECT_URI = 'https://everp.co.kr/callback';
const TOKEN_URL = 'https://auth.everp.co.kr/oauth2/token';

function saveAccessToken(at: string, expiresIn: number) {
  const expiresAt = Date.now() + expiresIn * 1000;
  localStorage.setItem('access_token', at);
  localStorage.setItem('access_token_expires_at', String(expiresAt));
}

function cleanupPkce() {
  localStorage.removeItem('pkce_verifier');
  localStorage.removeItem('oauth_state');
}

export default function CallbackPage() {
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
          client_id: 'everp-spa',
          redirect_uri: REDIRECT_URI,
          code,
          code_verifier: verifier,
        });

        const res = await axios.post(TOKEN_URL, body.toString(), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            // Authorization: 'Basic ZXZIcnA6c3VwZXItc2VjcmV0',
          },
        });

        const { access_token, expires_in } = res.data;

        saveAccessToken(access_token, expires_in);
        // cleanupPkce();

        const returnTo = localStorage.getItem('oauth_return_to') || '/';
        localStorage.removeItem('oauth_return_to');
        // localStorage.removeItem('oauth_state');

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
