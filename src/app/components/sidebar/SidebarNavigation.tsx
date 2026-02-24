'use client';

import { useRole } from '@/app/hooks/useRole';
import { FCM, HRM, IM, MM, PP, SD } from '@/lib/role';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebarStore } from '@/store/sidebarStore';
import { useEffect, useState } from 'react';

const NAV_ITEMS = [
  {
    href: '/dashboard',
    label: '대시보드',
    icon: 'ri-dashboard-line',
    roles: ['ALL_ADMIN', ...MM, ...HRM, ...FCM, ...IM, ...PP, ...SD, 'CUSTOMER_ADMIN'],
  },
  {
    href: '/sales',
    label: '영업관리',
    icon: 'ri-line-chart-line',
    roles: ['ALL_ADMIN', ...MM, ...SD, ...IM, ...PP, 'CUSTOMER_ADMIN'],
  },
  {
    href: '/production',
    label: '생산관리',
    icon: 'ri-settings-3-line',
    roles: ['ALL_ADMIN', ...MM, ...SD, ...IM, ...PP],
  },
  {
    href: '/purchase',
    label: '구매관리',
    icon: 'ri-shopping-cart-line',
    roles: ['ALL_ADMIN', ...MM, ...SD, ...IM, ...PP, 'SUPPLIER_ADMIN'],
  },
  {
    href: '/inventory',
    label: '재고관리',
    icon: 'ri-archive-line',
    roles: ['ALL_ADMIN', ...MM, ...SD, ...IM, ...PP],
  },
  {
    href: '/finance',
    label: '재무관리',
    icon: 'ri-money-dollar-circle-line',
    roles: ['ALL_ADMIN', ...FCM, 'CUSTOMER_ADMIN', 'SUPPLIER_ADMIN'],
  },
  {
    href: '/hrm',
    label: '인적자원관리',
    icon: 'ri-team-line',
    roles: ['ALL_ADMIN', ...HRM],
  },
] as const;

interface SidebarNavigationProps {
  isExpanded: boolean;
}

export default function SidebarNavigation({ isExpanded }: SidebarNavigationProps) {
  const pathname = usePathname();
  const role = useRole();
  const setExpanded = useSidebarStore((state) => state.setExpanded);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // role에 따라 label 변경
  const accessibleNavItems = NAV_ITEMS.filter((item) => item.roles.includes(role as string)).map(
    (item) => {
      let label = item.label;

      if (role === 'SUPPLIER_ADMIN' && item.href === '/purchase') {
        label = '영업관리'; // SUPPLIER_ADMIN이면 구매관리 -> 영업관리
      }

      if (role === 'CUSTOMER_ADMIN' && item.href === '/sales') {
        label = '구매관리'; // CUSTOMER_ADMIN이면 영업관리 -> 구매관리
      }

      return { ...item, label };
    },
  );

  const isActive = (href: string) => pathname === href;

  const handleLinkClick = () => {
    // 모바일에서만 사이드바 닫기
    if (isMobile) {
      setExpanded(false);
    }
  };

  return (
    <ul className="space-y-1 px-2">
      {accessibleNavItems.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            onClick={handleLinkClick}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
              isActive(item.href)
                ? 'bg-blue-100 text-blue-600 font-medium'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
            title={!isExpanded ? item.label : undefined}
          >
            <i
              className={`${item.icon} text-xl shrink-0 ${
                isActive(item.href) ? 'text-blue-600' : 'text-gray-500'
              }`}
            />
            <span
              className={`transition-all duration-300 whitespace-nowrap ${
                isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
              }`}
            >
              {item.label}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
