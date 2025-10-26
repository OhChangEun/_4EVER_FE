// components/EmployeeDetailModal.tsx
interface EmployeeDetailModalProps {
  employee: any;
  onClose: () => void;
  onEdit: () => void;
}

export function EmployeeDetailModal({ employee, onClose, onEdit }: EmployeeDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">직원 상세 정보</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
              <div className="text-sm text-gray-900">{employee.name}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">직원 ID</label>
              <div className="text-sm text-gray-900">{employee.id}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">부서</label>
              <div className="text-sm text-gray-900">{employee.department}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">직급</label>
              <div className="text-sm text-gray-900">{employee.position}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">입사일</label>
              <div className="text-sm text-gray-900">{employee.joinDate}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">생년월일</label>
              <div className="text-sm text-gray-900">{employee.birthDate}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">성별</label>
              <div className="text-sm text-gray-900">{employee.gender}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">전화번호</label>
              <div className="text-sm text-gray-900">{employee.phone}</div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
            <div className="text-sm text-gray-900">{employee.email}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">주소</label>
            <div className="text-sm text-gray-900">{employee.address}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">학력</label>
            <div className="text-sm text-gray-900">{employee.education}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">경력사항</label>
            <div className="text-sm text-gray-900">{employee.career}</div>
          </div>
        </div>
        <div className="flex space-x-3 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
          >
            닫기
          </button>
          <button
            type="button"
            onClick={onEdit}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            수정
          </button>
        </div>
      </div>
    </div>
  );
}
