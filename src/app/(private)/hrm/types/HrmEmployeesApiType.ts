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
  name?: string;
}

export interface EmployeeRegisterRequest {
  name: string;
  departmentId: number;
  positionId: number;
  email: string;
  phoneNumber: string;
  hireDate: string;
  birthDate: string;
  address: string;
}

export interface EmployeeRegistRequest {
  name: string;
  departmentId: string;
  positionId: string;
  email: string;
  phoneNumber: string;
  hireDate: string;
  birthDate: string;
  gender: string;
  address: string;
  academicHistory: string;
  careerHistory: string;
}

export interface EmployeeUpdateRequest {
  employeeName: string;
  departmentId: string;
  positionId: string;
}
