'use client';

import { fetchEmployeesList } from '@/app/(private)/hrm/api/hrm.api';
import {
  EmployeeData,
  EmployeeListRequestParams,
} from '@/app/(private)/hrm/types/HrmEmployeesApiType';
import Dropdown from '@/app/components/common/Dropdown';
import IconButton from '@/app/components/common/IconButton';
import { useModal } from '@/app/components/common/modal/useModal';
import Pagination from '@/app/components/common/Pagination';
import TableStatusBox from '@/app/components/common/TableStatusBox';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { EmployeeDetailModal } from '@/app/(private)/hrm/components/modals/EmployeeDetailModal';
import { EmployeeEditModal } from '@/app/(private)/hrm/components/modals/EmployeeEditModal';
import EmployeeRegisterModal from '@/app/(private)/hrm/components/modals/EmployeeRegisterModal';
import { useDepartmentsDropdown } from '@/app/hooks/useDepartmentsDropdown';

export default function EmployeesTab() {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // 모달창
  const { openModal } = useModal();
  // 부서 드롭다운
  const {
    options: departmentsOptions,
    isLoading: dropdownLoading,
    isError: dropdownError,
  } = useDepartmentsDropdown();

  const employeesQueryParams = useMemo(
    (): EmployeeListRequestParams => ({
      department: selectedDepartment || undefined,
      page: currentPage - 1,
      size: pageSize,
    }),
    [selectedDepartment, currentPage, pageSize],
  );

  const {
    data: employeesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['employeesList', employeesQueryParams],
    queryFn: () => fetchEmployeesList(employeesQueryParams),
    staleTime: 1000,
  });

  console.log(employeesData);

  const employees = employeesData?.content ?? [];
  const pageInfo = employeesData?.page;

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const handleEditEmployeeDetail = (emp: EmployeeData) => {
    openModal(EmployeeEditModal, { title: '직원정보 수정', employee: emp });
  };

  const handleViewEmployeeDetail = (emp: EmployeeData) => {
    openModal(EmployeeDetailModal, {
      title: '직원 상세보기',
      employee: emp,
      onEdit: () => handleEditEmployeeDetail(emp),
    });
  };

  const handleViewEmployeeRegister = () => {
    openModal(EmployeeRegisterModal, {
      title: '신규 직원 등록',
    });
  };

  return (
    <>
      <div className="flex justify-end items-center gap-4 mb-6 p-2 rounded-lg">
        {/* 필터링 및 검색 */}
        {dropdownLoading ? (
          <div className="w-24 px-4 py-2 rounded-sm bg-gray-100 text-gray-500">
            부서 목록 로딩 중...
          </div>
        ) : dropdownError ? (
          <div className="w-64 px-4 py-2 border border-red-300 rounded-lg bg-red-50 text-red-600">
            부서 목록 로드 실패
          </div>
        ) : (
          <Dropdown
            items={departmentsOptions}
            value={selectedDepartment}
            onChange={(dept: string) => setSelectedDepartment(dept)}
          />
        )}

        <div className="relative flex-1 max-w-xs">
          <input
            type="text"
            placeholder="이름 검색..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleFilterChange();
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
        <IconButton
          icon="ri-user-add-line"
          label="신규 직원 등록"
          onClick={handleViewEmployeeRegister}
        />
      </div>

      <div className="overflow-x-auto">
        {isLoading ? (
          <TableStatusBox $type="loading" $message="직원 정보를 불러오는 중입니다..." />
        ) : isError ? (
          <TableStatusBox $type="error" $message="직원 정보를 불러오는 중 오류가 발생했습니다." />
        ) : !employees || employees.length === 0 ? (
          <TableStatusBox $type="empty" $message="등록된 직원이 없습니다." />
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  직원 정보
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  부서/직급
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  입사일
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  연락처
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee.employeeId} className="hover:bg-gray-50 text-center">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{employee.department}</div>
                      <div className="text-sm text-gray-500">{employee.position}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.hireDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{employee.phone}</div>
                      <div className="text-sm text-gray-500">{employee.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewEmployeeDetail(employee)}
                      className="text-blue-600 hover:text-blue-900 cursor-pointer"
                    >
                      상세보기
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {isError || isLoading ? null : (
          <Pagination
            currentPage={currentPage}
            totalPages={pageInfo?.totalPages ?? 1}
            totalElements={pageInfo?.totalElements}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
    </>
  );
}
