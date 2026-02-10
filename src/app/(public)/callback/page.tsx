'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CallbackPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/login');
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 px-10 py-12 text-center space-y-6">
        <div
          className="mx-auto h-16 w-16 rounded-full border-4 border-t-transparent border-red-400 animate-spin"
          aria-hidden
        />
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold text-slate-900">로그인 페이지로 이동 중이에요</h1>
          <p className="text-sm leading-relaxed text-slate-600">
            간편 로그인 화면으로 이동하고 있습니다. 잠시만 기다려 주세요.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5 text-left text-sm text-slate-600 space-y-2">
          <p className="font-medium text-slate-900">진행 중인 작업</p>
          <ul className="space-y-1">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-red-400">•</span>
              <span>간편 로그인 화면을 준비하고 있어요.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-red-400">•</span>
              <span>이전 경로를 확인하고 있습니다.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-red-400">•</span>
              <span>준비가 완료되면 로그인 화면으로 이동합니다.</span>
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
