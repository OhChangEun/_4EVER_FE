import Providers from '@/app/providers';
import { getQueryClient } from '@/lib/queryClient';
import { dehydrate } from '@tanstack/react-query';
import { Suspense } from 'react';

import { mapPurchaseStatsToCards } from '@/app/(private)/purchase/services/purchase.service';
import { PURCHASE_TABS } from '@/app/(private)/purchase/constants';
import TabNavigation from '@/app/components/common/TabNavigation';
import StatSection from '@/app/components/common/StatSection';
import ErrorMessage from '@/app/components/common/ErrorMessage';
import { FetchPurchaseReqParams } from '@/app/(private)/purchase/types/PurchaseApiRequestType';
import {
  fetchPurchaseReqList,
  fetchPurchaseStats,
} from '@/app/(private)/purchase/api/purchase.api';

export default async function PurchasePage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [
      'purchaseRequests',
      { page: 0, size: 10, status: 'ALL', createdFrom: '', createdTo: '' },
    ],
    queryFn: ({ queryKey }) => fetchPurchaseReqList(queryKey[1] as FetchPurchaseReqParams),
  });
  const dehydratedState = dehydrate(queryClient);

  const data = await fetchPurchaseStats();
  const purchaseStatsData = data ? mapPurchaseStatsToCards(data ?? {}) : null;

  return (
    <Providers dehydratedState={dehydratedState}>
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {purchaseStatsData ? (
            //구매 관리 주요 지표
            <StatSection
              title="구매 및 조달 관리"
              subTitle="구매 요청부터 발주까지 전체 프로세스 관리"
              statsData={purchaseStatsData}
            />
          ) : (
            <ErrorMessage message={'구매 통계 데이터를 불러오는데 실패했습니다.'} />
          )}

          {/* 구매 관리 탭 / 발주서 탭 / 공급업체 탭  */}
          <Suspense fallback={<div>Loading...</div>}>
            <TabNavigation tabs={PURCHASE_TABS} />
          </Suspense>
        </main>
      </div>
    </Providers>
  );
}
