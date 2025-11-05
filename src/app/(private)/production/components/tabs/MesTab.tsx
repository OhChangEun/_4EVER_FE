'use client';

import { useState, useMemo } from 'react';
import {
  FetchMesListParams,
  MesListResponse,
  MesSummaryItem,
} from '@/app/(private)/production/types/MesListApiType';
import Dropdown from '@/app/components/common/Dropdown';
import {
  MES_STATUS_OPTIONS,
  MES_QUOTE_OPTIONS,
  MesStatusCode,
} from '@/app/(private)/production/constants';
import { useQuery } from '@tanstack/react-query';
import { fetchMesList } from '../../api/production.api';
import { useModal } from '@/app/components/common/modal/useModal';
import ProcessDetailModal from '../modals/ProcessDetailModal';
import IconButton from '@/app/components/common/IconButton';

export default function MesTab() {
  const { openModal } = useModal();

  const [selectedMesStatus, setSelectedMesStatus] = useState<MesStatusCode>('ALL');
  const [selectedMesQuote, setSelectedMesQuote] = useState<string>('');

  // 쿼리 파라미터 객체 생성
  const queryParams = useMemo(
    () => ({
      quotationId: selectedMesQuote,
      status: selectedMesStatus,
    }),
    [selectedMesQuote, selectedMesStatus],
  );

  // API 호출 with query parameters
  const {
    data: mesResponse,
    isLoading,
    isError,
  } = useQuery<MesListResponse>({
    queryKey: ['mesList', queryParams],
    queryFn: ({ queryKey }) => fetchMesList(queryKey[1] as FetchMesListParams),
    staleTime: 1000,
  });

  // content 배열만 추출
  const mesListData: MesSummaryItem[] = mesResponse?.content || [];

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; class: string }> = {
      PLANNED: { label: '대기', class: 'bg-yellow-100 text-yellow-800' },
      IN_PROGRESS: { label: '진행중', class: 'bg-blue-100 text-blue-800' },
      COMPLETED: { label: '완료', class: 'bg-green-100 text-green-800' },
      ON_HOLD: { label: '보류', class: 'bg-red-100 text-red-800' },
    };
    const config = statusConfig[status] || { label: status, class: 'bg-gray-100 text-gray-800' };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.class}`}>
        {config.label}
      </span>
    );
  };

  const handleShowProcessDetail = (mesId: string) => {
    openModal(ProcessDetailModal, { title: 'MES 현황', mesId: mesId });
  };

  // 새로운 공정 상태 아이콘을 위한 헬퍼 함수 (진행 중 강조)
  const getOperationStatusIcon = (
    operation: string,
    currentOperation: string,
    isFirst: boolean,
  ) => {
    const isCurrent = currentOperation === operation;

    // 현재 진행 중인 공정은 '시작' 아이콘으로 명확하게 표시
    if (isCurrent) {
      return {
        icon: 'ri-play-circle-fill', // 진행 중
        class: 'text-blue-600 font-bold',
        label: isFirst ? '시작' : '진행중', // 첫 번째 공정은 '시작'으로 표시해도 좋습니다.
      };
    }

    // 현재 공정보다 앞에 있는 공정은 완료된 것으로 간주 (단순화)
    // 실제 로직에 따라 완료/대기를 구분해야 하지만, 여기서는 currentOperation을 기준으로 단순화합니다.
    const isCompleted = mesListData.some(
      (item) =>
        item.currentOperation === currentOperation &&
        item.sequence.indexOf(operation) < item.sequence.indexOf(currentOperation),
    );

    return {
      icon: isCompleted ? 'ri-check-line' : 'ri-time-line', // 완료 또는 대기
      class: isCompleted ? 'text-green-600' : 'text-gray-400',
      label: isCompleted ? '완료' : '대기',
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">제조실행시스템 (MES) 현황 🏭</h2>
        <div className="flex gap-3 justify-end">
          <Dropdown
            placeholder="전체 견적"
            items={MES_QUOTE_OPTIONS}
            value={selectedMesQuote}
            onChange={(quote: string) => {
              setSelectedMesQuote(quote);
            }}
          />
          <Dropdown
            placeholder="전체 상태"
            items={MES_STATUS_OPTIONS}
            value={selectedMesStatus}
            onChange={(status: MesStatusCode) => {
              setSelectedMesStatus(status);
            }}
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        {isLoading ? (
          <div className="text-center py-12 text-gray-500">
            <i className="ri-loader-4-line animate-spin text-3xl"></i>
            <p className="mt-3 text-lg font-medium">MES 데이터를 로딩 중입니다...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-12 text-red-500">
            <i className="ri-error-warning-line text-3xl"></i>
            <p className="mt-3 text-lg font-medium">데이터를 불러오는데 실패했습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {mesListData && mesListData.length > 0 ? (
              mesListData.map((order) => (
                <div
                  key={order.mesId}
                  className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition duration-200"
                >
                  {/* 상단: MES 번호, 제품 정보 및 상태 */}
                  <div className="flex items-start justify-between mb-3 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="text-lg font-bold text-gray-900">{order.mesNumber}</div>
                        <div className="text-sm text-gray-500 mt-1">
                          {order.productName} ({order.quantity.toLocaleString()} {order.uomName})
                        </div>
                      </div>

                      <div className="text-xs text-blue-600 mt-1">
                        <i className="ri-file-text-line mr-1"></i>견적: {order.quotationNumber}
                      </div>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                  {/* 진행률 바 (진행중일 때만) */}
                  {order.status === 'IN_PROGRESS' && (
                    <div className="mb-4 pt-2 border-t border-dashed border-gray-100">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600 font-medium">진행률</span>
                        <span className="text-sm font-bold text-blue-600">
                          {order.progressRate}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${order.progressRate}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  {/* 공정 순서 (가장 중요한 시각화) */}
                  <div className="mb-4 pt-2 border-t border-dashed border-gray-100">
                    <div className="text-xs text-gray-500 mb-2 font-medium">공정 순서</div>
                    <div className="flex items-center gap-1 overflow-x-auto pb-1 custom-scrollbar">
                      {order.sequence.map((operation, index) => {
                        const status = getOperationStatusIcon(
                          operation,
                          order.currentOperation,
                          index === 0,
                        );
                        return (
                          <div
                            key={operation}
                            className="flex items-center gap-1 whitespace-nowrap"
                          >
                            <i className={`${status.icon} ${status.class} text-md`}></i>
                            <span className={`text-xs ${status.class}`}>{operation}</span>
                            {index < order.sequence.length - 1 && (
                              <i className="ri-arrow-right-line text-sm text-gray-300 mx-1"></i>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex justify-end pt-2 border-t">
                    <IconButton
                      label="공정 상세 보기"
                      icon="ri-search-line"
                      size="sm"
                      variant="ghost"
                      onClick={() => handleShowProcessDetail(order.mesId)}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500 col-span-full">
                <i className="ri-file-list-3-line text-3xl"></i>
                <p className="mt-3 text-lg font-medium">
                  선택한 조건에 해당하는 작업지시가 없습니다.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
