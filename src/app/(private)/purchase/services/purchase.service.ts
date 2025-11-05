// services/purchase.ts
import { PurchaseStatResponse } from '@/app/(private)/purchase/types/PurchaseStatsType';
import { createStatCard } from '@/lib/CreateStatCard';
import { StatCardType } from '@/app/types/StatType';

// 변환 함수
export const mapPurchaseStatsToCards = (
  data: PurchaseStatResponse,
): Record<string, StatCardType[]> => {
  return Object.entries(data).reduce(
    (acc, [period, stats]) => {
      const cards: StatCardType[] = [
        createStatCard(
          '구매 요청',
          stats.purchaseRequestCount.value,
          stats.purchaseRequestCount.delta_rate,
          '건',
        ),
        createStatCard(
          '구매 승인 대기',
          stats.purchaseApprovalPendingCount.value,
          stats.purchaseApprovalPendingCount.delta_rate,
          '건',
        ),
        createStatCard(
          '발주 금액',
          stats.purchaseOrderAmount.value,
          stats.purchaseOrderAmount.delta_rate,
          '₩',
        ),
        createStatCard(
          '발주 승인 대기',
          stats.purchaseOrderApprovalPendingCount.value,
          stats.purchaseOrderApprovalPendingCount.delta_rate,
          '건',
        ),
      ];

      acc[period] = cards;
      return acc;
    },
    {} as Record<string, StatCardType[]>,
  );
};
