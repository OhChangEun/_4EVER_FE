'use client';

import { StockMovementResponse } from '../types/StockMovement';
import { useQuery } from '@tanstack/react-query';
import { getCurrentStockMovement } from '../inventory.api';
import { FormatDate, getMovementColor, getMovementIcon } from '../inventory.utils';
import StatusLabel from '@/app/components/common/StatusLabel';

export default function StockMovement() {
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
