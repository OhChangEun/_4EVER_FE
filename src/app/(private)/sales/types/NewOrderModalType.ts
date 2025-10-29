export interface NewOrderModalProps {
  $showNewOrderModal: boolean;
  $setShowNewOrderModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface NewOrderRequest {
  items: NewOrderItem[];
  note?: string;
}

export interface NewOrderItem {
  itemId: string;
  quantity: number;
  unitPrice: number;
  dueDate: string;
}

export interface ItemResponse {
  itemId: string;
  itemNumber: string;
  itemName: string;
  uomName: string;
  unitPrice: number;
}
