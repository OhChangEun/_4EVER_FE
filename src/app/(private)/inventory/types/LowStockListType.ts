export interface LowStockListResponse {
  itemId: string;
  itemName: string;
  itemNumber: string;
  category: string;
  currentStock: number;
  uomName: string;
  safetyStock: number;
  unitPrice: number;
  totalAmount: number;
  warehouseName: string;
  warehouseNumber: string;
  statusCode: 'NORMAL' | 'CAUTION' | 'URGENT';
}

export interface LowStockListQueryParams {
  status?: string;
  page?: number;
  size?: number;
}
