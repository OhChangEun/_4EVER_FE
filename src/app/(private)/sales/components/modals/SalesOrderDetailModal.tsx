'use client';
import {
  OrderDetail,
  SalesOrderDetailProps,
} from '@/app/(private)/sales/types/SalesOrderDetailType';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getOrderDetail } from '@/app/(private)/sales/sales.api';
import ModalStatusBox from '@/app/components/common/ModalStatusBox';
import { ORDER_DETAIL_TABLE_HEADERS } from '@/app/(private)/sales/constant';
import StatusLabel from '@/app/components/common/StatusLabel';

const SalesOrderDetailModal = ({ $onClose, $selectedSalesOrderId }: SalesOrderDetailProps) => {
  const {
    data: orderDetailRes,
    isLoading,
    isError,
  } = useQuery<OrderDetail>({
    queryKey: ['orderDetail', $selectedSalesOrderId],
    queryFn: () => getOrderDetail($selectedSalesOrderId),
    enabled: !!$selectedSalesOrderId,
  });
  const [errorModal, setErrorModal] = useState(false);
  useEffect(() => {
    setErrorModal(isError);
    $onClose;
  }, [isError]);

  if (isLoading) return <ModalStatusBox $type="loading" $message="주문서를 불러오는 중입니다..." />;

  if (errorModal)
    return (
      <ModalStatusBox
        $type="error"
        $message="주문 상세 데이터를 불러오는 중 오류가 발생했습니다."
        $onClose={() => setErrorModal(false)}
      />
    );

  const order = orderDetailRes?.order;
  const customer = orderDetailRes?.customer;
  const items = orderDetailRes?.items;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          {/* 모달 헤더 */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">주문 상세정보</h2>
            <button
              onClick={$onClose}
              className="text-gray-400 hover:text-gray-600 w-6 h-6 flex items-center justify-center"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>

          {orderDetailRes && (
            <>
              {/* 모달 내용 */}
              <div className="p-6">
                {/* 기본 정보 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">주문 정보</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-500">주문번호</label>
                        <p className="text-sm text-gray-900">{order?.salesOrderNumber}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">주문일</label>
                        <p className="text-sm text-gray-900">{order?.orderDate}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">납기일</label>
                        <p className="text-sm text-gray-900">{order?.dueDate}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">상태</label>
                        <StatusLabel $statusCode={order?.statusCode as string} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">고객 정보</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-500">회사명</label>
                        <p className="text-sm text-gray-900">{customer?.customerName}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">담당자</label>
                        <p className="text-sm text-gray-900">{customer?.manager.managerName}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">연락처</label>
                        <p className="text-sm text-gray-900">{customer?.manager.managerPhone}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">이메일</label>
                        <p className="text-sm text-gray-900">{customer?.manager.managerEmail}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">주소</label>
                        <p className="text-sm text-gray-900">
                          {customer?.customerBaseAddress} {customer?.customerDetailAddress}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 주문 품목 */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">주문 품목</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          {ORDER_DETAIL_TABLE_HEADERS.map((header) => (
                            <th
                              key={header}
                              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase border-b"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {items?.map((item, index) => (
                          <tr key={`${item.itemName}-${index}`}>
                            <td className="px-4 py-3 text-sm text-gray-900">{item.itemName}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{item.quantity}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{item.uonName}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              ₩{item.unitPrice.toLocaleString()}
                            </td>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">
                              ₩{item.amount.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-50">
                        <tr>
                          <td
                            colSpan={4}
                            className="px-4 py-3 text-sm font-medium text-gray-900 text-right"
                          >
                            총 주문금액
                          </td>
                          <td className="px-4 py-3 text-sm font-bold text-gray-900">
                            ₩{order!.totalAmount.toLocaleString()}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                {/* 특이사항 */}
                {orderDetailRes!.note && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">특이사항</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-700">{orderDetailRes!.note}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* 모달 푸터 */}
              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                <button
                  onClick={$onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
                >
                  닫기
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SalesOrderDetailModal;
