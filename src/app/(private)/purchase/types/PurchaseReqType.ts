import { Page } from '@/app/types/Page';

export interface PurchaseReqItem {
  id: number;
  lineNo: number;
  itemId: number;
  itemName: string;
  quantity: number;
  uomCode: string; // 단위 (예: 'EA')
  unitPrice: number;
  amount: number;
}

export interface PurchaseReqDetailResponse {
  id: number;
  prNumber: string;
  requesterId: number;
  requesterName: string;
  departmentId: number;
  departmentName: string;
  requestDate: string; // "2024-01-15"
  createdAt: string; // "2024-01-15T00:00:00Z"
  desiredDeliveryDate: string; // "2024-01-25"
  status: string; // 예: 'APPROVED'
  currency: string; // 예: 'KRW'
  totalAmount: number;
  items: PurchaseReqItem[];
}

export interface PurchaseReqResponse {
  id: number;
  prNumber: string; // 구매요청번호
  requesterId: number;
  requesterName: string;
  departmentId: number;
  departmentName: string;
  origin: string; // 예: 'MRP'
  originRefId: string; // 원본 참조 ID
  requestDate: string; // 요청일 (yyyy-MM-dd)
  desiredDeliveryDate: string; // 납기요청일 (yyyy-MM-dd)
  createdBy: number;
  itemCount: number;
  hasPreferredVendor: boolean;
  totalAmount: number;
}

// 최상위 응답 타입
export interface PurchaseReqListResponse {
  content: PurchaseReqResponse[];
  page: Page;
}
