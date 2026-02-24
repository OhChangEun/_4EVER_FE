'use client';

import React from 'react';
import Providers from '@/app/providers';
import Sidebar from '@/app/components/sidebar/Sidebar';
import { useSidebarStore } from '@/store/sidebarStore';

function ProfileLayoutContent({ children }: { children: React.ReactNode }) {
  const isExpanded = useSidebarStore((state) => state.isExpanded);
  const [isMobile, setIsMobile] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
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
          marginLeft: mounted && isMobile ? '0' : isExpanded ? '256px' : '64px',
        }}
      >
        <main className="min-h-screen bg-gray-50">{children}</main>
      </div>
    </>
  );
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <ProfileLayoutContent>{children}</ProfileLayoutContent>
    </Providers>
  );
}
