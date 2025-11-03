'use client';
import { useQuery } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import { fetchPayRollList, fetchPayrollStatusDropdown } from '@/app/(private)/hrm/api/hrm.api';
import { KeyValueItem } from '@/app/types/CommonType';
import Dropdown from '@/app/components/common/Dropdown';
import { PayrollDetailModal } from '@/app/(private)/hrm/components/modals/PayrollDetailModal';
import Pagination from '@/app/components/common/Pagination';
import { PayRollList, PayrollRequestParams } from '@/app/(private)/hrm/types/HrmPayrollApiType';
import { useModal } from '@/app/components/common/modal/useModal';
import { useDepartmentsDropdown } from '@/app/hooks/useDepartmentsDropdown';

export default function PayrollManagement() {
  // --- 모달 출력 ---
  const { openModal } = useModal();

  // --- 드롭다운 ---
  const {
    options: departmentsOptions,
    isLoading: dropdownLoading,
    isError: dropdownError,
  } = useDepartmentsDropdown();

  const {
    data: statusData,
    isLoading: statusLoading,
    isError: errorLoading,
  } = useQuery({
    queryKey: ['payrollStatusDropdown'],
    queryFn: fetchPayrollStatusDropdown,
    staleTime: Infinity,
  });

  const statusOptions = useMemo((): KeyValueItem[] => {
    const list = statusData ?? [];
    const mapped = list.map((d) => ({
      key: d.status,
      value: d.description,
    }));

    return [{ key: '', value: '전체 상태' }, ...mapped];
  }, [statusData]);

  // --- 선택된 드롭다운 상태 ---
  const [selectedDepartment, setSelectedDepartment] = useState(''); // 부서
  const [selectedPayrollStatus, setSelectedPayrollStatus] = useState(''); // 부서

  // 년도와 월
  const now = new Date();
  const currentYear = String(now.getFullYear());
  const currentMonth = String(now.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  // --- 페이지 네이션 ---
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [searchTerm, setSearchTerm] = useState('');

  // 년도 옵션 (최근 5년)
  const yearOptions: KeyValueItem[] = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 5; i++) {
      const year = (currentYear - i).toString();
      years.push({ key: year, value: `${year}년` });
    }
    return years;
  }, []);

  // 월 옵션
  const monthOptions: KeyValueItem[] = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const month = String(i + 1);
      return { key: month, value: `${i + 1}월` };
    });
  }, []);

  const payrollQueryParams = useMemo(
    (): PayrollRequestParams => ({
      year: Number(selectedYear),
      month: Number(selectedMonth),
      department: selectedDepartment || undefined,
      page: currentPage - 1,
      size: pageSize,
    }),
    [selectedYear, selectedMonth, selectedDepartment, currentPage],
  );

  const {
    data: payrollData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['payrollList', payrollQueryParams],
    queryFn: () => fetchPayRollList(payrollQueryParams),
  });

  const payrollList = payrollData?.content ?? [];
  const pageInfo = payrollData?.page;

  const handleViewPayrollDetail = (payroll: PayRollList) => {
    openModal(PayrollDetailModal, {
      title: '급여 상세정보',
      payrollId: payroll.payrollId,
      payStatus: payroll.pay.statusCode,
    });
  };

  return (
    <>
      <div className="border-b border-gray-200 px-2 py-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">급여 관리</h3>
        </div>
      </div>

      <div>
        {/* 필터링 및 검색 */}
        <div className="flex justify-between items-center gap-2 mb-4">
          <div className="flex pl-1 gap-2">
            <Dropdown
              placeholder="전체 년도"
              items={yearOptions}
              value={selectedYear}
              onChange={(year: string) => setSelectedYear(year)}
            />
            <Dropdown
              placeholder="전체 월"
              items={monthOptions}
              value={selectedMonth}
              onChange={(month: string) => setSelectedMonth(month)}
            />
          </div>

          <div className="flex items-center gap-3">
            <Dropdown
              placeholder="전체 부서"
              items={departmentsOptions}
              value={selectedDepartment}
              onChange={(dept: string) => {
                setSelectedDepartment(dept);
                setCurrentPage(1);
              }}
            />
            <Dropdown
              placeholder="전체 상태"
              items={statusOptions}
              value={selectedPayrollStatus}
              onChange={(status: string) => {
                setSelectedPayrollStatus(status);
                setCurrentPage(1);
              }}
            />
            <div className="relative flex-1 max-w-xs">
              <input
                type="text"
                placeholder="직원 이름 검색..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
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
                  이름
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  부서
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  직급
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  기본급
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  초과근무비
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  공제액
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  실지급액
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  작업
                </th>
              </tr>
            </thead>
            <tbody>
              {payrollList.map((payroll) => (
                <tr key={payroll.payrollId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payroll.employee.employeeName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payroll.employee.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payroll.employee.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payroll.pay.basePay.toLocaleString()}원
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payroll.pay.overtimePay.toLocaleString()}원
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payroll.pay.deduction.toLocaleString()}원
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payroll.pay.netPay.toLocaleString()}원
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        payroll.pay.statusCode === 'COMPLETED'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {payroll.pay.statusCode}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewPayrollDetail(payroll)}
                      className="text-blue-600 hover:text-blue-900 cursor-pointer"
                    >
                      상세보기
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
