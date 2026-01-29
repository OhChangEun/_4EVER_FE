import { ApiResponse, ApiResponseNoData, USER_ENDPOINTS } from '@/app/types/api';
import { userInfoResponse } from './userInfoType';
import axios from '@/lib/axiosInstance';

interface LoginResponse {
  accessToken: string;
  user: userInfoResponse;
}

export const getUserInfo = async (): Promise<userInfoResponse> => {
  const res = await axios.get<ApiResponse<userInfoResponse>>(USER_ENDPOINTS.USER_INFO);
  return res.data.data;
};

export const login = async (): Promise<LoginResponse> => {
  const res = await axios.post<LoginResponse>(USER_ENDPOINTS.LOGIN);
  return res.data;
};

export const logout = async (): Promise<ApiResponseNoData> => {
  const res = await axios.post<ApiResponseNoData>(USER_ENDPOINTS.LOGOUT);
  return res.data;
};
