import { QuoteStatus } from '@/app/(private)/sales/types/SalesQuoteListType';

export interface QuoteDetailModalProps {
  $onClose: () => void;
  $selectedQuotationId: string;
}

export interface QuoteDetail {
  quotationId: string;
  quotationNumber: string;
  quotationDate: string;
  dueDate: string;
  statusCode: QuoteStatus;
  customerName: string;
  ceoName: string;
  items: Item[];
  totalAmount: number;
}

interface Item {
  itemId: string;
  itemName: string;
  quantity: number;
  uomName: string;
  unitPrice: number;
  amount: number;
}

export interface Inventories {
  itemId: string;
  itemName: string;
  requiredQuantity: number;
}
