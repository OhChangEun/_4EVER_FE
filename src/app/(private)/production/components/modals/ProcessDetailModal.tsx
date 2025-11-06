// import { MesDetailResponse } from '@/app/(private)/production/types/MesDetailApiType';
// import { fetchMesDetail } from '../../api/production.api';
// import { useQuery } from '@tanstack/react-query';
// import { ModalProps } from '@/app/components/common/modal/types';

// interface ProcessDetailModalProps extends ModalProps {
//   mesId: string;
// }

// export default function ProcessDetailModal({ mesId }: ProcessDetailModalProps) {
//   const {
//     data: mesDetail,
//     isLoading,
//     isError,
//   } = useQuery<MesDetailResponse>({
//     queryKey: ['mesDetail', mesId],
//     queryFn: () => fetchMesDetail(mesId),
//   });

//   const getStatusBadge = (statusCode: string) => {
//     const statusConfig: Record<string, { label: string; class: string }> = {
//       PLANNED: { label: '대기', class: 'bg-yellow-100 text-yellow-800' },
//       IN_PROGRESS: { label: '진행중', class: 'bg-blue-100 text-blue-800' },
//       COMPLETED: { label: '완료', class: 'bg-green-100 text-green-800' },
//       ON_HOLD: { label: '보류', class: 'bg-red-100 text-red-800' },
//     };
//     const config = statusConfig[statusCode] || {
//       label: statusCode,
//       class: 'bg-gray-100 text-gray-800',
//     };
//     return (
//       <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.class}`}>
//         {config.label}
//       </span>
//     );
//   };

//   const getProcessStatusIcon = (statusCode: string) => {
//     const icons: Record<string, string> = {
//       COMPLETED: 'ri-checkbox-circle-fill text-green-600',
//       IN_PROGRESS: 'ri-play-circle-fill text-blue-600',
//       PLANNED: 'ri-time-line text-gray-400',
//     };
//     return icons[statusCode] || 'ri-time-line text-gray-400';
//   };

//   const formatDuration = (hours: number): string => {
//     if (hours === 0) return '-';
//     if (hours < 1) {
//       return `${Math.round(hours * 60)}분`;
//     }
//     const wholeHours = Math.floor(hours);
//     const minutes = Math.round((hours - wholeHours) * 60);
//     return minutes > 0 ? `${wholeHours}시간 ${minutes}분` : `${wholeHours}시간`;
//   };

//   return (
//     <>
//       {isLoading ? (
//         <div className="text-center py-12">
//           <i className="ri-loader-4-line animate-spin text-3xl text-gray-400"></i>
//           <p className="mt-3 text-gray-500">로딩 중...</p>
//         </div>
//       ) : isError || !mesDetail ? (
//         <div className="text-center py-12">
//           <i className="ri-error-warning-line text-3xl text-red-400"></i>
//           <p className="mt-3 text-red-500">데이터를 불러오는데 실패했습니다.</p>
//         </div>
//       ) : (
//         <div className="space-y-6">
//           <div className="bg-gray-50 p-4 rounded-lg">
//             <h4 className="text-lg font-semibold text-gray-900 mb-3">작업지시 정보</h4>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               <div>
//                 <div className="text-xs text-gray-500">작업지시번호</div>
//                 <div className="text-sm font-medium text-gray-900">{mesDetail.mesNumber}</div>
//               </div>
//               <div>
//                 <div className="text-xs text-gray-500">제품명</div>
//                 <div className="text-sm font-medium text-gray-900">{mesDetail.productName}</div>
//               </div>
//               <div>
//                 <div className="text-xs text-gray-500">수량</div>
//                 <div className="text-sm font-medium text-gray-900">
//                   {mesDetail.quantity} {mesDetail.uomName}
//                 </div>
//               </div>
//               <div>
//                 <div className="text-xs text-gray-500">진행률</div>
//                 <div className="text-sm font-medium text-blue-600">
//                   {mesDetail.progressPercent}%
//                 </div>
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-4 mt-4">
//               <div>
//                 <div className="text-xs text-gray-500">시작일</div>
//                 <div className="text-sm font-medium text-gray-900">{mesDetail.plan.startDate}</div>
//               </div>
//               <div>
//                 <div className="text-xs text-gray-500">완료 예정일</div>
//                 <div className="text-sm font-medium text-gray-900">{mesDetail.plan.dueDate}</div>
//               </div>
//             </div>
//           </div>

