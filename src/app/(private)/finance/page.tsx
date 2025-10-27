import { Suspense } from 'react';
import { dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/queryClient';
import { getFinanceStats, getSalesInvoicesList } from '@/app/(private)/finance/finance.api';
import { InvoiceQueryParams } from './types/InvoiceListType';
import Providers from '@/app/providers';
import ErrorMessage from '@/app/components/common/ErrorMessage';
import { mapFinanceStatsToCards } from './finance.service';
import StatSection from '@/app/components/common/StatSection';
import TabNavigation from '@/app/components/common/TabNavigation';
import { FINANCE_TABS } from '@/app/types/componentConstant';

export default async function FinancePage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['financeStats'],
    queryFn: getFinanceStats,
  });

  await queryClient.prefetchQuery({
    queryKey: ['salesInvoiceList', { page: 0, size: 10, status: 'ALL' }],
    queryFn: ({ queryKey }) => getSalesInvoicesList(queryKey[1] as InvoiceQueryParams),
  });

  const res = await getFinanceStats();

  const financeStatsData = mapFinanceStatsToCards(res.data);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Providers dehydratedState={dehydratedState}>
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 페이지 헤더 */}
          {res.success ? (
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
            <TabNavigation tabs={FINANCE_TABS} />
          </Suspense>
        </main>
      </div>
    </Providers>
  );
}
