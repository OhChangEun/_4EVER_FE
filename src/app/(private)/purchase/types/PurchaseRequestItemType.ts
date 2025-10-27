// 구매 요청 작성란 입력
export interface PurchaseRequestItem {
  id: string;
  itemName: string; // 품목명
  quantity: string; // 수량
  unit: string; // 단위
  estimatedPrice: string; // 예상 총액
  supplier: string; // 희망 공급업체
  dueDate: string; // 희망 납기일
  purpose: string; // 사용 목적
  notes: string; // 비고
}

export interface PurchaseRequestItemPayload {
  itemName: string; // 품목명
  quantity: number; // 수량
  uomName: string; // 단위
  expectedUnitPrice: number; // 예상 단가
  expectedTotalPrice: number; // 예상 총액
  preferredVendorName: string; // 희망 공급업체
  desiredDeliveryDate: string; // 희망 납기일 (YYYY-MM-DD)
  purpose: string; // 사용 목적
  note?: string; // 비고 (선택)
}

// 전체 요청 인터페이스
export interface PurchaseRequestPayload {
  requesterId: number;
  items: PurchaseRequestItemPayload[];
}
