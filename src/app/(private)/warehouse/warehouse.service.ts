import { StatCardType } from '@/types/StatType';
import { WarehouseStatResponse } from './types/WarehouseStatsType';
import { createStatCard } from '@/lib/CreateStatCard';

export const mapWarehouseStatsToCards = (
  data: WarehouseStatResponse,
): Record<string, StatCardType[]> => {
  return Object.entries(data).reduce(
    (acc, [period, stats]) => {
      const cards: StatCardType[] = [
        createStatCard(
          '총 창고 수',
          stats.totalWarehouse.value,
          stats.totalWarehouse.delta_rate,
          '개',
        ),
        createStatCard(
          '운영 중인 창고',
          stats.inOperationWarehouse.value,
          stats.inOperationWarehouse.delta_rate,
          '개',
        ),
      ];

      acc[period] = cards;
      return acc;
    },
    {} as Record<string, StatCardType[]>,
  );
};
