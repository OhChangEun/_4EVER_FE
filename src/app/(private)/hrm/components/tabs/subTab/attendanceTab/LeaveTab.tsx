// tabs/LeaveTab.tsx
'use client';
import {
  fetchDepartmentsList,
  fetchLeaveList,
  fetchPositionsList,
} from '@/app/(private)/hrm/api/hrm.api';
import { LeaveRequestParams } from '@/app/(private)/hrm/types/HrmLeaveApiType';
import Dropdown from '@/app/components/common/Dropdown';
import { useModal } from '@/app/components/common/modal/useModal';
import Pagination from '@/app/components/common/Pagination';
import { KeyValueItem } from '@/app/types/CommonType';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

export default function LeaveTab() {
  // --- 모달 출력 ---
  const { openModal } = useModal();

  // --- 드롭다운 ---
  const [selectedDepartment, setSelectedDepartment] = useState(''); // 부서
  const [selectedPosition, setSelectedPosition] = useState(''); // 직급

  // --- 페이지 네이션 ---
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

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

  const leaveQueryParams = useMemo(
    (): LeaveRequestParams => ({
      department: selectedDepartment || undefined,
      position: selectedPosition || undefined,
      page: currentPage - 1,
      size: pageSize,
    }),
    [selectedDepartment, selectedPosition, currentPage, pageSize],
  );

  const {
    data: leaveData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['leaveList', leaveQueryParams],
    queryFn: () => fetchLeaveList(leaveQueryParams),
  });

  const leaveList = leaveData?.content ?? [];
  const pageInfo = leaveData?.page;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-end mb-4">
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
                휴가 유형
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                시작 일자
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                종료 일자
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                일수
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                잔여 연차
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                작업
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leaveList.map((leave) => (
              <tr key={leave.leaveRequestId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {leave.employee.employeeName}
                    </div>
                    <div className="text-sm text-gray-500">{leave.employee.position}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {leave.leaveType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {leave.startDate.split('T')[0]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {leave.endDate.split('T')[0]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {leave.numberOfLeaveDays}일
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {leave.remainingLeaveDays}일
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      // onClick={() => onApproveLeave(leave)}
                      className="text-green-600 hover:text-green-900 cursor-pointer"
                      title="승인"
                    >
                      <i className="ri-check-line"></i>
                    </button>
                    <button
                      // onClick={() => onRejectLeave(leave)}
                      className="text-red-600 hover:text-red-900 cursor-pointer"
                      title="반려"
                    >
                      <i className="ri-close-line"></i>
                    </button>
                  </div>
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
