import { useState } from 'react';
import Button from '@/app/components/common/Button';
import { ModalProps } from '@/app/components/common/modal/types';
import { useMutation } from '@tanstack/react-query';
import { StockPurchaseRequestBody } from '@/app/(private)/purchase/types/PurchaseApiRequestType';
import { createStockPurchaseRequest } from '@/app/(private)/purchase/api/purchase.api';
import { InventoryResponse } from '../../types/InventoryListType';
import Input from '@/app/components/common/Input';

interface InventoryPurchaseRequestModalProps extends ModalProps {
  items: InventoryResponse[];
  onConfirm: () => void;
}

interface EditableItem extends InventoryResponse {
  quantity: number;
  calculatedTotal: number;
}

export default function InventoryPurchaseRequestModal({
  items,
  onConfirm,
  onClose,
}: InventoryPurchaseRequestModalProps) {
  const [editableItems, setEditableItems] = useState<EditableItem[]>(
    items.map((item) => ({
      ...item,
      quantity: 0,
      calculatedTotal: 0,
    })),
  );

  // 구매 요청 API
  const { mutate: createStockPurchase, isPending } = useMutation({
    mutationFn: (data: StockPurchaseRequestBody) => createStockPurchaseRequest(data),
    onSuccess: () => {
      alert('재고 구매 요청이 완료되었습니다.');
      onConfirm();
      onClose();
    },
    onError: (error) => {
      console.error('재고 구매 요청 실패:', error);
      alert('재고 구매 요청에 실패했습니다.');
    },
  });

  // 수량 변경 핸들러
  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedItems = [...editableItems];
    const item = updatedItems[index];
    updatedItems[index] = {
      ...item,
      quantity: newQuantity,
      calculatedTotal: newQuantity * item.unitPrice,
    };
    setEditableItems(updatedItems);
  };

  // 구매 요청 확정
  const handleConfirm = () => {
    // 수량이 0보다 큰 항목만 필터링
    const itemsToOrder = editableItems.filter((item) => item.quantity > 0);

    if (itemsToOrder.length === 0) {
      alert('구매할 수량을 입력해주세요.');
      return;
    }

    const requestBody: StockPurchaseRequestBody = {
      items: itemsToOrder.map((item) => ({
        productId: item.itemId,
        quantity: item.quantity,
        mrpRunId: '', // 재고 구매 요청에서는 빈 값
      })),
    };

    createStockPurchase(requestBody);
  };

  // 총 금액 계산 (수량이 입력된 항목만)
  const totalAmount = editableItems.reduce((sum, item) => sum + item.calculatedTotal, 0);
  const totalItems = editableItems.filter((item) => item.quantity > 0).length;

  return (
    <div className="min-w-3xl">
      {/* 요약 영역 */}
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">구매 요청 요약</h4>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-blue-600">선택된 품목:</span>
              <span className="ml-2 font-medium">{totalItems}건</span>
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
        <div className="overflow-x-auto overflow-y-auto max-h-[400px] rounded shadow-xs">
          <table className="min-w-full divide-y divide-gray-100 border-b border-gray-100">
            <thead className="sticky top-0 z-10 bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">
                  품목 코드
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">
                  품목명
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                  수량
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
                  단가
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
                  총액
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {editableItems.map((item, index) => (
                <tr key={item.itemId} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{item.itemNumber}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    <div>{item.itemName}</div>
                    <div className="text-xs text-gray-500">{item.category}</div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Input
                      type="number"
                      value={item.quantity}
                      min={0}
                      className="w-24 px-2 py-1 border border-gray-300 rounded text-sm text-right"
                      onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-right">
                    ₩{item.unitPrice.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                    ₩{item.calculatedTotal.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="flex justify-end gap-2 pt-4 pb-2">
        <Button label="구매 요청 확정" onClick={handleConfirm} disabled={isPending} />
      </div>
    </div>
  );
}
