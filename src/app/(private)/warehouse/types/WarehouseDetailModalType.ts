export interface WarehouseDetailModalProps {
  $handleWarehouseManage: (id: string) => void;
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
    managerId: string;
    managerName: string;
    managerPhoneNumber: string;
    managerEmail: string;
  };
}
