'use client';
import { useState, useMemo } from 'react';
import Button from '@/app/components/common/Button';
import Dropdown from '@/app/components/common/Dropdown';
import {
  MRP_PLANNED_ORDER_STATUS_OPTIONS,
  MrpPlannedOrderStatus,
} from '@/app/(private)/production/constants';
import { useQuery } from '@tanstack/react-query';
import { fetchMrpPlannedOrdersList } from '@/app/(private)/production/api/production.api';
import {
  FetchMrpPlannedOrdersListParams,
  MrpPlannedOrdersListResponse,
} from '@/app/(private)/production/types/MrpPlannedOrdersListApiType';
import TableStatusBox from '@/app/components/common/TableStatusBox';
import Pagination from '@/app/components/common/Pagination';
import MrpPlannedOrderDetailModal from '@/app/(private)/production/components/modals/MrpPlannedOrderDetailModal';
import { useModal } from '@/app/components/common/modal/useModal';
import MrpPurchaseRequestModal from '@/app/(private)/production/components/modals/MrpPurchaseRequestModal';

export default function PlannedOrdersTab() {
  const { openModal } = useModal();

  // 드롭다운 상태
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<MrpPlannedOrderStatus>('ALL');

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // 쿼리 파라미터 객체 생성
  const queryParams = useMemo(
    (): FetchMrpPlannedOrdersListParams => ({
      statusCode: selectedStatus,
      page: currentPage - 1,
      size: pageSize,
    }),
    [selectedStatus, currentPage],
  );

  // API 호출
  const {
    data: plannedOrdersData,
    isLoading,
    isError,
  } = useQuery<MrpPlannedOrdersListResponse>({
    queryKey: ['mrpPlannedOrders', queryParams],
    queryFn: ({ queryKey }) =>
      fetchMrpPlannedOrdersList(queryKey[1] as FetchMrpPlannedOrdersListParams),
    staleTime: 1000,
  });

  // content 배열 추출
  const plannedOrders = plannedOrdersData?.content || [];
  const pageInfo = plannedOrdersData?.page;

  const totalPages = pageInfo?.totalPages ?? 1;

  const handleSelectAllOrders = () => {
    if (selectedOrders.length === plannedOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(plannedOrders.map((order) => order.mrpId));
    }
  };

  const handleOrderSelection = (mrpId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(mrpId) ? prev.filter((id) => id !== mrpId) : [...prev, mrpId],
    );
  };

  const handleShowDetail = (mrpId: string) => {
    const id = openModal(MrpPlannedOrderDetailModal, { title: '계획주문 상세', mrpId: mrpId });
    console.log(id);
  };

  const handlePurchaseRequest = () => {
    console.log('자재구매 요청:', selectedOrders);

    // 선택된 주문들을 필터링하여 모달에 전달
    const selectedOrdersData = plannedOrders
      .filter((order) => selectedOrders.includes(order.mrpId))
      .map((order) => ({
        id: order.mrpId,
        referenceQuote: order.quotationNumber,
        material: order.itemName,
        quantity: order.quantity,
        unitPrice: 15000, // 목업 데이터 (실제로는 API에서 가져와야 함)
        totalPrice: order.quantity * 15000, // 목업 계산
        supplier: '(주)공급업체', // 목업 데이터
        deliveryDate: order.procurementStartDate,
        status: 'PLANNED' as const,
      }));

    openModal(MrpPurchaseRequestModal, {
      title: '자재 구매 요청',
      orders: selectedOrdersData,
      editable: true,
      onConfirm: () => setSelectedOrders([]), // 선택 초기화
    });
  };

  return (
    <>
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h4 className="text-md font-semibold text-gray-900">
          계획 주문 - 무엇을 언제 발주 지시할까?
        </h4>
        <div className="flex items-center gap-3">
          <Dropdown
            placeholder="전체 부서"
            items={MRP_PLANNED_ORDER_STATUS_OPTIONS}
            value={selectedStatus}
            onChange={(status: MrpPlannedOrderStatus) => {
              setSelectedStatus(status);
              setCurrentPage(1);
            }}
          />
          <Button
            label="자재 구매 요청"
            onClick={handlePurchaseRequest}
            disabled={selectedOrders.length === 0}
          />
        </div>
      </div>

      {isLoading ? (
        <TableStatusBox $type="loading" $message="계획 주문 목록을 불러오는 중입니다..." />
      ) : isError ? (
        <TableStatusBox
          $type="error"
          $message="계획 주문 목록을 불러오는 중 오류가 발생했습니다."
        />
      ) : plannedOrders.length === 0 ? (
        <TableStatusBox $type="empty" $message="조회된 계획 주문 데이터가 없습니다" />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === plannedOrders.length}
                    onChange={handleSelectAllOrders}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                  />
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  참조 견적서
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  자재
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  수량
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  조달 시작일
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {plannedOrders.map((order) => (
                <tr key={order.mrpId} className="hover:bg-gray-50 text-center">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.mrpId)}
                      onChange={() => handleOrderSelection(order.mrpId)}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-blue-600">
                    {order.quotationNumber}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{order.itemName}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {order.quantity.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{order.procurementStartDate}</td>
                  <td className="px-4 py-3">{order.statusCode}</td>
                  <td className="px-4 py-3">
                    <button
                      className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      title="상세보기"
                      onClick={() => handleShowDetail(order.mrpId)}
                    >
                      <i className="ri-eye-line"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {isError || isLoading ? null : (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalElements={pageInfo?.totalElements}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
        </div>
      )}
    </>
  );
}
