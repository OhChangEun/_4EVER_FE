'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  RECEIVING_COMPLETED_TABLE_HEADERS,
  RECEIVING_PENDING_TABLE_HEADERS,
} from '../../inventory.constants';
import { useQuery } from '@tanstack/react-query';
import { getPendingList, getReceivedList } from '../../inventory.api';
import { ManageMentCommonQueryParams } from '../../types/ShippingManagementListType';
import StatusLabel from '@/app/components/common/StatusLabel';
import Pagination from '@/app/components/common/Pagination';
const ReceivingManagementList = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubTab, setSelectedSubTab] = useState('pending');

  const getTableHeader = () => {
    return selectedSubTab === 'pending'
      ? RECEIVING_PENDING_TABLE_HEADERS
      : RECEIVING_COMPLETED_TABLE_HEADERS;
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSubTab]);

  const queryPendingParams = useMemo(() => {
    const params: ManageMentCommonQueryParams = {
      page: currentPage - 1,
      size: 10,
    };
    return params;
  }, [currentPage]);

  const {
    data: PendingRes,
    isLoading: isPendingLoading,
    isError: isPendingError,
  } = useQuery({
    queryKey: ['pendingList', queryPendingParams],
    queryFn: ({ queryKey }) => getPendingList(queryKey[1] as ManageMentCommonQueryParams),
  });

  const queryReceivedParams = useMemo(() => {
    const params: ManageMentCommonQueryParams = {
      page: currentPage - 1,
      size: 10,
      startDate: startDate || '',
      endDate: endDate || '',
    };
    return params;
  }, [currentPage, startDate, endDate]);

  const {
    data: ReceivedRes,
    isLoading: isReceivedLoading,
    isError: isReceivedError,
  } = useQuery({
    queryKey: ['receivedList', queryReceivedParams],
    queryFn: ({ queryKey }) => getReceivedList(queryKey[1] as ManageMentCommonQueryParams),
  });

  const isCurrentLoading = selectedSubTab === 'pending' ? isPendingLoading : isReceivedLoading;
  const isCurrentError = selectedSubTab === 'pending' ? isPendingError : isReceivedError;
  const currentRes = selectedSubTab === 'pending' ? PendingRes : ReceivedRes;

  const currentData = currentRes?.data ?? [];
  const pageInfo = currentRes?.pageData;
  const totalPages = pageInfo?.totalPages ?? 1;

  const receivingStatusTabs = [
    { id: 'pending', name: '입고 대기', count: PendingRes?.pageData.totalElements },
    { id: 'received', name: '입고 완료', count: ReceivedRes?.pageData.totalElements },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 mt-6">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">출고 관리</h2>

          {/* 필터링 */}
          {selectedSubTab === 'received' && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <span className="text-gray-500">~</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
          {receivingStatusTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedSubTab(tab.id)}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                selectedSubTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.name} ({tab.count})
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {getTableHeader().map((header) => (
                  <th
                    key={header}
                    className="py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider text-left"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.map((order) => (
                <tr key={order.purchaseOrderId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {order.purchaseOrderNumber}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{order.supplierCompanyName}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {order.orderDate.slice(0, 10)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{order.dueDate.slice(0, 10)}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    ₩{order.totalAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <StatusLabel $statusCode={order.statusCode} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* 페이지네이션 */}
        {isCurrentError || isCurrentLoading ? null : (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalElements={pageInfo?.totalElements}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
    </div>
  );
};

export default ReceivingManagementList;
