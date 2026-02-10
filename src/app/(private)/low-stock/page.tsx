import LowStockList from './components/LowStockList';
import StatSection from '@/app/components/common/StatSection';
import { Suspense } from 'react';
import { getLowStockStats } from './lowStock.api';
import { mapLowStockStatsToCards } from './lowStock.service';

export default async function LowStockPage() {
  const lowStockStats = await getLowStockStats();
  const lowStockStatsData = mapLowStockStatsToCards(lowStockStats);
  return (
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
  );
}
