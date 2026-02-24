'use client';

import { useEffect, useState } from 'react';
import ProfileDropdown from '@/app/components/header/ProfileDropdown';
import { useSidebarStore } from '@/store/sidebarStore';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isExpanded, toggleSidebar } = useSidebarStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 z-30 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-sm border-gray-100' : 'bg-gray-50'
      } lg:left-auto`}
      style={{
        left: typeof window !== 'undefined' && window.innerWidth >= 1024
          ? isExpanded ? '256px' : '64px'
          : '0',
      }}
    >
      <div className="min-w-full mx-auto px-4 sm:px-6 lg:px-4">
        <div className="flex justify-between items-center h-16">
          {/* 모바일 햄버거 메뉴 */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="메뉴 열기"
          >
            <i className="ri-menu-line text-2xl text-gray-600" />
          </button>

          {/* 우측: 알림 + 프로필 */}
          <div className="flex items-center space-x-4 ml-auto">
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}
