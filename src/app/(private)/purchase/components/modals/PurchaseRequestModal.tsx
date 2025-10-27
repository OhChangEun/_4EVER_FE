'use client';

import React, { useState } from 'react';
import {
  PurchaseRequestItem,
  PurchaseRequestPayload,
} from '@/app/(private)/purchase/types/PurchaseRequestItemType';
import { PURCHASE_REQUEST_TABLE_HEADERS, SUPPLIERS } from '@/app/(private)/purchase/constants';
import { PurchaseRequestItemProps } from '@/app/(private)/purchase/types/PurchaseRequestModalType';
import IconButton from '@/app/components/common/IconButton';
import Button from '@/app/components/common/Button';
import { useMutation } from '@tanstack/react-query';
import { createPurchaseRequest } from '@/app/(private)/purchase/api/purchase.api';
import DropdownInputModal from '@/app/components/common/DropdownInputModal';

export default function PurchaseRequestModal({ onClose }: PurchaseRequestItemProps) {
  const [requestItems, setRequestItems] = useState<PurchaseRequestItem[]>([
    {
      id: '1',
      itemName: '',
      quantity: '',
      unit: '',
      estimatedPrice: '',
      supplier: '',
      dueDate: '',
      purpose: '',
      notes: '',
    },
  ]);

  const { mutate: submitPurchaseRequest, isPending } = useMutation({
    mutationFn: createPurchaseRequest,
    onSuccess: (data) => {
      console.log('구매 요청 성공: ', data);
      alert(`총 ${requestItems.length}개 품목의 구매 요청이 성공적으로 제출되었습니다.`);
      onClose();

      setRequestItems([
        {
          id: '1',
          itemName: '',
          quantity: '',
          unit: '',
          estimatedPrice: '',
          supplier: '',
          dueDate: '',
          purpose: '',
          notes: '',
        },
      ]);
    },

    onError: (error) => {
      alert(`구매 요청 중 오류가 발생했습니다. ${error}`);
    },
  });

  const calculateItemTotal = (quantity: string, price: string): number => {
    const qty = parseFloat(quantity) || 0;
    const unitPrice = parseFloat(price) || 0;
    return qty * unitPrice;
  };

  const calculateGrandTotal = (): number => {
    return requestItems.reduce((total, item) => {
      return total + calculateItemTotal(item.quantity, item.estimatedPrice);
    }, 0);
  };

  const addRequestItem = (): void => {
    const newItem: PurchaseRequestItem = {
      id: Date.now().toString(),
      itemName: '',
      quantity: '',
      unit: '',
      estimatedPrice: '',
      supplier: '',
      dueDate: '',
      purpose: '',
      notes: '',
    };
    setRequestItems([...requestItems, newItem]);
  };

  const removeRequestItem = (id: string): void => {
    if (requestItems.length > 1) {
      setRequestItems(requestItems.filter((item) => item.id !== id));
    }
  };

  const updateRequestItem = (id: string, field: keyof PurchaseRequestItem, value: string): void => {
    setRequestItems(
      requestItems.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };

  const handleSubmitRequest = (e: React.FormEvent): void => {
    e.preventDefault();

    const invalidItems = requestItems.filter(
      (item) =>
        !item.itemName.trim() ||
        !item.quantity.trim() ||
        !item.unit.trim() ||
        !item.estimatedPrice.trim() ||
        !item.supplier ||
        !item.dueDate ||
        !item.purpose.trim(),
    );

    if (invalidItems.length > 0) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    const purchaseRequestData: PurchaseRequestPayload = {
      requesterId: 1,
      items: requestItems.map((item) => ({
        itemName: item.itemName,
        quantity: parseFloat(item.quantity),
        uomName: item.unit,
        expectedUnitPrice: parseFloat(item.estimatedPrice),
        expectedTotalPrice: calculateItemTotal(item.quantity, item.estimatedPrice),
        preferredVendorName: item.supplier,
        desiredDeliveryDate: item.dueDate,
        purpose: item.purpose,
        note: item.notes,
      })),
    };

    console.log('구매 요청 데이터:', purchaseRequestData);

    // React Query mutation 실행
    submitPurchaseRequest(purchaseRequestData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-6xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h3 className="text-xl font-semibold text-gray-900">구매 요청 작성</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        {/* 요청 정보 */}
        <form onSubmit={handleSubmitRequest} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 요청 부서 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">요청 부서</label>
              <input
                type="text"
                value="생산팀"
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 text-sm"
              />
            </div>
            {/* 요청일 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">요청일</label>
              <input
                type="text"
                value={new Date().toISOString().split('T')[0]}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 text-sm"
              />
            </div>
          </div>

          {/* 구매 품목 목록 */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">구매 품목 목록</h4>
              <IconButton
                type="button"
                label="품목 추가"
                icon="ri-add-line"
                onClick={addRequestItem}
              />
            </div>

            {/* 구매 요청 작성 입력 테이블 */}
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg">
                {/* 테이블 헤더: 품목명, 수량, 단위, 예상 단가, 예상 총액, 희망 공급업체, 희망 납기일, 사용 목적, 비고, 작업 */}
                <thead className="bg-gray-50">
                  <tr>
                    {PURCHASE_REQUEST_TABLE_HEADERS.map((label) => (
                      <th
                        key={label}
                        className="px-4 py-3 text-xs font-medium text-gray-500 uppercase text-center"
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                {/* 테이블 바디 */}
                <tbody className="bg-white divide-y divide-gray-200">
                  {requestItems.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={item.itemName}
                          onChange={(e) => updateRequestItem(item.id, 'itemName', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="품목명 입력"
                          required
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateRequestItem(item.id, 'quantity', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="수량"
                          required
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={item.unit}
                          onChange={(e) => updateRequestItem(item.id, 'unit', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="EA, KG 등"
                          required
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={item.estimatedPrice}
                          onChange={(e) =>
                            updateRequestItem(item.id, 'estimatedPrice', e.target.value)
                          }
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="단가"
                          required
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-gray-900">
                          ₩{calculateItemTotal(item.quantity, item.estimatedPrice).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={item.supplier}
                          onChange={(e) => updateRequestItem(item.id, 'supplier', e.target.value)}
                          list={`suppliers-${item.id}`}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="공급업체 입력"
                          required
                        />
                        <datalist id={`suppliers-${item.id}`}>
                          {SUPPLIERS.map((supplier) => (
                            <option key={supplier} value={supplier} />
                          ))}
                        </datalist>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="date"
                          value={item.dueDate}
                          onChange={(e) => updateRequestItem(item.id, 'dueDate', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          required
                        />
                      </td>
                      <td className="px-4 py-3">
                        <DropdownInputModal
                          placeholder="사용 목적"
                          value={item.purpose}
                          onSubmit={(value) => {
                            updateRequestItem(item.id, 'purpose', value);
                          }}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <DropdownInputModal
                          placeholder="비고"
                          value={item.notes}
                          onSubmit={(value) => {
                            updateRequestItem(item.id, 'notes', value);
                          }}
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          type="button"
                          onClick={() => removeRequestItem(item.id)}
                          disabled={requestItems.length === 1}
                          className={`p-1 rounded cursor-pointer ${
                            requestItems.length === 1
                              ? 'text-gray-300 cursor-not-allowed'
                              : 'text-red-600 hover:text-red-800'
                          }`}
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 총합 표시 */}
            <div className="mt-4 flex justify-end">
              <div className="bg-gray-50 rounded-lg p-4 min-w-64">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">총 예상 금액:</span>
                  <span className="text-lg font-bold text-gray-900">
                    ₩{calculateGrandTotal().toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <Button label="취소" variant="whiteOutline" onClick={onClose} />
            <Button
              label={isPending ? '제출 중...' : '구매 요청 제출'}
              type="submit"
              disabled={isPending}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
