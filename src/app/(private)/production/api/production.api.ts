import { ProductionStatResponse } from '@/app/(private)/production/types/ProductionStatsType';
import { ApiResponse, ApiResponseNoData } from '@/app/types/api';
import { PRODUCTION_ENDPOINTS } from '@/app/(private)/production/api/production.endpoints';
import {
  FetchQuotationSimulationParams,
  QuotationSimulationResponse,
} from '@/app/(private)/production/types/QuotationSimulationApiType';
import { QuotationPreviewResponse } from '@/app/(private)/production/types/QuotationPreviewApiType';
import { MpsListParams, MpsListResponse } from '@/app/(private)/production/types/MpsApiType';
import { FetchMesListParams, MesListResponse } from '../types/MesListApiType';
import { MesDetailResponse } from '../types/MesDetailApiType';
import { BomListResponse } from '../types/BomListApiType';
import { BomDetailResponse } from '../types/BomDetailApiType';
import { FetchMrpOrdersListParams, MrpOrdersListResponse } from '../types/MrpOrdersListApiType';
import { FetchQuotationParams, QuotationListResponse } from '../types/QuotationApiType';
import { MpsDropdownResponse } from '../types/DropdownApiType';
import {
  FetchMrpPlannedOrdersListParams,
  MrpPlannedOrdersListResponse,
} from '../types/MrpPlannedOrdersListApiType';
import { MrpPlannedOrdersDetailResponse } from '../types/MrpPlannedOrdersDetailApiType';
import { apisssssssss } from './api';
import { KeyValueItem } from '@/app/types/CommonType';
import { BomRequestBody, MaterialResponse } from '../types/BomType';
import { PageRequest } from '@/app/types/Page';
import { MrpOrdersConvertReqeustBody } from '../types/MrpOrdersConvertApiType';

