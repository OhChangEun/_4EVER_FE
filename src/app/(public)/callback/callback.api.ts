import { ApiResponse, USER_ENDPOINTS } from '@/app/types/api';
import { userInfoResponse } from './userInfoType';
import axios from '@/lib/axiosInstance';

export const getUserInfo = async (): Promise<userInfoResponse> => {
  const res = await axios.get<ApiResponse<userInfoResponse>>(USER_ENDPOINTS.USER_INFO);
  return res.data.data;
};
