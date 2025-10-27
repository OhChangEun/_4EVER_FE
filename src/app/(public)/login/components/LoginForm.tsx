'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 이메일 입력 */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            이메일 주소
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="ri-mail-line text-gray-400"></i>
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              placeholder="your@email.com"
              required
            />
          </div>
        </div>

        {/* 비밀번호 입력 */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            비밀번호
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="ri-lock-line text-gray-400"></i>
            </div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              placeholder="비밀번호를 입력하세요"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            >
              <i
                className={`${showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} text-gray-400 hover:text-gray-600`}
              ></i>
            </button>
          </div>
        </div>

        {/* 로그인 유지 및 비밀번호 찾기 */}
        <div className="flex items-center justify-between">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-600">로그인 상태 유지</span>
          </label>
          <Link
            href="/forgot-password"
            className="text-sm text-indigo-600 hover:text-indigo-5

0 cursor-pointer"
          >
            비밀번호를 잊으셨나요?
          </Link>
        </div>

        {/* 로그인 버튼 */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors whitespace-nowrap cursor-pointer"
          onClick={() => router.push('/dashboard')}
        >
          로그인
        </button>
      </form>
      {/* ------- 소셜 로그인 및 회원가입 보류( 기업에서 랜덤 비밀번호 부여 예정 ) */}
      {/* 구분선 */}
      {/* <div className="mt-6 mb-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">또는</span>
          </div>
        </div>
      </div> */}

      {/* 소셜 로그인 */}
      {/* <div className="space-y-3">
        <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap">
          <i className="ri-google-fill text-red-500 mr-3"></i>
          Google로 로그인
        </button>
        <button
          className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover

:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
        >
          <i className="ri-microsoft-fill text-blue-500 mr-3"></i>
          Microsoft로 로그인
        </button>
      </div> */}

      {/* 회원가입 링크 */}
      {/* <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          계정이 없으신가요?{' '}
          <Link
            href="/register"
            className="text-indigo-600 hover:text-indigo-500 font-medium cursor-pointer"
          >
            회원가입
          </Link>
        </p>
      </div> */}
    </div>
  );
};

export default LoginForm;
