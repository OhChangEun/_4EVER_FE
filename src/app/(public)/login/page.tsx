'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { persistAccessToken } from '@/lib/auth/tokenStorage';
import { useAuthStore } from '@/store/authStore';
import { buildMockUser, saveLoginId } from '@/lib/auth/simpleLogin';

export default function LoginPage() {
  const router = useRouter();
  const { setUserInfo } = useAuthStore();
  const [loginId, setLoginId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = loginId.trim();

    if (!trimmed) {
      setError('아이디를 입력해 주세요.');
      return;
    }

    saveLoginId(trimmed);
    const user = buildMockUser(trimmed);

    persistAccessToken('demo-access-token', 60 * 60 * 24);
    setUserInfo(user);
    Cookies.set('role', user.role.toUpperCase(), { path: '/', sameSite: 'lax' });

    const returnTo = localStorage.getItem('oauth_return_to') || '/dashboard';
    localStorage.removeItem('oauth_return_to');

    router.replace(returnTo);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 px-10 py-12 space-y-8">
        <div className="space-y-3 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500 text-2xl">
            <i className="ri-login-circle-line" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-semibold text-slate-900">간편 로그인</h1>
          <p className="text-sm text-slate-500">
            아이디만 입력하면 데모 환경으로 바로 접속할 수 있어요.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="loginId" className="text-sm font-medium text-slate-700">
              아이디
            </label>
            <input
              id="loginId"
              name="loginId"
              type="text"
              value={loginId}
              onChange={(event) => {
                setLoginId(event.target.value);
                if (error) setError('');
              }}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-200"
              placeholder="예: demo"
              autoComplete="username"
              required
            />
            {error ? <p className="text-xs text-red-500">{error}</p> : null}
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/30 transition hover:bg-red-600"
          >
            로그인
          </button>
        </form>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 text-xs text-slate-600 space-y-2">
          <p className="font-medium text-slate-800">안내</p>
          <p>이 화면은 데모용 로그인입니다. 입력한 아이디로 바로 접속됩니다.</p>
        </div>
      </div>
    </div>
  );
}
