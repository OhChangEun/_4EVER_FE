import { Stat, StatResponse } from '@/types/StatType';

interface WarehouseStat {
  totalWarehouse: Stat;
  inOperationWarehouse: Stat;
}

export type WarehouseStatResponse = StatResponse<WarehouseStat>;
