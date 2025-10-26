export interface WarehouseDetailModalProps {
  $selectedWarehouseId: string;
  $setShowDetailModal: (show: boolean) => void;
}

export interface WarehouseDetailResponse {
  warehouseInfo: {
    warehouseName: string;
    warehouseNumber: string;
    warehouseType: string;
    statusCode: string;
    location: string;
    description: string;
  };
  manager: {
    managerName: string;
    managerPhoneNumber: string;
    managerEmail: string;
  };
}
