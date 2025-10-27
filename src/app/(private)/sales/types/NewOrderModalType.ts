export interface NewOrderModalProps {
  $showNewOrderModal: boolean;
  $setShowNewOrderModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface OrderItem {
  id: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  deliveryDate: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface Dealer {
  id: string;
  name: string;
  customerName: string;
  phone: string;
  email: string;
}

export interface FormData {
  dealerId: string;
  customerName: string;
  phone: string;
  email: string;
  notes: string;
}
