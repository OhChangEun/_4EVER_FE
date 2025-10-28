import { ApiResponse } from '@/app/types/api';
import { HRM_ENDPOINTS } from '@/app/(private)/hrm/api/hrm.endpoints';
import axios from 'axios';
import { HrmStatResponse } from '@/app/(private)/hrm/types/HrmStatsApiType';
import {
  EmployeeListRequestParams,
  EmployeeListResponse,
} from '@/app/(private)/hrm/types/HrmEmployeesApiType';
import { PositionDataResponse } from '@/app/(private)/hrm/types/HrmPositionsApiType';
import { DepartmentsListResponse } from '../types/HrmDepartmentsApiType';

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

// 직원 목록
export const fetchEmployeesList = async (
  params: EmployeeListRequestParams,
): Promise<EmployeeListResponse> => {
  const res = await axios.get<ApiResponse<EmployeeListResponse>>(`${HRM_ENDPOINTS.EMPLOYEE}`, {
    params,
  });
  return res.data.data;
};

// 직급 목록
export const fetchPositionsList = async (): Promise<PositionDataResponse> => {
  const res = await axios.get<ApiResponse<PositionDataResponse>>(`${HRM_ENDPOINTS.POSITIONS}`);
  return res.data.data;
};

// 부서 목록
export const fetchDepartmentsList = async (): Promise<DepartmentsListResponse> => {
  const res = await axios.get<ApiResponse<DepartmentsListResponse>>(`${HRM_ENDPOINTS.DEPARTMENTS}`);
  return res.data.data;
};
