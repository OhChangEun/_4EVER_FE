import { API_BASE_URL } from '@/app/types/api';

export const HRM_BASE_PATH = `${API_BASE_URL}/business/hrm`;

export const HRM_ENDPOINTS = {
  // 근태
  ATTENDANCE: `${HRM_BASE_PATH}/attendance`, // 출퇴근 기록 조회
  ATTENDANCE_CHECK_IN: `${HRM_BASE_PATH}/attendance/check-in`, // 출근 상태 변경
  ATTENDANCE_CHECK_OUT: `${HRM_BASE_PATH}/attendance/check-out`, // 퇴근 상태 변경

  // 부서
  DEPARTMENTS: `${HRM_BASE_PATH}/departments`, // 부서 목록 조회

  // 직원
  EMPLOYEE: `${HRM_BASE_PATH}/employee`, // 직원 목록 조회
  EMPLOYEE_DETAIL: (employeeId: string) => `${HRM_BASE_PATH}/employee/${employeeId}`, // 직원 상세 조회, 수정

  // 직원 가입
  EMPLOYEE_SIGNUP: `${HRM_BASE_PATH}/signup`, // 신규 직원 등록

  // 휴가
  LEAVE_REQUESTS: `${HRM_BASE_PATH}/leave-request`, // 휴가 신청 목록 조회
  LEAVE_REQUEST: `${HRM_BASE_PATH}/leave/request`, // 휴가 신청 생성
  LEAVE_REQUEST_REJECT: (requestId: number) => `${HRM_BASE_PATH}/leave/request/${requestId}/reject`, // 휴가 신청 반려
  LEAVE_REQUEST_RELEASE: (requestId: number) =>
    `${HRM_BASE_PATH}/leave/request/${requestId}/release`, // 휴가 신청 승인

  // 급여
  PAYROLL: `${HRM_BASE_PATH}/payroll`, // 급여 목록 조회
  PAYROLL_DETAIL: (payrollId: string) => `${HRM_BASE_PATH}/payroll/${payrollId}`, // 급여 상세 조회

  // 직책
  POSITIONS: `${HRM_BASE_PATH}/positions`, // 직책 목록 조회
  POSITION_DETAIL: (positionId: string) => `${HRM_BASE_PATH}/positions/${positionId}`, // 직책 상세 조회

  // 교육
  PROGRAM: `${HRM_BASE_PATH}/program`, // 교육 프로그램 목록 조회
  PROGRAM_DETAIL: (programId: string) => `${HRM_BASE_PATH}/program/${programId}`, // 교육 프로그램 상세 조회

  TRAINING_STATUS: `${HRM_BASE_PATH}/training-status`, // 직원 교육 현황 조회
  TRAINING_EMPLOYEE_DETAIL: (employeeId: string) =>
    `${HRM_BASE_PATH}/training/employee/${employeeId}`, // 직원 교육 현황 상세 조회

  // 통계
  STATISTICS: `${HRM_BASE_PATH}/statistics`, // HRM 통계 조회

  // 근무 기록
  TIME_RECORD: `${HRM_BASE_PATH}/time-record`, // 출퇴근 기록 목록 조회
  TIME_RECORD_DETAIL: (timeRecordId: number) => `${HRM_BASE_PATH}/time-record/${timeRecordId}`, // 출퇴근 기록 상세 조회
  TIME_RECORD_UPDATE: (timeRecordId: number) => `${HRM_BASE_PATH}/time-record/${timeRecordId}`, // 출퇴근 기록 수정 (PUT)
};
