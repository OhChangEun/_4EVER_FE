import { getQueryClient } from '@/lib/queryClient';
import { dehydrate } from '@tanstack/react-query';
import { Suspense } from 'react';
import Providers from '@/app/providers';
import { getQuoteList, getSalesStats } from '@/app/(private)/sales/sales.api';
import { QuoteQueryParams } from '@/app/(private)/sales/types/SalesQuoteListType';
import StatSection from '@/app/components/common/StatSection';
import { mapSalesStatsToCards } from '@/app/(private)/sales/sales.service';
import TabNavigation from '@/app/components/common/TabNavigation';
import { SALES_TABS } from '@/app/types/componentConstant';

export default async function SalesPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['stats'],
    queryFn: getSalesStats,
  });
  const salesStats = await getSalesStats();

  await queryClient.prefetchQuery({
    queryKey: [
      'quoteList',
      { page: 0, size: 10, startDate: '', endDate: '', status: 'ALL', search: '' },
    ],
    queryFn: ({ queryKey }) => getQuoteList(queryKey[1] as QuoteQueryParams),
  });

  const dehydratedState = dehydrate(queryClient);
  const salesStatsData = mapSalesStatsToCards(salesStats);
  return (
    <Providers dehydratedState={dehydratedState}>
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 페이지 헤더 */}
          <StatSection
            title="영업관리"
            subTitle="주문 및 고객 관리 시스템"
            statsData={salesStatsData}
          />
          {/* 탭 콘텐츠 */}
          <Suspense fallback={<div>Loading...</div>}>
            <TabNavigation tabs={SALES_TABS} />
          </Suspense>
        </main>
      </div>
    </Providers>
  );
}
