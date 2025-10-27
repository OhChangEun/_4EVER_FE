export interface ManageWarehouseModalProps {
  $selectedWarehouseId: string;
  $setShowManageModal: (show: boolean) => void;
}

export interface EditWarehouseRequest {
  warehouseName: string;
  warehouseType: string;
  location: string;
  managerId: string;
  warehouseStatusCode: string;
  note: string;
}
