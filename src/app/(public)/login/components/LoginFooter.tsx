'use client';

import Link from 'next/link';

const LoginFooter = () => {
  return (
    <div className="mt-8 text-center text-xs text-gray-500">
      <p>© 2024 ERP 시스템. 모든 권리 보유.</p>
      <div className="mt-2 space-x-4">
        <Link href="/privacy" className="hover:text-gray-700 cursor-pointer">
          개인정보처리방침
        </Link>
        <Link href="/terms" className="hover:text-gray-700 cursor-pointer">
          이용약관
        </Link>
        <Link href="/support" className="hover:text-gray-700 cursor-pointer">
          고객지원
        </Link>
      </div>
    </div>
  );
};

export default LoginFooter;
