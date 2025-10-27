import React from 'react';
import { PurchaseOrderTableProps } from '@/app/(private)/purchase/types/PurchaseOrderTableProps';

export default function PurchaseOrderTable({
  currentOrders,
  handleSort,
  getSortIcon,
  handleViewDetail,
  handleApprove,
  handleReject,
  getStatusColor,
  getStatusText,
}: PurchaseOrderTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
              발주번호
            </th>
            <th className="py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
              공급업체
            </th>
            <th className="py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
              주문품목
            </th>
            <th className="py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
              총금액
            </th>
            <th
              className="py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
              onClick={() => handleSort('orderDate')}
            >
              <div className="flex justify-center items-center space-x-1">
                <span>주문일자</span>
                <i className={getSortIcon('orderDate')}></i>
              </div>
            </th>
            <th
              className="py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
              onClick={() => handleSort('deliveryDate')}
            >
              <div className="flex justify-center items-center space-x-1">
                <span>납기일</span>
                <i className={getSortIcon('deliveryDate')}></i>
              </div>
            </th>
            <th className="py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
              상태
            </th>
            <th className="py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
              작업
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {currentOrders.map((order) => (
            <tr
              key={order.id}
              className="hover:bg-gray-50 transition-colors duration-200 text-center"
            >
              <td className="py-3 px-4 text-sm font-medium text-gray-900">{order.poNumber}</td>
              <td className="py-3 px-4 text-sm text-gray-900">{order.vendorName}</td>
              <td className="py-3 px-4 text-sm text-gray-900 max-w-xs truncate">
                {order.itemsSummary}
              </td>
              <td className="py-3 px-4 text-sm font-medium text-gray-900">{order.totalAmount}</td>
              <td className="py-3 px-4 text-sm text-gray-500">{order.orderDate}</td>
              <td className="py-3 px-4 text-sm text-gray-500">{order.deliveryDate}</td>
              <td className="py-3 px-4">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(order.status)}`}
                >
                  {getStatusText(order.status)}
                </span>
              </td>
              <td className="py-3 px-4 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <button
                    onClick={() => handleViewDetail(order)}
                    className="text-blue-600 hover:text-blue-500 cursor-pointer"
                    title="상세보기"
                  >
                    <i className="ri-eye-line"></i>
                  </button>
                  {order.status === 'PENDING' && (
                    <>
                      <button
                        onClick={() => handleApprove(order.id)}
                        className="text-green-600 hover:text-green-900 cursor-pointer"
                        title="승인"
                      >
                        <i className="ri-check-line"></i>
                      </button>
                      <button
                        onClick={() => handleReject(order.id)}
                        className="text-red-600 hover:text-red-900 cursor-pointer"
                        title="반려"
                      >
                        <i className="ri-close-line"></i>
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
