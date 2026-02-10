'use client';

import { Suspense } from 'react';
import {
  getCustomerStats,
  getFinanceStats,
  getSupplierStats,
} from '@/app/(private)/finance/finance.api';
import ErrorMessage from '@/app/components/common/ErrorMessage';
import { mapCustomerSupplierStatsToCards, mapFinanceStatsToCards } from './finance.service';
import StatSection from '@/app/components/common/StatSection';
import FinanceTabs from './components/tabs/FinanceTabs';
import { useRole } from '@/app/hooks/useRole';
import { useQuery } from '@tanstack/react-query';

export default function FinancePage() {
  const role = useRole();

  const { data: res, isLoading } = useQuery({
    queryKey: ['financeStats', role],
    queryFn: async () => {
      if (role === 'CUSTOMER_ADMIN') {
        return await getCustomerStats();
      } else if (role === 'SUPPLIER_ADMIN') {
        return await getSupplierStats();
      } else {
        return await getFinanceStats();
      }
    },
    enabled: !!role,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  const financeStatsData = res
    ? role === 'CUSTOMER_ADMIN' || role === 'SUPPLIER_ADMIN'
      ? mapCustomerSupplierStatsToCards(res.data)
      : mapFinanceStatsToCards(res.data)
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 페이지 헤더 */}
        {res?.success && financeStatsData ? (
          <StatSection
            title="재무 관리"
            subTitle="전표 관리 및 재무 현황"
            statsData={financeStatsData}
          />
        ) : (
          <ErrorMessage message={'재무 통계 데이터를 불러오는데 실패했습니다.'} />
        )}

        {/* 탭 네비게이션 */}
        <Suspense fallback={<div>Loading...</div>}>
          <FinanceTabs />
        </Suspense>
      </main>
    </div>
  );
}