// --- 상단 섹션 ---
// 구매 관리 지표
export const fetchProductionStats = async (): Promise<ProductionStatResponse | null> => {
  try {
    const res = await apisssssssss.get<ApiResponse<ProductionStatResponse>>(
      `${PRODUCTION_ENDPOINTS.STATISTICS}`,
    );
    // console.log(res);
    return res.data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// --- 드롭다운 조회 ---
// mps 제품 드롭다운
export const fetchMpsBomDropdown = async (): Promise<KeyValueItem[]> => {
  const res = await apisssssssss.get<ApiResponse<KeyValueItem[]>>(
    `${PRODUCTION_ENDPOINTS.MPS_TOGGLE_PRODUCTS}`,
  );
  return res.data.data;
};

export const fetchProductDropdown = async (): Promise<KeyValueItem[]> => {
  const res = await apisssssssss.get<ApiResponse<KeyValueItem[]>>(
    `${PRODUCTION_ENDPOINTS.PRODUCTS}`,
  );
  return res.data.data;
};

export const fetchAvailableStatusDropdown = async (): Promise<KeyValueItem[]> => {
  const res = await apisssssssss.get<ApiResponse<KeyValueItem[]>>(
    `${PRODUCTION_ENDPOINTS.AVAILABLE_STATUS_DROPDOWN}`,
  );
  return res.data.data;
};

export const fetchQuotationStatusDropdown = async (): Promise<KeyValueItem[]> => {
  const res = await apisssssssss.get<ApiResponse<KeyValueItem[]>>(
    `${PRODUCTION_ENDPOINTS.QUOTATION_STATUS_DROPDOWN}`,
  );
  return res.data.data;
};

// mrp 순소요 - 견적 드롭다운
export const fetchMrpQuotationsDropdown = async (): Promise<KeyValueItem[]> => {
  const res = await apisssssssss.get<ApiResponse<KeyValueItem[]>>(
    `${PRODUCTION_ENDPOINTS.MRP_QUOTATION_DROPDOWN}`,
  );
  return res.data.data;
};

// mrp 순소요 - 가용 재고 상태 드롭다운
export const fetchMrpAvailableStatusDropdown = async (): Promise<KeyValueItem[]> => {
  const res = await apisssssssss.get<ApiResponse<KeyValueItem[]>>(
    `${PRODUCTION_ENDPOINTS.MRP_AVAILABLE_STATUS_DROPDOWN}`,
  );
  return res.data.data;
};
// export const fetchMrpPlannedOrderStatus = async (): Promise<MpsDropdownResponse> => {
//   const res = await apisssssssss.get<ApiResponse<MpsDropdownResponse>>(
//     `${PRODUCTION_ENDPOINTS.MRP_PLANNED_ORDER_STATUS_CODES}`,
//   );
//   return res.data.data;
// };
// export const fetchMrpProducts = async (): Promise<MpsDropdownResponse> => {
//   const res = await apisssssssss.get<ApiResponse<MpsDropdownResponse>>(
//     `${PRODUCTION_ENDPOINTS.MRP_TOGGLE_PRODUCTS}`,
//   );
//   return res.data.data;
// };
// export const fetchMrpQuotations = async (): Promise<MpsDropdownResponse> => {
//   const res = await apisssssssss.get<ApiResponse<MpsDropdownResponse>>(
//     `${PRODUCTION_ENDPOINTS.MRP_TOGGLE_QUOTATIONS}`,
//   );
//   return res.data.data;
// };
// export const fetchMrpStatus = async (): Promise<MpsDropdownResponse> => {
//   const res = await apisssssssss.get<ApiResponse<MpsDropdownResponse>>(
//     `${PRODUCTION_ENDPOINTS.MRP_TOGGLE_STATUS_CODES}`,
//   );
//   return res.data.data;
// };

// --- 견적 ---
// 견적 목록 조회
export const fetchQuotationList = async (
  params: FetchQuotationParams,
): Promise<QuotationListResponse> => {
  const res = await apisssssssss.get(`${PRODUCTION_ENDPOINTS.QUOTATIONS}`, { params });
  return res.data.data;
};

// 견적에 대한 ATP(Available to Promise), MPS, MRP 시뮬레이션 실행 결과
export const fetchQuotationSimulationResult = async (
  params: FetchQuotationSimulationParams,
): Promise<QuotationSimulationResponse> => {
  const { quotationIds, page, size } = params;
  const query = new URLSearchParams({
    page: String(page),
    size: String(size),
  });
  const res = await apisssssssss.post<ApiResponse<QuotationSimulationResponse>>(
    `${PRODUCTION_ENDPOINTS.QUOTATION_SIMULATE}?${query.toString()}`,
    { quotationIds },
  );
  return res.data.data;
};

// 제안 납기 계획 프리뷰 조회
export const fetchQuotationPreview = async (
  params: string[],
): Promise<QuotationPreviewResponse> => {
  const res = await apisssssssss.post<ApiResponse<QuotationPreviewResponse>>(
    `${PRODUCTION_ENDPOINTS.QUOTATION_PREVIEW}`,
    params,
  );
  return res.data.data;
};

// 제품별 Master Production Schedule(MPS) 정보를 조회
export const fetchMpsList = async (params: MpsListParams): Promise<MpsListResponse> => {
  const res = await apisssssssss.get<ApiResponse<MpsListResponse>>(
    `${PRODUCTION_ENDPOINTS.MPS_PLANS}`,
    { params },
  );
  return res.data.data;
};

// 제안 납기 확정
export const fetchQuotationConfirm = async (params: string[]) => {
  const res = await apisssssssss.post<ApiResponse<null>>(
    `${PRODUCTION_ENDPOINTS.QUOTATION_CONFIRM}`,
    { quotationIds: params },
  );
  return res.data.data;
};

// --- MES ---
// MES(Manufacturing Execution System) 작업 목록 조회
export const fetchMesList = async (params: FetchMesListParams): Promise<MesListResponse> => {
  const res = await apisssssssss.get<ApiResponse<MesListResponse>>(
    `${PRODUCTION_ENDPOINTS.MES_WORK_ORDERS}`,
    { params },
  );
  return res.data.data;
};

// MES 작업 상세 정보 조회
export const fetchMesDetail = async (mesId: string) => {
  const res = await apisssssssss.get<ApiResponse<MesDetailResponse>>(
    `${PRODUCTION_ENDPOINTS.MES_WORK_ORDER_DETAIL(mesId)}`,
  );
  return res.data.data;
};

// --- BOM ---
// BOM 목록 조회
export const fetchBomList = async (params: PageRequest): Promise<BomListResponse> => {
  const res = await apisssssssss.get<ApiResponse<BomListResponse>>(`${PRODUCTION_ENDPOINTS.BOMS}`, {
    params,
  });
  return res.data.data;
};

// BOM 자재 조회
export const fetchProduction = async (productId: string): Promise<MaterialResponse> => {
  const res = await apisssssssss.get<ApiResponse<MaterialResponse>>(
    `${PRODUCTION_ENDPOINTS.PRODUCTS_DETAIL(productId)}`,
  );
  return res.data.data;
};

// BOM 공정 조회
export const fetchOperationDropdown = async (): Promise<KeyValueItem[]> => {
  const res = await apisssssssss.get<ApiResponse<KeyValueItem[]>>(
    `${PRODUCTION_ENDPOINTS.OPERATIONS_DROPDOWN}`,
  );
  return res.data.data;
};

// BOM 상세 조회
export const fetchBomDetail = async (bomId: string): Promise<BomDetailResponse> => {
  const res = await apisssssssss.get<ApiResponse<BomDetailResponse>>(
    `${PRODUCTION_ENDPOINTS.BOM_DETAIL(bomId)}`,
  );
  return res.data.data;
};

// BOM 추가
export const postBomItem = async (body: BomRequestBody) => {
  const res = await apisssssssss.post<ApiResponse<null>>(`${PRODUCTION_ENDPOINTS.BOMS}`, body);
  return res.data;
};

// BOM 삭제
export const deletBomItem = async (bomId: string): Promise<ApiResponseNoData> => {
  const res = await apisssssssss.delete<ApiResponseNoData>(
    `${PRODUCTION_ENDPOINTS.BOM_DETAIL(bomId)}`,
  );
  return res.data;
};

// --- MRP ---
// MRP 순소요 목록 조회
export const fetchMrpOrdersList = async (
  params: FetchMrpOrdersListParams,
): Promise<MrpOrdersListResponse> => {
  const res = await apisssssssss.get<ApiResponse<MrpOrdersListResponse>>(
    `${PRODUCTION_ENDPOINTS.MRP_ORDERS}`,
    { params },
  );
  return res.data.data;
};

// MRP 계획 주문 전환
export const postMrpConvert = async (body: MrpOrdersConvertReqeustBody) => {
  const res = await apisssssssss.post(`${PRODUCTION_ENDPOINTS.MRP_CONVERT}`, body);
  return res.data.data;
};

// MRP 계획 주문 목록 조회
export const fetchMrpPlannedOrdersList = async (
  params: FetchMrpPlannedOrdersListParams,
): Promise<MrpPlannedOrdersListResponse> => {
  const res = await apisssssssss.get<ApiResponse<MrpPlannedOrdersListResponse>>(
    `${PRODUCTION_ENDPOINTS.MRP_PLANNED_ORDERS_LIST}`,
    { params },
  );
  return res.data.data;
};

// MRP 계획 주문 상세 조회
export const fetchMrpPlannedOrdersDetail = async (
  mrpId: string,
): Promise<MrpPlannedOrdersDetailResponse> => {
  const res = await apisssssssss.get<ApiResponse<MrpPlannedOrdersDetailResponse>>(
    `${PRODUCTION_ENDPOINTS.MRP_PLANNED_ORDER_DETAIL(mrpId)}`,
  );
  return res.data.data;
};
