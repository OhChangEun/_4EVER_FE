import { ModalProps } from '@/app/components/common/modal/types';

interface Training {
  title: string;
  status: '완료' | '진행중';
  completedDate?: string;
  startDate?: string;
}

interface TrainingDetailModalProps extends ModalProps {
  employeeId: string;
}

export default function TrainingDetailModal({ employeeId }: TrainingDetailModalProps) {
  return (
    <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      {/* <div className="mb-6">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{employee.completedTrainings}</div>
            <div className="text-sm text-gray-600">완료된 교육</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{employee.inProgressTrainings}</div>
            <div className="text-sm text-gray-600">진행 중인 교육</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{employee.requiredTrainings}</div>
            <div className="text-sm text-gray-600">필수 교육 미완료</div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-md font-semibold text-gray-900 mb-3">교육 이력</h4>
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {employee.trainingHistory.map((training, index) => (
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
      </div> */}
    </div>
  );
}
