import { useState, useEffect } from 'react';
import Button from '@/app/components/common/Button';
import { ModalProps } from '@/app/components/common/modal/types';
import { useMutation } from '@tanstack/react-query';
import { StockPurchaseRequestBody } from '@/app/(private)/purchase/types/PurchaseApiRequestType';
import { createStockPurchaseRequest } from '@/app/(private)/purchase/api/purchase.api';
// import { postItemsInfo } from '@/app/(private)/inventory/inventory.api';
import { ItemResponse } from '@/app/(private)/inventory/types/ItemListType';
import { postItemsInfo } from '../../api/production.api';

interface ItemWithQuantity extends ItemResponse {
  quantity: number;
  totalPrice: number;
}

interface PurchaseRequestModalProps extends ModalProps {
  itemIds: string[];
  referenceQuotes?: string[]; // 각 아이템별 견적서 번호 배열
  onConfirm: () => void;
  editable?: boolean;
}

export default function MrpPurchaseRequestModal({
  itemIds,
  referenceQuotes,
  onConfirm,
  onClose,
  editable = true,
}: PurchaseRequestModalProps) {
  const [editableOrders, setEditableOrders] = useState<ItemWithQuantity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // itemIds로 상세 정보 조회
  const { mutate: fetchItemsInfo } = useMutation({
    mutationFn: (itemIds: string[]) => postItemsInfo(itemIds),
    onSuccess: (data: ItemResponse[]) => {
      // itemIds 순서에 맞게 데이터 정렬
      const ordersWithQuantity: ItemWithQuantity[] = itemIds
        .map((itemId) => {
          const item = data.find((d) => d.itemId === itemId);
          if (!item) {
            console.error(`Item not found: ${itemId}`);
            return null;
          }
          return {
            ...item,
            quantity: parseInt(item.itemNmber) || 0,
            totalPrice: (parseInt(item.itemNmber) || 0) * item.unitPrice,
          };
        })
        .filter((item): item is ItemWithQuantity => item !== null);

      setEditableOrders(ordersWithQuantity);
      setIsLoading(false);
    },
    onError: (error) => {
      console.error('자재 정보 조회 실패: ', error);
      alert('자재 정보를 불러오는데 실패했습니다.');
      setIsLoading(false);
    },
  });

  // 구매 요청 생성
  const { mutate: createStockPurchase, isPending } = useMutation({
    mutationFn: (data: StockPurchaseRequestBody) => createStockPurchaseRequest(data),
    onSuccess: () => {
      alert('자재 구매 요청이 완료되었습니다.');
      onConfirm();
      onClose();
    },
    onError: (error) => {
      console.error('자재 구매 요청 실패: ', error);
      alert('자재 구매 요청에 실패했습니다.');
    },
  });

  // 컴포넌트 마운트 시 itemIds로 상세 정보 조회
  useEffect(() => {
    if (itemIds && itemIds.length > 0) {
      fetchItemsInfo(itemIds);
    }
  }, [itemIds]);

  const totalAmount = editableOrders.reduce((sum, order) => sum + order.totalPrice, 0);

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

  const handleConfirm = () => {
    const requestBody: StockPurchaseRequestBody = {
      items: editableOrders.map((order) => ({
        productId: order.itemId,
        quantity: order.quantity,
      })),
    };

    createStockPurchase(requestBody);
  };

  if (isLoading) {
    return (
      <div className="min-w-3xl flex justify-center items-center p-8">
        <div className="text-gray-500">자재 정보를 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="min-w-3xl">
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
            <tbody className="bg-white divide-y divide-gray-200">
              {editableOrders.map((order, index) => (
                <tr key={order.itemId} className="hover:bg-gray-50 text-center">
                  <td className="px-4 py-3 text-sm font-medium text-blue-600">
                    {referenceQuotes?.[index] || order.itemId}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{order.itemName}</td>
                  <td className="px-4 py-3">
                    {editable ? (
                      <input
                        type="number"
                        value={order.quantity}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value) || 0;
                          handleQuantityChange(index, newQuantity);
                        }}
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

      <div className="flex justify-end pt-2 pb-6">
        <Button label="구매 요청 확정" onClick={handleConfirm} disabled={isPending} />
      </div>
    </div>
  );
}
