'use client';

import React, { useState, useMemo } from 'react';

// 임의의 Mock 직원 교육 현황 데이터
const MOCK_EMPLOYEE_TRAINING = [
  {
    employeeId: 101,
    name: '김철수',
    department: '개발팀',
    position: '과장',
    completedTrainings: 5,
    inProgressTrainings: 1,
    requiredTrainings: 0,
    lastTrainingDate: '2024-09-15',
  },
  {
    employeeId: 102,
    name: '이영희',
    department: '마케팅팀',
    position: '대리',
    completedTrainings: 3,
    inProgressTrainings: 2,
    requiredTrainings: 1,
    lastTrainingDate: '2024-08-01',
  },
  {
    employeeId: 103,
    name: '박민준',
    department: '영업팀',
    position: '사원',
    completedTrainings: 1,
    inProgressTrainings: 0,
    requiredTrainings: 2,
    lastTrainingDate: '2024-10-10',
  },
  {
    employeeId: 104,
    name: '최지아',
    department: '개발팀',
    position: '사원',
    completedTrainings: 2,
    inProgressTrainings: 1,
    requiredTrainings: 0,
    lastTrainingDate: '2024-10-20',
  },
  {
    employeeId: 105,
    name: '정우성',
    department: '경영지원팀',
    position: '부장',
    completedTrainings: 10,
    inProgressTrainings: 0,
    requiredTrainings: 0,
    lastTrainingDate: '2024-07-20',
  },
  {
    employeeId: 106,
    name: '한가인',
    department: '마케팅팀',
    position: '과장',
    completedTrainings: 4,
    inProgressTrainings: 0,
    requiredTrainings: 1,
    lastTrainingDate: '2024-09-05',
  },
  {
    employeeId: 107,
    name: '오세훈',
    department: '영업팀',
    position: '대리',
    completedTrainings: 2,
    inProgressTrainings: 3,
    requiredTrainings: 0,
    lastTrainingDate: '2024-10-25',
  },
];

const departments = ['개발팀', '마케팅팀', '영업팀', '경영지원팀'];
const positions = ['사원', '대리', '과장', '부장'];

