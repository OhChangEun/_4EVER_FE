'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { getWarehouseInfo, postStockMovement } from '../../inventory.api';
import { useState } from 'react';
import { InventoryMoveModalProps } from '../../types/InventoryMoveModalType';

const InventoryMoveModal = ({ $setShowMoveModal, $selectedStock }: InventoryMoveModalProps) => {
  const [formData, setFormData] = useState({
    fromWarehouseId: 0,
    toWarehouseId: 0,
    stockId: 0,
    stockQuantity: 0,
    uomName: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    moveStock(formData);
  };

  // -----------------------------

  // const {
  //   data: warehouseInfoRes,
  //   isLoading: isWarehouseInfoLoading,
  //   isError: isWarehouseInfoError,
  // } = useQuery<WarehouseToggleResponse[]>({
  //   queryKey: ['getWarehouseInfo', formData.itemId],
  //   queryFn: () => getWarehouseInfo(formData.itemId),
  //   enabled: !!formData.itemId,
  // });

  const { mutate: moveStock } = useMutation({
    mutationFn: postStockMovement,
    onSuccess: (data) => {
      alert(`${data.status} : ${data.message}
      `);
      $setShowMoveModal(false);
    },
    onError: (error) => {
      alert(` 등록 중 오류가 발생했습니다. ${error}`);
    },
  });
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">재고 이동</h3>
          <button
            onClick={() => $setShowMoveModal(false)}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm font-medium text-gray-900">{$selectedStock.itemName}</div>
          <div className="text-sm text-gray-500">{$selectedStock.itemNumber}</div>
          <div className="text-sm text-gray-600 mt-1">
            현재 위치: {$selectedStock.warehouseName} ({$selectedStock.warehouseNumber})
          </div>
          <div className="text-sm text-gray-600">
            현재 재고: {$selectedStock.currentStock} {$selectedStock.uomName}
          </div>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이동할 창고</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8">
              <option value="">창고를 선택하세요</option>
              {/* {warehouses.map((warehouse) => (
                <option key={warehouse.id} value={warehouse.id}>
                  {warehouse.name} ({warehouse.type})
                </option>
              ))} */}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이동할 위치</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="예: A-01-01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이동 수량</label>
            <input
              type="number"
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="이동할 수량을 입력하세요"
              max={$selectedStock.currentStock}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => $setShowMoveModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium cursor-pointer"
            >
              이동
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryMoveModal;
