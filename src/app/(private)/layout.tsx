'use client';

import Header from '@/app/components/header/Header';
import Sidebar from '@/app/components/sidebar/Sidebar';
import PrivateGuard from './_PrivateGuard';
import { useSidebarStore } from '@/store/sidebarStore';
import { useEffect, useState } from 'react';

export const dynamic = 'force-dynamic';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const isExpanded = useSidebarStore((state) => state.isExpanded);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <Sidebar />
      <div
        className="flex flex-col transition-all duration-300"
        style={{
          marginLeft: isMobile ? '0' : isExpanded ? '256px' : '64px',
        }}
      >
        <Header />
        <main className="pt-16 min-h-screen bg-gray-50">
          <PrivateGuard>{children}</PrivateGuard>
        </main>
      </div>
    </>
  );
}

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return <LayoutContent>{children}</LayoutContent>;
}
