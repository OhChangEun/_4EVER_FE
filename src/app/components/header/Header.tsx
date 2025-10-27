'use client';

import { useEffect, useState } from 'react';
import Logo from '@/app/components/header/Logo';
import Navigation from '@/app/components/header/Navigation';
import NotificationDropdown from '@/app/components/header/NoificationDropdown';
import ProfileDropdown from '@/app/components/header/ProfileDropdown';
import { UserProps } from '@/app/components/header/types/UserType';

export default function Header({
  userRole = '관리자',
  userName = '홍길동',
  userEmail = 'hong@company.com',
}: UserProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-sm border-gray-100' : 'bg-gray-50'
      }`}
    >
      <div className="min-w-full mx-auto px-8 sm:px-6 lg:px-4">
        <div className="flex justify-between items-center h-16">
          {/* 좌측: 로고 + 네비게이션 바*/}
          <div className="flex gap-4">
            <Logo />
            <Navigation />
          </div>

          {/* 우측: 알림 + 프로필 */}
          <div className="flex items-center space-x-4">
            <NotificationDropdown />
            <ProfileDropdown userName={userName} userEmail={userEmail} userRole={userRole} />
          </div>
        </div>
      </div>
    </header>
  );
}
