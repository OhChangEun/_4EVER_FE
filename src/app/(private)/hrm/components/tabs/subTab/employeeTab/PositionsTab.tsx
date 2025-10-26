'use client';

import { useState } from 'react';

// 1. 각 탭 컴포넌트 분리
export default function EmployeesTab() {
  const employees = [
    {
      id: 'EMP001',
      name: '김민수',
      department: '생산관리 부서',
      position: '과장',
      joinDate: '2021-03-15',
      birthDate: '1985-08-20',
      gender: '남성',
      phone: '010-1234-5678',
      email: 'kim.minsu@company.com',
      address: '서울시 강남구 테헤란로 123',
      education: '서울대학교 컴퓨터공학과 학사',
      career: '삼성전자 5년 근무, 소프트웨어 개발 담당',
    },
    {
      id: 'EMP002',
      name: '이영희',
      department: '영업관리 부서',
      position: '차장',
      joinDate: '2020-01-10',
      birthDate: '1982-03-15',
      gender: '여성',
      phone: '010-2345-6789',
      email: 'lee.younghee@company.com',
      address: '서울시 서초구 반포대로 456',
      education: '연세대학교 경영학과 학사',
      career: 'LG전자 7년 근무, 영업 및 마케팅 담당',
    },
    {
      id: 'EMP003',
      name: '박철수',
      department: '구매관리 부서',
      position: '부장',
      joinDate: '2019-05-20',
      birthDate: '1978-11-08',
      gender: '남성',
      phone: '010-3456-7890',
      email: 'park.chulsoo@company.com',
      address: '서울시 송파구 올림픽로 789',
      education: '고려대학교 산업공학과 학사',
      career: '현대자동차 10년 근무, 구매 및 조달 담당',
    },
    {
      id: 'EMP004',
      name: '정수진',
      department: '인적자원관리 부서',
      position: '대리',
      joinDate: '2022-08-01',
      birthDate: '1990-06-25',
      gender: '여성',
      phone: '010-4567-8901',
      email: 'jung.sujin@company.com',
      address: '서울시 마포구 월드컵로 321',
      education: '이화여자대학교 심리학과 학사',
      career: '네이버 3년 근무, 인사 및 조직개발 담당',
    },
    {
      id: 'EMP005',
      name: '최재원',
      department: '재무관리 부서',
      position: '과장',
      joinDate: '2020-11-12',
      birthDate: '1987-01-30',
      gender: '남성',
      phone: '010-5678-9012',
      email: 'choi.jaewon@company.com',
      address: '서울시 영등포구 여의대로 654',
      education: '성균관대학교 경제학과 학사',
      career: '신한은행 4년 근무, 재무 및 회계 담당',
    },
    {
      id: 'EMP006',
      name: '김영수',
      department: '재고관리 부서',
      position: '차장',
      joinDate: '2019-08-05',
      birthDate: '1983-09-12',
      gender: '남성',
      phone: '010-6789-0123',
      email: 'kim.youngsoo@company.com',
      address: '서울시 구로구 디지털로 987',
      education: '한양대학교 물류학과 학사',
      career: 'CJ대한통운 6년 근무, 물류 및 재고관리 담당',
    },
    {
      id: 'EMP007',
      name: '이미영',
      department: '구매관리 부서',
      position: '사원',
      joinDate: '2023-02-15',
      birthDate: '1995-04-18',
      gender: '여성',
      phone: '010-7890-1234',
      email: 'lee.miyoung@company.com',
      address: '서울시 동작구 상도로 147',
      education: '중앙대학교 경영학과 학사',
      career: '신입사원',
    },
    {
      id: 'EMP008',
      name: '홍길동',
      department: '영업관리 부서',
      position: '대리',
      joinDate: '2022-06-01',
      birthDate: '1988-12-03',
      gender: '남성',
      phone: '010-8901-2345',
      email: 'hong.gildong@company.com',
      address: '서울시 관악구 관악로 258',
      education: '서강대학교 국제통상학과 학사',
      career: '롯데그룹 2년 근무, 해외영업 담당',
    },
    {
      id: 'EMP009',
      name: '강수진',
      department: '생산관리 부서',
      position: '사원',
      joinDate: '2023-09-10',
      birthDate: '1996-07-22',
      gender: '여성',
      phone: '010-9012-3456',
      email: 'kang.sujin@company.com',
      address: '서울시 노원구 노해로 369',
      education: '건국대학교 산업공학과 학사',
      career: '신입사원',
    },
    {
      id: 'EMP010',
      name: '윤태호',
      department: '재무관리 부서',
      position: '대리',
      joinDate: '2021-11-20',
      birthDate: '1989-05-14',
      gender: '남성',
      phone: '010-0123-4567',
      email: 'yoon.taeho@company.com',
      address: '서울시 중랑구 망우로 741',
      education: '동국대학교 회계학과 학사',
      career: 'KPMG 2년 근무, 회계감사 담당',
    },
  ];
  const positions = [...new Set(employees.map((emp) => emp.position))];

  // 기존 employees 탭의 상태들을 이 컴포넌트로 이동
  const [positionFilter, setPositionFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">직원 목록</h3>
      </div>
      {/* 필터링 및 검색 */}
      <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
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
        </div>
        <button
          onClick={() => {
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
          총 {20}명의 직원 (전체 {employees.length}명 중)
        </div>
        <div className="text-sm text-gray-600">
          페이지 {currentPage} / {10}
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
                부서/직급
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                입사일
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                연락처
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                작업
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* {paginatedEmployees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
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
                  {employee.joinDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm text-gray-900">{employee.phone}</div>
                    <div className="text-sm text-gray-500">{employee.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleViewEmployee(employee)}
                    className="text-blue-600 hover:text-blue-900 cursor-pointer"
                  >
                    상세보기
                  </button>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// // 3. 메인 컴포넌트에서 사용
// // 기존 코드를 다음과 같이 교체:
// <div>
//   <SubNavigation tabs={HR_TABS} paramName="subTab" />
//   <div className="p-6">
//     {/* SubNavigation이 자동으로 해당 탭의 component를 렌더링합니다 */}
//   </div>
// </div>
