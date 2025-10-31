'use client';

import { PURCHASE_ITEM_TABLE_HEADERS } from '@/app/(private)/purchase/constants';
import { useQuery } from '@tanstack/react-query';
import { PurchaseReqDetailResponse } from '@/app/(private)/purchase/types/PurchaseReqType';
import { fetchPurchaseReqDetail } from '@/app/(private)/purchase/api/purchase.api';
import { useEffect, useState } from 'react';
import ModalStatusBox from '@/app/components/common/ModalStatusBox';
import { ModalProps } from '@/app/components/common/modal/types';

// 상태별 색상
const getStatusColor = (status: string): string => {
  switch (status) {
    case 'APPROVED': // 승인
      return 'bg-green-100 text-green-700';
    case 'pending':
      return 'bg-yellow-100 text-yellow-700';
    case 'waiting': // 대기중
      return 'bg-blue-100 text-blue-700';
    case 'rejected': // 반려
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

// 상태: 영어 > 한글로 매핑
const getStatusText = (status: string): string => {
  switch (status) {
    case 'approved':
      return '승인';
    case 'pending':
      return '대기';
    case 'waiting':
      return '대기';
    case 'rejected':
      return '반려';
    default:
      return status;
  }
};

export interface PurchaseRequestDetailModalProps extends ModalProps {
  purchaseId: string;
}

export default function PurchaseRequestDetailModal({
  purchaseId,
}: PurchaseRequestDetailModalProps) {
  const {
    data: request,
    isLoading,
    isError,
  } = useQuery<PurchaseReqDetailResponse>({
    queryKey: ['purchase-req-detail'],
    queryFn: () => fetchPurchaseReqDetail(purchaseId),
  });

  const [errorModal, setErrorModal] = useState(false);
  useEffect(() => {
    setErrorModal(isError);
  }, [isError]);

  if (!request) return null;

  if (isLoading)
    return <ModalStatusBox $type="loading" $message="구매 요청 상세정보를 불러오는 중입니다..." />;

  if (errorModal)
    return (
      <ModalStatusBox
        $type="error"
        $message="구매 요청 상세 정보 데이터를 불러오는 중 오류가 발생했습니다."
        $onClose={() => setErrorModal(false)}
      />
    );
  return (
    <>
      <div className="space-y-6">
        {/* 기본 정보 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">요청번호</label>
              <div className="text-lg font-semibold text-gray-900">{request.prNumber}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">요청자</label>
              <div className="text-gray-900">{request.requesterName}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">부서</label>
              <div className="text-gray-900">{request.departmentName}</div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">요청일</label>
              <div className="text-gray-900">{request.requestDate}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">희망 납기일</label>
              <div className="text-gray-900">{request.desiredDeliveryDate}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(request.status)}`}
              >
                {getStatusText(request.status)}
              </span>
            </div>
          </div>
        </div>

        {/* 주문 자재 목록 테이블 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">주문 자재 목록</label>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 rounded-lg">
              {/* 테이블 헤더: 품목명, 수량, 단위, 단가, 금액 */}
              <thead className="bg-gray-50">
                <tr>
                  {PURCHASE_ITEM_TABLE_HEADERS.map((header) => (
                    <th
                      key={header}
                      className="px-4 py-3 text-center text-sm font-medium text-gray-700 border-b border-gray-300"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              {/* 테이블 바디 */}
              <tbody>
                {request.items.map((item, index) => (
                  <tr key={index} className="border-b text-center border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{item.itemName}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{item.uomCode}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{item.quantity}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">₩{item.unitPrice}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">₩{item.amount}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr className="text-center">
                  <td colSpan={5} className="px-4 py-3 text-right font-medium">
                    <span className="text-sm text-gray-700 pr-5">총 금액</span>
                    <span className="text-xl text-green-600 pr-7">{request.totalAmount}</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
