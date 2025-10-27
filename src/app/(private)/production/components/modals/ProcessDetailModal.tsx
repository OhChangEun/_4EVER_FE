import { MesDetailResponse } from '@/app/(private)/production/types/MesDetailApiType';
import { fetchMesDetail } from '../../api/production.api';
import { useQuery } from '@tanstack/react-query';

interface ProcessDetailModalProps {
  mesId: string;
  onClose: () => void;
}

export default function ProcessDetailModal({ mesId, onClose }: ProcessDetailModalProps) {
  const {
    data: mesDetail,
    isLoading,
    isError,
  } = useQuery<MesDetailResponse>({
    queryKey: ['mesDetail', mesId],
    queryFn: () => fetchMesDetail(mesId),
  });

  const getStatusBadge = (statusCode: string) => {
    const statusConfig: Record<string, { label: string; class: string }> = {
      PLANNED: { label: '대기', class: 'bg-yellow-100 text-yellow-800' },
      IN_PROGRESS: { label: '진행중', class: 'bg-blue-100 text-blue-800' },
      COMPLETED: { label: '완료', class: 'bg-green-100 text-green-800' },
      ON_HOLD: { label: '보류', class: 'bg-red-100 text-red-800' },
    };
    const config = statusConfig[statusCode] || {
      label: statusCode,
      class: 'bg-gray-100 text-gray-800',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.class}`}>
        {config.label}
      </span>
    );
  };

  const getProcessStatusIcon = (statusCode: string) => {
    const icons: Record<string, string> = {
      COMPLETED: 'ri-checkbox-circle-fill text-green-600',
      IN_PROGRESS: 'ri-play-circle-fill text-blue-600',
      PLANNED: 'ri-time-line text-gray-400',
    };
    return icons[statusCode] || 'ri-time-line text-gray-400';
  };

  const formatDuration = (hours: number): string => {
    if (hours === 0) return '-';
    if (hours < 1) {
      return `${Math.round(hours * 60)}분`;
    }
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    return minutes > 0 ? `${wholeHours}시간 ${minutes}분` : `${wholeHours}시간`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">공정 상세 현황</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <i className="ri-loader-4-line animate-spin text-3xl text-gray-400"></i>
            <p className="mt-3 text-gray-500">로딩 중...</p>
          </div>
        ) : isError || !mesDetail ? (
          <div className="text-center py-12">
            <i className="ri-error-warning-line text-3xl text-red-400"></i>
            <p className="mt-3 text-red-500">데이터를 불러오는데 실패했습니다.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">작업지시 정보</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-xs text-gray-500">작업지시번호</div>
                  <div className="text-sm font-medium text-gray-900">{mesDetail.mesNumber}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">제품명</div>
                  <div className="text-sm font-medium text-gray-900">{mesDetail.productName}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">수량</div>
                  <div className="text-sm font-medium text-gray-900">
                    {mesDetail.quantity} {mesDetail.uomName}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">진행률</div>
                  <div className="text-sm font-medium text-blue-600">
                    {mesDetail.progressPercent}%
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <div className="text-xs text-gray-500">시작일</div>
                  <div className="text-sm font-medium text-gray-900">
                    {mesDetail.plan.startDate}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">완료 예정일</div>
                  <div className="text-sm font-medium text-gray-900">{mesDetail.plan.dueDate}</div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">공정별 상세 현황</h4>
              <div className="space-y-3">
                {mesDetail.operations.map((operation) => (
                  <div
                    key={operation.operationNumber}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <i className={`${getProcessStatusIcon(operation.statusCode)} text-lg`}></i>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {operation.operationNumber} - {operation.operationName}
                          </div>
                          <div className="text-xs text-gray-500">공정 {operation.sequence}</div>
                        </div>
                      </div>
                      {getStatusBadge(operation.statusCode)}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                      <div>
                        <div className="text-xs text-gray-500">시작시간</div>
                        <div className="text-sm text-gray-900">{operation.startedAt || '-'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">종료시간</div>
                        <div className="text-sm text-gray-900">{operation.finishedAt || '-'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">소요시간</div>
                        <div className="text-sm text-gray-900">
                          {formatDuration(operation.durationHours)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">담당자</div>
                        <div className="text-sm text-gray-900">
                          {operation.manager?.name || '-'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
