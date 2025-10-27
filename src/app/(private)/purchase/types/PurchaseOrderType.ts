import { Page } from '@/app/types/Page';
import { PurchaseOrderStatus } from '@/app/(private)/purchase/constants';

// 발주서 주문 품목 상세
export interface PurchaseOrderItem {
  itemName: string; // 품목명
  spec: string; // 규격 > 삭제 예정
  quantity: number; // 수량
  unit: string; // 단위
  unitPrice: number; // 단가
  amount: number; // 금액
}

// 발주서 상세
export interface PurchaseOrderDetailResponse {
  id: number; // 주문 ID
  poNumber: string; // 발주 번호
  vendorName: string; // 공급업체명
  managerPhone: string; // 담당자 전화번호
  managerEmail: string; // 담당자 이메일
  orderDate: string; // 주문일
  deliveryDate: string; // 납품일
  statusCode: string; // 상태 (예: 승인됨)
  totalAmount: number; // 총 금액
  items: PurchaseOrderItem[]; // 품목 목록
  deliveryAddress: string; // 납품지 주소 > 삭제 예정
  requestedDeliveryDate: string; // 요청 납기일 > 삭제 예정
  specialInstructions: string; // 특이사항 > 삭제 예정
  paymentTerms: string; // 결제 조건 > 삭제 예정
  note: string; // 비고
}

// 발주서 목록
// 개별 발주(Purchase Order) 항목
export interface PurchaseOrder {
  id: number;
  poNumber: string; // 발주 번호
  vendorName: string; // 공급업체명
  itemsSummary: string; // 품목 요약
  orderDate: string; // 발주일 (YYYY-MM-DD)
  deliveryDate: string; // 납기일 (YYYY-MM-DD)
  totalAmount: number; // 총 금액
  status: PurchaseOrderStatus; // 상태
}

// 최종 응답 타입
export interface PurchaseOrderListResponse {
  content: PurchaseOrder[];
  page: Page;
}
