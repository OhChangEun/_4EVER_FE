interface PaginationParams {
  page?: number;
  size?: number;
}

export interface FetchPurchaseReqParams extends PaginationParams {
  status?: string;
  searchKeyword?: string;
  createdFrom?: string;
  createdTo?: string;
}

export interface FetchPurchaseOrderParams extends PaginationParams {
  category?: string;
  status?: string;
  searchKeyword?: string;
  orderDateFrom?: string;
  orderDateTo?: string;
}

// 구매 요청 등록
export interface CreatePurchaseRequest {
  requesterId: number;
  items: {
    itemName: string;
    quantity: number;
    uomName: string;
    expectedUnitPrice: number;
    expectedTotalPrice: number;
    preferredVendorName: string;
    desiredDeliveryDate: string;
    purpose: string;
    note?: string;
  }[];
}

export interface FetchSupplierListParams extends PaginationParams {
  category?: string;
  status?: string;
  searchKeyword?: string;
}
