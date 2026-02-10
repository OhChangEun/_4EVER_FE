'use client';

import { Suspense } from 'react';
import TabNavigation from '@/app/components/common/TabNavigation';
import { PRODUCTION_TABS } from '@/app/(private)/production/constants';
import StatSection from '@/app/components/common/StatSection';
import { fetchProductionStats } from '@/app/(private)/production/api/production.api';
import ErrorMessage from '@/app/components/common/ErrorMessage';
import { mapProductionStatsToCards } from '@/app/(private)/production/services/production.service';
import { useQuery } from '@tanstack/react-query';

export default function ProductionPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['productionStats'],
    queryFn: fetchProductionStats,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  const productionStatsData = data ? mapProductionStatsToCards(data ?? {}) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {productionStatsData ? (
          //생산 관리 주요 지표
          <StatSection
            title="생산 관리"
            subTitle="견적, MPS, MRP, MES, BOM 등 생산 전반 관리"
            statsData={productionStatsData}
          />
        ) : (
          <ErrorMessage message={'생산 통계 데이터를 불러오는데 실패했습니다.'} />
        )}

        <Suspense fallback={<div>Loading..</div>}>
          <TabNavigation tabs={PRODUCTION_TABS} />
        </Suspense>
      </main>
    </div>
  );
}
