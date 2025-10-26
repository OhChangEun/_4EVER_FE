export interface InvoiceDetailModalProps {
  $setShowDetailModal: (show: boolean) => void;
  $selectedInvoiceId: string;
  $setSelectedInvoiceId: (id: string) => void;
}

export interface InvoicetDetailRes {
  invoiceId: string;
  invoiceNumber: string;
  invoiceType: string;
  statusCode: string;
  issueDate: string;
  dueDate: string;
  name: string;
  referenceNumber: string;
  totalAmount: number;
  note: string;
  items: {
    itemId: string;
    itemName: string;
    quantity: number;
    unitOfMaterialName: string;
    unitPrice: number;
    totalPrice: number;
  }[];
}
