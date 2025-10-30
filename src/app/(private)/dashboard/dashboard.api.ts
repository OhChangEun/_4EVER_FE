import axios from 'axios';
import { DashboardStatRes } from './types/DashboardStatsType';
import { ApiResponse, DASHBOARD_ENDPOINTS } from '@/app/types/api';
import { DashboardWorkflowRes } from './types/DashboardWorkflowType';

// ----------------------- 통계 지표 -----------------------
export const getDashboardStats = async (): Promise<DashboardStatRes> => {
  const res = await axios.get<ApiResponse<DashboardStatRes>>(DASHBOARD_ENDPOINTS.STATS);
  // console.log(res.data.data);
  return res.data.data;
};

// ----------------------- 워크플로우 현황 -----------------------
export const getWorkflowStatus = async (role: string): Promise<DashboardWorkflowRes> => {
  const res = await axios.get<ApiResponse<DashboardWorkflowRes>>(
    DASHBOARD_ENDPOINTS.WORKFLOW_STATUS(role),
  );
  return res.data.data;
};
