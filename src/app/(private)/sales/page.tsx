import { Suspense } from 'react';
import { getCustomerSalesStats, getSalesStats } from '@/app/(private)/sales/sales.api';
import StatSection from '@/app/components/common/StatSection';
import {
  mapCustomerSalesStatsToCards,
  mapSalesStatsToCards,
} from '@/app/(private)/sales/sales.service';
import SalesTabs from './components/tabs/SalesTabs';
import { cookies } from 'next/headers';

export default async function SalesPage() {
  const cookieStore = await cookies();
  const role = cookieStore.get('role')?.value ?? null;

  let res;
  let salesStatsData;
  if (role === 'CUSTOMER_ADMIN') {
    res = await getCustomerSalesStats();
    salesStatsData = mapCustomerSalesStatsToCards(res);
  } else {
    res = await getSalesStats();
    salesStatsData = mapSalesStatsToCards(res);
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
          statsData={salesStatsData}
        />
        {/* 탭 콘텐츠 */}
        <Suspense fallback={<div>Loading...</div>}>
          <SalesTabs />
        </Suspense>
      </main>
    </div>
  );
}
