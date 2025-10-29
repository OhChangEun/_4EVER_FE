import { Page, PageRequest } from '@/app/types/Page';

export interface AttendanceListData {
  attendanceId: string;
  employeeId: string;
  employeeName: string;
  employeeNumber: string;
  attendanceDate: string;
  checkInTime: string;
  checkOutTime: string;
  statusCode: string;
  workType: string;
  location: string;
  notes: string;
  workingHours: number;
  overtimeHours: number;
  approvalStatus: string;
  approverName: string;
  approverId: string;
  createdAt: string;
  updatedAt: string;
  department: string;
  position: string;
  isLate: boolean;
  isEarlyLeave: boolean;
}

export interface AttendanceListResponse {
  content: AttendanceListData[];
  page: Page;
}

export interface AttendanceRequestParams extends PageRequest {
  date: string;
  department?: string;
  position?: string;
  name?: string;
}
