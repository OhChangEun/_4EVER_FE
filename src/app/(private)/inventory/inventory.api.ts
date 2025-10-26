import {
  ApiResponse,
  INVENTORY_ENDPOINTS,
  LOWSTOCK_ENDPOINTS,
  WAREHOUSE_ENDPOINTS,
} from '@/app/api';
import { InventoryStatResponse } from './types/InventoryStatsType';
import axios from 'axios';
import { InventoryQueryParams, InventoryResponse } from './types/InventoryListType';
import { Page } from '@/types/Page';
import { InventoryDetailResponse } from './types/InventoryDetailType';
import { LowStockItemResponse } from '../low-stock/types/LowStockItems';
import { StockMovementResponse } from './types/StockMovement';
import {
  ManageMentCommonQueryParams,
  ProductionListResponse,
  ReadyToShipListResponse,
} from './types/InventoryShippingListType';
import { ReceivedListResponse } from './types/InventoryReceivingListType';
import { markAsReadyToShipResponse, ShippingDetailResponse } from './types/ShippingDetailType';
import { LowStockStatResponse } from '../low-stock/types/LowStockStatsType';
import { LowStockListQueryParams, LowStockListResponse } from '../low-stock/types/LowStockListType';
// ----------------------- 재고 통계 -----------------------
export const getInventoryStats = async (): Promise<InventoryStatResponse> => {
  const res = await axios.get<ApiResponse<InventoryStatResponse>>(INVENTORY_ENDPOINTS.STATS);
  return res.data.data;
};
// ----------------------- 재고 관리 -----------------------
export const getInventoryList = async (
  params?: InventoryQueryParams,
): Promise<{ data: InventoryResponse[]; pageData: Page }> => {
  const query = new URLSearchParams({
    ...(params?.category && { category: params.category }),
    ...(params?.warehouse && { warehouse: params.warehouse }),
    ...(params?.statusCode && { statusCode: params.statusCode }),
    ...(params?.itemName && { itemName: params.itemName }),
    ...(params?.page && { page: String(params.page) }),
    ...(params?.size && { size: String(params.size) }),
  }).toString();

  const res = await axios.get<ApiResponse<{ content: InventoryResponse[]; page: Page }>>(
    `${INVENTORY_ENDPOINTS.INVENTORY_LIST}?${query}`,
  );

  return { data: res.data.data.content, pageData: res.data.data.page };
};

export const getInventoryDetail = async (inventoryId: string): Promise<InventoryDetailResponse> => {
  const res = await axios.get<ApiResponse<InventoryDetailResponse>>(
    INVENTORY_ENDPOINTS.INVENTORY_DETAIL(inventoryId),
  );
  return res.data.data;
};

export const getLowStockItems = async (): Promise<LowStockItemResponse[]> => {
  const res = await axios.get<ApiResponse<{ content: LowStockItemResponse[] }>>(
    INVENTORY_ENDPOINTS.LOW_STOCK,
  );
  return res.data.data.content;
};

export const getCurrentStockMovement = async (): Promise<StockMovementResponse[]> => {
  const res = await axios.get<ApiResponse<{ content: StockMovementResponse[] }>>(
    INVENTORY_ENDPOINTS.RECENT_STOCK_MOVEMENT,
  );

  return res.data.data.content;
};

// ----------------------- 입고 관리 -----------------------
export const getProductionList = async (
  params?: ManageMentCommonQueryParams,
): Promise<{
  data: ProductionListResponse[];
  pageData: Page;
}> => {
  const query = new URLSearchParams({
    ...(params?.page && { page: String(params.page) }),
    ...(params?.size && { size: String(params.size) }),
  }).toString();
  const res = await axios.get<ApiResponse<{ content: ProductionListResponse[]; page: Page }>>(
    `${INVENTORY_ENDPOINTS.PRODUCTION_LIST}?${query}`,
  );

  return { data: res.data.data.content, pageData: res.data.data.page };
};

export const getReadyToShipList = async (
  params?: ManageMentCommonQueryParams,
): Promise<{
  data: ReadyToShipListResponse[];
  pageData: Page;
}> => {
  const query = new URLSearchParams({
    ...(params?.page && { page: String(params.page) }),
    ...(params?.size && { size: String(params.size) }),
  }).toString();
  const res = await axios.get<ApiResponse<{ content: ReadyToShipListResponse[]; page: Page }>>(
    `${INVENTORY_ENDPOINTS.READY_TO_SHIP_LIST}?${query}`,
  );

  return { data: res.data.data.content, pageData: res.data.data.page };
};

export const getProductionDetail = async (itemId: string): Promise<ShippingDetailResponse> => {
  const res = await axios.get<ApiResponse<ShippingDetailResponse>>(
    INVENTORY_ENDPOINTS.PRODUCTIONDETAIL(itemId),
  );
  return res.data.data;
};

export const getReadyToShipDetail = async (itemId: string): Promise<ShippingDetailResponse> => {
  const res = await axios.get<ApiResponse<ShippingDetailResponse>>(
    INVENTORY_ENDPOINTS.READY_TO_SHIP_DETAIL(itemId),
  );
  return res.data.data;
};

export const patchMarkAsReadyToShip = async (
  itemId: string,
): Promise<markAsReadyToShipResponse> => {
  const res = await axios.patch<ApiResponse<markAsReadyToShipResponse>>(
    INVENTORY_ENDPOINTS.MARKAS_READY_TO_SHIP_DETAIL(itemId),
  );
  return res.data.data;
};

// ----------------------- 출고 관리 -----------------------
export const getPendingList = async (
  params?: ManageMentCommonQueryParams,
): Promise<{
  data: ReceivedListResponse[];
  pageData: Page;
}> => {
  const query = new URLSearchParams({
    ...(params?.page && { page: String(params.page) }),
    ...(params?.size && { size: String(params.size) }),
  }).toString();
  const res = await axios.get<ApiResponse<{ content: ReceivedListResponse[]; page: Page }>>(
    `${INVENTORY_ENDPOINTS.PENDING_LIST}?${query}`,
  );

  return { data: res.data.data.content, pageData: res.data.data.page };
};

export const getReceivedList = async (
  params?: ManageMentCommonQueryParams,
): Promise<{
  data: ReceivedListResponse[];
  pageData: Page;
}> => {
  const query = new URLSearchParams({
    ...(params?.page && { page: String(params.page) }),
    ...(params?.size && { size: String(params.size) }),
    ...(params?.startDate && { startDate: String(params.startDate) }),
    ...(params?.endDate && { endDate: String(params.endDate) }),
  }).toString();
  const res = await axios.get<ApiResponse<{ content: ReceivedListResponse[]; page: Page }>>(
    `${INVENTORY_ENDPOINTS.RECEIVED_LIST}?${query}`,
  );

  return { data: res.data.data.content, pageData: res.data.data.page };
};
