'use client';
import { useState, useMemo } from 'react';

export default function PayrollManagement() {
  const [selectedMonth, setSelectedMonth] = useState('2024-01');
  const [showPayrollDetailModal, setShowPayrollDetailModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  // New state for alternative detail view
  const [showPayrollDetail, setShowPayrollDetail] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState<any>(null);

  // 필터링 상태
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const payrollData = [
    {
      employeeId: 'EMP001',
      name: '김민수',
      department: '구매관리부',
      position: '과장',
      baseSalary: 4500000,
      overtime: 150000,
      deductions: 450000,
      netSalary: 4200000,
      status: '지급완료',
      deductionDetails: {
        tax: 300000,
        insurance: 100000,
        pension: 50000,
      },
    },
    {
      employeeId: 'EMP002',
      name: '이영희',
      department: '영업관리부',
      position: '부장',
      baseSalary: 5200000,
      overtime: 200000,
      deductions: 520000,
      netSalary: 4880000,
      status: '지급완료',
      deductionDetails: {
        tax: 350000,
        insurance: 120000,
        pension: 50000,
      },
    },
    {
      employeeId: 'EMP003',
      name: '박철수',
      department: '재고관리부',
      position: '차장',
      baseSalary: 6000000,
      overtime: 100000,
      deductions: 600000,
      netSalary: 5500000,
      status: '미지급',
      deductionDetails: {
        tax: 400000,
        insurance: 150000,
        pension: 50000,
      },
    },
    {
      employeeId: 'EMP004',
      name: '정수진',
      department: '인적자원관리부',
      position: '대리',
      baseSalary: 3800000,
      overtime: 80000,
      deductions: 380000,
      netSalary: 3500000,
      status: '지급완료',
      deductionDetails: {
        tax: 250000,
        insurance: 80000,
        pension: 50000,
      },
    },
    {
      employeeId: 'EMP005',
      name: '최민호',
      department: '재무관리부',
      position: '사원',
      baseSalary: 3200000,
      overtime: 120000,
      deductions: 320000,
      netSalary: 3000000,
      status: '미지급',
      deductionDetails: {
        tax: 200000,
        insurance: 70000,
        pension: 50000,
      },
    },
    {
      employeeId: 'EMP006',
      name: '김영수',
      department: '재고관리부',
      position: '차장',
      baseSalary: 5500000,
      overtime: 180000,
      deductions: 550000,
      netSalary: 5130000,
      status: '지급완료',
      deductionDetails: {
        tax: 380000,
        insurance: 120000,
        pension: 50000,
      },
    },
    {
      employeeId: 'EMP007',
      name: '이미영',
      department: '구매관리부',
      position: '사원',
      baseSalary: 3000000,
      overtime: 90000,
      deductions: 300000,
      netSalary: 2790000,
      status: '미지급',
      deductionDetails: {
        tax: 180000,
        insurance: 70000,
        pension: 50000,
      },
    },
    {
      employeeId: 'EMP008',
      name: '홍길동',
      department: '영업관리부',
      position: '대리',
      baseSalary: 4000000,
      overtime: 110000,
      deductions: 400000,
      netSalary: 3710000,
      status: '지급완료',
      deductionDetails: {
        tax: 280000,
        insurance: 80000,
        pension: 40000,
      },
    },
    {
      employeeId: 'EMP009',
      name: '강수진',
      department: '생산관리부',
      position: '사원',
      baseSalary: 3100000,
      overtime: 95000,
      deductions: 310000,
      netSalary: 2885000,
      status: '미지급',
      deductionDetails: {
        tax: 190000,
        insurance: 70000,
        pension: 50000,
      },
    },
    {
      employeeId: 'EMP010',
      name: '윤태호',
      department: '재무관리부',
      position: '대리',
      baseSalary: 4200000,
      overtime: 130000,
      deductions: 420000,
      netSalary: 3910000,
      status: '지급완료',
      deductionDetails: {
        tax: 290000,
        insurance: 80000,
        pension: 50000,
      },
    },
  ];

  // 부서 및 직급 목록 추출
  const departments = [...new Set(payrollData.map((emp) => emp.department))];
  const positions = [...new Set(payrollData.map((emp) => emp.position))];

  // 필터링된 급여 데이터
  const filteredPayrollData = useMemo(() => {
    return payrollData.filter((employee) => {
      const matchesDepartment = !departmentFilter || employee.department === departmentFilter;
      const matchesPosition = !positionFilter || employee.position === positionFilter;
      const matchesSearch =
        !searchTerm || employee.name.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesDepartment && matchesPosition && matchesSearch;
    });
  }, [departmentFilter, positionFilter, searchTerm]);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredPayrollData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPayrollData = filteredPayrollData.slice(startIndex, startIndex + itemsPerPage);

  // Alias for the modified UI snippets
  const currentPayrolls = paginatedPayrollData;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR').format(amount) + '원';
  };

  const handleViewPayroll = (employee: any) => {
    setSelectedEmployee(employee);
    setShowPayrollDetailModal(true);
  };

  // New handlers for the alternative detail view
  const handleViewDetail = (payroll: any) => {
    setSelectedPayroll(payroll);
    setShowPayrollDetail(true);
  };

  const handlePaymentComplete = () => {
    // 지급 완료 처리 로직
    setSelectedPayroll({ ...selectedPayroll, status: '지급완료' });
    setShowPayrollDetail(false);
  };

  const handleStatusChange = (employeeId: string, newStatus: string) => {
    alert(`급여 상태가 ${newStatus}로 변경되었습니다.`);
  };

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  return (
    <>
      <div className="border-b border-gray-200 px-2 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">급여 관리</h3>
          <div className="flex items-center space-x-3">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
            >
              <option value="2024-01">2024년 1월</option>
              <option value="2023-12">2023년 12월</option>
              <option value="2023-11">2023년 11월</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        {/* 필터링 및 검색 */}
        <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">부서:</label>
            <select
              value={departmentFilter}
              onChange={(e) => {
                setDepartmentFilter(e.target.value);
                handleFilterChange();
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
            >
              <option value="">전체 부서</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">직급:</label>
            <select
              value={positionFilter}
              onChange={(e) => {
                setPositionFilter(e.target.value);
                handleFilterChange();
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
            >
              <option value="">전체 직급</option>
              {positions.map((position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2 flex-1">
            <div className="relative flex-1 max-w-xs">
              <input
                type="text"
                placeholder="직원 이름 검색..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  handleFilterChange();
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          <button
            onClick={() => {
              setDepartmentFilter('');
              setPositionFilter('');
              setSearchTerm('');
              setCurrentPage(1);
            }}
            className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            <i className="ri-refresh-line mr-1"></i>
            초기화
          </button>
        </div>

        {/* 결과 요약 */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600">
            총 {filteredPayrollData.length}명의 직원 (전체 {payrollData.length}명 중)
          </div>
          <div className="text-sm text-gray-600">
            페이지 {currentPage} / {totalPages}
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
              {currentPayrolls.map((payroll, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payroll.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payroll.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payroll.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payroll.baseSalary.toLocaleString()}원
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payroll.overtime.toLocaleString()}원
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payroll.deductions.toLocaleString()}원
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payroll.netSalary.toLocaleString()}원
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        payroll.status === '지급완료'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {payroll.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewDetail(payroll)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      상세보기
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-lg text-sm cursor-pointer ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <i className="ri-arrow-left-line mr-1"></i>
                이전
              </button>

              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-lg text-sm cursor-pointer ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-lg text-sm cursor-pointer ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                다음
                <i className="ri-arrow-right-line ml-1"></i>
              </button>
            </div>

            <div className="text-sm text-gray-600">
              {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredPayrollData.length)} /{' '}
              {filteredPayrollData.length}명
            </div>
          </div>
        )}
      </div>

      {/* 급여 상세보기 모달 (original) */}
      {showPayrollDetailModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">급여 상세 정보</h3>
              <button
                onClick={() => setShowPayrollDetailModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="space-y-6">
              {/* 직원 정보 */}
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-medium text-gray-900 mb-3">직원 정보</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>이름:</strong> {selectedEmployee.name}
                  </div>
                  <div>
                    <strong>부서:</strong> {selectedEmployee.department}
                  </div>
                  <div>
                    <strong>직급:</strong> {selectedEmployee.position}
                  </div>
                </div>
              </div>

              {/* 급여 내역 */}
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-medium text-gray-900 mb-3">급여 내역</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">기본급</span>
                    <span className="text-blue-600 font-semibold">
                      {formatCurrency(selectedEmployee.baseSalary)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium">초과근무비</span>
                    <span className="text-green-600 font-semibold">
                      {formatCurrency(selectedEmployee.overtime)}
                    </span>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">공제액</span>
                      <span className="text-red-600 font-semibold">
                        -{formatCurrency(selectedEmployee.deductions)}
                      </span>
                    </div>
                    <div className="ml-4 space-y-1 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>- 소득세</span>
                        <span>-{formatCurrency(selectedEmployee.deductionDetails.tax)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>- 4대보험</span>
                        <span>-{formatCurrency(selectedEmployee.deductionDetails.insurance)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>- 국민연금</span>
                        <span>-{formatCurrency(selectedEmployee.deductionDetails.pension)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 실지급액 */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">실지급액</span>
                  <span className="text-2xl font-bold text-purple-600">
                    {formatCurrency(selectedEmployee.netSalary)}
                  </span>
                </div>
                <div className="mt-2">
                  <span
                    className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                      selectedEmployee.status === '지급완료'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {selectedEmployee.status}
                  </span>
                </div>
              </div>

              {/* 급여 계산 정보 */}
              <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
                <div>
                  <strong>급여 기준일:</strong>{' '}
                  {selectedMonth === '2024-01' ? '2024-01-01' : '매월 1일'}
                </div>
                <div>
                  <strong>계산일:</strong> {new Date().toLocaleDateString('ko-KR')}
                </div>
                <div>
                  <strong>지급 예정일:</strong>{' '}
                  {selectedMonth === '2024-01' ? '2024-01-25' : '매월 25일'}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowPayrollDetailModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 급여 상세 정보 모달 (alternative) */}
      {showPayrollDetail && selectedPayroll && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">급여 상세 정보</h3>
              <button
                onClick={() => setShowPayrollDetail(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="space-y-6">
              {/* 직원 정보 */}
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-medium text-gray-900 mb-3">직원 정보</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>이름:</strong> {selectedPayroll.name}
                  </div>
                  <div>
                    <strong>부서:</strong> {selectedPayroll.department}
                  </div>
                  <div>
                    <strong>직급:</strong> {selectedPayroll.position}
                  </div>
                </div>
              </div>

              {/* 급여 내역 */}
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-medium text-gray-900 mb-3">급여 내역</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">기본급</span>
                    <span className="text-blue-600 font-semibold">
                      {selectedPayroll.baseSalary.toLocaleString()}원
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium">초과근무비</span>
                    <span className="text-green-600 font-semibold">
                      {selectedPayroll.overtime.toLocaleString()}원
                    </span>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">공제액</span>
                      <span className="text-red-600 font-semibold">
                        -{selectedPayroll.deductions.toLocaleString()}원
                      </span>
                    </div>
                    <div className="ml-4 space-y-1 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>- 소득세</span>
                        <span>-{selectedPayroll.deductionDetails.tax.toLocaleString()}원</span>
                      </div>
                      <div className="flex justify-between">
                        <span>- 4대보험</span>
                        <span>
                          -{selectedPayroll.deductionDetails.insurance.toLocaleString()}원
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>- 국민연금</span>
                        <span>-{selectedPayroll.deductionDetails.pension.toLocaleString()}원</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 실지급액 */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">실지급액</span>
                  <span className="text-2xl font-bold text-purple-600">
                    {selectedPayroll.netSalary.toLocaleString()}원
                  </span>
                </div>
                <div className="mt-2">
                  <span
                    className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                      selectedPayroll.status === '지급완료'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {selectedPayroll.status}
                  </span>
                </div>
              </div>

              {/* 급여 계산 정보 */}
              <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
                <div>
                  <strong>급여 기준일:</strong>{' '}
                  {selectedMonth === '2024-01' ? '2024-01-01' : '매월 1일'}
                </div>
                <div>
                  <strong>계산일:</strong> {new Date().toLocaleDateString('ko-KR')}
                </div>
                <div>
                  <strong>지급 예정일:</strong>{' '}
                  {selectedMonth === '2024-01' ? '2024-01-25' : '매월 25일'}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
              <div>
                <span className="text-gray-600">지급 상태: </span>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    selectedPayroll.status === '지급완료'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {selectedPayroll.status}
                </span>
              </div>

              <div className="flex space-x-3">
                {selectedPayroll.status === '미지급' && (
                  <button
                    onClick={handlePaymentComplete}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 whitespace-nowrap"
                  >
                    지급 완료 처리
                  </button>
                )}
                <button
                  onClick={() => setShowPayrollDetail(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
