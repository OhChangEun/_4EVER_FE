export interface InventoryDetailModalProps {
  $selectedItemId: string;
  $setSelectedItemId: (itemId: string) => void;
  $setShowDetailModal: (show: boolean) => void;
}

export interface StockMovement {
  type: string;
  quantity: number;
  uomName: string;
  from: string;
  to: string;
  movementDate: string;
  managerName: string;
  referenceNumber: string;
  note: string;
}

export interface InventoryDetailResponse {
  itemId: string;
  itemNumber: string;
  itemName: string;
  category: string;
  supplierCompanyName: string;
  statusCode: string;
  currentStock: number;
  safetyStock: number;
  uomName: string;
  unitPrice: number;
  totalAmount: number;
  warehouseId: string;
  warehouseName: string;
  warehouseNumber: string;
  lastModified: string;
  description: string;
  stockMovements: StockMovement[];
}

export interface StockMovementRequest {
  fromWarehouseId: number;
  toWarehouseId: number;
  stockId: number;
  stockQuantity: number;
  uomName: string;
}
