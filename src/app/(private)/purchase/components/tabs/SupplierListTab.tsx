'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SupplierAddModal from '@/app/(private)/purchase/components/modals/SupplierAddModal';
import SupplierDetailModal from '@/app/(private)/purchase/components/modals/SupplierDetailModal';
import { SupplierListResponse } from '@/app/(private)/purchase/types/SupplierType';
import IconButton from '@/app/components/common/IconButton';
import { fetchSupplierList } from '@/app/(private)/purchase/api/purchase.api';
import Dropdown from '@/app/components/common/Dropdown';
import {
  SupplierStatus,
  SUPPLIER_CATEGORY_ITEMS,
  SUPPLIER_STATUS_ITEMS,
  SupplierCategory,
} from '@/app/(private)/purchase/constants';
import Pagination from '@/app/components/common/Pagination';

export default function SupplierListTab() {
  const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);
  const [showSupplierDetailModal, setShowSupplierDetailModal] = useState(false);

  const [selectedSupplierId, setSelectedSupplierId] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<SupplierCategory>('ALL');
  const [selectedSupplierStatus, setSelectedSupplierStatus] = useState<SupplierStatus>('ALL');

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // React Query로 데이터 가져오기 - 쿼리 파라미터 전달
  const {
    data: supplierData,
    isLoading,
    isError,
  } = useQuery<SupplierListResponse>({
    queryKey: ['suppliers', currentPage, pageSize, selectedCategory, selectedSupplierStatus],
    queryFn: () =>
      fetchSupplierList({
        page: currentPage,
        size: pageSize,
        category: selectedCategory || undefined,
        status: selectedSupplierStatus || undefined,
      }),
  });

  if (isLoading) return <p>불러오는 중...</p>;
  if (isError || !supplierData) return <p>데이터를 불러오지 못했습니다.</p>;

  const suppliers = supplierData.content || [];
  const pageInfo = supplierData.page;
  const totalPages = pageInfo?.totalPages ?? 1;

  const handleSupplierStatusChange = (status: SupplierStatus) => {
    setSelectedSupplierStatus(status);
    setCurrentPage(1);
  };

  const handleViewDetail = (supplierId: string) => {
    setSelectedSupplierId(supplierId);
    setShowSupplierDetailModal(true); // 모달창 생성
  };

  const handleCloseDetailModal = () => {
    setShowSupplierDetailModal(false);
    setSelectedSupplierId('');
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
    if (status === 'ACTIVE') {
      return `${baseClasses} bg-green-100 text-green-800`;
    }
    return `${baseClasses} bg-red-100 text-red-800`;
  };
  const getStatusText = (status: string) => (status === 'ACTIVE' ? '활성' : '비활성');

  const getCategoryValue = (category?: string): string => {
    const key = category ?? selectedCategory;
    const item = SUPPLIER_CATEGORY_ITEMS.find((s) => s.key === key);
    return item?.value || '전체';
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">공급업체 목록</h3>
            <div className="flex items-center space-x-4">
              {/* 공급업체 카테고리 드롭다운 */}
              <Dropdown
                items={SUPPLIER_CATEGORY_ITEMS}
                value={selectedCategory}
                onChange={(category: SupplierCategory) => setSelectedCategory(category)}
              />
              {/* 공급업체 상태 드롭다운 */}
              <Dropdown
                items={SUPPLIER_STATUS_ITEMS}
                value={selectedSupplierStatus}
                onChange={(status: SupplierStatus) => setSelectedSupplierStatus(status)}
              />
              <IconButton
                label="공급업체 등록"
                icon="ri-add-line"
                onClick={() => setShowAddSupplierModal(true)}
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-center">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  공급업체 코드
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  업체명
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  카테고리
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  언락처
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  주소
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  배송 기간
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {suppliers.map((supplier) => {
                const { statusCode, supplierInfo } = supplier;
                return (
                  <tr key={supplierInfo.supplierId} className="hover:bg-gray-50 text-center">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {supplierInfo.supplierCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {supplierInfo.supplierName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getCategoryValue(supplierInfo.category)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex flex-col">
                        <span>{supplierInfo.supplierEmail}</span>
                        <span>{supplierInfo.supplierPhone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex flex-col">
                        <span>{supplierInfo.supplierBaseAddress}</span>
                        <span>{supplierInfo.supplierDetailAddress}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {supplierInfo.deliveryLeadTime}일
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(supplierInfo.supplierStatus)}>
                        {getStatusText(supplierInfo.supplierStatus)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewDetail(supplierInfo.supplierId)}
                          className="w-8 h-8 flex items-center justify-center text-blue-500 hover:bg-blue-50 rounded cursor-pointer"
                          title="상세보기"
                        >
                          <i className="ri-eye-line"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {suppliers.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500 text-sm">
                    공급업체가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
      </div>

      {showAddSupplierModal && <SupplierAddModal onClose={() => setShowAddSupplierModal(false)} />}

      {showSupplierDetailModal && (
        <SupplierDetailModal
          supplierId={Number(selectedSupplierId)}
          onClose={handleCloseDetailModal}
        />
      )}
    </>
  );
}
