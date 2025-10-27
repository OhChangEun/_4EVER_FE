import { Page, PageRequest } from '@/app/types/Page';

// MRP 계획 주문 목록 타입
export interface MrpPlannedOrderList {
  mrpId: string;
  quotationId: string;
  quotationNumber: string;
  itemId: string;
  itemName: string;
  quantity: number;
  procurementStartDate: string;
  statusCode: string;
}

// MRP 계획 주문 목록 최상위 응답 타입
export interface MrpPlannedOrdersListResponse {
  page: Page;
  content: MrpPlannedOrderList[];
}

export interface FetchMrpPlannedOrdersListParams extends PageRequest {
  statusCode?: string;
}
