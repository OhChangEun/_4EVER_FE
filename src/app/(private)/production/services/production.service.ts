import { createStatCard } from '@/lib/CreateStatCard';
import { StatCardType } from '@/app/types/StatType';
import { ProductionStatResponse } from '@/app/(private)/production/types/ProductionStatsType';

// 변환 함수
export const mapProductionStatsToCards = (
  data: ProductionStatResponse,
): Record<string, StatCardType[]> => {
  return Object.entries(data).reduce(
    (acc, [period, stats]) => {
      const cards: StatCardType[] = [
        createStatCard(
          '생산중인 품목',
          stats.production_in_progress.value,
          stats.production_in_progress.delta_rate,
          '건',
        ),
        createStatCard(
          '이번 달에 생산이 들어간 품목',
          stats.production_completed.value,
          stats.production_completed.delta_rate,
          '건',
        ),
        createStatCard('완료된 생산', stats.bom_count.value, stats.bom_count.delta_rate, '건'),
      ];

      acc[period] = cards;
      return acc;
    },
    {} as Record<string, StatCardType[]>,
  );
};
