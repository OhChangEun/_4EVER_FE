// modals/LeaveApprovalModal.tsx
interface LeaveApprovalModalProps {
  leave: any;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function LeaveApprovalModal({ leave, onClose, onSubmit }: LeaveApprovalModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">휴가 승인</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>
        <div className="space-y-4 mb-6">
          <div className="border-b border-gray-200 pb-4">
            <h4 className="font-medium text-gray-900 mb-2">신청 정보</h4>
            <div className="space-y-2 text-sm">
              <div>
                <strong>직원명:</strong> {leave.name}
              </div>
              <div>
                <strong>직급:</strong> {leave.position}
              </div>
              <div>
                <strong>부서:</strong> {leave.department}
              </div>
              <div>
                <strong>휴가 유형:</strong> {leave.leaveType}
              </div>
              <div>
                <strong>기간:</strong> {leave.startDate} ~ {leave.endDate}
              </div>
              <div>
                <strong>일수:</strong> {leave.days}일
              </div>
              <div>
                <strong>잔여 연차:</strong> {leave.remaining}일
              </div>
            </div>
          </div>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              승인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
