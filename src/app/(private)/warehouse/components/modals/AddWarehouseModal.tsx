'use client';

import { useState } from 'react';
import {
  AddWarehouseModalProps,
  AddWarehouseRequest,
  WarehouseManagerInfoResponse,
} from '../../types/AddWarehouseType';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getWarehouseManagerInfo, postAddWarehouse } from '../../warehouse.api';
import { ApiResponseNoData } from '@/app/api';

const AddWarehouseModal = ({ $setShowAddModal }: AddWarehouseModalProps) => {
  const [formData, setFormData] = useState<AddWarehouseRequest>({
    warehouseName: '',
    warehouseType: '',
    location: '',
    managerId: '',
    managerPhone: '',
    note: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const { managerPhone, ...requestData } = formData;
    addWarehouse(requestData);
  };

  // ---------------------

  const {
    data: ManagerInfoRes,
    isLoading: isManagerInfoLoading,
    isError: isManagerInfoError,
  } = useQuery<WarehouseManagerInfoResponse[]>({
    queryKey: ['getWarehouseManagerInfo'],
    queryFn: getWarehouseManagerInfo,
  });

  const { mutate: addWarehouse } = useMutation<ApiResponseNoData, Error, AddWarehouseRequest>({
    mutationFn: postAddWarehouse,
    onSuccess: (data) => {
      alert(`${data.status} : ${data.message}
      `);
      $setShowAddModal(false);
    },
    onError: (error) => {
      alert(` 자재 등록 중 오류가 발생했습니다. ${error}`);
    },
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">새 창고 추가</h3>
          <button
            onClick={() => $setShowAddModal(false)}
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
              name="warehouseName"
              value={formData.warehouseName}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="창고명을 입력하세요"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">창고 유형</label>
            <select
              onChange={handleInputChange}
              name="warehouseType"
              value={formData.warehouseType}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
            >
              <option value="MATERIAL">원자재</option>
              <option value="ITEM">부품</option>
              <option value="ETC">기타 </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">위치</label>
            <input
              type="text"
              name="location"
              onChange={handleInputChange}
              value={formData.location}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="창고 위치를 입력하세요"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">담당자</label>
            <select
              onChange={(e) => {
                const managerId = e.target.value;
                const selectedManager = ManagerInfoRes?.find((m) => m.managerId === managerId);

                setFormData((prev) => ({
                  ...prev,
                  managerId,
                  managerPhone: selectedManager?.managerPhone ?? '',
                }));
              }}
              name="manager"
              value={formData.managerId}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
            >
              <option value="">창고 담당자를 선택하세요</option>
              {ManagerInfoRes?.map((manager) => (
                <option key={manager.managerId} value={manager.managerId}>
                  {manager.managerName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
            <input
              onChange={handleInputChange}
              name="managerPhone"
              value={formData.managerPhone}
              type="tel"
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="연락처를 입력하세요"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => $setShowAddModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium cursor-pointer"
            >
              추가
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWarehouseModal;
