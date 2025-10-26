import { StatCardType } from '@/app/types/StatType';
import { DashboardStatRes } from './types/DashboardStatsType';
import { createStatCard } from '@/lib/CreateStatCard';

// total_sales: number;
//   total_purchases: number;
//   net_profit: number;
//   employee_count: number;

export const mapDashboardStatsToCards = (
  data: DashboardStatRes,
): Record<string, StatCardType[]> => {
  return Object.entries(data).reduce(
    (acc, [period, stats]) => {
      const cards: StatCardType[] = [
        createStatCard('총 매출', stats.totalSales.value, stats.totalSales.delta_rate, '₩'),
        createStatCard('총 매입', stats.totalPurchases.value, stats.totalPurchases.delta_rate, '₩'),
        createStatCard('순이익', stats.netProfit.value, stats.netProfit.delta_rate, '₩'),
        createStatCard(
          '총 직원 수',
          stats.totalEmployee.value,
          stats.totalEmployee.delta_rate,
          '명',
        ),
      ];

      acc[period] = cards;
      return acc;
    },
    {} as Record<string, StatCardType[]>,
  );
};
