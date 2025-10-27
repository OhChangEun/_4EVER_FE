'use client';

import { useMemo, useState } from 'react';
import SalesOrderDetailModal from '@/app/(private)/sales/components/modals/SalesOrderDetailModal';
import { OrderQueryParams, OrderStatus } from '@/app/(private)/sales/types/SalesOrderListType';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { getOrderList } from '../../sales.api';
import TableStatusBox from '@/app/components/common/TableStatusBox';
import {
  ORDER_LIST_TABLE_HEADERS,
  ORDER_SEARCH_KEYWORD_OPTIONS,
  ORDER_STATUS_OPTIONS,
} from '@/app/(private)/sales/constant';
import Pagination from '@/app/components/common/Pagination';
import StatusLabel from '@/app/components/common/StatusLabel';

const SalesOrderList = () => {
  const [showOrderDetailModal, setShowOrderDetailModal] = useState(false);
  const [selectedSalesOrderId, setSelectedSalesOrderId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('salesOrderNumber');

  const [statusFilter, setStatusFilter] = useState<OrderStatus>('ALL');

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 200);
  const [currentPage, setCurrentPage] = useState(1);

  const queryParams = useMemo(
    () => ({
      start: startDate || '',
      end: endDate || '',
      page: currentPage - 1,
      size: 10,
      keyword: debouncedSearchTerm || '',
      type: searchType || '',
      status: statusFilter || 'ALL',
    }),
    [startDate, endDate, currentPage, statusFilter, debouncedSearchTerm, searchType],
  );
  const {
    data: orderRes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['orderList', queryParams],
    queryFn: ({ queryKey }) => getOrderList(queryKey[1] as OrderQueryParams),
  });

  const orders = orderRes?.data ?? [];
  const pageInfo = orderRes?.pageData;

  const handleViewOrder = (id: string) => {
    setSelectedSalesOrderId(id);
    setShowOrderDetailModal(true);
  };

  const totalPages = pageInfo?.totalPages ?? 1;

  return (
    <div className="bg-white rounded-lg border border-gray-200 mt-6">
      {/* 헤더 */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">주문 품목</h3>
        </div>

        {/* 필터링 및 검색 */}
        <div className="flex flex-wrap items-center gap-4">
          {/* 날짜 필터 */}
          <div className="flex items-center space-x-2">
            <input
              type="date"
              value={startDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="시작날짜"
            />
            <span className="text-gray-500">~</span>
            <input
              type="date"
              value={endDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="끝날짜"
            />
          </div>
          {/* 상태 필터 */}
          <select
            value={statusFilter}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setStatusFilter(e.target.value as OrderStatus)
            }
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
          >
            {ORDER_STATUS_OPTIONS.map(({ key, value }) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
          <select
            value={searchType}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSearchType(e.target.value)}
            className="bg-white px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
          >
            {ORDER_SEARCH_KEYWORD_OPTIONS.map(({ key, value }) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>

          {/* 검색 */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                placeholder="주문번호, 고객명, 담당자로 검색"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <TableStatusBox $type="loading" $message="주문 목록을 불러오는 중입니다..." />
        ) : isError ? (
          <TableStatusBox $type="error" $message="주문 목록을 불러오는 중 오류가 발생했습니다." />
        ) : !orders || orders.length === 0 ? (
          <TableStatusBox $type="empty" $message="등록된 주문서가 없습니다." />
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {ORDER_LIST_TABLE_HEADERS.map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr
                  key={order.salesOrderId}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {order.salesOrderNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                    <div className="text-sm text-gray-500">
                      {order.manager.managerName} · {order.manager.managerPhone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.orderDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ₩{order.totalAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusLabel $statusCode={order.statusCode} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewOrder(order.salesOrderId)}
                      className="text-blue-600 hover:text-blue-900 cursor-pointer"
                      title="상세보기"
                    >
                      <i className="ri-eye-line"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* 페이지네이션 */}
      {isError || isLoading ? null : (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalElements={pageInfo?.totalElements}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
      {showOrderDetailModal && (
        <SalesOrderDetailModal
          $onClose={() => {
            setShowOrderDetailModal(false);
          }}
          $selectedSalesOrderId={selectedSalesOrderId}
        />
      )}
    </div>
  );
};

export default SalesOrderList;
