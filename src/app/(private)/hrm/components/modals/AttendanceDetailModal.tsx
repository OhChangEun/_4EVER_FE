// modals/AttendanceDetailModal.tsx
interface AttendanceDetailModalProps {
  attendance: any;
  onClose: () => void;
}

export function AttendanceDetailModal({ attendance, onClose }: AttendanceDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">출퇴근 상세 정보</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>
        <div className="space-y-4">
          <div className="border-b border-gray-200 pb-4">
            <h4 className="font-medium text-gray-900 mb-2">직원 정보</h4>
            <div className="space-y-2 text-sm">
              <div>
                <strong>이름:</strong> {attendance.name}
              </div>
              <div>
                <strong>직급:</strong> {attendance.position}
              </div>
              <div>
                <strong>부서:</strong> {attendance.department}
              </div>
              <div>
                <strong>직원번호:</strong> {attendance.employeeId}
              </div>
            </div>
          </div>
          <div className="border-b border-gray-200 pb-4">
            <h4 className="font-medium text-gray-900 mb-2">근무 정보</h4>
            <div className="space-y-2 text-sm">
              <div>
                <strong>날짜:</strong> {attendance.date}
              </div>
              <div>
                <strong>출근 시간:</strong> {attendance.checkIn}
              </div>
              <div>
                <strong>퇴근 시간:</strong> {attendance.checkOut}
              </div>
              <div>
                <strong>총 근무 시간:</strong> {attendance.workHours}
              </div>
              <div>
                <strong>초과 근무:</strong> {attendance.overtime}
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">근무 상태</h4>
            <span
              className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                attendance.status === '정상'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {attendance.status}
            </span>
          </div>
        </div>
        <div className="flex justify-end pt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
