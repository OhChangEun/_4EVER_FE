import { ApiResponse, PROFILE_ENDPOINTS } from '@/app/types/api';
import { CustomerOrSupplierInfoResponse } from './types/CustomerOrSupplierInfoType';
import axios from '@/lib/axiosInstance';

export const getSupOrCusProfile = async (): Promise<CustomerOrSupplierInfoResponse> => {
  const res = await axios.get<ApiResponse<CustomerOrSupplierInfoResponse>>(
    PROFILE_ENDPOINTS.PROFILE_INFO,
  );
  return res.data.data;
};
