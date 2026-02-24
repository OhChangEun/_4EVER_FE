'use client';

import { useEffect } from 'react';
import SidebarNavigation from './SidebarNavigation';
import Logo from '@/app/components/header/Logo';
import { useSidebarStore } from '@/store/sidebarStore';

export default function Sidebar() {
  const { isExpanded, toggleSidebar, setExpanded } = useSidebarStore();

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      if (mobile && isExpanded) {
        setExpanded(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isExpanded, setExpanded]);

  return (
    <>
      {/* 모바일 오버레이 */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity duration-300 ${
          isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setExpanded(false)}
      />

      {/* 사이드바 */}
      <aside
        className={`fixed left-0 top-0 h-full bg-white shadow-lg z-40 transition-all duration-300 ease-in-out
          lg:translate-x-0 ${
            isExpanded ? 'w-64 translate-x-0' : 'w-16 lg:translate-x-0 -translate-x-full'
          }`}
      >
        {/* 사이드바 헤더 */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div
            className={`transition-all duration-300 overflow-hidden ${
              isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'
            }`}
          >
            <Logo />
          </div>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
            aria-label={isExpanded ? '사이드바 접기' : '사이드바 펼치기'}
          >
            <i
              className={`ri-menu-fold-line text-xl text-gray-600 transition-transform duration-300 ${
                isExpanded ? '' : 'rotate-180'
              }`}
            />
          </button>
        </div>

        {/* 네비게이션 */}
        <nav className="py-4 overflow-y-auto" style={{ height: 'calc(100vh - 64px)' }}>
          <SidebarNavigation isExpanded={isExpanded} />
        </nav>
      </aside>
    </>
  );
}
