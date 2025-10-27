import { Stat, StatResponse } from '@/app/types/StatType';

interface SalesStat {
  sales_amount: Stat;
  new_orders_count: Stat;
}

export type SalesStatResponse = StatResponse<SalesStat>;
