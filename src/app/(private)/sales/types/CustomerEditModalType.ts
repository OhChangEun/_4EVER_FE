import { CustomerDetail } from '@/app/(private)/sales/types/SalesCustomerDetailType';

export interface CustomerEditModalProps {
  $onClose: () => void;
  $editFormData: CustomerDetail | null;
  $setEditFormData: React.Dispatch<React.SetStateAction<CustomerDetail | null>>;
  $setShowDetailModal: (show: boolean) => void;
}

export interface CustomerResponse {
  data: {
    customerId: string;
    customerNumber: string;
    customerName: string;
    ceoName: string;
    businessNumber: string;
    statusCode: string;
    customerPhone: string;
    customerEmail: string;
    baseAddress: string;
    detailAddress: string;
    manager: {
      managerName: string;
      managerPhone: string;
      managerEmail: string;
    };
    note: string;
  };
}

export interface CustomerEditData {
  customerName: string;
  ceoName: string;
  businessNumber: string;
  customerPhone: string;
  customerEmail: string;
  baseAddress: string;
  detailAddress: string;
  statusCode: string;
  manager: {
    managerName: string;
    managerPhone: string;
    managerEmail: string;
  };
  note: string;
}
