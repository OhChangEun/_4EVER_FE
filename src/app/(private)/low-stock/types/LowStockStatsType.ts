import { Stat, StatResponse } from '@/types/StatType';

interface LowStockStat {
  total_emergency: Stat;
  total_warning: Stat;
}

export type LowStockStatResponse = StatResponse<LowStockStat>;
