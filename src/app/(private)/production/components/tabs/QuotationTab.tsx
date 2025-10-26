'use client';
import Dropdown from '@/app/components/common/Dropdown';
import { useState, useMemo } from 'react'; // useMemo 추가
import {
  AVAILABLE_STOCK_STATUS,
  AvailableStockStatus,
  QUOTATIONS_STATUS,
  QuotationStatus,
} from '@/app/(private)/production/constants';
import IconButton from '@/app/components/common/IconButton';
import {
  QuotationData,
  FetchQuotationParams,
  QuotationListResponse,
} from '@/app/(private)/production/types/QuotationApiType';
import SimulationResultModal from '@/app/(private)/production/components/modals/SimulationResultModal';
import MpsPreviewModal from '@/app/(private)/production/components/modals/MpsPreviewModal';
import {
  fetchQuotationSimulationResult,
  fetchQuotationList, // API 함수 추가
} from '@/app/(private)/production/api/production.api';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  FetchQuotationSimulationParams,
  QuotationSimulationResponse,
} from '@/app/(private)/production/types/QuotationSimulationApiType';
import { QuotationPreviewResponse } from '@/app/(private)/production/types/QuotationPreviewApiType'; // 타입은 여전히 필요
import Pagination from '@/app/components/common/Pagination';
import DateRangePicker from '@/app/components/common/DateRangePicker';

