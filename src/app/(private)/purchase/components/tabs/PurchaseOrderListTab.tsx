'use client';

import { useState } from 'react';
import PurchaseOrderDetailModal from '@/app/(private)/purchase/components/modals/PurchaseOrderDetailModal';
import PurchaseOrderTable from '@/app/(private)/purchase/components/sections/PurchaseOrderTableSection';
import { PurchaseOrder } from '@/app/(private)/purchase/types/PurchaseOrderType';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  fetchPurchaseOrderList,
  postApprovePurchaseOrder,
  postRejectPurchaseOrder,
} from '@/app/(private)/purchase/api/purchase.api';
import { PURCHASE_ORDER_STATUS, PurchaseOrderStatus } from '@/app/(private)/purchase/constants';
import Dropdown from '@/app/components/common/Dropdown';
import DateRangePicker from '@/app/components/common/DateRangePicker';
import { getQueryClient } from '@/lib/queryClient';
import Pagination from '@/app/components/common/Pagination';

export default function PurchaseOrderListTab() {
  const [selectedStatus, setSelectedStatus] = useState<PurchaseOrderStatus>('ALL');
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<PurchaseOrder | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(0); // 0부터 시작
  const pageSize = 10;

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const queryClient = getQueryClient();

  const {
    data: orderData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['purchaseOrders', currentPage, pageSize, selectedStatus],
    queryFn: () =>
      fetchPurchaseOrderList({
        page: currentPage,
        size: pageSize,
        status: selectedStatus || undefined,
      }),
  });

  // 발주서 승인
  const { mutate: approvePurchaseOrder } = useMutation({
    mutationFn: (poId: string) => postApprovePurchaseOrder(poId),
    onSuccess: () => {
      alert('발주서 승인 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['purchaseOrders'] });
    },
    onError: (error) => {
      alert(`발주서 승인 중 오류가 발생했습니다. ${error}`);
    },
  });

  // 발주서 반려
  const { mutate: rejectPurhcaseOrder } = useMutation({
    mutationFn: (poId: string) => postRejectPurchaseOrder(poId, ''),
    onSuccess: () => {
      alert('반려 처리되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['purchaseOrders"'] });
    },
    onError: (error) => {
      alert(`반려 중 오류가 발생했습니다. ${error}`);
    },
  });

  if (isLoading) return <p>불러오는 중...</p>;
  if (isError || !orderData) return <p>데이터를 불러오지 못했습니다.</p>;

  const orders = orderData.content || [];
  const pageInfo = orderData.page;
  const totalPages = pageInfo?.totalPages ?? 1;

  const handleApprove = (poId: string) => {
    if (confirm('해당 요청을 승인하시겠습니까?')) {
      approvePurchaseOrder(poId);
    }
  };

  const handleReject = (poId: string) => {
    if (confirm('해당 요청을 반려하시겠습니까?')) {
      rejectPurhcaseOrder(poId);
    }
  };

  // 상세 보기 모달 핸들러
  const handleViewDetail = (order: PurchaseOrder): void => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status as PurchaseOrderStatus);
    setCurrentPage(1); // 첫 페이지로
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <i className="ri-file-list-3-line text-blue-600 text-lg"></i>
          <h3 className="text-lg font-semibold text-gray-900">발주서 목록</h3>
        </div>

        <div className="flex items-center gap-3">
          <Dropdown
            items={PURCHASE_ORDER_STATUS}
            value={selectedStatus}
            onChange={handleStatusChange}
          />
          <DateRangePicker
            startDate={startDate}
            onStartDateChange={setStartDate}
            endDate={endDate}
            onEndDateChange={setEndDate}
          />
        </div>

        {/* 상태 필터 */}
      </div>

      {/* 테이블 컴포넌트 */}
      <PurchaseOrderTable
        currentOrders={orders}
        handleViewDetail={handleViewDetail}
        handleApprove={handleApprove}
        handleReject={handleReject}
      />

      {isError || isLoading ? null : (
        <Pagination
          currentPage={currentPage + 1}
          totalPages={totalPages}
          totalElements={pageInfo?.totalElements}
          onPageChange={(page) => setCurrentPage(page - 1)}
        />
      )}

      {/* 발주서 상세 정보 모달 */}
      {showDetailModal && selectedOrder && (
        <PurchaseOrderDetailModal
          purchaseId={selectedOrder.purchaseOrderId}
          onClose={() => setShowDetailModal(false)}
        />
      )}
    </>
  );
}
