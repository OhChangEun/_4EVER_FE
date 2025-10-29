'use client';

import { useState } from 'react';
import {
  NewOrderModalProps,
  Product,
  NewOrderRequest,
  NewOrderItem,
} from '@/app/(private)/sales/types/NewOrderModalType';
import { useMutation } from '@tanstack/react-query';
import { postNewQuote } from '../../sales.api';

const NewOrderModal = ({ $showNewOrderModal, $setShowNewOrderModal }: NewOrderModalProps) => {
  const [newOrderItems, setNewOrderItems] = useState<NewOrderRequest>({
    items: [
      {
        itemId: '',
        quantity: 1,
        unitPrice: 0,
        dueDate: '',
      },
    ],
    note: '',
  });

  // 제품 목업 데이터
  const products: Product[] = [
    { id: 'prod1', name: '도어패널', price: 150000 },
    { id: 'prod2', name: 'Hood Panel', price: 200000 },
    { id: 'prod3', name: 'Fender Panel', price: 180000 },
    { id: 'prod4', name: 'Trunk Lid', price: 220000 },
    { id: 'prod5', name: 'Roof Panel', price: 300000 },
  ];

  const addOrderItem = () => {
    setNewOrderItems((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          itemId: '',
          quantity: 1,
          unitPrice: 0,
          dueDate: '',
        },
      ],
    }));
  };

  const removeOrderItem = (itemIndex: number) => {
    if (newOrderItems.items.length > 1) {
      setNewOrderItems((prev) => ({
        ...prev,
        items: prev.items.filter((_, index) => index !== itemIndex),
      }));
    }
  };

  const getItemTotalPrice = (item: NewOrderItem) => {
    const totalPrice = item.quantity * item.unitPrice;
    return `₩${totalPrice.toLocaleString()}`;
  };

  const getTotalAmount = () => {
    return newOrderItems.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('신규 견적 요청이 등록되었습니다.');
    $setShowNewOrderModal(false);

    setNewOrderItems({
      items: [
        {
          itemId: '',
          quantity: 1,
          unitPrice: 0,
          dueDate: '',
        },
      ],
      note: '',
    });
  };

  const handleClose = (e: React.FormEvent) => {
    e.preventDefault();
    $setShowNewOrderModal(false);
    setNewOrderItems({
      items: [
        {
          itemId: '',
          quantity: 1,
          unitPrice: 0,
          dueDate: '',
        },
      ],
      note: '',
    });
  };

  const { mutate: addOrder } = useMutation({
    mutationFn: postNewQuote,
    onSuccess: (data) => {
      $setShowNewOrderModal(false);
    },
    onError: (error) => {
      alert(` 견적 요청 중 오류가 발생했습니다. ${error}`);
    },
  });
  return (
    <>
      {/* 신규 견적 요청 모달 */}
      {$showNewOrderModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">신규 견적 요청</h3>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 주문 품목 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">주문 품목</h4>
                  <button
                    type="button"
                    onClick={addOrderItem}
                    className="mt-4 inline-flex items-center px-4 py-2 bg-white border border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                  >
                    <i className="ri-add-line mr-2 text-base"></i>
                    제품 추가
                  </button>
                </div>

                <div className="space-y-4">
                  {newOrderItems.items.map((item, index) => (
                    <div
                      key={item.itemId}
                      className="bg-white p-4 rounded-lg border border-gray-200"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            제품명 *
                          </label>
                          <select
                            value=""
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                              // handleProductChange(index, e.target.value)
                              console.log()
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
                            required
                          >
                            <option value="">제품을 선택하세요</option>
                            {products.map((product) => (
                              <option key={product.id} value={product.id}>
                                {product.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            수량 *
                          </label>
                          <input
                            type="number"
                            value={item.quantity}
                            // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>

                            // }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            min="1"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            단가
                          </label>
                          <input
                            type="text"
                            value={`₩${item.unitPrice.toLocaleString()}`}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            납기일 *
                          </label>
                          <input
                            type="date"
                            value={item.dueDate}
                            // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            // }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            required
                          />
                        </div>
                        <div className="flex items-end">
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              금액
                            </label>
                            <input
                              type="text"
                              value={getItemTotalPrice(item)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm font-medium"
                              readOnly
                            />
                          </div>
                          {newOrderItems.items.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeOrderItem(index)}
                              className="ml-2 p-2 text-red-600 hover:text-red-800 cursor-pointer"
                            >
                              <i className="ri-delete-bin-line"></i>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-4 bg-white rounded-lg border-1 border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">총 주문 금액</span>
                    <span className="text-xl font-bold text-gray-600">
                      ₩{getTotalAmount().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* 비고 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">비고</label>
                <textarea
                  value={newOrderItems.note}
                  // onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>

                  // }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  rows={3}
                  placeholder="추가 요청사항이나 특이사항을 입력하세요"
                ></textarea>
              </div>

              {/* 버튼 */}
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer whitespace-nowrap"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#2563EB] text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200 cursor-pointer whitespace-nowrap"
                >
                  견적 요청 등록
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default NewOrderModal;
