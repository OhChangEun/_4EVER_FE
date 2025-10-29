// PayrollActionModal.tsx
interface PayrollActionModalProps {
  payroll: any;
  selectedMonth: string;
  onClose: () => void;
  onPaymentComplete: () => void;
}

export function PayrollActionModal({
  payroll,
  selectedMonth,
  onClose,
  onPaymentComplete,
}: PayrollActionModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">급여 상세 정보</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <div className="space-y-6">
          {/* 직원 정보 */}
          <div className="border-b border-gray-200 pb-4">
            <h4 className="font-medium text-gray-900 mb-3">직원 정보</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>이름:</strong> {payroll.name}
              </div>
              <div>
                <strong>부서:</strong> {payroll.department}
              </div>
              <div>
                <strong>직급:</strong> {payroll.position}
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
                  {payroll.baseSalary.toLocaleString()}원
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">초과근무비</span>
                <span className="text-green-600 font-semibold">
                  {payroll.overtime.toLocaleString()}원
                </span>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">공제액</span>
                  <span className="text-red-600 font-semibold">
                    -{payroll.deductions.toLocaleString()}원
                  </span>
                </div>
                <div className="ml-4 space-y-1 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>- 소득세</span>
                    <span>-{payroll.deductionDetails.tax.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>- 4대보험</span>
                    <span>-{payroll.deductionDetails.insurance.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>- 국민연금</span>
                    <span>-{payroll.deductionDetails.pension.toLocaleString()}원</span>
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
                {payroll.netSalary.toLocaleString()}원
              </span>
            </div>
            <div className="mt-2">
              <span
                className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                  payroll.status === '지급완료'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {payroll.status}
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
                payroll.status === '지급완료'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {payroll.status}
            </span>
          </div>

          <div className="flex space-x-3">
            {payroll.status === '미지급' && (
              <button
                onClick={onPaymentComplete}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 whitespace-nowrap"
              >
                지급 완료 처리
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
