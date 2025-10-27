'use client';
import SubNavigation from '@/app/components/common/SubNavigation';
import { useState, useMemo } from 'react';
import { HR_TABS } from '@/app/(private)/hrm/constants';
import { EmployeeDetailModal } from '@/app/(private)/hrm/components/modals/EmployeeDetailModal';
import { EmployeeEditModal } from '@/app/(private)/hrm/components/modals/EmployeeEditModal';
import { DepartmentDetailModal } from '@/app/(private)/hrm/components/modals/DepartmentDetailModal';
import { DepartmentEditModal } from '@/app/(private)/hrm/components/modals/DepartmentEditModal';
import { PositionDetailModal } from '@/app/(private)/hrm/components/modals/PositionDetailModal';
import { PositionEditModal } from '@/app/(private)/hrm/components/modals/PositionEditModal';

export default function EmployeeManagement() {
  const [activeTab, setActiveTab] = useState('employees');
  const [showEmployeeDetailModal, setShowEmployeeDetailModal] = useState(false);
  const [showEditEmployeeModal, setShowEditEmployeeModal] = useState(false);
  const [showDepartmentDetailModal, setShowDepartmentDetailModal] = useState(false);
  const [showEditDepartmentModal, setShowEditDepartmentModal] = useState(false);
  const [showPositionDetailModal, setShowPositionDetailModal] = useState(false);
  const [showEditPositionModal, setShowEditPositionModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);
  const [selectedPosition, setSelectedPosition] = useState<any>(null);

  // 필터링 및 페이지네이션 상태
  const [positionFilter, setPositionFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  // 부서 데이터 정의
  const departments = [
    {
      id: 'DEPT001',
      name: '구매관리 부서',
      manager: '박철수',
      headCount: 8,
      establishedDate: '2018-01-15',
      description: '원자재 및 부품 구매, 공급업체 관리, 구매 계약 및 협상을 담당하는 부서입니다.',
      employees: [
        { name: '박철수', position: '부장', joinDate: '2019-05-20' },
        { name: '이미영', position: '사원', joinDate: '2023-02-15' },
        { name: '김태현', position: '대리', joinDate: '2021-08-10' },
        { name: '정민호', position: '과장', joinDate: '2020-03-25' },
        { name: '송유진', position: '사원', joinDate: '2023-07-12' },
        { name: '이준석', position: '대리', joinDate: '2022-01-18' },
        { name: '최은영', position: '사원', joinDate: '2023-11-05' },
        { name: '한상우', position: '과장', joinDate: '2019-12-08' },
      ],
    },
    {
      id: 'DEPT002',
      name: '영업관리 부서',
      manager: '이영희',
      headCount: 12,
      establishedDate: '2017-03-10',
      description: '고객 관리, 영업 전략 수립, 매출 목표 달성 및 시장 개발을 담당하는 부서입니다.',
      employees: [
        { name: '이영희', position: '차장', joinDate: '2020-01-10' },
        { name: '홍길동', position: '대리', joinDate: '2022-06-01' },
        { name: '김소영', position: '과장', joinDate: '2019-11-15' },
        { name: '박지훈', position: '사원', joinDate: '2023-04-20' },
        { name: '정하늘', position: '대리', joinDate: '2021-09-14' },
        { name: '최민수', position: '사원', joinDate: '2023-08-30' },
        { name: '윤서연', position: '과장', joinDate: '2020-05-18' },
        { name: '강동현', position: '사원', joinDate: '2023-10-12' },
        { name: '임수빈', position: '대리', joinDate: '2022-02-28' },
        { name: '조현민', position: '사원', joinDate: '2023-12-01' },
        { name: '신예린', position: '과장', joinDate: '2019-07-22' },
        { name: '오준영', position: '사원', joinDate: '2023-06-15' },
      ],
    },
    {
      id: 'DEPT003',
      name: '재고관리 부서',
      manager: '김영수',
      headCount: 6,
      establishedDate: '2018-06-20',
      description: '재고 현황 관리, 입출고 관리, 창고 운영 및 재고 최적화를 담당하는 부서입니다.',
      employees: [
        { name: '김영수', position: '차장', joinDate: '2019-08-05' },
        { name: '박민지', position: '과장', joinDate: '2020-10-12' },
        { name: '이동욱', position: '대리', joinDate: '2022-03-08' },
        { name: '정수연', position: '사원', joinDate: '2023-05-25' },
        { name: '최준호', position: '사원', joinDate: '2023-09-18' },
        { name: '김하은', position: '대리', joinDate: '2021-12-03' },
      ],
    },
    {
      id: 'DEPT004',
      name: '재무관리 부서',
      manager: '최재원',
      headCount: 7,
      establishedDate: '2017-01-05',
      description: '회계 처리, 예산 관리, 자금 운용 및 재무 분석을 담당하는 부서입니다.',
      employees: [
        { name: '최재원', position: '과장', joinDate: '2020-11-12' },
        { name: '윤태호', position: '대리', joinDate: '2021-11-20' },
        { name: '서미경', position: '사원', joinDate: '2022-09-05' },
        { name: '김도현', position: '차장', joinDate: '2019-04-15' },
        { name: '이수진', position: '대리', joinDate: '2022-07-28' },
        { name: '박성민', position: '사원', joinDate: '2023-03-10' },
        { name: '정예은', position: '사원', joinDate: '2023-08-22' },
      ],
    },
    {
      id: 'DEPT005',
      name: '생산관리 부서',
      manager: '김민수',
      headCount: 15,
      establishedDate: '2017-05-12',
      description: '생산 계획 수립, 공정 관리, 품질 관리 및 생산성 향상을 담당하는 부서입니다.',
      employees: [
        { name: '김민수', position: '과장', joinDate: '2021-03-15' },
        { name: '강수진', position: '사원', joinDate: '2023-09-10' },
        { name: '조현우', position: '과장', joinDate: '2020-08-12' },
        { name: '이지영', position: '차장', joinDate: '2019-02-28' },
        { name: '박준서', position: '대리', joinDate: '2022-04-18' },
        { name: '김나영', position: '사원', joinDate: '2023-07-05' },
        { name: '정민철', position: '사원', joinDate: '2023-11-20' },
        { name: '최유리', position: '대리', joinDate: '2021-10-14' },
        { name: '한지원', position: '사원', joinDate: '2023-06-08' },
        { name: '송민규', position: '과장', joinDate: '2020-01-22' },
        { name: '임채영', position: '사원', joinDate: '2023-12-15' },
        { name: '오세훈', position: '대리', joinDate: '2022-08-30' },
        { name: '신동혁', position: '사원', joinDate: '2023-04-12' },
        { name: '윤지혜', position: '과장', joinDate: '2019-09-18' },
        { name: '김태영', position: '사원', joinDate: '2023-10-25' },
      ],
    },
    {
      id: 'DEPT006',
      name: '인적자원관리 부서',
      manager: '정수진',
      headCount: 5,
      establishedDate: '2017-02-20',
      description: '인사 관리, 채용, 교육 훈련, 급여 관리 및 조직 개발을 담당하는 부서입니다.',
      employees: [
        { name: '정수진', position: '대리', joinDate: '2022-08-01' },
        { name: '한지민', position: '사원', joinDate: '2023-01-15' },
        { name: '김현우', position: '과장', joinDate: '2020-06-10' },
        { name: '이소영', position: '사원', joinDate: '2023-05-18' },
        { name: '박지현', position: '대리', joinDate: '2021-11-25' },
      ],
    },
  ];

  // 직급 목록 추출
  const positions = [...new Set(employees.map((emp) => emp.position))];

  // 직급 데이터 정의
  const positionData = [
    {
      id: 'POS001',
      position: '사원',
      count: 8,
      salary: '3,000만원',
      employees: [
        { name: '이미영', department: '구매관리 부서', startDate: '2023-02-15' },
        { name: '강수진', department: '생산관리 부서', startDate: '2023-09-10' },
        { name: '김나영', department: '생산관리 부서', startDate: '2023-07-05' },
        { name: '정민철', department: '생산관리 부서', startDate: '2023-11-20' },
        { name: '한지원', department: '생산관리 부서', startDate: '2023-06-08' },
        { name: '임채영', department: '생산관리 부서', startDate: '2023-12-15' },
        { name: '신동혁', department: '생산관리 부서', startDate: '2023-04-12' },
        { name: '김태영', department: '생산관리 부서', startDate: '2023-10-25' },
      ],
    },
    {
      id: 'POS002',
      position: '대리',
      count: 6,
      salary: '4,000만원',
      employees: [
        { name: '정수진', department: '인적자원관리 부서', startDate: '2022-08-01' },
        { name: '홍길동', department: '영업관리 부서', startDate: '2022-06-01' },
        { name: '윤태호', department: '재무관리 부서', startDate: '2021-11-20' },
        { name: '이동욱', department: '재고관리 부서', startDate: '2022-03-08' },
        { name: '김하은', department: '재고관리 부서', startDate: '2021-12-03' },
        { name: '박지현', department: '인적자원관리 부서', startDate: '2021-11-25' },
      ],
    },
    {
      id: 'POS003',
      position: '과장',
      count: 5,
      salary: '5,500만원',
      employees: [
        { name: '김민수', department: '생산관리 부서', startDate: '2021-03-15' },
        { name: '최재원', department: '재무관리 부서', startDate: '2020-11-12' },
        { name: '박민지', department: '재고관리 부서', startDate: '2020-10-12' },
        { name: '송민규', department: '생산관리 부서', startDate: '2020-01-22' },
        { name: '윤지혜', department: '생산관리 부서', startDate: '2019-09-18' },
      ],
    },
    {
      id: 'POS004',
      position: '차장',
      count: 3,
      salary: '7,000만원',
      employees: [
        { name: '이영희', department: '영업관리 부서', startDate: '2020-01-10' },
        { name: '김영수', department: '재고관리 부서', startDate: '2019-08-05' },
        { name: '이지영', department: '생산관리 부서', startDate: '2019-02-28' },
      ],
    },
    {
      id: 'POS005',
      position: '부장',
      count: 1,
      salary: '9,000만원',
      employees: [{ name: '박철수', department: '구매관리 부서', startDate: '2019-05-20' }],
    },
  ];

  // 필터링된 직원 목록
  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesPosition = !positionFilter || employee.position === positionFilter;
      const matchesSearch =
        !searchTerm || employee.name.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesPosition && matchesSearch;
    });
  }, [positionFilter, searchTerm]);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage);

  // 페이지 변경 시 첫 페이지로 리셋
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const handleViewEmployee = (employee: any) => {
    setSelectedEmployee(employee);
    setShowEmployeeDetailModal(true);
  };

  const handleEditFromDetail = () => {
    setShowEmployeeDetailModal(false);
    setShowEditEmployeeModal(true);
  };

  const handleViewDepartment = (department: any) => {
    setSelectedDepartment(department);
    setShowDepartmentDetailModal(true);
  };

  const handleEditDepartmentFromDetail = () => {
    setShowDepartmentDetailModal(false);
    setShowEditDepartmentModal(true);
  };

  const handleViewPosition = (position: any) => {
    setSelectedPosition(position);
    setShowPositionDetailModal(true);
  };

  const handleEditPositionFromDetail = () => {
    setShowPositionDetailModal(false);
    setShowEditPositionModal(true);
  };

  const handleUpdateEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    alert('직원 정보가 수정되었습니다.');
    setShowEditEmployeeModal(false);
  };

  const handleUpdateDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    alert('부서 정보가 수정되었습니다.');
    setShowEditDepartmentModal(false);
  };

  const handleUpdatePosition = (e: React.FormEvent) => {
    e.preventDefault();
    alert('직급 정보가 수정되었습니다.');
    setShowEditPositionModal(false);
  };

  return (
    <>
      <SubNavigation tabs={HR_TABS} />
      <div className="flex items-center space-x-3">
        <button
          // onClick={() => setIsEmployeeRegisterModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer whitespace-nowrap flex items-center space-x-2"
        >
          <i className="ri-user-add-line"></i>
          <span>신규 직원 등록</span>
        </button>
      </div>
      {/* 모달들 */}
      {showEmployeeDetailModal && selectedEmployee && (
        <EmployeeDetailModal
          employee={selectedEmployee}
          onClose={() => setShowEmployeeDetailModal(false)}
          onEdit={handleEditFromDetail}
        />
      )}

      {showEditEmployeeModal && selectedEmployee && (
        <EmployeeEditModal
          employee={selectedEmployee}
          departments={departments}
          positionData={positionData}
          onClose={() => setShowEditEmployeeModal(false)}
          onSubmit={handleUpdateEmployee}
        />
      )}

      {showDepartmentDetailModal && selectedDepartment && (
        <DepartmentDetailModal
          department={selectedDepartment}
          onClose={() => setShowDepartmentDetailModal(false)}
          onEdit={handleEditDepartmentFromDetail}
        />
      )}

      {showEditDepartmentModal && selectedDepartment && (
        <DepartmentEditModal
          department={selectedDepartment}
          onClose={() => setShowEditDepartmentModal(false)}
          onSubmit={handleUpdateDepartment}
        />
      )}

      {showPositionDetailModal && selectedPosition && (
        <PositionDetailModal
          position={selectedPosition}
          onClose={() => setShowPositionDetailModal(false)}
          onEdit={handleEditPositionFromDetail}
        />
      )}

      {showEditPositionModal && selectedPosition && (
        <PositionEditModal
          position={selectedPosition}
          onClose={() => setShowEditPositionModal(false)}
          onSubmit={handleUpdatePosition}
        />
      )}
    </>
  );
}
