'use client';

import { useMemo, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import PurchaseRequestModal from '@/app/(private)/purchase/components/modals/PurchaseRequestModal';
import PurchaseRequestDetailModal from '@/app/(private)/purchase/components/modals/PurchaseRequestDetailModal';
import {
  fetchPurchaseReqList,
  postApporvePurchaseReq,
  postRejectPurchaseReq,
} from '@/app/(private)/purchase/api/purchase.api';
import {
  PURCHASE_LIST_TABLE_HEADERS,
  PURCHASE_REQ_STATUS,
} from '@/app/(private)/purchase/constants';
import IconButton from '@/app/components/common/IconButton';
import Dropdown from '@/app/components/common/Dropdown';
import {
  PurchaseReqListResponse,
  PurchaseReqResponse,
} from '@/app/(private)/purchase/types/PurchaseReqType';
import DateRangePicker from '@/app/components/common/DateRangePicker';
import { getQueryClient } from '@/lib/queryClient';
import TableStatusBox from '@/app/components/common/TableStatusBox';
import Pagination from '@/app/components/common/Pagination';
import { FetchPurchaseReqParams } from '@/app/(private)/purchase/types/PurchaseApiRequestType';
import { useModal } from '@/app/components/common/modal/useModal';

export default function PurchaseRequestListTab() {
  const { openModal } = useModal();

  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [showRequestModal, setShowRequestModal] = useState(false);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const queryClient = getQueryClient();

  const queryParams = useMemo(
    () => ({
      page: currentPage - 1,
      size: pageSize,
      status: selectedStatus,
      createdFrom: startDate,
      createdTo: endDate,
    }),
    [currentPage, selectedStatus, startDate, endDate],
  );

  // React Query로 요청 목록 가져오기
  const {
    data: requestData,
    isLoading,
    isError,
  } = useQuery<PurchaseReqListResponse>({
    queryKey: ['purchaseRequests', queryParams],
    queryFn: ({ queryKey }) => fetchPurchaseReqList(queryKey[1] as FetchPurchaseReqParams),
    staleTime: 1000,
  });

  // 승인 mutation
  const { mutate: approvePurchaseRequest } = useMutation({
    mutationFn: (prId: string) => postApporvePurchaseReq(prId),
    onSuccess: () => {
      alert('구매 요청 승인 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['purchaseRequests'] }); // 목록 새로고침
    },
    onError: (error) => {
      console.log(`구매 승인 처리 중 오류 발생: ${error}`);
      alert('구매 요청 승인 중 오류가 발생했습니다.');
    },
  });

  // 반려 mutation
  const { mutate: rejectpurchaseRequest } = useMutation({
    mutationFn: (prId: string) => postRejectPurchaseReq(prId, ''),
    onSuccess: () => {
      alert('반려 처리되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['purchaseRequests'] });
    },
    onError: (error) => {
      console.log(`구매 반려 처리 중 오류 발생: ${error}`);
      alert('반려 처리 중 오류가 발생했습니다.');
    },
  });

  const requests = requestData?.content || [];
  const pageInfo = requestData?.page;

  const totalPages = pageInfo?.totalPages ?? 1;

  const handleStatusChange = (status: string): void => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  const handleViewDetail = (request: PurchaseReqResponse): void => {
    openModal(PurchaseRequestDetailModal, {
      title: '구매 요청 상세 정보',
      purchaseId: request.purchaseRequisitionId,
    });
  };

  const handleApprove = (prId: string) => {
    if (confirm('해당 요청을 승인하시겠습니까?')) {
      approvePurchaseRequest(prId);
    }
  };

  const handleReject = (prId: string) => {
    if (confirm('해당 요청을 반려하시겠습니까?')) {
      rejectpurchaseRequest(prId);
    }
  };

  return (
    <>
      {/* 필터 헤더 */}
      <div className="pb-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">구매 요청 목록</h3>
        <div className="flex items-center space-x-4">
          <Dropdown
            items={PURCHASE_REQ_STATUS}
            value={selectedStatus}
            onChange={handleStatusChange}
          />

          <DateRangePicker
            startDate={startDate}
            onStartDateChange={setStartDate}
            endDate={endDate}
            onEndDateChange={setEndDate}
          />

          {/* 구매 요청 작성 버튼 */}
          <IconButton
            label="구매 요청 작성"
            icon="ri-add-line"
            onClick={() => setShowRequestModal(true)}
          />
        </div>
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <TableStatusBox $type="loading" $message="구매 요청 목록을 불러오는 중입니다..." />
        ) : isError ? (
          <TableStatusBox
            $type="error"
            $message="구매 요청 목록을 불러오는 중 오류가 발생했습니다."
          />
        ) : !requests || requests.length === 0 ? (
          <TableStatusBox $type="empty" $message="구매 요청 정보가 없습니다." />
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {PURCHASE_LIST_TABLE_HEADERS.map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((request) => (
                <tr key={request.purchaseRequisitionId} className="text-center">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <div className="flex flex-col">
                      <span>{request.purchaseRequisitionNumber}</span>
                      <span>{request.departmentName}팀</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{request.requesterName}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{request.requestDate}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{request.totalAmount}원</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 rounded-full text-xs font-medium">
                      {request.statusCode}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => handleViewDetail(request)}
                        className="w-8 h-8 flex items-center justify-center text-blue-500 hover:bg-blue-100 rounded-lg cursor-pointer"
                        title="상세보기"
                      >
                        <i className="ri-eye-line"></i>
                      </button>
                      <button
                        onClick={() => handleApprove(request.purchaseRequisitionId)}
                        className=" w-8 h-8 flex items-center justify-center text-green-600 hover:bg-blue-100 rounded-lg cursor-pointer"
                        title="승인"
                      >
                        <i className="ri-check-line"></i>
                      </button>
                      <button
                        onClick={() => handleReject(request.purchaseRequisitionId)}
                        className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-blue-100 rounded-lg01 cursor-pointer"
                        title="반려"
                      >
                        <i className="ri-close-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500 text-sm">
                    구매 요청이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {isError || isLoading ? null : (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalElements={pageInfo?.totalElements}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
      {/* 구매 요청 작성 모달 */}
      {showRequestModal && (
        <PurchaseRequestModal
          onClose={() => setShowRequestModal(false)}
          // onSubmit={() => {
          //   setShowRequestModal(false);
          //   refetch();
          // }}
        />
      )}
    </>
  );
}
