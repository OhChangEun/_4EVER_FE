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
      PLANNED: { label: '대기', class: 'bg-blue-100 text-blue-800' },
      IN_PROGRESS: { label: '진행중', class: 'bg-blue-100 text-blue-800' },
      COMPLETED: { label: '완료', class: 'bg-blue-100 text-blue-800' },
      ON_HOLD: { label: '보류', class: 'bg-blue-100 text-blue-800' },
    };
    const config = statusConfig[status] || { label: status, class: 'bg-blue-100 text-blue-800' };
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

    if (isCurrent) {
      return {
        icon: 'ri-circle-fill',
        class: 'text-blue-600 font-bold',
        label: isFirst ? '시작' : '진행중',
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
                  className="bg-white border border-gray-200/80 rounded-xl p-4 transition duration-200"
                >
                  <div className="flex justify-between gap-8">
                    {/* 상단: MES 번호, 제품 정보 및 상태 */}
                    <div className="flex items-start justify-between ml-1">
                      <div className="min-w-[180px] space-y-3">
                        {getStatusBadge(order.status)}

                        {/* <div className="text-sm text-gray-500 mt-1">
                        {order.productName} ({order.quantity.toLocaleString()} {order.uomName})
                      </div> */}
                        <div className="text-[20px] font-extrabold text-blue-600 rounded-xl mt-3">
                          {/* <i className="ri-file-text-line mr-1"></i>견적: {order.quotationNumber} */}
                          {order.quotationNumber}
                        </div>

                        <div>
                          <div className="pl-0.5 text-sm text-gray-400">MES 목록</div>
                          <div className="text-[18px] font-bold text-blue-600 rounded-xl">
                            {order.productName} {order.quantity}
                            {order.uomName}
                            {/* <i className="ri-file-text-line mr-1"></i>견적: {order.quotationNumber} */}
                          </div>
                        </div>

                        <div>
                          <div className="pl-0.5 text-sm text-gray-400">기간</div>
                          <div className="items-center gap-1 text-[15px] font-bold text-blue-600">
                            <div>
                              {order.startDate} ~ {order.endDate}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 공정 순서 (세로 방향) */}
                    <div className="flex-1 rounded-xl bg-gray-100 p-4">
                      <div className="flex items-center">
                        <div className="mb-3 pt-2 border-gray-100">
                          <div className="ml-2 text-sm text-gray-300 mb-3 font-medium">
                            공정 순서
                          </div>

                          <div className="flex flex-col gap-2 overflow-y-auto max-h-96 custom-scrollbar">
                            {order.sequence.map((operation, index) => {
                              const status = getOperationStatusIcon(
                                operation,
                                order.currentOperation,
                                index === 0,
                              );
                              const isLast = index === order.sequence.length - 1;

                              // 진행 중 or 완료된 공정인가?
                              const isActive = status.label === '진행중' || status.label === '완료';

                              // 다음 단계 선 색상도 파란색으로
                              const nextIsActive =
                                index < order.sequence.length - 1 &&
                                (() => {
                                  const nextOp = order.sequence[index + 1];
                                  const nextStatus = getOperationStatusIcon(
                                    nextOp,
                                    order.currentOperation,
                                    false,
                                  );
                                  return (
                                    nextStatus.label === '진행중' || nextStatus.label === '완료'
                                  );
                                })();

                              return (
                                <div key={operation} className="flex w-[76px] items-start gap-2">
                                  {/* 아이콘 + 라인 */}
                                  <div className="relative flex flex-col items-center">
                                    <i
                                      className={`${status.icon} ${
                                        isActive ? 'text-blue-600' : 'text-gray-300'
                                      } text-sm z-10`}
                                    ></i>

                                    {/* 세로 라인: 아이콘 관통 */}
                                    {!isLast && (
                                      <div
                                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 w-0.5 h-10 z-0 ${
                                          nextIsActive ? 'bg-blue-500' : 'bg-gray-300'
                                        }`}
                                      ></div>
                                    )}
                                  </div>

                                  {/* 공정명 */}
                                  <div className="flex-1 pt-0.5">
                                    <span
                                      className={`text-xs ${
                                        isActive ? 'text-blue-600 font-medium' : 'text-gray-400'
                                      }`}
                                    >
                                      {operation}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* 진행률 바 */}
                        <div className="flex-1 ml-10 p-2 pb-6">
                          <div className="flex items-center justify-end mb-2">
                            <span className="text-lg font-bold text-blue-600">
                              {/* {order.progressRate}% */}
                              34%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-md h-12 overflow-hidden shadow-inner">
                            <div
                              className="bg-gradient-to-r from-blue-400 to-blue-600 h-12 rounded-sm transition-all duration-700 ease-out flex items-center justify-end px-3"
                              // style={{ width: `${order.progressRate}%` }}
                              style={{ width: `${27}%` }}
                            >
                              {order.progressRate > 10 && (
                                <span className="text-xs font-semibold text-white">
                                  {order.progressRate}%
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="flex justify-end pt-2">
                    <IconButton
                      label="공정 상세 보기"
                      icon="ri-search-line"
                      size="sm"
                      variant="ghost"
                      onClick={() => handleShowProcessDetail(order.mesId)}
                    />
                  </div> */}
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
