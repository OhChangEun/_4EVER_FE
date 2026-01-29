'use client';

import { useEffect } from 'react';
import { startAuthorization } from '@/lib/auth/startAuthorization';
import { login } from './callback.api';
import { useAuthStore } from '@/store/authStore';
import Cookies from 'js-cookie';
import { persistAccessToken } from '@/lib/auth/tokenStorage';

export default function CallbackPage() {
  const { setUserInfo } = useAuthStore();
  useEffect(() => {
    (async () => {
      try {
        const { accessToken, user } = await login();
        persistAccessToken(accessToken, 60 * 60 * 24);
        const userInfo = user;
        setUserInfo(userInfo);
        Cookies.set('role', userInfo.role.toUpperCase(), { path: '/', sameSite: 'lax' });

        const returnTo = localStorage.getItem('oauth_return_to') || '/';
        localStorage.removeItem('oauth_return_to');

        window.history.replaceState({}, '', new URL(returnTo, window.location.origin).toString());
        window.location.replace(returnTo);
      } catch (error: unknown) {
        alert(error);
        startAuthorization('/');
      }
    })();
  }, [setUserInfo]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 px-10 py-12 text-center space-y-6">
        <div
          className="mx-auto h-16 w-16 rounded-full border-4 border-t-transparent border-red-400 animate-spin"
          aria-hidden
        />
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold text-slate-900">로그인 정보를 확인하고 있어요</h1>
          <p className="text-sm leading-relaxed text-slate-600">
            계정 권한과 세션을 확인한 뒤 원래 화면으로 이동합니다. 잠시만 기다려 주세요.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5 text-left text-sm text-slate-600 space-y-2">
          <p className="font-medium text-slate-900">진행 중인 작업</p>
          <ul className="space-y-1">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-red-400">•</span>
              <span>모의 로그인 토큰을 발급하고 있어요.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-red-400">•</span>
              <span>사용자 정보를 설정하고 역할을 확인하는 중입니다.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-red-400">•</span>
              <span>준비가 완료되면 자동으로 이전 페이지로 돌아갑니다.</span>
            </li>
          </ul>
        </div>
        <p className="text-xs text-slate-400" role="status" aria-live="polite">
          화면이 오래 머물러 있으면 새로고침하거나 관리자에게 문의해 주세요.
        </p>
      </div>
    </div>
  );
}