//           <div>
//             <h4 className="text-lg font-semibold text-gray-900 mb-3">공정별 상세 현황</h4>
//             <div className="space-y-3">
//               {mesDetail.operations.map((operation) => (
//                 <div
//                   key={operation.operationNumber}
//                   className="border border-gray-200 rounded-lg p-4"
//                 >
//                   <div className="flex items-center justify-between mb-2">
//                     <div className="flex items-center gap-3">
//                       <i className={`${getProcessStatusIcon(operation.statusCode)} text-lg`}></i>
//                       <div>
//                         <div className="text-sm font-medium text-gray-900">
//                           {operation.operationNumber} - {operation.operationName}
//                         </div>
//                         <div className="text-xs text-gray-500">공정 {operation.sequence}</div>
//                       </div>
//                     </div>
//                     {getStatusBadge(operation.statusCode)}
//                   </div>

//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
//                     <div>
//                       <div className="text-xs text-gray-500">시작시간</div>
//                       <div className="text-sm text-gray-900">{operation.startedAt || '-'}</div>
//                     </div>
//                     <div>
//                       <div className="text-xs text-gray-500">종료시간</div>
//                       <div className="text-sm text-gray-900">{operation.finishedAt || '-'}</div>
//                     </div>
//                     <div>
//                       <div className="text-xs text-gray-500">소요시간</div>
//                       <div className="text-sm text-gray-900">
//                         {formatDuration(operation.durationHours)}
//                       </div>
//                     </div>
//                     <div>
//                       <div className="text-xs text-gray-500">담당자</div>
//                       <div className="text-sm text-gray-900">{operation.manager?.name || '-'}</div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
import React, { useState, useEffect, useCallback } from 'react';
import { useMemo } from 'react';

interface MesOperationManagerData {
  id: number;
  name: string;
}

interface MesOperationData {
  operationNumber: string;
  operationName: string;
  sequence: number;
  statusCode: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD';
  startedAt: string | null;
  finishedAt: string | null;
  durationHours: number;
  manager: MesOperationManagerData | null;
}

interface MesPlanData {
  startDate: string;
  dueDate: string;
}

interface MesDetailResponse {
  mesId: string;
  mesNumber: string;
  productId: string;
  productName: string;
  quantity: number;
  uomName: string;
  progressPercent: number;
  statusCode: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD';
  plan: MesPlanData;
  currentOperation: string | null;
  operations: MesOperationData[];
}

const initialMockMesDetail: MesDetailResponse = {
  mesId: 'MES-20231018-001',
  mesNumber: 'P001845',
  productId: 'PROD-A',
  productName: '초고속 반도체 칩 A1',
  quantity: 5000,
  uomName: 'EA',
  progressPercent: 0,
  statusCode: 'PLANNED',
  plan: {
    startDate: '2023-10-18',
    dueDate: '2023-10-25',
  },
  currentOperation: null,
  operations: [
    {
      operationNumber: 'OP-01',
      operationName: '원재료 투입',
      sequence: 1,
      statusCode: 'PLANNED',
      startedAt: null,
      finishedAt: null,
      durationHours: 0,
      manager: { id: 1, name: '김철수' },
    },
    {
      operationNumber: 'OP-02',
      operationName: '정밀 가공',
      sequence: 2,
      statusCode: 'PLANNED',
      startedAt: null,
      finishedAt: null,
      durationHours: 0,
      manager: { id: 2, name: '이영희' },
    },
    {
      operationNumber: 'OP-03',
      operationName: '품질 검사 및 포장',
      sequence: 3,
      statusCode: 'PLANNED',
      startedAt: null,
      finishedAt: null,
      durationHours: 0,
      manager: { id: 3, name: '박민준' },
    },
  ],
};

// --- API SIMULATION (Replaces Network Calls) ---

// Utility function to simulate API latency
const mockApiDelay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

// This hook replaces useQuery and provides state management
const useMesDetailQuery = (mesId: string) => {
  const [mesDetail, setMesDetail] = useState<MesDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        await mockApiDelay(1000); // Simulate network fetch time
        // Deep copy the initial data to ensure immutability
        setMesDetail(JSON.parse(JSON.stringify(initialMockMesDetail)));
      } catch (e) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    if (mesId) {
      fetchDetail();
    }
  }, [mesId]);

  return { mesDetail, setMesDetail, isLoading, isError };
};

// --- UI Component (Modified ProcessDetailModal to become App) ---

