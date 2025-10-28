import { Page, PageRequest } from '@/app/types/Page';

export interface EmployeeData {
  employeeId: string;
  employeeNumber: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  statusCode: string;
  hireDate: string;
  birthDate: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeListResponse {
  content: EmployeeData[];
  page: Page;
}

// 응답 요청시 request params
export interface EmployeeListRequestParams extends PageRequest {
  department?: string;
  position?: string;
  name?: string;
}
