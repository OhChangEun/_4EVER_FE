'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/dashboard', label: '대시보드' },
  { href: '/purchase', label: '구매관리' },
  { href: '/sales', label: '영업관리' },
  { href: '/inventory', label: '재고관리' },
  { href: '/finance', label: '재무관리' },
  { href: '/hrm', label: '인적자원관리' },
  { href: '/production', label: '생산관리' },
] as const;

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="hidden lg:flex">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`px-3 pt-3.5 pb-2 cursor-pointer transition-colors font-normal ${
            isActive(item.href)
              ? 'text-gray-900 font-semibold'
              : 'text-gray-400 hover:text-gray-800 hover:font-semibold'
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
