export interface AddInventoryModalProps {
  $setShowAddModal: (show: boolean) => void;
}

export interface AddInventoryItemsToggleResponse {
  itemId: string;
  unitPrice: number;
  supplierCompanyName: string;
  uomName: string;
  supplierCompanyId: string;
  itemIdName: string;
}

export interface WarehouseToggleResponse {
  warehouseId: string;
  warehouseName: string;
  warehouseCode: string;
}

export interface AddInventoryItemsRequest {
  itemId: string;
  supplierCompanyId: string;
  safetyStock: number;
  currentStock: number;
  warehouseId: string;
}
