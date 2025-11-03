import { Stat, StatResponse } from '@/app/types/StatType';

// 구매 지표 api 응답 데이터 구조
export interface PurchaseStat {
  purchaseApprovalPendingCount: Stat;
  purchaseOrderApprovalPendingCount: Stat;
  purchaseOrderAmount: Stat;
  purchaseRequestCount: Stat;
}

export type PurchaseStatResponse = StatResponse<PurchaseStat>;