export default function EmployeeTrainingTab() {
  const [employeeDepartmentFilter, setEmployeeDepartmentFilter] = useState('');
  const [employeePositionFilter, setEmployeePositionFilter] = useState('');
  const [employeeSearchTerm, setEmployeeSearchTerm] = useState('');
  const [employeeCurrentPage, setEmployeeCurrentPage] = useState(1);
  const itemsPerPage = 5; // 한 페이지당 표시할 항목 수

  const handleEmployeeFilterChange = () => {
    // 필터 변경 시 현재 페이지를 1로 초기화
    setEmployeeCurrentPage(1);
  };

  // 필터링된 직원 목록
  const filteredEmployeeTraining = useMemo(() => {
    return MOCK_EMPLOYEE_TRAINING.filter((employee) => {
      const deptMatch =
        !employeeDepartmentFilter || employee.department === employeeDepartmentFilter;
      const positionMatch = !employeePositionFilter || employee.position === employeePositionFilter;
      const searchMatch = !employeeSearchTerm || employee.name.includes(employeeSearchTerm.trim());
      return deptMatch && positionMatch && searchMatch;
    });
  }, [employeeDepartmentFilter, employeePositionFilter, employeeSearchTerm]);

  // 페이지네이션 계산
  const employeeTotalPages = Math.ceil(filteredEmployeeTraining.length / itemsPerPage);
  const employeeStartIndex = (employeeCurrentPage - 1) * itemsPerPage;
  const paginatedEmployeeTraining = filteredEmployeeTraining.slice(
    employeeStartIndex,
    employeeStartIndex + itemsPerPage,
  );

  // 더미 핸들러 함수
  const handleDownloadTrainingReport = () => alert('교육 현황 다운로드 기능 실행');
  const handleViewEmployeeTraining = (employee) => alert(`${employee.name} 교육 상세보기`);
  const handleAddEmployeeTraining = (employee) => alert(`${employee.name} 교육 추가 기능 실행`);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">직원별 교육 현황</h3>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleDownloadTrainingReport}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap text-sm"
          >
            <i className="ri-download-line mr-1"></i>
            교육 현황 다운로드
          </button>
        </div>
      </div>

      {/* 필터링 및 검색 */}
      <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        {/* 부서 필터 */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">부서:</label>
          <select
            value={employeeDepartmentFilter}
            onChange={(e) => {
              setEmployeeDepartmentFilter(e.target.value);
              handleEmployeeFilterChange();
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

        {/* 직급 필터 */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">직급:</label>
          <select
            value={employeePositionFilter}
            onChange={(e) => {
              setEmployeePositionFilter(e.target.value);
              handleEmployeeFilterChange();
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

        {/* 직원 이름 검색 */}
        <div className="flex items-center space-x-2 flex-1">
          <div className="relative flex-1 max-w-xs">
            <input
              type="text"
              placeholder="직원 이름 검색..."
              value={employeeSearchTerm}
              onChange={(e) => {
                setEmployeeSearchTerm(e.target.value);
                handleEmployeeFilterChange();
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        {/* 초기화 버튼 */}
        <button
          onClick={() => {
            setEmployeeDepartmentFilter('');
            setEmployeePositionFilter('');
            setEmployeeSearchTerm('');
            setEmployeeCurrentPage(1);
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
          총 **{filteredEmployeeTraining.length}**명의 직원 (전체 {MOCK_EMPLOYEE_TRAINING.length}명
          중)
        </div>
        <div className="text-sm text-gray-600">
          페이지 **{employeeCurrentPage} / {employeeTotalPages}**
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
                완료된 교육
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                진행 중인 교육
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                필수 교육
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                최근 교육일
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                작업
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedEmployeeTraining.map((employee) => (
              <tr key={employee.employeeId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                    <div className="text-sm text-gray-500">
                      {employee.department} · {employee.position}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-green-600">
                      {employee.completedTrainings}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">개</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-blue-600">
                      {employee.inProgressTrainings}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">개</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-red-600">
                      {employee.requiredTrainings}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">개 미완료</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {employee.lastTrainingDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewEmployeeTraining(employee)}
                      className="text-blue-600 hover:text-blue-900 cursor-pointer"
                      title="교육 상세보기"
                    >
                      <i className="ri-eye-line"></i>
                    </button>
                    <button
                      onClick={() => handleAddEmployeeTraining(employee)}
                      className="text-green-600 hover:text-green-900 cursor-pointer"
                      title="교육 추가"
                    >
                      <i className="ri-add-line"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      {employeeTotalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setEmployeeCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={employeeCurrentPage === 1}
              className={`px-3 py-2 rounded-lg text-sm cursor-pointer ${
                employeeCurrentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <i className="ri-arrow-left-line mr-1"></i>
              이전
            </button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: employeeTotalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setEmployeeCurrentPage(page)}
                  className={`px-3 py-2 rounded-lg text-sm cursor-pointer ${
                    employeeCurrentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() =>
                setEmployeeCurrentPage((prev) => Math.min(prev + 1, employeeTotalPages))
              }
              disabled={employeeCurrentPage === employeeTotalPages}
              className={`px-3 py-2 rounded-lg text-sm cursor-pointer ${
                employeeCurrentPage === employeeTotalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              다음
              <i className="ri-arrow-right-line ml-1"></i>
            </button>
          </div>

          <div className="text-sm text-gray-600">
            {employeeStartIndex + 1}-
            {Math.min(employeeStartIndex + itemsPerPage, filteredEmployeeTraining.length)} /{' '}
            {filteredEmployeeTraining.length}명
          </div>
        </div>
      )}
    </div>
  );
}
