import { DateRequest } from '@/app/types/Date';
import { Page, PageRequest } from '@/app/types/Page';

// 주별 수요/생산 데이터
export interface WeekData {
  period: string; // 예: "9월 1주차"
  demand: number | null;
  requiredInventory: number | null;
  productionNeeded: number | null;
  plannedProduction: number | null;
}

// 제품별 생산/재고 시뮬레이션
export interface MpsListData {
  productId: string;
  productName: string;
  periodType: string | null;
  startDate: string | null;
  endDate: string | null;
  periods: string[]; // 주차 리스트
  demand: (number | null)[];
  requiredInventory: (number | null)[];
  productionNeeded: (number | null)[];
  plannedProduction: (number | null)[];
}

export interface MpsListResponse {
  content: MpsListData;
  page: Page;
}

export interface MpsListParams extends DateRequest, PageRequest {
  productId: string;
}
