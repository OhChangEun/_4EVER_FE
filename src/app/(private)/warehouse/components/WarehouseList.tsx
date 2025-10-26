'use client';

import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { WarehouseListQueryParams } from '../types/WarehouseListType';
import Pagination from '@/app/components/common/Pagination';
import { getWarehouseList } from '../warehouse.api';
import StatusLabel from '@/app/components/common/StatusLabel';
import AddWarehouseModal from './modals/AddWarehouseModal';
import WarehouseDetailModal from './modals/WarehouseDetailModal';
import ManageWarehouseModal from './modals/ManageWarehouseModal';

const WarehouseList = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);

  const queryParams = useMemo(
    () => ({
      page: currentPage - 1,
      size: 10,
    }),
    [currentPage],
  );
  const {
    data: warehouseRes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['warehouseList', queryParams],
    queryFn: ({ queryKey }) => getWarehouseList(queryKey[1] as WarehouseListQueryParams),
    staleTime: 1000,
  });

  const warehouses = warehouseRes?.data ?? [];
  const pageInfo = warehouseRes?.pageData;
  const totalPages = pageInfo?.totalPages ?? 1;

  const handleWarehouseDetail = (warehouseId: string) => {
    setSelectedWarehouseId(warehouseId);
    setShowDetailModal(true);
  };

  const handleWarehouseManage = (warehouseId: string) => {
    setSelectedWarehouseId(warehouseId);
    setShowManageModal(true);
  };
  return (
    <div className="bg-white rounded-lg  border border-gray-200 mt-8">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">창고 목록</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer text-sm font-medium whitespace-nowrap"
          >
            <i className="ri-add-line mr-1"></i>
            창고 추가
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {warehouses.map((warehouse) => (
          <div
            key={warehouse.warehouseId}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{warehouse.warehouseName}</h3>
                <p className="text-sm text-gray-500">{warehouse.warehouseNumber}</p>
              </div>
              {<StatusLabel $statusCode={warehouse.statusCode} />}
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <i className="ri-building-line mr-2"></i>
                {warehouse.warehouseType}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <i className="ri-map-pin-line mr-2"></i>
                {warehouse.location}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <i className="ri-user-line mr-2"></i>
                {warehouse.manager}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <i className="ri-phone-line mr-2"></i>
                <a
                  href={`tel:${warehouse.managerPhone}`}
                  className="hover:text-blue-600 cursor-pointer"
                >
                  {warehouse.managerPhone}
                </a>
              </div>
            </div>

            <div className="flex gap-2 pt-3 border-t border-gray-200">
              <button
                onClick={() => handleWarehouseDetail(warehouse.warehouseId)}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <i className="ri-eye-line mr-1"></i>
                상세보기
              </button>
              <button
                onClick={() => handleWarehouseManage(warehouse.warehouseId)}
                className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
              >
                <i className="ri-edit-line mr-1"></i>
                관리
              </button>
            </div>
          </div>
        ))}
      </div>
      {isError || isLoading ? null : (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalElements={pageInfo?.totalElements}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}

      {/* 창고 추가 모달 */}
      {showAddModal && <AddWarehouseModal $setShowAddModal={setShowAddModal} />}

      {/* 창고 상세보기 모달 */}
      {showDetailModal && (
        <WarehouseDetailModal
          $selectedWarehouseId={selectedWarehouseId}
          $setShowDetailModal={setShowDetailModal}
        />
      )}

      {/* 창고 관리 모달 */}
      {showManageModal && <ManageWarehouseModal $setShowManageModal={setShowManageModal} />}
    </div>
  );
};

export default WarehouseList;
