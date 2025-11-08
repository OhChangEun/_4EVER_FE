import { useState, useEffect } from 'react';
import Button from '@/app/components/common/Button';
import { ModalProps } from '@/app/components/common/modal/types';
import { useMutation } from '@tanstack/react-query';
import { StockPurchaseRequestBody } from '@/app/(private)/purchase/types/PurchaseApiRequestType';
import { createStockPurchaseRequest } from '@/app/(private)/purchase/api/purchase.api';
import { postItemsInfo } from '../../api/production.api';
import { MrpPlannedOrderList } from '../../types/MrpPlannedOrdersListApiType';
import { ItemResponse } from '@/app/(private)/inventory/types/ItemListType';

interface ItemWithQuantity extends ItemResponse {
  quantity: number;
  totalPrice: number;
  mrpRunId: string;
  quotationNumber: string;
}

interface PurchaseRequestModalProps extends ModalProps {
  orders: MrpPlannedOrderList[];
  onConfirm: () => void;
  editable?: boolean;
}

export default function MrpPurchaseRequestModal({
  orders,
  onConfirm,
  onClose,
  editable = true,
}: PurchaseRequestModalProps) {
  const [editableOrders, setEditableOrders] = useState<ItemWithQuantity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 아이템 상세 정보 조회
  const { mutate: fetchItemsInfo } = useMutation({
    mutationFn: (itemIds: string[]) => postItemsInfo(itemIds),
    onSuccess: (data: ItemResponse[]) => {
      const ordersWithQuantity: ItemWithQuantity[] = orders
        .map((order) => {
          const item = data.find((d) => d.itemId === order.itemId);
          if (!item) {
            console.warn(`Item not found: ${order.itemId}`);
            return null;
          }
          return {
            ...item,
            quantity: order.quantity,
            totalPrice: order.quantity * item.unitPrice,
            mrpRunId: order.mrpRunId,
            quotationNumber: order.quotationNumber,
          };
        })
        .filter((item): item is ItemWithQuantity => item !== null);

      setEditableOrders(ordersWithQuantity);
      setIsLoading(false);
    },
    onError: (error) => {
      console.error('자재 정보 조회 실패:', error);
      alert('자재 정보를 불러오는데 실패했습니다.');
      setIsLoading(false);
    },
  });

  // 컴포넌트 마운트 시 데이터 조회
  useEffect(() => {
    const itemIds = orders.map((o) => o.itemId);
    if (itemIds.length > 0) fetchItemsInfo(itemIds);
  }, [orders, fetchItemsInfo]);

  // 구매 요청 API
  const { mutate: createStockPurchase, isPending } = useMutation({
    mutationFn: (data: StockPurchaseRequestBody) => createStockPurchaseRequest(data),
    onSuccess: () => {
      alert('자재 구매 요청이 완료되었습니다.');
      onConfirm();
      onClose();
    },
    onError: (error) => {
      console.error('자재 구매 요청 실패:', error);
      alert('자재 구매 요청에 실패했습니다.');
    },
  });

  // 수량 변경 핸들러
  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedOrders = [...editableOrders];
    const order = updatedOrders[index];
    updatedOrders[index] = {
      ...order,
      quantity: newQuantity,
      totalPrice: newQuantity * order.unitPrice,
    };
    setEditableOrders(updatedOrders);
  };

  // 구매 요청 확정
  const handleConfirm = () => {
    const requestBody: StockPurchaseRequestBody = {
      items: editableOrders.map((order) => ({
        productId: order.itemId,
        quantity: order.quantity,
        mrpRunId: order.mrpRunId,
      })),
    };

    createStockPurchase(requestBody);
  };

  // 총 금액 계산
  const totalAmount = editableOrders.reduce((sum, order) => sum + order.totalPrice, 0);

  // 로딩 중
  if (isLoading) {
    return (
      <div className="min-w-3xl flex justify-center items-center p-8">
        <div className="text-gray-500">자재 정보를 불러오는 중...</div>
      </div>
    );
  }

  // 렌더링
  return (
    <div className="min-w-3xl">
      {/* 요약 영역 */}
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">구매 요청 요약</h4>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-blue-600">선택된 주문:</span>
              <span className="ml-2 font-medium">{editableOrders.length}건</span>
            </div>
            <div>
              <span className="text-blue-600">총 예상 금액:</span>
              <span className="ml-2 font-medium">₩{totalAmount.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-blue-600">요청일:</span>
              <span className="ml-2 font-medium">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* 테이블 영역 */}
        <div className="overflow-x-auto overflow-y-auto max-h-[252px] rounded shadow-xs">
          <table className="min-w-full divide-y divide-gray-100 border-b border-gray-100">
            <thead className="sticky top-0 z-10 bg-gray-100">
              <tr>
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
                  단가
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  총액
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  공급사
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-center">
              {editableOrders.map((order, index) => (
                <tr key={order.itemId} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-blue-600">
                    {order.quotationNumber}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{order.itemName}</td>
                  <td className="px-4 py-3">
                    {editable ? (
                      <input
                        type="number"
                        value={order.quantity}
                        min={0}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm text-right"
                        onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 0)}
                      />
                    ) : (
                      order.quantity.toLocaleString()
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    ₩{order.unitPrice.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    ₩{order.totalPrice.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{order.supplierName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="flex justify-end pt-2 pb-6">
        <Button label="구매 요청 확정" onClick={handleConfirm} disabled={isPending} />
      </div>
    </div>
  );
}
