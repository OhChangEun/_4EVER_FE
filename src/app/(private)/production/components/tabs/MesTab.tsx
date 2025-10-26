'use client';

import { useState, useMemo } from 'react';
import {
  FetchMesListParams,
  MesListResponse,
} from '@/app/(private)/production/types/MesListApiType';
import ProcessDetailModal from '@/app/(private)/production/components/modals/ProcessDetailModal';
import Dropdown from '@/app/components/common/Dropdown';
import {
  MES_STATUS_OPTIONS,
  MES_QUOTE_OPTIONS,
  MesStatusCode,
} from '@/app/(private)/production/constants';
import { useQuery } from '@tanstack/react-query';
import { fetchMesList } from '../../api/production.api';

export default function MesTab() {
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [selectedMesId, setSelectedMesId] = useState<string>();
  const [selectedMesStatus, setSelectedMesStatus] = useState<MesStatusCode>('ALL');
  const [selectedMesQuote, setSelectedMesQuote] = useState<string>('ALL');

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
    queryKey: ['mes', queryParams],
    queryFn: ({ queryKey }) => fetchMesList(queryKey[1] as FetchMesListParams),
    staleTime: 1000,
  });

  // content 배열만 추출
  const mesListData = mesResponse?.content || [];

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

  const handleShowProcessDetail = (order: string) => {
    setSelectedMesId(order);
    setShowProcessModal(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">제조실행시스템 (MES)</h2>
          <div className="flex gap-4 justify-end">
            <Dropdown
              items={MES_QUOTE_OPTIONS}
              value={selectedMesQuote}
              onChange={(quote: string) => {
                setSelectedMesQuote(quote);
              }}
            />
            <Dropdown
              items={MES_STATUS_OPTIONS}
              value={selectedMesStatus}
              onChange={(status: MesStatusCode) => {
                setSelectedMesStatus(status);
              }}
            />
          </div>
        </div>
      </div>

      <div className="p-6">
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">
            <i className="ri-loader-4-line animate-spin text-2xl"></i>
            <p className="mt-2">로딩 중...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-8 text-red-500">
            <i className="ri-error-warning-line text-2xl"></i>
            <p className="mt-2">데이터를 불러오는데 실패했습니다.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {mesListData && mesListData.length > 0 ? (
              mesListData.map((order) => (
                <div
                  key={order.mesId}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.mesNumber}</div>
                      <div className="text-xs text-gray-500">
                        {order.productName} ({order.quantity}
                        {order.uomName})
                      </div>
                      <div className="text-xs text-blue-600 mt-1">
                        견적: {order.quotationNumber}
                      </div>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <div className="text-xs text-gray-500">현재 공정</div>
                      <div className="text-sm font-medium text-gray-900">
                        {order.currentOperation}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">시작일</div>
                      <div className="text-sm text-gray-900">{order.startDate}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">완료 예정일</div>
                      <div className="text-sm text-gray-900">{order.endDate}</div>
                    </div>
                  </div>

                  {order.status === 'IN_PROGRESS' && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">진행률</span>
                        <span className="text-xs font-medium text-gray-900">
                          {order.progressRate}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${order.progressRate}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="mb-3">
                    <div className="text-xs text-gray-500 mb-2">공정 현황</div>
                    <div className="flex items-center gap-2 overflow-x-auto">
                      {order.sequence.map((operation, index) => (
                        <div key={operation} className="flex items-center gap-1 whitespace-nowrap">
                          <i
                            className={`${order.currentOperation === operation ? 'ri-play-circle-fill text-blue-600' : 'ri-time-line text-gray-400'} text-sm`}
                          ></i>
                          <span
                            className={`text-xs ${
                              order.currentOperation === operation
                                ? 'text-blue-600'
                                : 'text-gray-500'
                            }`}
                          >
                            {operation}
                          </span>
                          {index < order.sequence.length - 1 && (
                            <i className="ri-arrow-right-line text-xs text-gray-300 mx-1"></i>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleShowProcessDetail(order.mesId)}
                      className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer"
                    >
                      <i className="ri-eye-line mr-1"></i>공정상세
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                선택한 조건에 해당하는 작업지시가 없습니다.
              </div>
            )}
          </div>
        )}
      </div>

      {/* 공정 상세 모달 */}
      {showProcessModal && selectedMesId && (
        <ProcessDetailModal mesId={selectedMesId} onClose={() => setShowProcessModal(false)} />
      )}
    </div>
  );
}
