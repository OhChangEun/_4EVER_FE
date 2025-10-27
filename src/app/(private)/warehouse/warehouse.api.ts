import { ApiResponse, ApiResponseNoData, WAREHOUSE_ENDPOINTS } from '@/app/api';
import { WarehouseStatResponse } from './types/WarehouseStatsType';
import axios from 'axios';
import { WarehouseListQueryParams, WarehouseListResponse } from './types/WarehouseListType';
import { Page } from '@/types/Page';
import { WarehouseDetailResponse } from './types/WarehouseDetailType';
import { AddWarehouseRequest, WarehouseManagerInfoResponse } from './types/AddWarehouseType';

// ----------------------- 창고 관리 -----------------------
export const getWarehouseStats = async (): Promise<WarehouseStatResponse> => {
  const res = await axios.get<ApiResponse<WarehouseStatResponse>>(WAREHOUSE_ENDPOINTS.STATS);
  return res.data.data;
};

export const getWarehouseList = async (
  params?: WarehouseListQueryParams,
): Promise<{
  data: WarehouseListResponse[];
  pageData: Page;
}> => {
  const query = new URLSearchParams({
    ...(params?.page && { page: String(params.page) }),
    ...(params?.size && { size: String(params.size) }),
  }).toString();
  const res = await axios.get<ApiResponse<{ content: WarehouseListResponse[]; page: Page }>>(
    `${WAREHOUSE_ENDPOINTS.WAREHOUSE_LIST}?${query}`,
  );

  return { data: res.data.data.content, pageData: res.data.data.page };
};

export const getWarehouseDetail = async (warehouseId: string): Promise<WarehouseDetailResponse> => {
  const res = await axios.get<ApiResponse<WarehouseDetailResponse>>(
    WAREHOUSE_ENDPOINTS.WAREHOUSE_DETAIL(warehouseId),
  );
  return res.data.data;
};

export const postAddWarehouse = async (
  payload: AddWarehouseRequest,
): Promise<ApiResponseNoData> => {
  const res = await axios.post<ApiResponseNoData>(WAREHOUSE_ENDPOINTS.ADD_WAREHOUSE, payload);

  return res.data;
};

export const getWarehouseManagerInfo = async (): Promise<WarehouseManagerInfoResponse[]> => {
  const res = await axios.get<ApiResponse<WarehouseManagerInfoResponse[]>>(
    WAREHOUSE_ENDPOINTS.WAREHOUSE_MANAGER_INFO,
  );
  return res.data.data;
};
