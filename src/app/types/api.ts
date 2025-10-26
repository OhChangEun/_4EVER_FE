// 공통 API Base URL
export const API_BASE_URL = 'https://api.everp.co.kr/api';
export const SALES_BASE_PATH = `${API_BASE_URL}/business/sd`;
export const FINANCE_BASE_PATH = `${API_BASE_URL}/business/fcm`;
export const DASHBOARD_BASE_PATH = `${API_BASE_URL}/dashboard`;

// 공통 응답 타입
export interface ApiResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ApiResponseNoData {
  status: number;
  success: boolean;
  message: string;
}

// ----------------------- SALES -----------------------
export const SALES_ENDPOINTS = {
  STATS: `${SALES_BASE_PATH}/statistics`,
  QUOTES_LIST: `${SALES_BASE_PATH}/quotations`,
  QUOTE_DETAIL: (id: string) => `${SALES_BASE_PATH}/quotations/${id}`,
  QUOTE_CONFIRM: `${SALES_BASE_PATH}/quotations/confirm`,
  INVENTORY_CHECK: `${SALES_BASE_PATH}/quotations/inventory/check`,
  QUOTE_DELIVERY_PROCESS: (id: string) => `${SALES_BASE_PATH}/quotations/${id}/approve-order`,
  ORDERS_LIST: `${SALES_BASE_PATH}/orders`,
  ORDER_DETAIL: (id: string) => `${SALES_BASE_PATH}/orders/${id}`,
  CUSTOMERS_LIST: `${SALES_BASE_PATH}/customers`,
  CUSTOMER_DETAIL: (id: string) => `${SALES_BASE_PATH}/customers/${id}`,
  EDIT_CUSTOMER: (id: string) => `${SALES_BASE_PATH}/customers/${id}`,
  ANALYTICS: `${SALES_BASE_PATH}/analytics/sales`,
} as const;

// ----------------------- FINANCE -----------------------

export const FINANCE_ENDPOINTS = {
  STATISTICS: `${FINANCE_BASE_PATH}/statictics`,
  PURCHASE_INVOICES_LIST: `${FINANCE_BASE_PATH}/invoice/ap`,
  PURCHASE_INVOICE_DETAIL: (invoiceId: string) => `${FINANCE_BASE_PATH}/invoice/ap/${invoiceId}`,
  SALES_INVOICES_LIST: `${FINANCE_BASE_PATH}/invoice/ar`,
  SALES_INVOICE_DETAIL: (invoiceId: string) => `${FINANCE_BASE_PATH}/invoice/ar/${invoiceId}`,

  PURCHASE_INVOICE_REQUEST: (invoiceId: string) =>
    `${FINANCE_BASE_PATH}/invoice/ap/receivable/request?invoiceId=${invoiceId}`,
  SALES_INVOICE_COMPLETE: (invoiceId: string) =>
    `${FINANCE_BASE_PATH}/invoice/ar/${invoiceId}/receivable/complete`,
} as const;

// ----------------------- DASHBOARD -----------------------
export const DASHBOARD_ENDPOINTS = {
  STATS: `${DASHBOARD_BASE_PATH}/statistics`,
  WORKFLOW_STATUS: (role: string) => `${DASHBOARD_BASE_PATH}/workflows?role=${role}`,
} as const;
