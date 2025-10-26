import LowStockList from './LowStockList';
import LowStockStats from './LowStockStats';
import LowStockActions from './LowStockActions';
import { getQueryClient } from '@/lib/queryClient';
import { getLowStockList, getLowStockStats } from '../inventory.api';
import { dehydrate } from '@tanstack/react-query';
import { mapLowStockStatsToCards } from '../inventory.service';
import StatSection from '@/app/components/common/StatSection';
import { LowStockListQueryParams } from '../types/LowStockListType';
import Providers from '@/app/providers';
import { Suspense } from 'react';

export default async function LowStockPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['lowStockStats'],
    queryFn: getLowStockStats,
  });

  await queryClient.prefetchQuery({
    queryKey: ['lowStockList', { page: 0, size: 10, status: 'ALL' }],
    queryFn: ({ queryKey }) => getLowStockList(queryKey[1] as LowStockListQueryParams),
  });

  const dehydratedState = dehydrate(queryClient);

  const lowStockStats = await getLowStockStats();
  const lowStockStatsData = mapLowStockStatsToCards(lowStockStats);
  return (
    <Providers dehydratedState={dehydratedState}>
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <StatSection
            title="재고 부족 관리"
            subTitle="안전재고 미달 품목 현황 및 관리"
            statsData={lowStockStatsData}
          />

          <Suspense fallback={<div>Loading...</div>}>
            <LowStockList />
          </Suspense>
        </main>
      </div>
    </Providers>
  );
}
