'use client';

import { useQuery } from '@tanstack/react-query';
import { ManageWarehouseModalProps } from '../../types/ManageWarehouseType';
import { InventoryDetailResponse } from '@/app/(private)/inventory/types/InventoryDetailType';
import { WarehouseDetailResponse } from '../../types/WarehouseDetailType';
import { getWarehouseDetail } from '../../warehouse.api';
import { useEffect, useState } from 'react';
import { getStatusText } from '@/lib/status.constants';
import ModalStatusBox from '@/app/components/common/ModalStatusBox';

interface ManageWarehouseRequest {
  warehouseName: string;
  warehouseNumber: string;
  warehouseType: string;
  statusCode: string;
  location: string;
  managerName: string;
  managerPhoneNumber: string;
  managerEmail: string;
  description: string;
}

const ManageWarehouseModal = ({
  $setShowManageModal,
  $selectedWarehouseId,
}: ManageWarehouseModalProps) => {
  const [formData, setFormData] = useState<ManageWarehouseRequest>({
    warehouseName: '',
    warehouseNumber: '',
    warehouseType: '',
    statusCode: '',
    location: '',
    managerName: '',
    managerPhoneNumber: '',
    managerEmail: '',
    description: '',
  });

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const {
    data: warehouseDetailRes,
    isLoading,
    isError,
  } = useQuery<WarehouseDetailResponse>({
    queryKey: ['warehouseDetail', $selectedWarehouseId],
    queryFn: () => getWarehouseDetail($selectedWarehouseId),
    enabled: !!$selectedWarehouseId,
  });

  const warehouseInfo = warehouseDetailRes?.warehouseInfo;
  const managerInfo = warehouseDetailRes?.manager;

  useEffect(() => {
    if (warehouseInfo && managerInfo) {
      setFormData({
        warehouseName: warehouseInfo.warehouseName ?? '',
        warehouseNumber: warehouseInfo.warehouseNumber ?? '',
        warehouseType: warehouseInfo.warehouseType ?? '',
        statusCode: warehouseInfo.statusCode ?? '',
        location: warehouseInfo.location ?? '',
        managerName: managerInfo.managerName ?? '',
        managerPhoneNumber: managerInfo.managerPhoneNumber ?? '',
        managerEmail: managerInfo.managerEmail ?? '',
        description: warehouseInfo.description ?? '',
      });
    }
  }, [warehouseInfo, managerInfo]);

  const [errorModal, setErrorModal] = useState(false);
  useEffect(() => {
    setErrorModal(isError);
  }, [isError]);

  if (isLoading)
    return <ModalStatusBox $type="loading" $message="창고 상세 데이터를 불러오는 중입니다..." />;

  if (errorModal)
    return (
      <ModalStatusBox
        $type="error"
        $message="창고 상세 데이터를 불러오는 중 오류가 발생했습니다."
        $onClose={() => setErrorModal(false)}
      />
    );
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          {/* <h3 className="text-xl font-semibold">창고 관리 - {selectedWarehouse.name}</h3> */}
          <button
            onClick={() => $setShowManageModal(false)}
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
                value={formData.warehouseName}
                onChange={handleInputChange}
                name="warehouseName"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">창고 코드</label>
              <input
                type="text"
                value={formData.warehouseNumber}
                onChange={handleInputChange}
                name="warehouseNumber"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">창고 유형</label>
              <select
                value={formData.warehouseType}
                onChange={handleInputChange}
                name="warehouseType"
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
                value={formData.statusCode}
                onChange={handleInputChange}
                name="statusCode"
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
              value={formData.location}
              onChange={handleInputChange}
              name="location"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">담당자</label>
              <input
                type="text"
                value={formData.managerName}
                onChange={handleInputChange}
                name="managerName"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
              <input
                type="tel"
                value={formData.managerPhoneNumber}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9-]/g, '');
                  handleInputChange(e);
                }}
                inputMode="numeric"
                pattern="[0-9-]*"
                name="managerPhoneNumber"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
            <input
              type="email"
              value={formData.managerEmail}
              onChange={handleInputChange}
              name="managerEmail"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
            <textarea
              value={formData.description}
              onChange={handleInputChange}
              name="description"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              rows={3}
            ></textarea>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => $setShowManageModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium cursor-pointer"
            >
              취소
            </button>
            <button
              // type="submit"
              onClick={() => {
                console.log(formData);
              }}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium cursor-pointer"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageWarehouseModal;
