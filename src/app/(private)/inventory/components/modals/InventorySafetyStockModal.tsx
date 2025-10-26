'use client';

import { useState } from 'react';

interface InventorySafetyStockModalProps {
  $setShowSafetyStockModal: (show: boolean) => void;
  $selectedStock: {
    itemName: string;
    itemNumber: string;
    warehouseName: string;
    warehouseNumber: string;
    safetyStock: number;
    currentStock: number;
    uomName: string;
  };
}

const InventorySafetyStockModal = ({
  $setShowSafetyStockModal,
  $selectedStock,
}: InventorySafetyStockModalProps) => {
  const [newSafetyStock, setNewSafetyStock] = useState<number>(0);
  const [editReason, setEditReason] = useState('');
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">안전 재고 수정</h3>
          <button
            onClick={() => $setShowSafetyStockModal(false)}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm font-medium text-gray-900">{$selectedStock.itemName}</div>
          <div className="text-sm text-gray-500">{$selectedStock.itemNumber}</div>
          <div className="text-sm text-gray-600 mt-1">
            현재 안전재고: {$selectedStock.safetyStock} {$selectedStock.uomName}
          </div>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">새 안전재고 수량</label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="안전재고 수량"
              defaultValue={$selectedStock.safetyStock}
              value={newSafetyStock === 0 ? undefined : newSafetyStock}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setNewSafetyStock(Number(e.target.value));
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">수정 사유</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              rows={3}
              placeholder="수정 사유를 입력하세요"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setEditReason(e.target.value as string);
              }}
            ></textarea>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => $setShowSafetyStockModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium cursor-pointer"
            >
              수정
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventorySafetyStockModal;
