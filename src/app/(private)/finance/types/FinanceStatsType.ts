import { Period, Stat, StatResponse } from '@/app/types/StatType';

interface FinanceStat {
  totalPurchases: Stat;
  netProfit: Stat;
  accountsReceivable: Stat;
  totalSales: Stat;
}

export type FinanceStatResponse = StatResponse<FinanceStat>;
