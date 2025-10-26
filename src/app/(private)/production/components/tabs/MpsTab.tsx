'use client';

import DateRangePicker from '@/app/components/common/DateRangePicker';
import Dropdown from '@/app/components/common/Dropdown';
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMpsProducts, fetchMpsList } from '@/app/(private)/production/api/production.api';
import { MpsListParams, MpsListResponse } from '@/app/(private)/production/types/MpsApiType';
import { KeyValueItem } from '@/app/types/CommonType';
import { MpsDropdownResponse } from '@/app/(private)/production/types/DropdownApiType';

export default function MpsTab() {
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // React Query를 사용하여 MPS 데이터 조회
  const queryParams = useMemo<MpsListParams>(
    () => ({
      productId: selectedProduct,
      startDate: startDate,
      endDate: endDate,
    }),
    [selectedProduct, startDate, endDate],
  );

  const {
    data: dropdownItems = [],
    isLoading: isDropdownLoading,
    isError: isDropdownError,
  } = useQuery<MpsDropdownResponse>({
    queryKey: ['mpsProductsDropdown'],
    queryFn: fetchMpsProducts,
    staleTime: Infinity,
  });

  // key-value 형태로 변환
  const productOptions: KeyValueItem[] = useMemo(() => {
    return [
      ...dropdownItems.map((item) => ({
        key: item.productId,
        value: item.productName,
      })),
    ];
  }, [dropdownItems]);

  const {
    data: currentData,
    isLoading: isMpsLoading,
    isError: isMpsError,
    refetch,
  } = useQuery<MpsListResponse>({
    queryKey: ['mpsList', queryParams],
    queryFn: () => fetchMpsList(queryParams),
    enabled: !!startDate && !!endDate,
  });
  const mpsData = currentData?.content; // 실제 데이터 content로 접근

  const renderTableRow = (
    label: string,
    dataArray: (number | null)[] = [],
    isClickable: boolean,
    isHighlight: boolean = false,
  ) => {
    const mps = currentData?.content; // 내부 데이터로 접근
    if (!mps) return null;

    return (
      <tr className="hover:bg-gray-50">
        <td
          className={`border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900 ${
            isHighlight ? 'bg-blue-50' : 'bg-gray-50'
          }`}
        >
          {label}
        </td>
        {mps.periods.map((week, index) => {
          const value = dataArray[index];
          const isDemandClickable = isClickable && value && value > 0;

          return (
            <td
              key={`${label}-${index}`}
              className={`border border-gray-300 px-4 py-3 text-center text-sm ${
                isHighlight ? 'font-semibold text-blue-700 bg-blue-50' : 'text-gray-900'
              } ${isDemandClickable ? 'cursor-pointer hover:bg-blue-50' : ''}`}
            >
              {value !== null ? value : '-'}
            </td>
          );
        })}
      </tr>
    );
  };

  // 리드 타임 렌더링
  const renderLeadTimeRow = () => {
    const mps = currentData?.content;
    if (!mps) return null;

    const fixedLeadTime = 2; // 임시 리드타임

    return (
      <tr className="hover:bg-gray-50">
        <td className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50">
          생산 리드 타임
        </td>
        {mps.periods.map((_, index) => (
          <td
            key={`leadtime-${index}`}
            className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-900"
          >
            {fixedLeadTime}주
          </td>
        ))}
      </tr>
    );
  };

  return (
    <div className="bg-white rounded-2xl p-6 space-y-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">주생산계획 (MPS)</h3>
      </div>

      {/* 제품 선택 드롭다운 및 날짜 선택 */}
      <div className="flex justify-between gap-4">
        {isDropdownLoading ? (
          <div className="w-24 px-4 py-2 rounded-sm bg-gray-100 text-gray-500">
            제품 목록 로딩 중...
          </div>
        ) : isDropdownError ? (
          <div className="w-64 px-4 py-2 border border-red-300 rounded-lg bg-red-50 text-red-600">
            제품 목록 로드 실패
          </div>
        ) : (
          <Dropdown
            items={productOptions}
            value={selectedProduct}
            onChange={(product: string) => setSelectedProduct(product)}
          />
        )}
        <DateRangePicker
          startDate={startDate}
          onStartDateChange={setStartDate}
          endDate={endDate}
          onEndDateChange={setEndDate}
        />
      </div>

      {/* 로딩 및 에러 상태 처리 */}
      {isMpsLoading && (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <i className="ri-loader-4-line animate-spin text-4xl text-blue-500 mb-4"></i>
          <p className="text-gray-500 text-lg">MPS 데이터를 불러오는 중입니다...</p>
        </div>
      )}

      {isMpsError && (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center text-red-600">
          <i className="ri-error-warning-line text-4xl mb-4"></i>
          <p className="text-lg">데이터를 불러오는 데 실패했습니다.</p>
          <button
            onClick={() => refetch()}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            다시 시도
          </button>
        </div>
      )}

      {/* 생산계획 표 (데이터 로드 성공 시) */}
      {!isMpsLoading && !isMpsError && mpsData ? (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-900">
                    구분
                  </th>
                  {mpsData.periods.map((week, index) => (
                    <th
                      key={`week-${index}`}
                      className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-900"
                    >
                      {week}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* 1. 수요 (Demand) */}
                {renderTableRow('수요', mpsData.demand, true)}

                {/* 2. 재고 필요량 */}
                {renderTableRow('재고 필요량', mpsData.requiredInventory, false)}

                {/* 3. 생산 소요량 */}
                {renderTableRow('생산 소요량', mpsData.productionNeeded, false)}

                {/* 4. 계획 생산 */}
                {renderTableRow('계획 생산 (MPS)', mpsData.plannedProduction, false, true)}

                {/* 5. 생산 리드 타임 */}
                {renderLeadTimeRow()}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        !isMpsLoading &&
        !isMpsError && (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <i className="ri-search-line text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-500 text-lg">조회된 MPS 데이터가 없습니다.</p>
          </div>
        )
      )}
    </div>
  );
}
