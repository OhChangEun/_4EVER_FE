'use client';
import SubNavigation from '@/app/components/common/SubNavigation';
import { useState, useMemo } from 'react';
import { TRAINING_TABS } from '../../../constants';

export default function TrainingManagement() {
  const [activeTab, setActiveTab] = useState('employee-training');
  const [showAddTrainingModal, setShowAddTrainingModal] = useState(false);
  const [showTrainingDetailModal, setShowTrainingDetailModal] = useState(false);
  const [showManageTrainingModal, setShowManageTrainingModal] = useState(false);
  const [showEmployeeTrainingDetailModal, setShowEmployeeTrainingDetailModal] = useState(false);
  const [showAddEmployeeTrainingModal, setShowAddEmployeeTrainingModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showStudentDetailModal, setShowStudentDetailModal] = useState(false);
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState<any>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [employeeDepartmentFilter, setEmployeeDepartmentFilter] = useState('');
  const [employeePositionFilter, setEmployeePositionFilter] = useState('');
  const [employeeSearchTerm, setEmployeeSearchTerm] = useState('');
  const [employeeCurrentPage, setEmployeeCurrentPage] = useState(1);
  const [trainingCurrentPage, setTrainingCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const employeeTraining = [
    {
      employeeId: 'EMP001',
      name: '김민수',
      department: '개발팀',
      position: '과장',
      completedTrainings: 8,
      inProgressTrainings: 2,
      requiredTrainings: 3,
      lastTrainingDate: '2024-01-10',
      trainingHistory: [
        { id: 'TRN001', title: 'React 기초', status: '완료', completedDate: '2024-01-10' },
        { id: 'TRN002', title: 'TypeScript 심화', status: '진행중', startDate: '2024-01-15' },
        { id: 'TRN003', title: '정보보안 기초', status: '완료', completedDate: '2024-01-05' },
      ],
    },
    {
      employeeId: 'EMP002',
      name: '이영희',
      department: '마케팅팀',
      position: '차장',
      completedTrainings: 12,
      inProgressTrainings: 1,
      requiredTrainings: 2,
      lastTrainingDate: '2024-01-08',
      trainingHistory: [
        { id: 'TRN004', title: '디지털 마케팅', status: '완료', completedDate: '2024-01-08' },
        { id: 'TRN005', title: '고객 관계 관리', status: '진행중', startDate: '2024-01-12' },
        { id: 'TRN006', title: '브랜드 전략', status: '완료', completedDate: '2023-12-20' },
      ],
    },
    {
      employeeId: 'EMP003',
      name: '박철수',
      department: '영업팀',
      position: '부장',
      completedTrainings: 6,
      inProgressTrainings: 3,
      requiredTrainings: 4,
      lastTrainingDate: '2024-01-05',
      trainingHistory: [
        { id: 'TRN007', title: '영업 스킬', status: '완료', completedDate: '2024-01-05' },
        { id: 'TRN008', title: '협상 기법', status: '진행중', startDate: '2024-01-10' },
        { id: 'TRN009', title: '고객 서비스', status: '진행중', startDate: '2024-01-08' },
      ],
    },
    {
      employeeId: 'EMP004',
      name: '정수진',
      department: '인사팀',
      position: '대리',
      completedTrainings: 15,
      inProgressTrainings: 1,
      requiredTrainings: 1,
      lastTrainingDate: '2024-01-12',
      trainingHistory: [
        { id: 'TRN010', title: '인사 관리', status: '완료', completedDate: '2024-01-12' },
        { id: 'TRN011', title: '노동법 기초', status: '완료', completedDate: '2024-01-01' },
        { id: 'TRN012', title: '리더십 개발', status: '진행중', startDate: '2024-01-15' },
      ],
    },
    {
      employeeId: 'EMP005',
      name: '최재원',
      department: '재무팀',
      position: '과장',
      completedTrainings: 9,
      inProgressTrainings: 2,
      requiredTrainings: 2,
      lastTrainingDate: '2024-01-09',
      trainingHistory: [
        { id: 'TRN013', title: '재무 분석', status: '완료', completedDate: '2024-01-09' },
        { id: 'TRN014', title: '회계 실무', status: '진행중', startDate: '2024-01-11' },
        { id: 'TRN015', title: '세무 기초', status: '진행중', startDate: '2024-01-13' },
      ],
    },
    {
      employeeId: 'EMP006',
      name: '김영수',
      department: '재고팀',
      position: '차장',
      completedTrainings: 7,
      inProgressTrainings: 1,
      requiredTrainings: 3,
      lastTrainingDate: '2024-01-07',
      trainingHistory: [
        { id: 'TRN016', title: '재고 관리', status: '완료', completedDate: '2024-01-07' },
        { id: 'TRN017', title: '물류 최적화', status: '진행중', startDate: '2024-01-14' },
        { id: 'TRN018', title: '창고 운영', status: '완료', completedDate: '2023-12-28' },
      ],
    },
  ];

  const availableTrainings = [
    {
      id: 'TRN001',
      title: '신입사원 온보딩',
      category: '기본 교육',
      duration: '4시간',
      format: '온라인',
      participants: 15,
      startDate: '2024-02-01',
      status: '모집중',
      students: [
        {
          id: 'EMP007',
          name: '김신입',
          department: '개발팀',
          position: '사원',
          startDate: '2024-02-01',
          status: '진행중',
        },
        {
          id: 'EMP008',
          name: '이신규',
          department: '마케팅팀',
          position: '사원',
          startDate: '2024-02-01',
          status: '진행중',
        },
        {
          id: 'EMP009',
          name: '박초보',
          department: '영업팀',
          position: '사원',
          startDate: '2024-02-01',
          status: '진행중',
        },
      ],
    },
    {
      id: 'TRN002',
      title: 'React 개발 심화',
      category: '기술 교육',
      duration: '16시간',
      format: '오프라인',
      participants: 8,
      startDate: '2024-02-05',
      status: '모집중',
      students: [
        {
          id: 'EMP010',
          name: '최개발',
          department: '개발팀',
          position: '대리',
          startDate: '2024-02-05',
          status: '진행중',
        },
        {
          id: 'EMP011',
          name: '정코딩',
          department: '개발팀',
          position: '과장',
          startDate: '2024-02-05',
          status: '진행중',
        },
        {
          id: 'EMP012',
          name: '한프론트',
          department: '개발팀',
          position: '사원',
          startDate: '2024-02-05',
          status: '진행중',
        },
      ],
    },
    {
      id: 'TRN003',
      title: '디지털 마케팅 전략',
      category: '마케팅',
      duration: '8시간',
      format: '온라인',
      participants: 12,
      startDate: '2024-02-10',
      status: '진행중',
      students: [
        {
          id: 'EMP013',
          name: '김마케터',
          department: '마케팅팀',
          position: '대리',
          startDate: '2024-02-10',
          status: '진행중',
        },
        {
          id: 'EMP014',
          name: '이디지털',
          department: '마케팅팀',
          position: '사원',
          startDate: '2024-02-10',
          status: '진행중',
        },
        {
          id: 'EMP015',
          name: '박광고',
          department: '마케팅팀',
          position: '과장',
          startDate: '2024-02-10',
          status: '진행중',
        },
      ],
    },
    {
      id: 'TRN004',
      title: '리더십 개발',
      category: '관리 교육',
      duration: '12시간',
      format: '오프라인',
      participants: 6,
      startDate: '2024-02-15',
      status: '모집중',
      students: [
        {
          id: 'EMP016',
          name: '최팀장',
          department: '영업팀',
          position: '과장',
          startDate: '2024-02-15',
          status: '진행중',
        },
        {
          id: 'EMP017',
          name: '정관리자',
          department: '인사팀',
          position: '차장',
          startDate: '2024-02-15',
          status: '진행중',
        },
      ],
    },
    {
      id: 'TRN005',
      title: '정보보안 기초',
      category: '기본 교육',
      duration: '2시간',
      format: '온라인',
      participants: 45,
      startDate: '2024-01-20',
      status: '완료',
      students: [
        {
          id: 'EMP001',
          name: '김민수',
          department: '개발팀',
          position: '과장',
          startDate: '2024-01-20',
          status: '완료',
        },
        {
          id: 'EMP002',
          name: '이영희',
          department: '마케팅팀',
          position: '차장',
          startDate: '2024-01-20',
          status: '완료',
        },
        {
          id: 'EMP003',
          name: '박철수',
          department: '영업팀',
          position: '부장',
          startDate: '2024-01-20',
          status: '완료',
        },
      ],
    },
    {
      id: 'TRN006',
      title: '고객 서비스 향상',
      category: '서비스',
      duration: '6시간',
      format: '온라인',
      participants: 18,
      startDate: '2024-02-20',
      status: '모집중',
      students: [
        {
          id: 'EMP018',
          name: '김서비스',
          department: '고객지원팀',
          position: '사원',
          startDate: '2024-02-20',
          status: '진행중',
        },
        {
          id: 'EMP019',
          name: '이고객',
          department: '영업팀',
          position: '대리',
          startDate: '2024-02-20',
          status: '진행중',
        },
      ],
    },
  ];

  const departments = [...new Set(employeeTraining.map((emp) => emp.department))];
  const positions = [...new Set(employeeTraining.map((emp) => emp.position))];

  const filteredEmployeeTraining = useMemo(() => {
    return employeeTraining.filter((employee) => {
      const matchesDepartment =
        !employeeDepartmentFilter || employee.department === employeeDepartmentFilter;
      const matchesPosition =
        !employeePositionFilter || employee.position === employeePositionFilter;
      const matchesSearch =
        !employeeSearchTerm ||
        employee.name.toLowerCase().includes(employeeSearchTerm.toLowerCase());

      return matchesDepartment && matchesPosition && matchesSearch;
    });
  }, [employeeDepartmentFilter, employeePositionFilter, employeeSearchTerm]);

  const employeeTotalPages = Math.ceil(filteredEmployeeTraining.length / itemsPerPage);
  const employeeStartIndex = (employeeCurrentPage - 1) * itemsPerPage;
  const paginatedEmployeeTraining = filteredEmployeeTraining.slice(
    employeeStartIndex,
    employeeStartIndex + itemsPerPage,
  );

  const trainingTotalPages = Math.ceil(availableTrainings.length / itemsPerPage);
  const trainingStartIndex = (trainingCurrentPage - 1) * itemsPerPage;
  const paginatedTrainings = availableTrainings.slice(
    trainingStartIndex,
    trainingStartIndex + itemsPerPage,
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case '모집중':
        return 'bg-blue-100 text-blue-800';
      case '진행중':
        return 'bg-green-100 text-green-800';
      case '완료':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStudentStatusColor = (status: string) => {
    switch (status) {
      case '진행중':
        return 'bg-blue-100 text-blue-800';
      case '완료':
        return 'bg-green-100 text-green-800';
      case '중단':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDownloadTrainingReport = () => {
    const trainingReport = employeeTraining.map((employee) => ({
      name: employee.name,
      department: employee.department,
      completedTrainings: employee.completedTrainings,
      inProgressTrainings: employee.inProgressTrainings,
      requiredTrainings: employee.requiredTrainings,
      lastTrainingDate: employee.lastTrainingDate,
    }));

    const dataStr = JSON.stringify(trainingReport, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `training_report_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleViewEmployeeTraining = (employee: any) => {
    setSelectedEmployee(employee);
    setShowEmployeeTrainingDetailModal(true);
  };

  const handleAddEmployeeTraining = (employee: any) => {
    setSelectedEmployee(employee);
    setShowAddEmployeeTrainingModal(true);
  };

  const handleViewTrainingDetail = (training: any) => {
    setSelectedTraining(training);
    setShowTrainingDetailModal(true);
  };

  const handleManageTraining = (training: any) => {
    setSelectedTraining(training);
    setShowManageTrainingModal(true);
  };

  const handleAddTraining = () => {
    setShowAddTrainingModal(true);
  };

  const handleSubmitTraining = (e: React.FormEvent) => {
    e.preventDefault();
    alert('교육 프로그램이 추가되었습니다.');
    setShowAddTrainingModal(false);
  };

  const handleUpdateTraining = (e: React.FormEvent) => {
    e.preventDefault();
    alert('교육 프로그램이 수정되었습니다.');
    setShowManageTrainingModal(false);
  };

  const handleSubmitEmployeeTraining = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`${selectedEmployee?.name}에게 교육이 추가되었습니다.`);
    setShowAddEmployeeTrainingModal(false);
  };

  const handleAddStudent = () => {
    setShowAddStudentModal(true);
  };

  const handleSubmitAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    alert('수강생이 추가되었습니다.');
    setShowAddStudentModal(false);
  };

  const handleViewStudent = (student: any) => {
    setSelectedStudent(student);
    setShowStudentDetailModal(true);
  };

  const handleEditStudent = (student: any) => {
    setSelectedStudent(student);
    setShowEditStudentModal(true);
  };

  const handleDeleteStudent = (student: any) => {
    if (confirm(`${student.name} 직원을 이 교육에서 제외하시겠습니까?`)) {
      alert(`${student.name} 직원이 교육에서 제외되었습니다.`);
    }
  };

  const handleUpdateStudentProgress = (e: React.FormEvent) => {
    e.preventDefault();
    alert('수강생 정보가 수정되었습니다.');
    setShowEditStudentModal(false);
  };

  const handleEmployeeFilterChange = () => {
    setEmployeeCurrentPage(1);
  };

  return (
    <>
      <SubNavigation tabs={TRAINING_TABS} />

      {/* 교육 프로그램 추가 모달 */}
      {showAddTrainingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">교육 프로그램 추가</h3>
              <button
                onClick={() => setShowAddTrainingModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <form onSubmit={handleSubmitTraining} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">교육명</label>
                  <input
                    type="text"
                    required
                    placeholder="교육 프로그램명을 입력하세요"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
                  <select
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
                  >
                    <option value="">카테고리 선택</option>
                    <option value="기본 교육">기본 교육</option>
                    <option value="기술 교육">기술 교육</option>
                    <option value="마케팅">마케팅</option>
                    <option value="관리 교육">관리 교육</option>
                    <option value="서비스">서비스</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">교육 시간</label>
                  <input
                    type="text"
                    required
                    placeholder="예: 8시간, 2일"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">교육 방식</label>
                  <select
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
                  >
                    <option value="">교육 방식 선택</option>
                    <option value="온라인">온라인</option>
                    <option value="오프라인">오프лайн</option>
                    <option value="혼합">혼합</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">시작일</label>
                <input
                  type="date"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">대상 부서</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">개발팀</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">마케팅팀</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">영업팀</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">인사팀</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">재무팀</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">재고팀</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">대상 직급</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">사원</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">대리</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">과장</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">차장</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">부장</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">교육 설명</label>
                <textarea
                  rows={4}
                  placeholder="교육 내용과 목표를 입력하세요"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>

              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAddTrainingModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  교육 프로그램 추가
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 직원 교육 상세보기 모달 */}
      {showEmployeeTrainingDetailModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedEmployee.name}의 교육 현황
              </h3>
              <button
                onClick={() => setShowEmployeeTrainingDetailModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="mb-6">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {selectedEmployee.completedTrainings}
                  </div>
                  <div className="text-sm text-gray-600">완료된 교육</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {selectedEmployee.inProgressTrainings}
                  </div>
                  <div className="text-sm text-gray-600">진행 중인 교육</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {selectedEmployee.requiredTrainings}
                  </div>
                  <div className="text-sm text-gray-600">필수 교육 미완료</div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-md font-semibold text-gray-900 mb-3">교육 이력</h4>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {selectedEmployee.trainingHistory.map((training: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900">{training.title}</h5>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          training.status === '완료'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {training.status}
                      </span>
                    </div>
                    {training.status === '완료' ? (
                      <div className="text-sm text-gray-600">
                        <div>완료일: {training.completedDate}</div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-600">
                        <div>시작일: {training.startDate}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowEmployeeTrainingDetailModal(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 직원 교육 추가 모달 */}
      {showAddEmployeeTrainingModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedEmployee.name}에게 교육 추가
              </h3>
              <button
                onClick={() => setShowAddEmployeeTrainingModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <form onSubmit={handleSubmitEmployeeTraining} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  교육 프로그램 선택
                </label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
                >
                  <option value="">교육 프로그램 선택</option>
                  {availableTrainings
                    .filter((t) => t.status === '모집중')
                    .map((training) => (
                      <option key={training.id} value={training.id}>
                        {training.title}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">교육 유형</label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
                >
                  <option value="">교육 유형 선택</option>
                  <option value="필수">필수 교육</option>
                  <option value="선택">선택 교육</option>
                  <option value="추천">추천 교육</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">비고</label>
                <textarea
                  rows={3}
                  placeholder="교육 추가 사유나 특이사항을 입력하세요"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddEmployeeTrainingModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  추가
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 수강생 추가 모달 - 수정된 버전 */}
      {showAddStudentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">수강생 추가</h3>
              <button
                onClick={() => setShowAddStudentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <form onSubmit={handleSubmitAddStudent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">직원 선택</label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus-outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                >
                  <option value="">직원을 선택하세요</option>
                  <option value="김철수">김철수 - 개발팀</option>
                  <option value="이영희">이영희 - 마케팅팀</option>
                  <option value="박민수">박민수 - 영업팀</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">수강 유형</label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus-outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                >
                  <option value="">수강 유형을 선택하세요</option>
                  <option value="필수 수강">필수 수강</option>
                  <option value="선택 수강">선택 수강</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
                >
                  추가
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 수강생 정보 수정 모달 - 수정된 버전 */}
      {showEditStudentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">수강생 정보 수정</h3>
              <button
                onClick={() => setShowEditStudentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <form onSubmit={handleUpdateStudentProgress} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">직원명</label>
                <input
                  type="text"
                  value="김철수"
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus-outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                >
                  <option value="진행중">진행중</option>
                  <option value="완료">완료</option>
                  <option value="중단">중단</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowEditStudentModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
                >
                  저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 수강생 상세보기 모달 */}
      {showStudentDetailModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">수강생 상세 정보</h3>
              <button
                onClick={() => setShowStudentDetailModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">기본 정보</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">이름</span>
                    <p className="font-medium text-gray-900">{selectedStudent.name}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">부서</span>
                    <p className="font-medium text-gray-900">{selectedStudent.department}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">직급</span>
                    <p className="font-medium text-gray-900">{selectedStudent.position}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">입사일</span>
                    <p className="font-medium text-gray-900">2023-03-15</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">교육 진행 상황</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-600">시작일</span>
                      <p className="font-medium text-gray-900">{selectedStudent.startDate}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">상태</span>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          selectedStudent.status === '진행중'
                            ? 'bg-blue-100 text-blue-800'
                            : selectedStudent.status === '완료'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {selectedStudent.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-gray-200 mt-6 sticky bottom-0 bg-white">
              <button
                onClick={() => setShowStudentDetailModal(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 교육 상세보기 모달 - 수정된 버전 */}
      {showTrainingDetailModal && selectedTraining && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">교육 프로그램 상세 정보</h3>
              <button
                onClick={() => setShowTrainingDetailModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">교육 정보</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <strong>교육명:</strong> {selectedTraining.title}
                  </div>
                  <div>
                    <strong>카테고리:</strong> {selectedTraining.category}
                  </div>
                  <div>
                    <strong>교육 시간:</strong> {selectedTraining.duration}
                  </div>
                  <div>
                    <strong>교육 방식:</strong> {selectedTraining.format}
                  </div>
                  <div>
                    <strong>시작일:</strong> {selectedTraining.startDate}
                  </div>
                  <div>
                    <strong>상태:</strong> {selectedTraining.status}
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">
                  지정된 직원 목록 ({selectedTraining.students?.length || 0}명)
                </h4>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {selectedTraining.students?.map((student: any) => (
                    <div
                      key={student.id}
                      className="bg-white rounded-lg p-3 border border-gray-200"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          <div className="text-xs text-gray-500">
                            {student.department} · {student.position}
                          </div>
                          <div className="text-xs text-gray-500">시작일: {student.startDate}</div>
                        </div>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStudentStatusColor(student.status)}`}
                        >
                          {student.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setShowTrainingDetailModal(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 교육 프로그램 관리 모달 - 수정된 버전 */}
      {showManageTrainingModal && selectedTraining && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">교육 정보 수정</h3>
                <p className="text-sm text-gray-600 mt-1">{selectedTraining.title}</p>
              </div>
              <button
                onClick={() => setShowManageTrainingModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <form onSubmit={handleUpdateTraining} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">교육명</label>
                <input
                  type="text"
                  defaultValue={selectedTraining.title}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                <select
                  defaultValue={selectedTraining.status}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
                >
                  <option value="진행중">진행중</option>
                  <option value="완료">완료</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowManageTrainingModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  수정
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
