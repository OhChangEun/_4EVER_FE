import { ApiResponse } from '@/app/types/api';
import { HRM_ENDPOINTS } from '@/app/(private)/hrm/api/hrm.endpoints';
import axios from 'axios';
import { HrmStatResponse } from '@/app/(private)/hrm/types/HrmStatsApiType';

// 인적자원관리 지표
export const fetchHrmStats = async (): Promise<HrmStatResponse | null> => {
  try {
    const res = await axios.get<ApiResponse<HrmStatResponse>>(`${HRM_ENDPOINTS.STATISTICS}`);
    return res.data.data;
    // console.log(res);
  } catch (error) {
    console.log(error);
    return null;
  }
};
