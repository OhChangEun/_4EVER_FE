// services/purchase.ts
import { createStatCard } from '@/lib/CreateStatCard';
import { StatCardType } from '@/app/types/StatType';
import { FinanceStatResponse } from './types/FinanceStatsType';

// 변환 함수
export const mapFinanceStatsToCards = (
  data: FinanceStatResponse,
): Record<string, StatCardType[]> => {
  return Object.entries(data).reduce(
    (acc, [period, stats]) => {
      const cards: StatCardType[] = [
        createStatCard('총 매출 (AR)', stats.totalSales.value, stats.totalSales.delta_rate, '₩'),
        createStatCard(
          '총 매입 (AP)',
          stats.totalPurchases.value,
          stats.totalPurchases.delta_rate,
          '₩',
        ),
        createStatCard('순이익', stats.netProfit.value, stats.netProfit.delta_rate, '₩'),
        createStatCard(
          '미수금',
          stats.accountsReceivable.value,
          stats.accountsReceivable.delta_rate,
          '₩',
        ),
      ];

      acc[period] = cards;
      return acc;
    },
    {} as Record<string, StatCardType[]>,
  );
};
