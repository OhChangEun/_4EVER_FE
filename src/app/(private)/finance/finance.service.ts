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
        createStatCard('총 매출 (AR)', stats.total_sales.value, stats.total_sales.delta_rate, '₩'),
        createStatCard(
          '총 매입 (AP)',
          stats.total_purchases.value,
          stats.total_purchases.delta_rate,
          '₩',
        ),
        createStatCard('순이익', stats.net_profit.value, stats.net_profit.delta_rate, '₩'),
      ];

      acc[period] = cards;
      return acc;
    },
    {} as Record<string, StatCardType[]>,
  );
};
