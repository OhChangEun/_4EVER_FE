'use client';

import { PURCHASE_ITEM_TABLE_HEADERS } from '@/app/(private)/purchase/constants';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import ModalStatusBox from '@/app/components/common/ModalStatusBox';
import { fetchMrpPlannedOrdersDetail } from '../../api/production.api';
import { MrpPlannedOrdersDetailResponse } from '../../types/MrpPlannedOrdersDetailApiType';
import Button from '@/app/components/common/Button';

export interface MrpPlannedOrderDetailModalProps {
  mrpId: string;
  onClose: () => void;
}

export default function MrpPlannedOrderDetailModal({
  mrpId,
  onClose,
}: MrpPlannedOrderDetailModalProps) {
  const {
    data: request,
    isLoading,
    isError,
  } = useQuery<MrpPlannedOrdersDetailResponse>({
    queryKey: ['mrpPlannedOrderDetail'],
    queryFn: () => fetchMrpPlannedOrdersDetail(mrpId),
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

  // If loading is done, and request is still null (shouldn't happen with error handling above, but for safety)
  if (!request) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 font-sans antialiased">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl mx-auto max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10 rounded-t-xl">
          <h3 className="text-2xl font-bold text-gray-900">구매 요청 상세 정보</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition-colors p-1 rounded-full hover:bg-gray-100"
            aria-label="닫기"
          >
            <i className="ri-close-line text-3xl"></i>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-8 overflow-y-auto">
          {/* 기본 정보 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">요청번호</label>
                {/* Refactored: prNumber -> quotationCode */}
                <div className="text-lg font-bold text-gray-900">{request.quotationCode}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">요청자</label>
                <div className="text-gray-900">{request.requesterName}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">부서</label>
                <div className="text-gray-900">{request.departmentName}</div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">요청일</label>
                <div className="text-gray-900">{request.requestDate}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">희망 납기일</label>
                {/* Refactored: desiredDeliveryDate -> desiredDueDate */}
                <div className="text-gray-900">{request.desiredDueDate}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">상태</label>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${request.status}`}>
                  {request.status}
                </span>
              </div>
            </div>
          </div>

          {/* 주문 자재 목록 테이블 */}
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
              주문 자재 목록
            </label>
            <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
              <table className="w-full">
                {/* 테이블 헤더 */}
                <thead className="bg-gray-100">
                  <tr>
                    {PURCHASE_ITEM_TABLE_HEADERS.map((header) => (
                      <th
                        key={header}
                        className="px-4 py-3 text-center text-sm font-bold text-gray-700 whitespace-nowrap"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                {/* 테이블 바디 */}
                <tbody>
                  {/* Refactored: request.items -> request.orderItems */}
                  {request.orderItems.map((item, index) => {
                    // Calculate amount (quantity * unitPrice) as it's missing in OrderItemData
                    const amount = item.quantity * item.unitPrice;

                    return (
                      <tr
                        key={index}
                        className="border-b text-center border-gray-200 hover:bg-blue-50/50 transition-colors"
                      >
                        <td className="px-4 py-3 text-sm text-gray-900 text-left font-medium">
                          {item.itemName}
                        </td>
                        {/* Refactored: item.uomCode -> item.uomName */}
                        <td className="px-4 py-3 text-sm text-gray-600">{item.uomName}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 font-mono">
                          {item.quantity.toLocaleString('ko-KR')}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 font-mono">
                          ₩{item.unitPrice.toLocaleString('ko-KR')}
                        </td>
                        {/* Refactored: item.amount -> calculated amount */}
                        <td className="px-4 py-3 text-sm text-gray-900 font-bold text-right">
                          ₩{amount.toLocaleString('ko-KR')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                {/* 테이블 푸터 (총 금액) */}
                <tfoot className="bg-gray-100 border-t-2 border-gray-300">
                  <tr className="text-center">
                    <td colSpan={5} className="px-4 py-4 text-right font-medium">
                      <span className="text-base text-gray-700 pr-8">총 요청 금액</span>
                      <span className="text-2xl font-extrabold text-green-600">
                        ₩{request.totalAmount.toLocaleString('ko-KR')}
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex justify-end pt-4">
            <Button label="닫기" onClick={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
}