export default function App() {
  const mesId = 'MES-DEMO-001'; // Fixed ID for demo
  const { mesDetail, setMesDetail, isLoading, isError } = useMesDetailQuery(mesId);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Helper to format time for display
  const formatDuration = (hours: number): string => {
    if (hours === 0) return '-';
    if (hours < 1) {
      return `${Math.round(hours * 60)}분`;
    }
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    return minutes > 0 ? `${wholeHours}시간 ${minutes}분` : `${wholeHours}시간`;
  };

  // Helper for status badge styling
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

  // Helper for status icon
  const getProcessStatusIcon = (statusCode: string) => {
    const icons: Record<string, string> = {
      COMPLETED: 'ri-checkbox-circle-fill text-green-600',
      IN_PROGRESS: 'ri-play-circle-fill text-blue-600',
      PLANNED: 'ri-time-line text-gray-400',
      ON_HOLD: 'ri-pause-circle-fill text-red-500',
    };
    return icons[statusCode] || 'ri-time-line text-gray-400';
  };

  // --- Core State and Logic Functions ---

  const allOperationsCompleted = useMemo(() => {
    if (!mesDetail) return false;
    return mesDetail.operations.every((op) => op.statusCode === 'COMPLETED');
  }, [mesDetail]);

  const canStartMes = useMemo(() => {
    return mesDetail?.statusCode === 'PLANNED';
  }, [mesDetail]);

  const canCompleteMes = useMemo(() => {
    return mesDetail?.statusCode === 'IN_PROGRESS' && allOperationsCompleted;
  }, [mesDetail, allOperationsCompleted]);

  const getOperationButtonState = useCallback(
    (
      operation: MesOperationData,
      index: number,
    ): {
      canStart: boolean;
      canComplete: boolean;
    } => {
      if (!mesDetail || mesDetail.statusCode !== 'IN_PROGRESS') {
        return { canStart: false, canComplete: false };
      }

      const previousOperation = mesDetail.operations[index - 1];
      const isReadyToStart = index === 0 || previousOperation?.statusCode === 'COMPLETED';

      return {
        canStart: operation.statusCode === 'PLANNED' && isReadyToStart,
        canComplete: operation.statusCode === 'IN_PROGRESS',
      };
    },
    [mesDetail],
  );

  // --- Action Handlers (Simulating API Calls) ---

  const updateMesState = useCallback(
    async (updateFn: (draft: MesDetailResponse) => void) => {
      if (!mesDetail) return;
      setIsProcessing(true);
      setMessage(null);
      try {
        await mockApiDelay(500);
        const newDetail = JSON.parse(JSON.stringify(mesDetail)) as MesDetailResponse;
        updateFn(newDetail);
        // Recalculate progress
        const completedCount = newDetail.operations.filter(
          (op) => op.statusCode === 'COMPLETED',
        ).length;
        newDetail.progressPercent = Math.round(
          (completedCount / newDetail.operations.length) * 100,
        );
        setMesDetail(newDetail);
        setMessage({ type: 'success', text: '작업 상태가 성공적으로 업데이트되었습니다.' });
      } catch (error) {
        setMessage({ type: 'error', text: '상태 업데이트 중 오류가 발생했습니다.' });
      } finally {
        setIsProcessing(false);
      }
    },
    [mesDetail, setMesDetail],
  );

  // MES 시작
  const handleStartMes = () =>
    updateMesState((draft) => {
      if (draft.statusCode === 'PLANNED') {
        draft.statusCode = 'IN_PROGRESS';
        // Automatically start the first operation if planned
        if (draft.operations.length > 0) {
          draft.currentOperation = draft.operations[0].operationNumber;
        }
      }
    });

  // MES 완료
  const handleCompleteMes = () =>
    updateMesState((draft) => {
      if (draft.statusCode === 'IN_PROGRESS' && allOperationsCompleted) {
        draft.statusCode = 'COMPLETED';
        draft.progressPercent = 100;
        draft.currentOperation = null;
      }
    });

  // 공정 시작
  const handleStartOperation = (opNumber: string, index: number) =>
    updateMesState((draft) => {
      const op = draft.operations.find((o) => o.operationNumber === opNumber);
      if (op && op.statusCode === 'PLANNED') {
        const { canStart } = getOperationButtonState(op, index);
        if (canStart) {
          op.statusCode = 'IN_PROGRESS';
          op.startedAt =
            new Date().toISOString().split('T')[0] +
            ' ' +
            new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
          op.durationHours = 0.5; // Mock duration
          draft.currentOperation = opNumber;
        }
      }
    });

  // 공정 완료
  const handleCompleteOperation = (opNumber: string) =>
    updateMesState((draft) => {
      const op = draft.operations.find((o) => o.operationNumber === opNumber);
      if (op && op.statusCode === 'IN_PROGRESS') {
        op.statusCode = 'COMPLETED';
        op.finishedAt =
          new Date().toISOString().split('T')[0] +
          ' ' +
          new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
        draft.currentOperation = null; // Clear current operation, next one will activate on re-render

        // Calculate progress after completion
        const completedCount = draft.operations.filter((o) => o.statusCode === 'COMPLETED').length;
        draft.progressPercent = Math.round((completedCount / draft.operations.length) * 100);

        // If all are completed, allow MES to complete
        if (completedCount === draft.operations.length) {
          // MES completion check happens in canCompleteMes
        }
      }
    });

  // --- Rendering Logic ---

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <i className="ri-loader-4-line animate-spin text-3xl text-gray-400"></i>
        <p className="mt-3 text-gray-500">로딩 중...</p>
      </div>
    );
  }

  if (isError || !mesDetail) {
    return (
      <div className="text-center py-12">
        <i className="ri-error-warning-line text-3xl text-red-400"></i>
        <p className="mt-3 text-red-500">데이터를 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl border border-gray-100">
      <div className="p-6 md:p-8 space-y-6">
        {/* Global Status Message */}
        {message && (
          <div
            className={`p-4 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
          >
            <i
              className={`mr-2 ${message.type === 'success' ? 'ri-check-line' : 'ri-close-circle-line'}`}
            ></i>
            {message.text}
          </div>
        )}

        {/* Global MES Control and Info */}
        <div className="bg-white p-6 rounded-xl border border-blue-200 shadow-md space-y-4">
          <div className="flex justify-between items-start flex-col sm:flex-row sm:items-center">
            <h4 className="text-xl font-bold text-gray-900 mb-2 sm:mb-0">
              작업지시: {mesDetail.mesNumber}
            </h4>
            {getStatusBadge(mesDetail.statusCode)}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t pt-4">
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
              <div className="text-sm font-bold text-blue-600">{mesDetail.progressPercent}%</div>
            </div>
            <div className="flex justify-end items-center space-x-3">
              <button
                onClick={handleStartMes}
                disabled={!canStartMes || isProcessing}
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:bg-gray-300 transition duration-150"
                title={
                  canStartMes ? '전체 MES 작업을 시작합니다.' : '이미 시작했거나 완료된 작업입니다.'
                }
              >
                <i className="ri-play-fill mr-1"></i>
                MES 시작
              </button>
              <button
                onClick={handleCompleteMes}
                disabled={!canCompleteMes || isProcessing}
                className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 disabled:bg-gray-300 transition duration-150"
                title={
                  canCompleteMes
                    ? '모든 공정이 완료되어 MES를 종료합니다.'
                    : '모든 공정이 완료되어야 종료할 수 있습니다.'
                }
              >
                <i className="ri-check-line mr-1"></i>
                MES 완료
              </button>
            </div>
          </div>
        </div>

        {/* Process Detail Section */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">공정별 상세 현황 및 제어</h4>
          <div className="space-y-4">
            {mesDetail.operations.map((operation, index) => {
              const { canStart, canComplete } = getOperationButtonState(operation, index);

              return (
                <div
                  key={operation.operationNumber}
                  className={`border rounded-lg p-5 transition-all duration-300 
                                ${operation.statusCode === 'COMPLETED' ? 'border-green-300 bg-green-50' : ''}
                                ${operation.statusCode === 'IN_PROGRESS' ? 'border-blue-400 bg-blue-50 ring-2 ring-blue-100' : 'border-gray-200 bg-white'}
                                ${canStart ? 'shadow-lg' : 'shadow-sm'}`}
                >
                  <div className="flex items-center justify-between mb-3 border-b pb-3">
                    <div className="flex items-center gap-3">
                      <i className={`${getProcessStatusIcon(operation.statusCode)} text-2xl`}></i>
                      <div>
                        <div className="text-md font-bold text-gray-900">
                          {operation.operationName}
                        </div>
                        <div className="text-xs text-gray-500">공정 순서: {operation.sequence}</div>
                      </div>
                    </div>
                    {getStatusBadge(operation.statusCode)}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                    <div>
                      <div className="text-xs text-gray-500">담당자</div>
                      <div className="text-sm font-medium text-gray-900">
                        {operation.manager?.name || '-'}
                      </div>
                    </div>
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
                  </div>

                  {/* Operation Control Buttons */}
                  <div className="mt-4 pt-4 border-t flex justify-end space-x-3">
                    <button
                      onClick={() => handleStartOperation(operation.operationNumber, index)}
                      disabled={!canStart || isProcessing}
                      className={`px-4 py-2 text-sm font-semibold rounded-lg transition duration-150 
                                ${canStart ? 'bg-yellow-500 text-white hover:bg-yellow-600 shadow-md' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                      title={
                        canStart
                          ? '공정 작업을 시작합니다.'
                          : '이전 공정이 완료되지 않았거나 MES가 시작되지 않았습니다.'
                      }
                    >
                      <i className="ri-play-line mr-1"></i>
                      공정 시작
                    </button>
                    <button
                      onClick={() => handleCompleteOperation(operation.operationNumber)}
                      disabled={!canComplete || isProcessing}
                      className={`px-4 py-2 text-sm font-semibold rounded-lg transition duration-150 
                                ${canComplete ? 'bg-indigo-500 text-white hover:bg-indigo-600 shadow-md' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                      title={canComplete ? '현재 공정을 완료합니다.' : '공정이 진행중이 아닙니다.'}
                    >
                      <i className="ri-check-line mr-1"></i>
                      공정 완료
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
