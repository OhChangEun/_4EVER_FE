'use client';

import { WarehouseDetailModalProps } from '../../types/WarehouseDetailType';

const WarehouseDetailModal = ({
  $selectedWarehouseId,
  $setShowDetailModal,
}: WarehouseDetailModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[94vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">창고 상세 정보</h3>
          <button
            onClick={() => $setShowDetailModal(false)}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">기본 정보</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">창고명:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {/* {selectedWarehouse.name} */}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">창고코드:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {/* {selectedWarehouse.code} */}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">창고 유형:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {/* {selectedWarehouse.type} */}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">상태:</span>
                  {/* {<StatusLabel $statusCode={selectedWarehouse.status} />} */}
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">위치 정보</h4>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600 block mb-1">주소:</span>
                  {/* <span className="text-sm text-gray-900">{selectedWarehouse.location}</span> */}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">담당자 정보</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">담당자:</span>
                <span className="text-sm font-medium text-gray-900">
                  {/* {selectedWarehouse.manager} */}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">연락처:</span>
                <span className="text-sm font-medium text-blue-600">
                  {/* {selectedWarehouse.phone} */}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">이메일:</span>
                <span className="text-sm font-medium text-blue-600">
                  {/* {selectedWarehouse.email} */}
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">설명</h4>
              {/* <p className="text-sm text-gray-700">{selectedWarehouse.description}</p> */}
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => {
              $setShowDetailModal(false);
              //   handleWarehouseManage(selectedWarehouse);
            }}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium cursor-pointer"
          >
            <i className="ri-edit-line mr-1"></i>
            창고 관리
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarehouseDetailModal;
