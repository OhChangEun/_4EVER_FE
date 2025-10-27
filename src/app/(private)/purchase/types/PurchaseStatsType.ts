import { Stat, StatResponse } from '@/app/types/StatType';

// 구매 지표 api 응답 데이터 구조
export interface PurchaseStat {
  purchase_request_count: Stat;
  purchase_approval_pending_count: Stat;
  purchase_order_amount: Stat;
  purchase_order_approval_pending_count: Stat;
}

export type PurchaseStatResponse = StatResponse<PurchaseStat>;
