'use client';
import { useMemo, useState } from 'react';
import Dropdown from '@/app/components/common/Dropdown';
import Button from '@/app/components/common/Button';
import { MRP_ORDER_STATUS_OPTIONS, PRODUCTS } from '../../constants';
import { KeyValueItem } from '@/app/types/CommonType';
import { useQuery } from '@tanstack/react-query';
import { FetchMrpOrdersListParams, MrpOrdersListResponse } from '../../types/MrpOrdersListApiType';
import { fetchMrpOrdersList } from '../../api/production.api';
import TableStatusBox from '@/app/components/common/TableStatusBox';
import Pagination from '@/app/components/common/Pagination';

export default function OrdersTab() {
  const [selectedProduct, setSelectedProduct] = useState('ALL');
  const [selectedQuote, setSelectedQuote] = useState('ALL');
  const [selectedStockStatus, setSelectedStockStatus] = useState('ALL');

  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const queryParams = useMemo<FetchMrpOrdersListParams>(
    () => ({
      quotationId: selectedProduct,
      productId: selectedQuote,
      availableStatusCode: selectedStockStatus,
      page: currentPage - 1,
      size: pageSize,
    }),
    [selectedProduct, selectedQuote, selectedStockStatus, currentPage],
  );

  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery<MrpOrdersListResponse>({
    queryKey: ['ordersList', queryParams],
    queryFn: ({ queryKey }) => fetchMrpOrdersList(queryKey[1] as FetchMrpOrdersListParams),
    staleTime: 1000,
  });

  const orderItems = orders?.content || [];
  const pageInfo = orders?.page;

  const totalPages = pageInfo?.totalPages ?? 1;

  // 견적 목록
  const quotes: KeyValueItem[] = [
    { key: 'ALL', value: '전체 견적' },
    { key: 'Q_2024_001', value: 'Q-2024-001' },
    { key: 'Q_2024_002', value: 'Q-2024-002' },
    { key: 'Q_2024_003', value: 'Q-2024-003' },
    { key: 'Q_2024_004', value: 'Q-2024-004' },
    { key: 'Q_2024_005', value: 'Q-2024-005' },
  ];

  const handleSelectAllRequirements = () => {
    if (!orders) return;
    if (selectedRequirements.length === orderItems.length) {
      setSelectedRequirements([]);
    } else {
      setSelectedRequirements(orderItems.map((item) => item.itemId));
    }
  };

  const handleRequirementSelection = (id: string) => {
    setSelectedRequirements((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id],
    );
  };

  const handleConvertToPlannedOrder = () => {
    console.log('계획 주문 전환:', selectedRequirements);
    // 실제 로직 구현
  };

  const getAvailableStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string }> = {
      충분: { bg: 'bg-green-100', text: 'text-green-800' },
      부족: { bg: 'bg-red-100', text: 'text-red-800' },
      보통: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    };
    const config = statusConfig[status] || statusConfig['보통'];
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-md font-semibold text-gray-900">순소요 - 무엇이 얼마나 부족한가?</h2>
          <div className="flex gap-4 justify-end items-center">
            <Dropdown
              items={PRODUCTS}
              value={selectedProduct}
              onChange={(product: string) => {
                setSelectedProduct(product);
                setCurrentPage(1);
              }}
            />
            <Dropdown
              items={quotes}
              value={selectedQuote}
              onChange={(quote: string) => {
                setSelectedQuote(quote);
                setCurrentPage(1);
              }}
            />
            <Dropdown
              items={MRP_ORDER_STATUS_OPTIONS}
              value={selectedStockStatus}
              onChange={(status: string) => {
                setSelectedStockStatus(status);
                setCurrentPage(1);
              }}
            />
            <Button
              label="계획 주문 전환"
              onClick={handleConvertToPlannedOrder}
              disabled={selectedRequirements.length === 0}
            />
          </div>
        </div>

        {isLoading ? (
          <TableStatusBox $type="loading" $message="순소요 목록을 불러오는 중입니다..." />
        ) : isError ? (
          <TableStatusBox $type="error" $message="순소요 목록을 불러오는 중 오류가 발생했습니다." />
        ) : orderItems.length === 0 ? (
          <TableStatusBox $type="empty" $message="조회된 순소요 데이터가 없습니다" />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedRequirements.length === orderItems.length}
                      onChange={handleSelectAllRequirements}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    자재
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    소요 수량
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    현재 재고
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    안전 재고
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    가용 재고
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    가용 재고 상태
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    부족 재고
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    자재 유형
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    조달 시작일
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    예상 도착일
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    공급사
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orderItems.map((item) => (
                  <tr key={item.itemId} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedRequirements.includes(item.itemId)}
                        onChange={() => handleRequirementSelection(item.itemId)}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.itemName}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {item.requiredQuantity.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {item.currentStock.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {item.safetyStock.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {item.availableStock.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      {getAvailableStatusBadge(item.availableStatusCode)}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {item.shortageQty > 0 ? (
                        <span className="text-red-600 font-medium">
                          {item.shortageQty.toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-green-600">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{item.itemType}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {item.procurementStartDate || '-'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {item.expectedArrivalDate || '-'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{item.supplierCompanyName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {isError || isLoading ? null : (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalElements={pageInfo?.totalElements}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
    </div>
  );
}
