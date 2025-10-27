export interface AddWarehouseModalProps {
  $setShowAddModal: (show: boolean) => void;
}

export interface AddWarehouseRequest {
  warehouseName: string;
  warehouseType: string;
  location: string;
  managerId: string;
  managerPhone?: string;
}

export interface WarehouseManagerInfoResponse {
  managerEmail: string;
  managerId: string;
  managerName: string;
  managerPhone: string;
}
