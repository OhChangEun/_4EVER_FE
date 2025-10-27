import { Stat, StatResponse } from '@/app/types/StatType';

interface DashboardStat {
  totalSales: Stat;
  totalPurchases: Stat;
  netProfit: Stat;
  totalEmployee: Stat;
}

export type DashboardStatRes = StatResponse<DashboardStat>;
