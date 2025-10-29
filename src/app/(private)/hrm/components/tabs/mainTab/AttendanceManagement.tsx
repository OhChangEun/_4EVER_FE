'use client';
import SubNavigation from '@/app/components/common/SubNavigation';
import { useState, useMemo } from 'react';
import { ATTENDANCE_TABS } from '@/app/(private)/hrm/constants';
import { AttendanceDetailModal } from '@/app/(private)/hrm/components/modals/AttendanceDetailModal';
import { AttendanceEditModal } from '@/app/(private)/hrm/components/modals/AttendanceEditModal';
import { LeaveApprovalModal } from '@/app/(private)/hrm/components/modals/LeaveApprovalModal';
import { LeaveRejectModal } from '@/app/(private)/hrm/components/modals/LeaveRejectModal';

export default function AttendanceManagement() {
  const [activeTab, setActiveTab] = useState('attendance');
  const [showAttendanceDetailModal, setShowAttendanceDetailModal] = useState(false);
  const [showEditAttendanceModal, setShowEditAttendanceModal] = useState(false);
  const [showLeaveApprovalModal, setShowLeaveApprovalModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState<any>(null);
  const [selectedLeave, setSelectedLeave] = useState<any>(null);
  const [approvalAction, setApprovalAction] = useState<'approve' | 'reject'>('approve');

  // 출퇴근 기록 필터링 상태
  const [attendanceDepartmentFilter, setAttendanceDepartmentFilter] = useState('');
  const [attendancePositionFilter, setAttendancePositionFilter] = useState('');
  const [attendanceSearchTerm, setAttendanceSearchTerm] = useState('');
  const [attendanceCurrentPage, setAttendanceCurrentPage] = useState(1);

  // 휴가 관리 필터링 상태
  const [leaveCurrentPage, setLeaveCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const attendanceData = [
    {
      employeeId: 'EMP001',
      name: '김민수',
      position: '과장',
      department: '개발팀',
      date: '2024-01-15',
      checkIn: '09:00',
      checkOut: '18:30',
      workHours: '8시간 30분',
      overtime: '30분',
      status: '정상',
    },
    {
      employeeId: 'EMP002',
      name: '이영희',
      position: '차장',
      department: '마케팅팀',
      date: '2024-01-15',
      checkIn: '08:45',
      checkOut: '17:45',
      workHours: '8시간',
      overtime: '0분',
      status: '정상',
    },
    {
      employeeId: 'EMP003',
      name: '박철수',
      position: '부장',
      department: '영업팀',
      date: '2024-01-15',
      checkIn: '09:15',
      checkOut: '19:00',
      workHours: '8시간 45분',
      overtime: '1시간',
      status: '지각',
    },
    {
      employeeId: 'EMP004',
      name: '정수진',
      position: '대리',
      department: '인사팀',
      date: '2024-01-15',
      checkIn: '09:00',
      checkOut: '18:00',
      workHours: '8시간',
      overtime: '0분',
      status: '정상',
    },
    {
      employeeId: 'EMP005',
      name: '최동훈',
      position: '과장',
      department: '재무팀',
      date: '2024-01-15',
      checkIn: '09:10',
      checkOut: '18:15',
      workHours: '8시간 5분',
      overtime: '15분',
      status: '지각',
    },
    {
      employeeId: 'EMP006',
      name: '김영수',
      position: '차장',
      department: '재고팀',
      date: '2024-01-15',
      checkIn: '-',
      checkOut: '-',
      workHours: '0시간',
      overtime: '0분',
      status: '휴가',
    },
    {
      employeeId: 'EMP007',
      name: '이미영',
      position: '사원',
      department: '구매팀',
      date: '2024-01-15',
      checkIn: '-',
      checkOut: '-',
      workHours: '0시간',
      overtime: '0분',
      status: '결근',
    },
    {
      employeeId: 'EMP008',
      name: '홍길동',
      position: '대리',
      department: '영업팀',
      date: '2024-01-15',
      checkIn: '09:05',
      checkOut: '18:10',
      workHours: '8시간 5분',
      overtime: '10분',
      status: '정상',
    },
    {
      employeeId: 'EMP009',
      name: '강수진',
      position: '사원',
      department: '생산팀',
      date: '2024-01-15',
      checkIn: '08:55',
      checkOut: '17:55',
      workHours: '8시간',
      overtime: '0분',
      status: '정상',
    },
    {
      employeeId: 'EMP010',
      name: '윤태호',
      position: '대리',
      department: '재무팀',
      date: '2024-01-15',
      checkIn: '09:20',
      checkOut: '18:25',
      workHours: '8시간 5분',
      overtime: '25분',
      status: '지각',
    },
  ];

  const leaveData = [
    {
      employeeId: 'EMP001',
      name: '김민수',
      position: '과장',
      department: '개발팀',
      leaveType: '연차',
      startDate: '2024-01-20',
      endDate: '2024-01-22',
      days: 3,
      remaining: 12,
    },
    {
      employeeId: 'EMP004',
      name: '정수진',
      position: '대리',
      department: '인사팀',
      leaveType: '병가',
      startDate: '2024-01-18',
      endDate: '2024-01-18',
      days: 1,
      remaining: 15,
    },
    {
      employeeId: 'EMP002',
      name: '이영희',
      position: '차장',
      department: '마케팅팀',
      leaveType: '연차',
      startDate: '2024-01-25',
      endDate: '2024-01-26',
      days: 2,
      remaining: 18,
    },
    {
      employeeId: 'EMP003',
      name: '박철수',
      position: '부장',
      department: '영업팀',
      leaveType: '연차',
      startDate: '2024-01-30',
      endDate: '2024-01-31',
      days: 2,
      remaining: 20,
    },
    {
      employeeId: 'EMP006',
      name: '김영수',
      position: '차장',
      department: '재고팀',
      leaveType: '병가',
      startDate: '2024-02-05',
      endDate: '2024-02-07',
      days: 3,
      remaining: 14,
    },
    {
      employeeId: 'EMP008',
      name: '홍길동',
      position: '대리',
      department: '영업팀',
      leaveType: '연차',
      startDate: '2024-02-10',
      endDate: '2024-02-12',
      days: 3,
      remaining: 16,
    },
  ];

  // 부서 및 직급 목록 추출
  const attendanceDepartments = [...new Set(attendanceData.map((emp) => emp.department))];
  const attendancePositions = [...new Set(attendanceData.map((emp) => emp.position))];

  // 출퇴근 기록 필터링
  const filteredAttendanceData = useMemo(() => {
    return attendanceData.filter((record) => {
      const matchesDepartment =
        !attendanceDepartmentFilter || record.department === attendanceDepartmentFilter;
      const matchesPosition =
        !attendancePositionFilter || record.position === attendancePositionFilter;
      const matchesSearch =
        !attendanceSearchTerm ||
        record.name.toLowerCase().includes(attendanceSearchTerm.toLowerCase());

      return matchesDepartment && matchesPosition && matchesSearch;
    });
  }, [attendanceDepartmentFilter, attendancePositionFilter, attendanceSearchTerm]);

  // 출퇴근 기록 페이지네이션
  const attendanceTotalPages = Math.ceil(filteredAttendanceData.length / itemsPerPage);
  const attendanceStartIndex = (attendanceCurrentPage - 1) * itemsPerPage;
  const paginatedAttendanceData = filteredAttendanceData.slice(
    attendanceStartIndex,
    attendanceStartIndex + itemsPerPage,
  );

  // 휴가 관리 페이지네이션
  const leaveTotalPages = Math.ceil(leaveData.length / itemsPerPage);
  const leaveStartIndex = (leaveCurrentPage - 1) * itemsPerPage;
  const paginatedLeaveData = leaveData.slice(leaveStartIndex, leaveStartIndex + itemsPerPage);

  const handleDownloadAttendance = () => {
    const attendanceReport = attendanceData.map((record) => ({
      name: record.name,
      position: record.position,
      department: record.department,
      date: record.date,
      checkIn: record.checkIn,
      checkOut: record.checkOut,
      workHours: record.workHours,
      status: record.status,
    }));

    const dataStr = JSON.stringify(attendanceReport, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `attendance_report_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleViewAttendance = (record: any) => {
    setSelectedAttendance(record);
    setShowAttendanceDetailModal(true);
  };

  const handleEditAttendance = (record: any) => {
    setSelectedAttendance(record);
    setShowEditAttendanceModal(true);
  };

  const handleApproveLeave = (record: any) => {
    setSelectedLeave(record);
    setApprovalAction('approve');
    setShowLeaveApprovalModal(true);
  };

  const handleRejectLeave = (record: any) => {
    setSelectedLeave(record);
    setApprovalAction('reject');
    setShowRejectModal(true);
  };

  const handleUpdateAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`${selectedAttendance.name}의 출퇴근 정보가 수정되었습니다.`);
    setShowEditAttendanceModal(false);
  };

  const handleLeaveApproval = (e: React.FormEvent) => {
    e.preventDefault();
    const action = approvalAction === 'approve' ? '승인' : '반려';
    alert(`${selectedLeave.name}의 휴가가 ${action}되었습니다.`);
    setShowLeaveApprovalModal(false);
    setShowRejectModal(false);
  };

  const handleAttendanceFilterChange = () => {
    setAttendanceCurrentPage(1);
  };

  return (
    <>
      <SubNavigation tabs={ATTENDANCE_TABS} />

      {/* 모달들 */}
      {showAttendanceDetailModal && selectedAttendance && (
        <AttendanceDetailModal
          attendance={selectedAttendance}
          onClose={() => setShowAttendanceDetailModal(false)}
        />
      )}

      {showEditAttendanceModal && selectedAttendance && (
        <AttendanceEditModal
          attendance={selectedAttendance}
          onClose={() => setShowEditAttendanceModal(false)}
          onSubmit={handleUpdateAttendance}
        />
      )}
    </>
  );
}
