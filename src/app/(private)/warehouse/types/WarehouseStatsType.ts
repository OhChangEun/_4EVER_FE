import { Stat, StatResponse } from '@/app/types/StatType';

interface WarehouseStat {
  totalWarehouse: Stat;
  inOperationWarehouse: Stat;
}

export type WarehouseStatResponse = StatResponse<WarehouseStat>;
