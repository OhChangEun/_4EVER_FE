// tabs/AttendanceTab.tsx
'use client';
import {
  fetchAttendanceList,
  fetchDepartmentsList,
  fetchPositionsList,
} from '@/app/(private)/hrm/api/hrm.api';
import { AttendanceRequestParams } from '@/app/(private)/hrm/types/HrmAttendanceApiType';
import { ProgramRequestParams } from '@/app/(private)/hrm/types/HrmProgramApiType';
import Dropdown from '@/app/components/common/Dropdown';
import { useModal } from '@/app/components/common/modal/useModal';
import Pagination from '@/app/components/common/Pagination';
import { KeyValueItem } from '@/app/types/CommonType';
import { useQuery } from '@tanstack/react-query';
import { useState, useMemo } from 'react';

export default function AttendanceTab() {
  // --- 모달 출력 ---
  const { openModal } = useModal();

  // --- 드롭다운 ---
  const [selectedDepartment, setSelectedDepartment] = useState(''); // 부서
  const [selectedPosition, setSelectedPosition] = useState(''); // 직급

  // --- 페이지 네이션 ---
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // --- 달력 데이터 ---
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);

  const [employeeSearchTerm, setEmployeeSearchTerm] = useState('');

  const {
    data: positionsData = [],
    isLoading: isPosLoading,
    isError: isPosError,
  } = useQuery({
    queryKey: ['positionsList'],
    queryFn: fetchPositionsList,
    staleTime: Infinity,
  });

  const {
    data: departmentsData,
    isLoading: isDeptLoading,
    isError: isDeptError,
  } = useQuery({
    queryKey: ['departmentsList'],
    queryFn: fetchDepartmentsList,
    staleTime: Infinity,
  });

  const positionOptions: KeyValueItem[] = useMemo(() => {
    return [
      { key: '', value: '전체 직급' },
      ...positionsData.map((item) => ({
        key: item.positionId,
        value: item.positionName,
      })),
    ];
  }, [positionsData]);

  const departmentsOptions: KeyValueItem[] = useMemo(() => {
    const departmentList = departmentsData?.departments ?? [];

    return [
      { key: '', value: '전체 부서' },
      ...departmentList.map((item) => ({
        key: item.departmentId,
        value: item.departmentName,
      })),
    ];
  }, [departmentsData]);

  const attendanceQueryParams = useMemo(
    (): AttendanceRequestParams => ({
      date: selectedDate,
      department: selectedDepartment || undefined,
      position: selectedPosition || undefined,
      page: currentPage - 1,
      size: pageSize,
    }),
    [selectedDate, selectedDepartment, selectedPosition, currentPage],
  );

  const {
    data: attendanceData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['attendanceList', attendanceQueryParams],
    queryFn: () => fetchAttendanceList(attendanceQueryParams),
  });

  const attendanceList = attendanceData?.content ?? [];
  const pageInfo = attendanceData?.page;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <input
          type="date"
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          defaultValue="2024-01-15"
          onChange={(e) => {
            setSelectedDate(e.target.value);
          }}
        />
        <div className="flex items-center gap-3">
          <Dropdown
            items={departmentsOptions}
            value={selectedDepartment}
            onChange={(dept: string) => {
              setSelectedDepartment(dept);
              setCurrentPage(1);
            }}
          />
          <Dropdown
            items={positionOptions}
            value={selectedPosition}
            onChange={(position: string) => {
              setSelectedPosition(position);
              setCurrentPage(1);
            }}
          />

          {/* 직원 이름 검색 */}
          <div className="relative flex-1 max-w-xs">
            <input
              type="text"
              placeholder="직원 이름 검색..."
              value={employeeSearchTerm}
              onChange={(e) => {
                setEmployeeSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                직원 정보
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                출근 시간
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                퇴근 시간
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                근무 시간
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                초과 근무
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                상태
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                작업
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {attendanceList.map((attend) => (
              <tr key={attend.employeeId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{attend.employeeName}</div>
                    <div className="text-sm text-gray-500">{attend.position}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {attend.checkInTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {attend.checkOutTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {attend.workingHours}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {attend.overtimeHours}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      attend.approvalStatus === '정상'
                        ? 'bg-green-100 text-green-800'
                        : attend.approvalStatus === '지각'
                          ? 'bg-yellow-100 text-yellow-800'
                          : attend.approvalStatus === '휴가'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {attend.approvalStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    // onClick={() => onEditAttendance(attend)}
                    className="text-green-600 hover:text-green-900 cursor-pointer"
                  >
                    <i className="ri-edit-line"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={pageInfo?.totalPages ?? 1}
        totalElements={pageInfo?.totalElements}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
