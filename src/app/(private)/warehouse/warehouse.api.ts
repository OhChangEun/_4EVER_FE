import { ApiResponse, WAREHOUSE_ENDPOINTS } from '@/app/api';
import { WarehouseStatResponse } from './types/WarehouseStatsType';
import axios from 'axios';
import { WarehouseListQueryParams, WarehouseListResponse } from './types/WarehouseListType';
import { Page } from '@/types/Page';

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