export default function QuotationTab() {
  // 모달 open 여부
  const [showSimulationModal, setShowSimulationModal] = useState(false);
  const [showMpsPreviewModal, setShowMpsPreviewModal] = useState(false);
  // 필터링 상태(날짜, 가용재고 상태, 견적 상태)
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedStockStatus, setSelectedStockStatus] = useState<AvailableStockStatus>('ALL');
  const [selectedQuotationsStatus, setSelectedQuotationsStatus] = useState<QuotationStatus>('ALL');

  // 선택된 견적
  const [selectedQuotes, setSelectedQuotes] = useState<string[]>([]);
  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  // MPS 프리뷰 결과를 저장할 state
  const [mpsPreviewData, setMpsPreviewData] = useState<QuotationPreviewResponse>();
  // 시뮬레이션 응답 저장
  const [simulationResponse, setSimulationResponse] = useState<QuotationSimulationResponse | null>(
    null,
  );

  // --- API 호출 및 상태 관리 ---

  // 1. 견적 리스트를 가져오는 useQuery
  const quotationListQueryParams: FetchQuotationParams = useMemo(
    () => ({
      page: currentPage - 1, // API는 0-based
      size: pageSize,
      stockStatusCode: selectedStockStatus, // 가용재고 상태
      statusCode: selectedQuotationsStatus, // 견적 상태
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    }),
    [currentPage, pageSize, startDate, endDate, selectedStockStatus, selectedQuotationsStatus],
  );

  const {
    data: quotationListData,
    isLoading: isQuotationListLoading,
    isError: isQuotationListError,
  } = useQuery<QuotationListResponse>({
    queryKey: ['quotationList', quotationListQueryParams], // 쿼리 키에 파라미터를 넣어 파라미터 변경 시 재요청
    queryFn: () => fetchQuotationList(quotationListQueryParams),
    staleTime: 1000,
  });

  // API에서 가져온 견적 데이터 리스트
  const quotationDataList: QuotationData[] = quotationListData?.content || [];
  const totalPages = quotationListData?.page?.totalPages || 1;
  const totalElements = quotationListData?.page?.totalElements || 0;

  // 2. 시뮬레이션 쿼리
  const simulationMutation = useMutation({
    mutationFn: (params: FetchQuotationSimulationParams) => fetchQuotationSimulationResult(params),
    onSuccess: (data) => {
      setSimulationResponse(data);
      setShowSimulationModal(true);
    },
    onError: (error) => {
      console.error('시뮬레이션 실패:', error);
      alert('시뮬레이션 결과를 가져오는데 실패했습니다.');
    },
  });

  const handleQuoteSelect = (quotationNumber: string) => {
    setSelectedQuotes((prev) =>
      prev.includes(quotationNumber)
        ? prev.filter((id) => id !== quotationNumber)
        : [...prev, quotationNumber],
    );
  };

  // --- 이벤트 핸들러 ---
  const handleSimulation = () => {
    if (selectedQuotes.length === 0) {
      alert('시뮬레이션을 실행할 견적을 선택해주세요');
      return;
    }
    // API 데이터에서 선택된 견적 중 'NOT_CHECKED'인지 확인
    const unCheckedQuotes = selectedQuotes.filter((quotationNumber) => {
      const quote = quotationDataList.find((q) => q.quotationNumber === quotationNumber);
      return quote && quote.stockStatusCode === 'UNCHECKED';
    });

    if (unCheckedQuotes.length === 0) {
      alert("가용 재고가 '미확인'인 견적을 선택해주세요.");
      return;
    }

    // Mutation 실행
    simulationMutation.mutate({
      quotationIds: selectedQuotes,
      page: currentPage - 1, // 0-based 인덱스
      size: pageSize,
      // 날짜 필터링 상태가 있다면 여기에 추가
    });
  };

  const handleStartDateChange = (value: string) => {
    setStartDate(value);
    setCurrentPage(1);
  };
  const handleEndDateChange = (value: string) => {
    setEndDate(value);
    setCurrentPage(1);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // useQuery가 currentPage 변경을 감지하고 자동으로 데이터를 다시 불러옴
  };

  const handleConfirmProposedDelivery = (previewData: QuotationPreviewResponse) => {
    setShowSimulationModal(false);
    setMpsPreviewData(previewData);
    setShowMpsPreviewModal(true);
  };

  const handleConfirmMps = () => {
    setShowMpsPreviewModal(false);
    alert('MRP 실행이 시작되었습니다. MRP 탭에서 결과를 확인하세요.');
  };

  // --- 렌더링 ---
  if (isQuotationListLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm flex justify-center items-center h-64">
        <div className="text-lg font-semibold text-gray-900">견적 리스트를 불러오는 중...</div>
      </div>
    );
  }

  if (isQuotationListError) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm flex justify-center items-center h-64">
        <div className="text-lg font-semibold text-red-600">
          견적 리스트를 불러오는데 실패했습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 space-y-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">견적 관리</h3>
        <div className="flex items-center">
          <div className="flex gap-3 pr-5">
            <Dropdown
              items={AVAILABLE_STOCK_STATUS}
              value={selectedStockStatus}
              onChange={(status: AvailableStockStatus) => {
                setSelectedStockStatus(status);
                setCurrentPage(1); // 필터 변경 시 첫 페이지로
              }}
            />
            <Dropdown
              items={QUOTATIONS_STATUS}
              value={selectedQuotationsStatus}
              onChange={(status: QuotationStatus) => {
                setSelectedQuotationsStatus(status);
                setCurrentPage(1); // 필터 변경 시 첫 페이지로
              }}
            />
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={handleStartDateChange}
              onEndDateChange={handleEndDateChange}
            />
          </div>
          <IconButton
            label={simulationMutation.isPending ? '시뮬레이션 중...' : '시뮬레이션 실행'}
            icon={simulationMutation.isPending ? 'ri-loader-4-line animate-spin' : 'ri-play-line'}
            onClick={handleSimulation}
            disabled={selectedQuotes.length === 0 || simulationMutation.isPending}
          />
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-12 px-4 py-3">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedQuotes(quotationDataList.map((q) => q.quotationNumber));
                      } else {
                        setSelectedQuotes([]);
                      }
                    }}
                    // 현재 페이지 데이터만 모두 선택했는지 확인
                    checked={
                      quotationDataList.length > 0 &&
                      quotationDataList.every((q) => selectedQuotes.includes(q.quotationNumber))
                    }
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  견적 번호
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  고객사
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  제품
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  요청 수량
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  요청 납기
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  가용 재고
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  제안 납기
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* API 데이터로 렌더링 */}
              {quotationDataList.map((quote) => (
                <tr key={quote.quotationNumber} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedQuotes.includes(quote.quotationNumber)}
                      onChange={() => handleQuoteSelect(quote.quotationNumber)}
                    />
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {quote.quotationNumber}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{quote.customerCompanyName}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{quote.product}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {/* 숫자로 변환 후 포맷팅이 필요할 수 있으나, 현재는 string 타입 그대로 사용 */}
                    {quote.requestQuantity}EA
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{quote.requestDate}</td>
                  <td className="px-4 py-3">{quote.stockStatusCode}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {quote.suggestedDueDate || '-'}
                  </td>
                  <td className="px-4 py-3">{quote.statusCode}</td>
                </tr>
              ))}
              {quotationDataList.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-gray-500">
                    조회된 견적 데이터가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* 페이지네이션 */}
        {quotationDataList.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalElements={totalElements}
            onPageChange={handlePageChange} // 수정된 핸들러 사용
          />
        )}
      </div>
      {/* 시뮬레이션 결과 모달 */}
      {showSimulationModal && simulationResponse && (
        <SimulationResultModal
          simulationResults={simulationResponse.content}
          onClose={() => setShowSimulationModal(false)}
          onConfirm={handleConfirmProposedDelivery}
        />
      )}
      {/* MPS 생성 Preview 모달 */}
      {showMpsPreviewModal && mpsPreviewData?.content && (
        <MpsPreviewModal
          previewResults={mpsPreviewData.content}
          onClose={() => setShowMpsPreviewModal(false)}
          onConfirm={handleConfirmMps}
        />
      )}
    </div>
  );
}
