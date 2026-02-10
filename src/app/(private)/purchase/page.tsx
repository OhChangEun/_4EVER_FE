'use client';

import { Suspense } from 'react';

import {
  mapPurchaseStatsToCards,
  mapSupplierPurchaseStatsToCards,
} from '@/app/(private)/purchase/services/purchase.service';
import { PURCHASE_TABS, SUPPLIER_PURCHASE_TABS } from '@/app/(private)/purchase/constants';
import TabNavigation from '@/app/components/common/TabNavigation';
import StatSection from '@/app/components/common/StatSection';
import ErrorMessage from '@/app/components/common/ErrorMessage';
import {
  fetchPurchaseStats,
  fetchSupplierOrdersPurchaseStats,
} from '@/app/(private)/purchase/api/purchase.api';
import { StatCardType } from '@/app/types/StatType';
import { useRole } from '@/app/hooks/useRole';
import { useQuery } from '@tanstack/react-query';

export default function PurchasePage() {
  const role = useRole();
  const isSupplier = role === 'SUPPLIER_ADMIN';

  const { data: statsData, isLoading } = useQuery({
    queryKey: ['purchaseStats', role],
    queryFn: async (): Promise<Record<string, StatCardType[]> | null> => {
      if (isSupplier) {
        const data = await fetchSupplierOrdersPurchaseStats();
        return data ? mapSupplierPurchaseStatsToCards(data) : null;
      } else {
        const data = await fetchPurchaseStats();
        return data ? mapPurchaseStatsToCards(data) : null;
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
        {statsData ? (
          //구매 관리 주요 지표
          <StatSection
            title={isSupplier ? '영업관리' : '구매 및 조달 관리'} // 공급사인 경우 분기
            subTitle={isSupplier ? '발주서 관리' : '구매 요청부터 발주까지 전체 프로세스 관리'} // 공급사인 경우 분기
            statsData={statsData}
          />
        ) : (
          <ErrorMessage message={'구매 통계 데이터를 불러오는데 실패했습니다.'} />
        )}

        <Suspense fallback={<div>Loading...</div>}>
          {isSupplier ? (
            //  구매 관리 탭 / 발주서 탭 / 공급업체 탭
            <TabNavigation tabs={SUPPLIER_PURCHASE_TABS} />
          ) : (
            // 발주서 탭
            <TabNavigation tabs={PURCHASE_TABS} />
          )}
        </Suspense>
      </main>
    </div>
  );
}
