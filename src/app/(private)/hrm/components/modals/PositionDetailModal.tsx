// components/PositionDetailModal.tsx
interface PositionDetailModalProps {
  position: any;
  onClose: () => void;
  onEdit: () => void;
}

export function PositionDetailModal({ position, onClose, onEdit }: PositionDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{position.position}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">직급 ID</label>
            <div className="text-sm text-gray-900">{position.id}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">현재 인원</label>
            <div className="text-sm text-gray-900">{position.count}명</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">연봉</label>
            <div className="text-sm text-gray-900">{position.salary}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              해당 직급 직원 목록
            </label>
            <div className="space-y-2">
              {position.employees.map((emp: any, index: number) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{emp.name}</span>
                  <span className="text-gray-500">
                    {emp.department} ({emp.startDate})
                  </span>
                </div>
              ))}
            </div>
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
