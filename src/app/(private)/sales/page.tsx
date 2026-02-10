'use client';

import { Suspense } from 'react';
import { getCustomerSalesStats, getSalesStats } from '@/app/(private)/sales/sales.api';
import StatSection from '@/app/components/common/StatSection';
import {
  mapCustomerSalesStatsToCards,
  mapSalesStatsToCards,
} from '@/app/(private)/sales/sales.service';
import SalesTabs from './components/tabs/SalesTabs';
import { useRole } from '@/app/hooks/useRole';
import { useQuery } from '@tanstack/react-query';

export default function SalesPage() {
  const role = useRole();

  const { data: salesStatsData, isLoading } = useQuery({
    queryKey: ['salesStats', role],
    queryFn: async () => {
      if (role === 'CUSTOMER_ADMIN') {
        const res = await getCustomerSalesStats();
        return mapCustomerSalesStatsToCards(res);
      } else {
        const res = await getSalesStats();
        return mapSalesStatsToCards(res);
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

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 페이지 헤더 */}
        <StatSection
          title={role === 'CUSTOMER_ADMIN' ? '구매 관리' : '영업관리'}
          subTitle={
            role === 'CUSTOMER_ADMIN'
              ? '주문, 견적 및 고객 관리 시스템'
              : '주문 및 고객 관리 시스템'
          }
          statsData={salesStatsData ?? []}
        />
        {/* 탭 콘텐츠 */}
        <Suspense fallback={<div>Loading...</div>}>
          <SalesTabs />
        </Suspense>
      </main>
    </div>
  );
}
