import { createStatCard } from '@/lib/CreateStatCard';
import { StatCardType } from '@/types/StatType';
import { InventoryStatResponse } from '@/app/(private)/inventory/types/InventoryStatsType';
import { LowStockStatResponse } from './types/LowStockStatsType';

export const mapInventoryStatsToCards = (
  data: InventoryStatResponse,
): Record<string, StatCardType[]> => {
  return Object.entries(data).reduce(
    (acc, [period, stats]) => {
      const cards: StatCardType[] = [
        createStatCard('총 재고 가치', stats.total_stock.value, stats.total_stock.delta_rate, '₩'),
        createStatCard(
          '입고 완료',
          stats.store_complete.value,
          stats.store_complete.delta_rate,
          '건',
        ),
        createStatCard(
          '입고 대기',
          stats.store_pending.value,
          stats.store_pending.delta_rate,
          '건',
        ),
        createStatCard(
          '출고 완료',
          stats.delivery_complete.value,
          stats.delivery_complete.delta_rate,
          '건',
        ),
        createStatCard(
          '출고 대기',
          stats.delivery_pending.value,
          stats.delivery_pending.delta_rate,
          '건',
        ),
      ];

      acc[period] = cards;
      return acc;
    },
    {} as Record<string, StatCardType[]>,
  );
};

export const mapLowStockStatsToCards = (
  data: LowStockStatResponse,
): Record<string, StatCardType[]> => {
  return Object.entries(data).reduce(
    (acc, [period, stats]) => {
      const cards: StatCardType[] = [
        createStatCard(
          '긴급 재고 부족',
          stats.total_emergency.value,
          stats.total_emergency.delta_rate,
          '건',
        ),
        createStatCard(
          '주의 재고 부족',
          stats.total_warning.value,
          stats.total_warning.delta_rate,
          '건',
        ),
      ];

      acc[period] = cards;
      return acc;
    },
    {} as Record<string, StatCardType[]>,
  );
};
