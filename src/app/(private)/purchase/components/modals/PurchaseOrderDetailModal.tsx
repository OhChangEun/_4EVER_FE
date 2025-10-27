'use client';

import { PurchaseOrderDetailModalProps } from '@/app/(private)/purchase/types/PurchaseOrderDetailModalProps';
import { useQuery } from '@tanstack/react-query';
import { fetchPurchaseOrderDetail } from '@/app/(private)/purchase/api/purchase.api';
import { PurchaseOrderDetailResponse } from '@/app/(private)/purchase/types/PurchaseOrderType';
import ModalStatusBox from '@/app/components/common/ModalStatusBox';
import { useEffect, useState } from 'react';

export default function PurchaseOrderDetailModal({
  purchaseId,
  onClose,
}: PurchaseOrderDetailModalProps) {
  const {
    data: order,
    isLoading,
    isError,
  } = useQuery<PurchaseOrderDetailResponse>({
    queryKey: ['purchase-order-detail'],
    queryFn: () => fetchPurchaseOrderDetail(purchaseId),
  });

  const [errorModal, setErrorModal] = useState(false);
  useEffect(() => {
    setErrorModal(isError);
  }, [isError]);

  if (!order) return null;

  if (isLoading)
    return <ModalStatusBox $type="loading" $message="발주서 상세정보를 불러오는 중입니다..." />;

  if (errorModal)
    return (
      <ModalStatusBox
        $type="error"
        $message="발주서 데이터를 불러오는 중 오류가 발생했습니다."
        $onClose={() => setErrorModal(false)}
      />
    );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">발주서 상세 정보</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        <div className="space-y-6">
          {/* 기본 정보 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">발주번호</label>
                <div className="text-lg font-semibold text-gray-900">{order.poNumber}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">공급업체</label>
                <div className="text-gray-900">{order.vendorName}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
                <div className="text-gray-900">{order.managerPhone}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                <div className="text-blue-600">{order.managerEmail}</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">주문일자</label>
                <div className="text-gray-900">{order.orderDate}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">납기일</label>
                <div className="text-gray-900">{order.deliveryDate}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                <span className={`px-2 py-1 rounded text-xs font-medium }`}>
                  {order.statusCode}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">총 금액</label>
                <div className="text-lg font-semibold text-green-600">{order.totalAmount}</div>
              </div>
            </div>
          </div>

          {/* 주문 품목 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">주문 품목</label>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-sm font-medium text-gray-700">품목명</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-700">수량</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-700">단위</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-700">단가</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-700">금액</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, index) => (
                    <tr key={index} className="border-b text-center">
                      <td className="px-4 py-3 text-sm text-gray-900">{item.itemName}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {item.quantity.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.unit}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        ₩{item.unitPrice.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900 text-right">
                        ₩{item.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan={5} className="px-4 py-3 text-right font-medium">
                      <span className="pr-4 text-gray-900">총 금액</span>
                      <span className="text-2xl text-green-600">₩{order.totalAmount}</span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* 메모 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">메모</label>
            <div className="text-gray-900 bg-gray-50 p-3 rounded-lg">{order.note}</div>
          </div>

          {/* 닫기 버튼 */}
          <div className="flex gap-3 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer whitespace-nowrap"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
