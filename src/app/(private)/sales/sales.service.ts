import { createStatCard } from '@/lib/CreateStatCard';
import { StatCardType } from '@/app/types/StatType';
import { SalesStatResponse } from '@/app/(private)/sales/types/SalesStatsType';

export const mapSalesStatsToCards = (data: SalesStatResponse): Record<string, StatCardType[]> => {
  return Object.entries(data).reduce(
    (acc, [period, stats]) => {
      const cards: StatCardType[] = [
        createStatCard('매출', stats.sales_amount.value, stats.sales_amount.delta_rate, '₩'),
        createStatCard(
          '신규 주문',
          stats.new_orders_count.value,
          stats.new_orders_count.delta_rate,
          '건',
        ),
      ];

      acc[period] = cards;
      return acc;
    },
    {} as Record<string, StatCardType[]>,
  );
};
