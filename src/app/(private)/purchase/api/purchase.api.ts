import axios from 'axios';
import { ApiResponse } from '@/app/types/api';
import { PurchaseStatResponse } from '@/app/(private)/purchase/types/PurchaseStatsType';
import {
  PurchaseOrderDetailResponse,
  PurchaseOrderListResponse,
} from '@/app/(private)/purchase/types/PurchaseOrderType';
import {
  PurchaseReqDetailResponse,
  PurchaseReqListResponse,
} from '@/app/(private)/purchase/types/PurchaseReqType';
import {
  CreateSupplierRequest,
  SupplierDetailResponse,
  SupplierListResponse,
} from '@/app/(private)/purchase/types/SupplierType';
import {
  CreatePurchaseRequest,
  FetchPurchaseOrderParams,
  FetchPurchaseReqParams,
  FetchSupplierListParams,
} from '@/app/(private)/purchase/types/PurchaseApiRequestType';
import { PURCHASE_ENDPOINTS } from '@/app/(private)/purchase/api/purchase.endpoints';

// 구매 관리 지표
export const fetchPurchaseStats = async (): Promise<PurchaseStatResponse | null> => {
  try {
    const res = await axios.get<ApiResponse<PurchaseStatResponse>>(
      `${PURCHASE_ENDPOINTS.STATISTICS}`,
    );
    return res.data.data;
    // console.log(res);
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 구매 요청 목록
export const fetchPurchaseReqList = async (
  params: FetchPurchaseReqParams,
): Promise<PurchaseReqListResponse> => {
  const { page = 0, size = 10, status = 'ALL', createdFrom, createdTo } = params;

  const res = await axios.get<ApiResponse<PurchaseReqListResponse>>(
    `${PURCHASE_ENDPOINTS.PURCHASE_REQUISITIONS}`,
    {
      params: {
        page,
        size,
        ...(status && { status }),
        ...(createdFrom && { createdFrom }),
        ...(createdTo && { createdTo }),
      },
    },
  );
  // console.log(res.data.data);
  return res.data.data;
};

// 구매 요청 승인
export const postApporvePurchaseReq = async (prId: number) => {
  const res = await axios.post<ApiResponse<null>>(
    `${PURCHASE_ENDPOINTS.PURCHASE_REQUISITION_RELEASE(prId)}`,
  );
  return res.data;
};

// 구매 요청 반려
export const postRejectPurchaseReq = async (prId: number) => {
  const res = await axios.post<ApiResponse<null>>(
    `${PURCHASE_ENDPOINTS.PURCHASE_REQUISITION_REJECT(prId)}`,
  );
  return res.data;
};

// 구매 요청 상세정보
export const fetchPurchaseReqDetail = async (
  purchaseId: number,
): Promise<PurchaseReqDetailResponse> => {
  const res = await axios.get<ApiResponse<PurchaseReqDetailResponse>>(
    `${PURCHASE_ENDPOINTS.PURCHASE_REQUISITION_DETAIL(purchaseId)}`,
  );

  // console.log(res.data.data);
  return res.data.data;
};

// 구매 요청 등록
export const createPurchaseRequest = async (
  data: CreatePurchaseRequest,
): Promise<ApiResponse<null>> => {
  const res = await axios.post<ApiResponse<null>>(
    `${PURCHASE_ENDPOINTS.PURCHASE_REQUISITIONS}`,
    data,
  );
  return res.data;
};

// 발주서 목록
export const fetchPurchaseOrderList = async (
  params: FetchPurchaseOrderParams,
): Promise<PurchaseOrderListResponse> => {
  const { page = 0, size = 10, status, orderDateFrom, orderDateTo } = params;

  const res = await axios.get<ApiResponse<PurchaseOrderListResponse>>(
    `${PURCHASE_ENDPOINTS.PURCHASE_ORDERS}`,
    {
      params: {
        page,
        size,
        ...(status && { status }),
        ...(orderDateFrom && { orderDateFrom }),
        ...(orderDateTo && { orderDateTo }),
      },
    },
  );
  // console.log(res.data.data);
  return res.data.data;
};

// 발주서 승인
export const postApprovePurchaseOrder = async (poId: number) => {
  const res = await axios.post<ApiResponse<null>>(
    `${PURCHASE_ENDPOINTS.PURCHASE_ORDER_APPROVE(poId)}`,
  );
  return res.data;
};

// 발주서 반려
export const postRejectPurchaseOrder = async (poId: number) => {
  const res = await axios.post<ApiResponse<null>>(
    `${PURCHASE_ENDPOINTS.PURCHASE_ORDER_REJECT(poId)}`,
  );
  return res.data;
};

// 발주서 상세정보
export const fetchPurchaseOrderDetail = async (
  purchaseId: number,
): Promise<PurchaseOrderDetailResponse> => {
  const res = await axios.get<ApiResponse<PurchaseOrderDetailResponse>>(
    `${PURCHASE_ENDPOINTS.PURCHASE_ORDER_DETAIL(purchaseId)}`,
  );

  console.log(res.data.data);
  return res.data.data;
};

// 공급업체 목록
export const fetchSupplierList = async (
  params: FetchSupplierListParams = {},
): Promise<SupplierListResponse> => {
  const { page = 0, size = 10, category, status, searchKeyword } = params;

  const res = await axios.get<ApiResponse<SupplierListResponse>>(`${PURCHASE_ENDPOINTS.SUPPLIER}`, {
    params: {
      page,
      size,
      ...(category && { category }),
      ...(status && { status }),
      ...(searchKeyword && { searchKeyword }),
    },
  });
  return res.data.data;
};

// 공급업체 상세정보
export const fetchSupplierDetail = async (supplierId: number): Promise<SupplierDetailResponse> => {
  const res = await axios.get<ApiResponse<SupplierDetailResponse>>(
    `${PURCHASE_ENDPOINTS.SUPPLIER_DETAIL(supplierId)}`,
  );

  // console.log(res.data.data);
  return res.data.data;
};

// 공급업체 등록
export const createSupplyRequest = async (
  data: CreateSupplierRequest,
): Promise<ApiResponse<null>> => {
  const res = await axios.post<ApiResponse<null>>(`${PURCHASE_ENDPOINTS.SUPPLIER}`, data);
  return res.data;
};
