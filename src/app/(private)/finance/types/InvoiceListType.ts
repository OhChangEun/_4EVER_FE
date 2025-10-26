// 현재 VoucherDetailModalType과 VoucherListType의 타입이 같음!
// api 연동 시 변경!

export type InvoiceStatus = 'ALL' | 'UNPAID' | 'PENDING' | 'PAID';

export interface InvoiceListRes {
  invoiceId: string;
  invoiceNumber: string;
  supply: {
    supplierId: string;
    supplierCode: string;
    supplierName: string;
  };
  totalAmount: number;
  issueDate: string;
  dueDate: string;
  statusCode: string;
  referenceNumber: string;
  reference: {
    referenceId: number;
    referenceCode: string;
  };
}

export interface InvoiceQueryParams {
  status: string;
  page: number;
  size: number;
}
