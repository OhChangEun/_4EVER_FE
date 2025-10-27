'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { UserProps } from '@/app/components/header/types/UserType';

export default function ProfileDropdown({
  userName = '홍길동',
  userEmail = 'hong@company.com',
  userRole = '관리자',
}: UserProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    // 로그아웃 로직
    console.log('로그아웃');
    // router.push('/login');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors duration-200"
        aria-label="프로필 메뉴"
      >
        {/* 프로필 */}
        <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
          <i className="ri-user-3-line text-gray-600 text-xl"></i>
        </div>
        {/* 이름 & 직급 */}
        <div className="hidden md:block text-left pl-1">
          <div className="text-sm font-medium text-gray-900">{userName}</div>
          <div className="text-xs text-gray-400">{userRole}</div>
        </div>
        <i
          className={`ri-arrow-down-s-line text-lg font-medium transition-transform ${isOpen ? 'rotate-180' : ''}`}
        ></i>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50 animate-fade-in">
          {/* 프로필 정보 */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <i className="ri-user-3-line text-gray-600"></i>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{userName}</p>
                <p className="text-xs text-gray-500">{userEmail}</p>
              </div>
            </div>
          </div>

          {/* 메뉴 아이템 */}
          <div className="py-1">
            <Link
              href="/profile"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <i className="ri-user-settings-line mr-3 text-gray-400"></i>
              프로필 설정
            </Link>
            <Link
              href="/settings"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <i className="ri-settings-3-line mr-3 text-gray-400"></i>
              시스템 설정
            </Link>
            <hr className="my-1 border-gray-200" />
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer transition-colors"
            >
              <i className="ri-logout-box-line mr-3"></i>
              로그아웃
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
