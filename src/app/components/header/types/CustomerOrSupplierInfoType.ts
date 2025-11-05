export interface CustomerOrSupplierInfoResponse {
  companyName: string;
  baseAddress: string;
  detailAddress: string;
  officePhone: string;
  businessNumber: string;
  customerName: string;
  phoneNumber: string;
  email: string;
}

export interface ProfileInfoModalProps {
  $setIsOpen: (show: boolean) => void;
}
