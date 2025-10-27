import React from 'react';

// Mock 부서 데이터
const MOCK_DEPARTMENTS = [
  { id: 1, name: '경영지원팀', headCount: 15, manager: '김철수 부장' },
  { id: 2, name: '개발 1팀', headCount: 25, manager: '이영희 차장' },
  { id: 3, name: '마케팅팀', headCount: 12, manager: '박민준 과장' },
  { id: 4, name: '영업 2팀', headCount: 18, manager: '최지아 이사' },
];

export default function OrganizationTab() {
  // Mock Data를 직접 사용하거나, 간단한 상태로 관리할 수 있습니다.
  const departments = MOCK_DEPARTMENTS;

  // 더미 핸들러 함수
  const handleViewDepartment = (dept) => {
    alert(`[${dept.name}] 부서 상세 보기 기능 실행`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">부서별 조직 구조</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <div key={dept.id} className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">{dept.name}</h4>
              <button
                onClick={() => handleViewDepartment(dept)}
                className="text-blue-600 hover:text-blue-900 cursor-pointer"
                title="부서 상세보기"
              >
                <i className="ri-eye-line"></i>
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">인원 수</span>
                <span className="text-sm font-medium text-gray-900">**{dept.headCount}명**</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">부서장</span>
                <span className="text-sm font-medium text-gray-900">{dept.manager}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
