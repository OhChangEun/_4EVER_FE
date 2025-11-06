'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
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
import { fetchMesList, fetchMrpQuotationsDropdown } from '../../api/production.api';
import { useModal } from '@/app/components/common/modal/useModal';
import ProcessDetailModal from '../modals/ProcessDetailModal';
import { useDropdown } from '@/app/hooks/useDropdown';
import Pagination from '@/app/components/common/Pagination';
import IconButton from '@/app/components/common/IconButton';

export default function MesTab() {
  const [selectedMesQuote, setSelectedMesQuote] = useState('');
  const [selectedMesStatus, setSelectedMesStatus] = useState<MesStatusCode>('ALL');

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { openModal } = useModal();
  // mrp 순소요 - 견적 드롭다운
  const { options: mrpQuotationOptions } = useDropdown(
    'mrpQuotationsDropdown',
    fetchMrpQuotationsDropdown,
  );

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const currentStepRef = useRef<HTMLDivElement>(null);

  // 쿼리 파라미터 객체 생성
  const queryParams = useMemo(
    () => ({
      quotationId: selectedMesQuote,
      status: selectedMesStatus,
      page: currentPage - 1,
      size: pageSize,
    }),
    [selectedMesQuote, selectedMesStatus, currentPage],
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
  const pageInfo = mesResponse?.page;

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; class: string }> = {
      PLANNED: { label: '대기', class: 'bg-gray-100 text-gray-600' },
      IN_PROGRESS: { label: '진행중', class: 'bg-blue-100 text-blue-800' },
      COMPLETED: { label: '완료', class: 'bg-green-100 text-green-800' },
      ON_HOLD: { label: '보류', class: 'bg-yellow-100 text-yellow-800' },
    };
    const config = statusConfig[status] || { label: status, class: 'bg-gray-100 text-gray-600' };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.class}`}>
        {config.label}
      </span>
    );
  };

  const handleShowProcessDetail = (mesId: string) => {
    openModal(ProcessDetailModal, { title: 'MES 현황', mesId: mesId });
  };

  // 공정 상태 아이콘 및 크기 결정
  const getOperationStatus = (
    operationIndex: number,
    currentOperationNumber: number,
    status: string,
  ) => {
    // PLANNED 상태면 모두 회색
    if (status === 'PENDINGs') {
      return {
        icon: 'ri-circle-fill',
        class: 'text-gray-300',
        size: 'text-xs',
        lineClass: 'bg-gray-300',
      };
    }

    const operationNum = operationIndex + 1; // 1-based index

    // 현재 진행 중인 공정
    if (operationNum === currentOperationNumber) {
      return {
        icon: 'ri-circle-fill',
        class: 'text-blue-600',
        size: 'text-[14px]', // 현재 공정: 큰 크기
        lineClass: 'bg-blue-500',
      };
    }

    // 완료된 공정 (현재보다 이전)
    if (operationNum < currentOperationNumber) {
      return {
        icon: 'ri-circle-fill',
        class: 'text-blue-600',
        size: 'text-[10px]', // 완료된 공정: 작은 크기
        lineClass: 'bg-blue-500',
      };
    }

    // 아직 진행되지 않은 공정
    return {
      icon: 'ri-circle-fill',
      class: 'text-gray-300',
      size: 'text-[10px]',
      lineClass: 'bg-gray-300',
    };
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    const currentStep = currentStepRef.current;

    if (container && currentStep) {
      const containerHeight = container.clientHeight;
      const currentStepTop = currentStep.offsetTop - container.offsetTop; // 현재 공정의 상대적 위치
      const currentStepHeight = currentStep.clientHeight;

      // 중앙 정렬: (현재 공정의 중심) - (컨테이너의 절반)
      const scrollPosition = currentStepTop - containerHeight / 2 + currentStepHeight / 2;

      container.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [mesListData]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">제조실행시스템 (MES) 현황 🏭</h2>
        <div className="flex gap-3 justify-end">
          <Dropdown
            placeholder="견적 선택"
            items={mrpQuotationOptions}
            value={selectedMesQuote}
            onChange={(quote: string) => {
              setSelectedMesQuote(quote);
              setCurrentPage(1);
            }}
            autoSelectFirst
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
              mesListData.map((order) => {
                const currentOpNum = order.currentOperation || 0;

                return (
                  <div
                    key={order.mesId}
                    className="bg-white border border-gray-200/80 rounded-xl p-4 transition duration-200"
                  >
                    <div className="min-w-[180px] flex justify-between gap-8">
                      {/* 상단: MES 번호, 제품 정보 및 상태 */}
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center ">
                          {getStatusBadge(order.status)}
                          <IconButton
                            label="공정 상세 보기"
                            icon="ri-search-line"
                            size="sm"
                            variant="ghost"
                            onClick={() => handleShowProcessDetail(order.mesId)}
                          />
                        </div>

                        <div className="text-[22px] font-black text-blue-600 rounded-xl">
                          {order.quotationNumber}
                        </div>

                        <div>
                          <div className="pl-0.5 text-xs text-gray-400">MES 목록</div>
                          <div className="text-lg font-semibold text-blue-600 rounded-xl">
                            {order.productName} {order.quantity}
                            {order.uomName}
                          </div>
                        </div>

                        <div>
                          <div className="pl-0.5 text-[13px] text-gray-400">기간</div>
                          <div className="items-center gap-1 text-[15px] font-semibold text-blue-600">
                            <div>
                              {order.startDate} ~ {order.endDate}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 rounded-xl bg-gray-100 p-4">
                        <div className="flex items-center h-full">
                          {/* 공정 순서 (세로 방향) */}
                          <div
                            ref={scrollContainerRef}
                            className="flex flex-col gap-2 overflow-y-auto custom-scroll max-h-32 px-2 pr-3"
                          >
                            {order.sequence.map((operation, index) => {
                              const status = getOperationStatus(index, currentOpNum, order.status);
                              const isLast = index === order.sequence.length - 1;

                              // 다음 공정의 라인 색상 결정
                              const nextStatus =
                                !isLast &&
                                getOperationStatus(index + 1, currentOpNum, order.status);

                              return (
                                <div
                                  key={index}
                                  className="flex w-[76px] items-start gap-2"
                                  ref={index + 1 === currentOpNum ? currentStepRef : null} // 현재 공정에만 ref
                                >
                                  {/* 아이콘 + 라인 */}
                                  <div className="relative flex flex-col items-center justify-start min-w-[16px]">
                                    <i
                                      className={`${status.icon} ${status.class} ${status.size} z-10`}
                                    ></i>

                                    {/* 세로 라인: 아이콘 관통 */}
                                    {!isLast && nextStatus && (
                                      <div
                                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 w-0.5 h-7 z-0 ${nextStatus.lineClass}`}
                                      ></div>
                                    )}
                                  </div>
                                  {/* 공정명 */}
                                  <div className="flex-1 -mt-1">
                                    <span
                                      className={`text-xs ${
                                        index + 1 === currentOpNum
                                          ? 'text-blue-600 font-bold'
                                          : index + 1 < currentOpNum && order.status !== 'PENDINGS'
                                            ? 'text-blue-600 font-medium'
                                            : 'text-gray-400'
                                      }`}
                                    >
                                      {operation}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* 진행률 바 */}
                          <div className="flex-1 ml-10 p-2 pb-8">
                            <div>
                              <div className="flex items-center justify-end mb-2">
                                <span className="text-lg font-bold text-blue-600">
                                  {order.progressRate}%
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-md h-12 overflow-hidden shadow-inner">
                                <div
                                  className="bg-gradient-to-r from-blue-400 to-blue-600 h-12 rounded-sm transition-all duration-700 ease-out flex items-center justify-end"
                                  style={{ width: `${order.progressRate}` }}
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
                    </div>
                  </div>
                );
              })
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

      {isError || isLoading ? null : (
        <Pagination
          currentPage={currentPage}
          totalPages={pageInfo?.totalPages ?? 1}
          totalElements={pageInfo?.totalElements}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
}
