'use client';

import { useState } from 'react';
import { StockMovementResponse } from '../types/StockMovement';
import { useQuery } from '@tanstack/react-query';
import { getCurrentStockMovement } from '../inventory.api';
import { FormatDate, getMovementColor, getMovementIcon } from '../inventory.utils';
import StatusLabel from '@/app/components/common/StatusLabel';

export default function StockMovement() {
  const [showAllMovements, setShowAllMovements] = useState(false);

  const {
    data: stockMovementRes,
    isLoading,
    isError,
  } = useQuery<StockMovementResponse[]>({
    queryKey: ['stockMovement'],
    queryFn: getCurrentStockMovement,
    staleTime: 1000,
  });

  return (
    <div className="bg-white rounded-lg border border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">최근 재고 이동</h3>
          <button
            onClick={() => setShowAllMovements(!showAllMovements)}
            className="text-sm text-blue-600 hover:text-blue-500 cursor-pointer"
          >
            {showAllMovements ? '간단히 보기' : '전체 보기'} →
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-3">
          {stockMovementRes?.map((movement) => (
            <div
              key={movement.itemName}
              className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${getMovementColor(movement.type)}`}
              >
                <i className={`${getMovementIcon(movement.type)} text-sm`}></i>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <StatusLabel $statusCode={movement.type} />
                  <span className="text-sm font-medium text-gray-900">
                    {movement.quantity} {movement.uomName}
                  </span>
                </div>
                <div className="text-sm text-gray-600 truncate">{movement.itemName}</div>
                <div className="text-xs text-gray-500">
                  {FormatDate(movement.workDate)} · {movement.managerName}
                  {/* {showAllMovements && (
                    <>
                      <br />
                      <span className="text-blue-600">{movement.reference}</span> · 위치:{' '}
                      {movement.location}
                    </>
                  )} */}
                </div>
              </div>
            </div>
          ))}
        </div>

        {showAllMovements && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <i className="ri-arrow-down-line text-green-600"></i>
                  <span className="text-sm font-medium text-green-700">총 입고</span>
                </div>
                <div className="text-2xl font-bold text-green-600 mt-2">695 건</div>
                <div className="text-xs text-green-600">이번 주</div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <i className="ri-arrow-up-line text-red-600"></i>
                  <span className="text-sm font-medium text-red-700">총 출고</span>
                </div>
                <div className="text-2xl font-bold text-red-600 mt-2">610 건</div>
                <div className="text-xs text-red-600">이번 주</div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <i className="ri-edit-line text-blue-600"></i>
                  <span className="text-sm font-medium text-blue-700">재고 조정</span>
                </div>
                <div className="text-2xl font-bold text-blue-600 mt-2">15 건</div>
                <div className="text-xs text-blue-600">이번 주</div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">오늘 총 이동</span>
            <div className="flex gap-4">
              <span className="text-green-600">입고 150</span>
              <span className="text-red-600">출고 210</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
