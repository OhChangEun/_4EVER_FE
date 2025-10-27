import { Page, PageRequest } from '@/app/types/Page';

export interface MrpOrdersListData {
  itemId: string;
  itemName: string;
  requiredQuantity: number;
  currentStock: number;
  safetyStock: number;
  availableStock: number;
  availableStatusCode: string;
  shortageQty: number;
  itemType: string;
  procurementStartDate: string;
  expectedArrivalDate: string;
  supplierCompanyName: string;
}

// MRP 순소요 목록 최상위 응답 타입
export interface MrpOrdersListResponse {
  content: MrpOrdersListData[];
  page: Page;
}

export interface FetchMrpOrdersListParams extends PageRequest {
  quotationId: string;
  productId: string;
  availableStatusCode: string;
}
