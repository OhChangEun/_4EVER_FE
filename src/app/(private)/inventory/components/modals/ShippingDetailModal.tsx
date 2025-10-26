'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import {
  markAsReadyToShipResponse,
  ShippingDetailModalProps,
  ShippingDetailResponse,
} from '../../types/ShippingDetailType';
import { useEffect, useState } from 'react';
import ModalStatusBox from '@/app/components/common/ModalStatusBox';
import {
  getProductionDetail,
  getReadyToShipDetail,
  patchMarkAsReadyToShip,
} from '../../inventory.api';

const ShippingDetailModal = ({
  $selectedSubTab,
  $selectedItemId,
  $setShowShipDetailModal,
}: ShippingDetailModalProps) => {
  const getShippingDetailBySubTab = (subTab: string, id: string) => {
    switch (subTab) {
      case 'producing':
        return getProductionDetail(id);
      case 'readyToShip':
        return getReadyToShipDetail(id);
      default:
        return getProductionDetail(id);
    }
  };

  const {
    data: shippingDetailRes,
    isLoading,
    isError,
  } = useQuery<ShippingDetailResponse>({
    queryKey: ['shippingDetail', $selectedItemId],
    queryFn: () => getShippingDetailBySubTab($selectedSubTab, $selectedItemId),
    enabled: !!$selectedItemId,
  });

  const [errorModal, setErrorModal] = useState(false);
  useEffect(() => {
    setErrorModal(isError);
  }, [isError]);

  const { mutate: markAsReadyToShip, isPending } = useMutation<
    markAsReadyToShipResponse,
    Error,
    { id: string }
  >({
    mutationFn: ({ id }) => patchMarkAsReadyToShip(id),
    onSuccess: (data) => {
      //   console.log(data);
      //   alert('출고 준비 완료로 상태가 변경되었습니다.');
      $setShowShipDetailModal(false);
    },
    onError: (error) => {
      alert(`고객 등록 중 오류가 발생했습니다. ${error}`);
    },
  });

  if (isLoading)
    return <ModalStatusBox $type="loading" $message="출고 상세 데이터를 불러오는 중입니다..." />;

  if (errorModal)
    return (
      <ModalStatusBox
        $type="error"
        $message="출고 상세 데이터를 불러오는 중 오류가 발생했습니다."
        $onClose={() => setErrorModal(false)}
      />
    );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">
            주문 상세 - {shippingDetailRes?.salesOrderNumber}
          </h3>
          <button
            onClick={() => $setShowShipDetailModal(false)}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <span className="text-sm text-gray-600">고객:</span>
              <div className="font-medium text-gray-900">
                {shippingDetailRes?.customerCompanyName}
              </div>
            </div>
            <div>
              <span className="text-sm text-gray-600">납기일:</span>
              <div className="font-medium text-gray-900">{shippingDetailRes?.dueDate}</div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">주문 품목</h4>
            <div className="space-y-2">
              {shippingDetailRes?.orderItems.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <span className="font-medium text-gray-900">{item.itemName}</span>
                  <span className="text-sm text-gray-600">
                    {item.quantity} {item.uomName}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {$selectedSubTab !== 'producing' && (
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => $setShowShipDetailModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium cursor-pointer"
              >
                닫기
              </button>
              <button
                onClick={() => {
                  markAsReadyToShip({ id: $selectedItemId });
                }}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium cursor-pointer"
              >
                배송 시작
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShippingDetailModal;
