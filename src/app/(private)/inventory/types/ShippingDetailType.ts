export interface ShippingDetailModalProps {
  $selectedSubTab: string;
  $selectedItemId: string;
  $setShowShipDetailModal: (show: boolean) => void;
}

export interface ShippingDetailResponse {
  salesOrderId: string;
  salesOrderNumber: string;
  customerCompanyName: string;
  dueDate: string;
  statusCode: 'IN_PRODUCTION' | 'READY_TO_SHIP' | 'COMPLETED' | string;
  orderItems: {
    itemName: string;
    quantity: number;
    uomName: string;
  }[];
}

export interface OrderItemsType {
  itemName: string;
  quantity: number;
  uomName: string;
}

export interface markAsReadyToShipResponse {
  salesOrderId: string;
  salesOrderCode: string;
  status: string;
}
