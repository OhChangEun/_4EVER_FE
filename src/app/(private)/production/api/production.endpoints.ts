import { API_BASE_URL } from '@/app/types/api';

export const PRODUCTION_BASE_PATH = `${API_BASE_URL}/scm-pp/pp`;

export const PRODUCTION_ENDPOINTS = {
  // BOM 관련
  BOMS: `${PRODUCTION_BASE_PATH}/boms`, // BOM 목록 조회, 생성
  BOM_DETAIL: (bomId: string) => `${PRODUCTION_BASE_PATH}/boms/${bomId}`, // BOM 상세 조회, 수정, 삭제
  PRODUCTS_DETAIL: (productId: string) => `${PRODUCTION_BASE_PATH}/products/${productId}`, // 자재 상세 정보(입력 모달 출력용)

  // MES 작업 목록
  MES_WORK_ORDERS: `${PRODUCTION_BASE_PATH}/mes`, // MES 작업 목록 조회
  MES_WORK_ORDER_DETAIL: (mesId: string) => `${PRODUCTION_BASE_PATH}/mes/${mesId}`, // MES 작업 상세 조회
  MES_WORK_ORDERS_SUMMARY: `${PRODUCTION_BASE_PATH}/mes/work-orders/summary`, // 생산관리 페이지 카드뷰 데이터 조회

  // MRP 순소요 목록
  MRP_ORDERS: `${PRODUCTION_BASE_PATH}/quotations/mrp`, // MRP 순소요 목록 조회
  MRP_PLANNED_ORDER_DETAIL: (mrpId: string) =>
    `${PRODUCTION_BASE_PATH}/mrp/planned-orders/detail/${mrpId}`, // MRP 계획 주문 상세 조회
  MRP_PLANNED_ORDERS_LIST: `${PRODUCTION_BASE_PATH}/mrp/runs`, // MRP 계획 주문 목록 조회
  MRP_REQUEST_SUMMARY: `${PRODUCTION_BASE_PATH}/mrp/request-summary`, // MRP 자재 구매 요청 리스트
  MRP_CONVERT: `${PRODUCTION_BASE_PATH}/mrp/convert`, // MRP 순소요 목록 조회

  // MPS 계획
  MPS_PLANS: `${PRODUCTION_BASE_PATH}/quotations/mps`, // 제품별 MPS 조회

  // 견적
  QUOTATIONS: `${PRODUCTION_BASE_PATH}/quotations`, // 견적 목록 조회
  QUOTATION_PREVIEW: `${PRODUCTION_BASE_PATH}/quotations/preview`, // 제안납기 확정 프리뷰
  QUOTATION_SIMULATE: `${PRODUCTION_BASE_PATH}/quotations/simulate`, // 견적에 대한 ATP + MPS + MRP 시뮬레이션 실행
  QUOTATION_CONFIRM: `${PRODUCTION_BASE_PATH}/quotations/confirm`, // 제안 납기 확정

  // PP 통계
  STATISTICS: `${PRODUCTION_BASE_PATH}/statistics`, // PP 통계 조회

  // 드롭다운 관련
  MPS_TOGGLE_PRODUCTS: `${PRODUCTION_BASE_PATH}/mps/boms/toggle`,
  OPERATIONS_DROPDOWN: `${PRODUCTION_BASE_PATH}/operations`,

  MRP_PLANNED_ORDER_STATUS_CODES: `${PRODUCTION_BASE_PATH}/mrp/toggle/planned-order-list-status-codes`, // MRP 계획 주문 상태 코드 목록
  MRP_TOGGLE_PRODUCTS: `${PRODUCTION_BASE_PATH}/mrp/toggle/products`, // MRP 제품 토글 목록
  MRP_TOGGLE_QUOTATIONS: `${PRODUCTION_BASE_PATH}/mrp/toggle/quotations`, // MRP 견적 토글 목록
  MRP_TOGGLE_STATUS_CODES: `${PRODUCTION_BASE_PATH}/mrp/toggle/status-codes`, // MRP 가능 상태 코드 목록
  PRODUCTS: `${PRODUCTION_BASE_PATH}/products`, // 자재 드롭다운
  AVAILABLE_STATUS_DROPDOWN: `${PRODUCTION_BASE_PATH}/available/status/toggle`, // 가용재고 상태 드롭다운
  QUOTATION_STATUS_DROPDOWN: `${PRODUCTION_BASE_PATH}/status/toggle`, // 견적 상태 드롭다운

  MRP_QUOTATION_DROPDOWN: `${PRODUCTION_BASE_PATH}/mrp/quotations/toggle`, // 견적 드롭다운
  MRP_AVAILABLE_STATUS_DROPDOWN: `${PRODUCTION_BASE_PATH}/mrp/available/status/toggle`, // 견적 드롭다운
};
