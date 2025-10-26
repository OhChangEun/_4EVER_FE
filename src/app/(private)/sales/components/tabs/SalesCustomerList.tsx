'use client';

import { useMemo, useState } from 'react';
import CustomerDetailModal from '@/app/(private)/sales/components/modals/CustomerDetailModal';
import NewCustomerModal from '@/app/(private)/sales/components/modals/NewCustomerModal';
import {
  CustomerQueryParams,
  CustomerStatus,
} from '@/app/(private)/sales/types/SalesCustomerListType';
import CustomerEditModal from '../modals/CustomerEditModal';
import { useQuery } from '@tanstack/react-query';
import { getCustomerList } from '../../sales.api';
import { useDebounce } from 'use-debounce';
import { CustomerDetail } from '../../types/SalesCustomerDetailType';
import TableStatusBox from '@/app/components/common/TableStatusBox';
import {
  CUSTOMER_LIST_TABLE_HEADERS,
  CUSTOMER_SEARCH_KEYWORD_OPTIONS,
  CUSTOMER_STATUS_OPTIONS,
} from '@/app/(private)/sales/constant';
import Pagination from '@/app/components/common/Pagination';
import StatusLabel from '@/app/components/common/StatusLabel';

const CustomerList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('customerName');
  const [statusFilter, setStatusFilter] = useState<CustomerStatus>('ALL');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 200);
  const [currentPage, setCurrentPage] = useState(1);

  const handleCustomerRegisterClick = () => {
    setShowCustomerModal(true);
  };

  const queryParams = useMemo(
    () => ({
      page: currentPage - 1,
      size: 10,
      status: statusFilter || 'ALL',
      type: searchType || '',
      keyword: debouncedSearchTerm || '',
    }),
    [currentPage, statusFilter, debouncedSearchTerm, searchType],
  );
  const {
    data: customerRes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['customerList', queryParams],
    queryFn: ({ queryKey }) => getCustomerList(queryKey[1] as CustomerQueryParams),
  });

  const customers = customerRes?.data ?? [];
  const pageInfo = customerRes?.pageData;

  const handleViewClick = (id: string) => {
    setSelectedCustomerId(id);
    setShowDetailModal(true);
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState<CustomerDetail | null>(null);
  // const handleEditClick = (customer: CustomerDetail) => {
  //   setEditFormData({ ...customer });
  //   setShowEditModal(true);
  // };

  const totalPages = pageInfo?.totalPages ?? 1;

  return (
    <div className="bg-white rounded-lg border border-gray-200 mt-6">
      {/* 헤더 */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">고객 관리</h2>
          <button
            onClick={handleCustomerRegisterClick}
            className="px-4 py-2 bg-[#2563EB] text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200 cursor-pointer whitespace-nowrap flex items-center space-x-2"
          >
            <i className="ri-user-add-line"></i>
            <span>고객 등록</span>
          </button>
        </div>

        {/* 필터 및 검색 */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <select
            value={searchType}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSearchType(e.target.value)}
            className="bg-white px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
          >
            {CUSTOMER_SEARCH_KEYWORD_OPTIONS.map(({ key, value }) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setStatusFilter(e.target.value as CustomerStatus)
            }
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          >
            {CUSTOMER_STATUS_OPTIONS.map(({ key, value }) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
          <div className="flex-1 max-w-md">
            <div className="relative">
              <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="고객명, 담당자명, 고객코드로 검색..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2"></div>
        </div>
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <TableStatusBox $type="loading" $message="고객 목록을 불러오는 중입니다..." />
        ) : isError ? (
          <TableStatusBox $type="error" $message="고객 목록을 불러오는 중 오류가 발생했습니다." />
        ) : !customers || customers.length === 0 ? (
          <TableStatusBox $type="empty" $message="고객 정보가 없습니다." />
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {CUSTOMER_LIST_TABLE_HEADERS.map((header) => (
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
              {customers.map((customer) => (
                <tr key={customer.customerId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {customer.customerName}
                        </div>
                        <div className="text-xs text-gray-500">{customer.customerNumber}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{customer.manager.managerName}</div>
                    <div className="text-xs text-gray-500">{customer.manager.managerPhone}</div>
                    <div className="text-xs text-gray-500">{customer.manager.managerEmail}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {customer.address}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ₩{customer.totalTransactionAmount.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">{customer.orderCount}건</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusLabel $statusCode={customer.statusCode} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewClick(customer.customerId)}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                        title="상세보기"
                      >
                        <i className="ri-eye-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* 페이지네이션 */}
      {isError || !isLoading ? null : (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalElements={pageInfo?.totalElements}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}

      {/* 고객 상세보기 모달 */}
      {showDetailModal && (
        <CustomerDetailModal
          $setShowDetailModal={setShowDetailModal}
          $selectedCustomerId={selectedCustomerId}
          $setShowEditModal={setShowEditModal}
          $setEditFormData={setEditFormData}
        />
      )}

      {/* 고객 수정 모달 */}
      {showEditModal && (
        <CustomerEditModal
          $onClose={() => setShowEditModal(false)}
          $editFormData={editFormData}
          $setEditFormData={setEditFormData}
          $setShowDetailModal={setShowDetailModal}
        />
      )}

      {/* 신규 고객 추가 모달 */}
      {showCustomerModal && <NewCustomerModal $onClose={() => setShowCustomerModal(false)} />}
    </div>
  );
};

export default CustomerList;
