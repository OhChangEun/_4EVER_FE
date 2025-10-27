// MES 개별 항목
export interface MesSummaryItem {
  mesId: string;
  mesNumber: string;
  productId: string;
  productName: string;
  quantity: number;
  uomName: string;
  quotationId: string;
  quotationNumber: string;
  status: string; // 예: "IN_PROGRESS", "PLANNED"
  currentOperation: string; // 예: "OP30"
  startDate: string; // 예: "2024-01-15"
  endDate: string; // 예: "2024-02-10"
  progressRate: number; // 진행률 (예: 65)
  sequence: string[]; // 공정 순서 (예: ["OP10", "OP20", ...])
}

// MES 목록 응답 (페이지네이션 포함)
export interface MesListResponse {
  size: number; // 페이지당 데이터 개수
  totalPages: number;
  page: number; // 현재 페이지 번호
  content: MesSummaryItem[]; // MES 항목 리스트
  totalElements: number; // 전체 항목
}

export interface FetchMesListParams {
  quotationId?: string;
  status?: string;
}
