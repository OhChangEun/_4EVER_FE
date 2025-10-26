'use client';

import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { WarehouseListQueryParams } from '../types/WarehouseListType';
import Pagination from '@/app/components/common/Pagination';
import { getWarehouseList } from '../warehouse.api';
import StatusLabel from '@/app/components/common/StatusLabel';

export default function WarehouseList() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<any>(null);
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

  const getUsageColor = (rate: number) => {
    if (rate >= 90) return 'text-red-600 bg-red-100';
    if (rate >= 80) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const handleWarehouseDetail = (warehouse: any) => {
    setSelectedWarehouse(warehouse);
    setShowDetailModal(true);
  };

  const handleWarehouseManage = (warehouse: any) => {
    setSelectedWarehouse(warehouse);
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
                onClick={() => handleWarehouseDetail(warehouse)}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <i className="ri-eye-line mr-1"></i>
                상세보기
              </button>
              <button
                onClick={() => handleWarehouseManage(warehouse)}
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
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">새 창고 추가</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">창고명</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="창고명을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">창고 코드</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="WH-F"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">창고 유형</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8">
                  <option>원자재</option>
                  <option>완제품</option>
                  <option>부품</option>
                  <option>특수보관</option>
                  <option>임시보관</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">위치</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="창고 위치를 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">담당자</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="담당자명을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="연락처를 입력하세요"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    총 면적 (㎡)
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="1000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">구역 수</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="10"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium cursor-pointer"
                >
                  추가
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 창고 상세보기 모달 */}
      {showDetailModal && selectedWarehouse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">창고 상세 정보</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">기본 정보</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">창고명:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedWarehouse.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">창고코드:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedWarehouse.code}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">거래처:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedWarehouse.type}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">상태:</span>
                      {/* {<StatusLabel $statusCode={selectedWarehouse.status} />} */}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">설립일:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedWarehouse.establishedDate}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">최종점검:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedWarehouse.lastInspection}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">담당자 정보</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">담당자:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedWarehouse.manager}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">연락처:</span>
                      <span className="text-sm font-medium text-blue-600">
                        {selectedWarehouse.phone}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">이메일:</span>
                      <span className="text-sm font-medium text-blue-600">
                        {selectedWarehouse.email}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">위치 정보</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600 block mb-1">주소:</span>
                      <span className="text-sm text-gray-900">{selectedWarehouse.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">용량 정보</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">총 용량:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedWarehouse.capacity}㎡
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">사용 중:</span>
                      <span className="text-sm font-medium text-blue-600">
                        {selectedWarehouse.currentUsage}㎡
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">사용률:</span>
                      <span
                        className={`text-sm font-medium px-2 py-1 rounded-full ${getUsageColor(selectedWarehouse.usageRate)}`}
                      >
                        {selectedWarehouse.usageRate}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">구역 수:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedWarehouse.zones}개
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">환경 조건</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">온도:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedWarehouse.temperature}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">습도:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedWarehouse.humidity}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">시설 정보</h4>
                  <div className="space-y-2">
                    {selectedWarehouse.facilities.map((facility: string, index: number) => (
                      <div key={index} className="flex items-center text-sm text-gray-700">
                        <i className="ri-check-line text-green-600 mr-2"></i>
                        {facility}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">설명</h4>
                  <p className="text-sm text-gray-700">{selectedWarehouse.description}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  handleWarehouseManage(selectedWarehouse);
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium cursor-pointer"
              >
                <i className="ri-edit-line mr-1"></i>
                창고 관리
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 창고 관리 모달 */}
      {showManageModal && selectedWarehouse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">창고 관리 - {selectedWarehouse.name}</h3>
              <button
                onClick={() => setShowManageModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">창고명</label>
                  <input
                    type="text"
                    defaultValue={selectedWarehouse.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">창고 코드</label>
                  <input
                    type="text"
                    defaultValue={selectedWarehouse.code}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">창고 유형</label>
                  <select
                    defaultValue={selectedWarehouse.type}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
                  >
                    <option>원자재</option>
                    <option>완제품</option>
                    <option>부품</option>
                    <option>특수보관</option>
                    <option>임시보관</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                  <select
                    defaultValue={selectedWarehouse.status}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
                  >
                    <option value="active">운영중</option>
                    <option value="maintenance">점검중</option>
                    <option value="inactive">비활성</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">주소</label>
                <input
                  type="text"
                  defaultValue={selectedWarehouse.location}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">담당자</label>
                  <input
                    type="text"
                    defaultValue={selectedWarehouse.manager}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
                  <input
                    type="tel"
                    defaultValue={selectedWarehouse.phone}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                <input
                  type="email"
                  defaultValue={selectedWarehouse.email}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    총 면적 (㎡)
                  </label>
                  <input
                    type="number"
                    defaultValue={selectedWarehouse.capacity}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    사용 면적 (㎡)
                  </label>
                  <input
                    type="number"
                    defaultValue={selectedWarehouse.currentUsage}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">구역 수</label>
                  <input
                    type="number"
                    defaultValue={selectedWarehouse.zones}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">온도</label>
                  <input
                    type="text"
                    defaultValue={selectedWarehouse.temperature}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">습도</label>
                  <input
                    type="text"
                    defaultValue={selectedWarehouse.humidity}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
                <textarea
                  defaultValue={selectedWarehouse.description}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  rows={3}
                ></textarea>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowManageModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium cursor-pointer"
                >
                  저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
