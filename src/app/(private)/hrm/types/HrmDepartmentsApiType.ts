export interface DepartmentsData {
  departmentId: string;
  departmentNumber: string;
  departmentName: string;
  description: string;
  managerName: string;
  managerId: string;
  location: string;
  employeeCount: string;
  establishedDate: string;
}

export interface DepartmentsListResponse {
  departments: DepartmentsData[];
}
