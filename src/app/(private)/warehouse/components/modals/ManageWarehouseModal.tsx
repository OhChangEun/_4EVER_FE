'use client';

import { ManageWarehouseModalProps } from '../../types/ManageWarehouseType';

const ManageWarehouseModal = ({ $setShowManageModal }: ManageWarehouseModalProps) => {
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
                // defaultValue={selectedWarehouse.name}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">창고 코드</label>
              <input
                type="text"
                // defaultValue={selectedWarehouse.code}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">창고 유형</label>
              <select
                // defaultValue={selectedWarehouse.type}
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
                // defaultValue={selectedWarehouse.status}
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
              // defaultValue={selectedWarehouse.location}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">담당자</label>
              <input
                type="text"
                // defaultValue={selectedWarehouse.manager}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
              <input
                type="tel"
                // defaultValue={selectedWarehouse.phone}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
            <input
              type="email"
              // defaultValue={selectedWarehouse.email}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">총 면적 (㎡)</label>
              <input
                type="number"
                // defaultValue={selectedWarehouse.capacity}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">사용 면적 (㎡)</label>
              <input
                type="number"
                // defaultValue={selectedWarehouse.currentUsage}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">구역 수</label>
              <input
                type="number"
                // defaultValue={selectedWarehouse.zones}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">온도</label>
              <input
                type="text"
                // defaultValue={selectedWarehouse.temperature}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">습도</label>
              <input
                type="text"
                // defaultValue={selectedWarehouse.humidity}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
            <textarea
              // defaultValue={selectedWarehouse.description}
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
              type="submit"
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
